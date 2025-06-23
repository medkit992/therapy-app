import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import Peer, { SignalData } from 'simple-peer';

export default function TelehealthRoom() {
  const { id: roomId } = useParams<{ id: string }>();
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [peer, setPeer] = useState<Peer.Instance|null>(null);

  useEffect(() => {
    if (!roomId) return;
    const socket = io('/', { path: '/signaling' });
    socket.emit('join-room', roomId);

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        const p = new Peer({ initiator: true, trickle: false, stream });
        p.on('signal', (signal: SignalData) => {
          socket.emit('signal', { roomId, signal });
        });
        p.on('stream', remoteStream => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
          }
        });
        socket.on('signal', (signal: SignalData) => {
          p.signal(signal);
        });
        setPeer(p);
      });

    return () => {
      peer?.destroy();
      socket.disconnect();
    };
  }, [roomId]);

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl mb-4">Telehealth Room: {roomId}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2>Your Video</h2>
          <video ref={localVideoRef} autoPlay muted className="w-full rounded" />
        </div>
        <div>
          <h2>Peer Video</h2>
          <video ref={remoteVideoRef} autoPlay className="w-full rounded" />
        </div>
      </div>
    </div>
  );
}
