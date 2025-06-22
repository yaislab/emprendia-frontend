
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff } from 'lucide-react';

interface VoiceInputProps {
  onVoiceInput: (text: string) => void;
  placeholder?: string;
  className?: string;
}

export const VoiceInput: React.FC<VoiceInputProps> = ({
  onVoiceInput,
  placeholder = "Presiona el micrófono y habla...",
  className = "",
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.log('Speech recognition not supported');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'es-ES';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const currentTranscript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('');
      
      setTranscript(currentTranscript);
      
      if (event.results[event.results.length - 1].isFinal) {
        onVoiceInput(currentTranscript);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    const startListening = () => {
      recognition.start();
    };

    const stopListening = () => {
      recognition.stop();
    };

    // Store references for cleanup
    (window as any).startVoiceRecognition = startListening;
    (window as any).stopVoiceRecognition = stopListening;

    return () => {
      recognition.stop();
    };
  }, [onVoiceInput]);

  const toggleListening = () => {
    if (isListening) {
      (window as any).stopVoiceRecognition?.();
    } else {
      (window as any).startVoiceRecognition?.();
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center gap-4">
        <Button
          onClick={toggleListening}
          variant={isListening ? "destructive" : "default"}
          size="lg"
          className="btn-accessible flex items-center gap-2"
          aria-label={isListening ? "Parar grabación de voz" : "Iniciar grabación de voz"}
        >
          {isListening ? (
            <>
              <MicOff className="h-5 w-5" />
              Parar
            </>
          ) : (
            <>
              <Mic className="h-5 w-5" />
              Hablar
            </>
          )}
        </Button>
        
        {isListening && (
          <div className="flex items-center gap-2 text-red-600">
            <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
            <span className="font-medium">Escuchando...</span>
          </div>
        )}
      </div>

      {transcript && (
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-gray-700">{transcript}</p>
        </div>
      )}

      {!transcript && !isListening && (
        <p className="text-gray-500 text-center">{placeholder}</p>
      )}
    </div>
  );
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}
