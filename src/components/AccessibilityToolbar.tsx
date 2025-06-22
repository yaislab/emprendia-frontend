import React from 'react';
import { Button } from '@/components/ui/button';
import { Mic, Volume2, Eye, Type, Camera } from 'lucide-react';

interface AccessibilityToolbarProps {
  onToggleHighContrast: () => void;
  onToggleLargeText: () => void;
  onToggleAudio: () => void;
  onToggleVoiceControl: () => void;
  highContrast: boolean;
  largeText: boolean;
  audioEnabled: boolean;
  voiceControlEnabled: boolean;
  onToggleSignCamera?: () => void;
  signCameraEnabled?: boolean;
}

export const AccessibilityToolbar: React.FC<AccessibilityToolbarProps> = ({
  onToggleHighContrast,
  onToggleLargeText,
  onToggleAudio,
  onToggleVoiceControl,
  onToggleSignCamera,
  highContrast,
  largeText,
  audioEnabled,
  voiceControlEnabled,
  signCameraEnabled,
}) => {
  return (
    <div className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-2 border">
      <div className="flex flex-col gap-2">
        <Button
          variant={highContrast ? "default" : "outline"}
          size="sm"
          onClick={onToggleHighContrast}
          aria-label="Activar modo alto contraste"
          className="btn-accessible flex items-center gap-2"
        >
          <Eye className="h-4 w-4" />
          <span className="sr-only">Alto Contraste</span>
        </Button>
        <Button
          variant={largeText ? "default" : "outline"}
          size="sm"
          onClick={onToggleLargeText}
          aria-label="Activar texto grande"
          className="btn-accessible flex items-center gap-2"
        >
          <Type className="h-4 w-4" />
          <span className="sr-only">Texto Grande</span>
        </Button>
        <Button
          variant={audioEnabled ? "default" : "outline"}
          size="sm"
          onClick={onToggleAudio}
          aria-label="Activar audio descripción"
          className="btn-accessible flex items-center gap-2"
        >
          <Volume2 className="h-4 w-4" />
          <span className="sr-only">Audio</span>
        </Button>
        <Button
          variant={voiceControlEnabled ? "default" : "outline"}
          size="sm"
          onClick={onToggleVoiceControl}
          aria-label="Activar control por voz"
          className="btn-accessible flex items-center gap-2"
        >
          <Mic className="h-4 w-4" />
          <span className="sr-only">Control por Voz</span>
        </Button>
      </div>
    </div>
  );
};
