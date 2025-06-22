
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Video } from 'lucide-react';

interface VideoWithLSBProps {
  title: string;
  description: string;
  subtitles: string[];
  onAudioPlay?: () => void;
  className?: string;
}

export const VideoWithLSB: React.FC<VideoWithLSBProps> = ({
  title,
  description,
  subtitles,
  onAudioPlay,
  className = "",
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSubtitle, setCurrentSubtitle] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (onAudioPlay) {
      onAudioPlay();
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`}>
      {/* Video Area with LSB Interpreter */}
      <div className="relative bg-gradient-to-br from-blue-100 to-purple-100 aspect-video flex items-center justify-center">
        <div className="absolute top-4 left-4 bg-black/80 text-white px-3 py-1 rounded-full text-sm">
          LSB - Lengua de Señas Boliviana
        </div>
        
        {/* Simulated interpreter area */}
        <div className="w-64 h-48 bg-gray-200 rounded-lg flex items-center justify-center border-4 border-white shadow-lg">
          <div className="text-center">
            <Video className="h-12 w-12 mx-auto text-gray-400 mb-2" />
            <p className="text-sm text-gray-600">Intérprete LSB</p>
            <p className="text-xs text-gray-500">{title}</p>
          </div>
        </div>

        {/* Play/Pause overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            onClick={togglePlay}
            size="lg"
            className="bg-primary/90 hover:bg-primary text-white rounded-full p-4"
            aria-label={isPlaying ? "Pausar video" : "Reproducir video"}
          >
            {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
          </Button>
        </div>
      </div>

      {/* Subtitles Area */}
      <div className="p-6 bg-gray-50">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-700 leading-relaxed">{description}</p>
        </div>

        {/* Subtitles Display */}
        <div className="bg-black/90 text-white p-4 rounded-lg mb-4 min-h-[60px] flex items-center">
          <p className="text-lg font-medium text-center w-full">
            {subtitles[currentSubtitle] || "Los subtítulos aparecerán aquí..."}
          </p>
        </div>

        {/* Audio Controls */}
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() => speakText(description)}
            variant="outline"
            className="btn-accessible flex items-center gap-2"
            aria-label="Escuchar descripción del video"
          >
            <Volume2 className="h-4 w-4" />
            Escuchar Audio
          </Button>
          
          <Button
            onClick={() => speakText(subtitles[currentSubtitle] || "")}
            variant="outline"
            className="btn-accessible flex items-center gap-2"
            aria-label="Escuchar subtítulos actuales"
          >
            <Volume2 className="h-4 w-4" />
            Escuchar Subtítulos
          </Button>
        </div>
      </div>
    </div>
  );
};
