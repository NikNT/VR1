import { useCallback, useEffect, useRef } from "react";
import { useStateWithCallback } from "./useStateWithCallback";
import { socketInit } from "../socket";
import { ACTIONS } from "../actions";
import freeIce from "freeice";

const users = [
  {
    id: 1,
    name: "Nik Tan",
  },
  {
    id: 2,
    name: "Nikhil Tanwar",
  },
];

export const useWebRTC = (roomId, user) => {
  const [clients, setClients] = useStateWithCallback(users);
  const audioElements = useRef({});
  const connections = useRef({});
  const localMediaStream = useRef(null);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = socketInit();
  }, []);

  const provideRef = (instance, userId) => {
    audioElements.current[userId] = instance;
  };

  const addNewClient = useCallback(
    (newClient, cb) => {
      const lookingFor = clients.find((client) => client.id === newClient.id);
      if (lookingFor === undefined) {
        setClients((existingClients) => [...existingClients, newClient], cb);
      }
    },
    [clients, setClients]
  );

  //Capturing Media - Mic from System

  useEffect(() => {
    const startCapture = async () => {
      localMediaStream.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
    };

    startCapture().then(() => {
      addNewClient(user, () => {
        const localElement = audioElements.current[user.id];
        if (localElement) {
          localElement.volume = 0;
          localElement.srcObject = localMediaStream.current;
        }

        //Socket Emit JOIN
        socket.current.emit(ACTIONS.JOIN, { roomId, user });
      });
    });

    return () => {
      // localMediaStream.current.getTracks().forEach((track) => track.stop());
      socket.current.emit(ACTIONS.LEAVE, { roomId });
    };
  }, []);

  useEffect(() => {
    const handleNewPeer = async ({ peerId, createOffer, user: remoteUser }) => {
      //If Connected - Give Warning

      if (peerId in connections.current) {
        return console.warn(
          `You are already connected with ${peerId} (${user.name})`
        );
      }

      connections.current[peerId] = new RTCPeerConnection({
        iceServers: freeIce(),
      });

      //Handle New Ice Candidate
      connections.current[peerId].onicecandidate = (event) => {
        socket.current.emit(ACTIONS.RELAY_ICE, {
          peerId,
          icecandidate: event.candidate,
        });
      };

      //Handle On Track on Connection
      connections.current[peerId].ontrack = ({ streams: [remoteStream] }) => {
        addNewClient(remoteUser, () => {
          if (audioElements.current[remoteUser.id]) {
            audioElements.current[remoteUser.id].srcObject = remoteStream;
          } else {
            let settled = false;
            const interval = setInterval(() => {
              if (audioElements.current[remoteUser.id]) {
                audioElements.current[remoteUser.id].srcObject = remoteStream;
                settled = true;
              }

              if (settled) {
                clearInterval(interval);
              }
            }, 1000);
          }
        });
      };
      //Add Local Track to Remote Connections
      localMediaStream.current.getTracks().forEach((track) => {
        connections.current[peerId].addTrack(track, localMediaStream.current);
      });

      //Create Offer
      if (createOffer) {
        const offer = await connections.current[peerId].createOffer();
        await connections.current[peerId].setLocalDescription(offer);
        //Send Offer to Another Client
        socket.current.emit(ACTIONS.RELAY_SDP, {
          peerId,
          sessionDescription: offer,
        });
      }
    };
    socket.current.on(ACTIONS.ADD_PEER, handleNewPeer);
    return () => {
      socket.current.off(ACTIONS.ADD_PEER);
    };
  }, []);

  //Handle Ice Candidate
  useEffect(() => {
    socket.current.on(ACTIONS.ICE_CANDIDATE, ({ peerId, icecandidate }) => {
      if (icecandidate) {
        connections.current[peerId].addIceCandidate(icecandidate);
      }
    });

    return () => {
      socket.current.off(ACTIONS.ICE_CANDIDATE);
    };
  }, []);

  //Handle SDP
  useEffect(() => {
    const handleRemoteSDP = async ({
      peerId,
      sessionDescription: remoteSessionDescription,
    }) => {
      connections.current[peerId].setRemoteDescription(
        new RTCSessionDescription(remoteSessionDescription)
      );

      //If Session Description is TypeOf (Offer) -> Create Answer
      if (remoteSessionDescription.type === "offer") {
        const connection = connections.current[peerId];
        const answer = await connection.createAnswer();

        connection.setLocalDescription(answer);

        socket.current.emit(ACTIONS.RELAY_SDP, {
          peerId,
          sessionDescription: answer,
        });
      }
    };
    socket.current.on(ACTIONS.SESSION_DESCRIPTION, handleRemoteSDP);

    return () => {
      socket.current.off(ACTIONS.SESSION_DESCRIPTION);
    };
  }, []);

  //Handle Remove Peer
  useEffect(() => {
    const handleRemovePeer = async ({ peerId, userId }) => {
      if (connections.current[peerId]) {
        connections.current[peerId].close();
      }

      delete connections.current[peerId];
      delete audioElements.current[peerId];

      setClients((list) => list.filter((client) => client.id !== userId));
    };
    socket.current.on(ACTIONS.REMOVE_PEER, handleRemovePeer);

    return () => {
      socket.current.off(ACTIONS.REMOVE_PEER);
    };
  }, []);

  return { clients, provideRef };
};