import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

interface SignCameraProps {
  enabled: boolean;
  onClose: () => void;
}

const SignCamera: React.FC<SignCameraProps> = ({ enabled, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    if (enabled) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((mediaStream) => {
          setStream(mediaStream);
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
          }
        })
        .catch((err) => {
          if (err.name === 'NotAllowedError') {
            setError('Permiso denegado para acceder a la cámara. Por favor, revisa los permisos del navegador.');
          } else if (err.name === 'NotFoundError') {
            setError('No se encontró ninguna cámara conectada.');
          } else if (err.name === 'NotReadableError') {
            setError('La cámara está siendo utilizada por otra aplicación.');
          } else if (err.name === 'OverconstrainedError') {
            setError('No se encontró una cámara que cumpla con los requisitos.');
          } else {
            setError('No se pudo acceder a la cámara. Permiso denegado o no disponible.');
          }
        });
    } else {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }
    }
    // Cleanup on unmount
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-xl shadow-lg p-6 relative w-full max-w-md flex flex-col items-center">
        <h2 className="text-xl font-bold mb-4 text-center">Cámara para reconocimiento de señas</h2>
        {error ? (
          <div className="text-red-600 mb-4">{error}</div>
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="rounded-lg border w-full max-w-xs h-64 object-cover mb-4"
            aria-label="Video en vivo de la cámara para reconocimiento de señas"
          />
        )}
        <Button onClick={onClose} className="mt-2" aria-label="Cerrar cámara">
          Cerrar cámara
        </Button>
      </div>
    </div>
  );
};

export default SignCamera; 