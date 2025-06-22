import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';
import SignCamera from '@/components/SignCamera';

interface SignCameraButtonProps {
  onResult: (text: string) => void;
  className?: string;
  size?: 'sm' | 'default' | 'lg';
  ariaLabel?: string;
}

export const SignCameraButton: React.FC<SignCameraButtonProps> = ({
  onResult,
  className = '',
  size = 'lg',
  ariaLabel = 'Activar reconocimiento de lenguaje de señas por cámara',
}) => {
  const [open, setOpen] = useState(false);

  // Simulación de traducción de señas
  const handleClose = () => {
    setOpen(false);
    // Simula la traducción y pasa el texto al callback
    onResult('Quiero crear una aplicación que ayude a las personas sordas a comunicarse fácilmente con intérpretes de LSB en Bolivia.');
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        size={size}
        className={`btn-accessible flex items-center gap-2 ${className}`}
        aria-label={ariaLabel}
      >
        <Camera className="h-5 w-5" />
        Cámara de señas
      </Button>
      <SignCamera enabled={open} onClose={handleClose} />
    </>
  );
}; 