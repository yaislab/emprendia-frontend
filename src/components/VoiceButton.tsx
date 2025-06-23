import React, { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic } from 'lucide-react';

interface VoiceButtonProps {
  onResult: (text: string) => void;
  onPartial?: (text: string) => void;
  onStop?: (partial: string) => void;
  onStart?: () => void;
  value?: string;
  lang?: string;
  shortcut?: string; // Ejemplo: 'Alt+M'
  className?: string;
  size?: 'sm' | 'default' | 'lg';
  ariaLabel?: string;
}

export const VoiceButton: React.FC<VoiceButtonProps> = ({
  onResult,
  onPartial,
  onStop,
  onStart,
  value = '',
  lang = 'es-ES',
  shortcut = 'Alt+M',
  className = '',
  size = 'lg',
  ariaLabel = 'Hablar',
}) => {
  const recognitionRef = useRef<any>(null);
  const [isListening, setIsListening] = useState(false);
  const lastTranscriptRef = useRef('');
  const stoppingRef = useRef(false);

  const startVoiceRecognition = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('El reconocimiento de voz no es compatible con este navegador.');
      return;
    }
    stoppingRef.current = false;
    if (onStart) onStart();
    if (onPartial) onPartial(''); // Limpia el texto parcial antes de iniciar
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = lang;
    setIsListening(true);
    let currentSessionTranscript = '';
    recognition.onresult = (event: any) => {
      if (stoppingRef.current) return;
      let finalTranscript = '';
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      // Muestra el texto parcial/interino solo como ayuda visual
      if (onPartial) {
        onPartial(interimTranscript.trim());
      }
      // Solo actualiza el campo principal cuando hay resultado final
      if (finalTranscript) {
        onResult(finalTranscript.trim());
        if (onPartial) onPartial(''); // Limpia el texto parcial
      }
    };
    recognition.onend = () => {
      if (isListening) {
        recognition.start();
      } else {
        setIsListening(false);
        // Al finalizar, concatena el transcript al valor anterior
        if (lastTranscriptRef.current.trim()) {
          onResult(lastTranscriptRef.current.trim());
          lastTranscriptRef.current = '';
        }
      }
    };
    recognition.onerror = (event: any) => {
      setIsListening(false);
      alert('Error en el reconocimiento de voz: ' + event.error);
    };
    recognition.start();
  };

  const stopVoiceRecognition = () => {
    stoppingRef.current = true;
    setIsListening(false);
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    if (onStop && lastTranscriptRef.current.trim()) {
      onStop(lastTranscriptRef.current.trim());
      lastTranscriptRef.current = '';
    }
  };

  // Atajo de teclado para activar/detener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.altKey || e.metaKey) && e.key.toLowerCase() === 'm') {
        e.preventDefault();
        if (!isListening) startVoiceRecognition();
        else stopVoiceRecognition();
      }
      if ((e.altKey || e.metaKey) && e.key.toLowerCase() === 'n') {
        e.preventDefault();
        if (isListening) stopVoiceRecognition();
      }
      if (e.key === 'Escape') {
        if (isListening) stopVoiceRecognition();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isListening]);

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <Button
        onClick={isListening ? stopVoiceRecognition : startVoiceRecognition}
        variant={isListening ? 'destructive' : 'default'}
        size={size}
        className="btn-accessible flex items-center gap-2"
        aria-label={isListening ? 'Detener micrófono' : ariaLabel}
      >
        <Mic className="h-5 w-5" />
        {isListening ? 'Detener' : 'Hablar'}
      </Button>
      {isListening && (
        <span className="mt-2 text-red-600 font-semibold animate-pulse-slow text-sm">
          Escuchando... (Alt+N o Esc para detener)
        </span>
      )}
      <span className="text-xs text-gray-400 mt-1">Atajo: <kbd className="px-1 py-0.5 bg-gray-200 rounded">{shortcut}</kbd></span>
    </div>
  );
}; 