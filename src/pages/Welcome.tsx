
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { VideoWithLSB } from '@/components/VideoWithLSB';
import { AccessibilityToolbar } from '@/components/AccessibilityToolbar';
import { ArrowRight, Users, Lightbulb, Target } from 'lucide-react';

interface WelcomeProps {
  onStart: () => void;
}

export const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [voiceControlEnabled, setVoiceControlEnabled] = useState(false);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window && audioEnabled) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const welcomeSubtitles = [
    "¡Bienvenido/a a tu plataforma de emprendimiento inclusivo!",
    "Aquí aprenderás a desarrollar tu idea de negocio paso a paso.",
    "Nuestros mentores te acompañarán en cada etapa del proceso.",
    "¡Empecemos juntos este emocionante viaje emprendedor!"
  ];

  const features = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Mentoría Personalizada",
      description: "Recibe orientación de expertos que entienden tus necesidades específicas"
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Desarrollo de Ideas",
      description: "Transforma tu idea en un plan de negocio sólido y viable"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Producto Mínimo Viable",
      description: "Aprende a crear tu primer prototipo para validar tu idea"
    }
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 ${highContrast ? 'high-contrast' : ''} ${largeText ? 'large-text' : ''}`}>
      <AccessibilityToolbar
        onToggleHighContrast={() => setHighContrast(!highContrast)}
        onToggleLargeText={() => setLargeText(!largeText)}
        onToggleAudio={() => setAudioEnabled(!audioEnabled)}
        onToggleVoiceControl={() => setVoiceControlEnabled(!voiceControlEnabled)}
        highContrast={highContrast}
        largeText={largeText}
        audioEnabled={audioEnabled}
        voiceControlEnabled={voiceControlEnabled}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent mb-6">
            AS Emprende
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Tu plataforma inclusiva para desarrollar ideas de negocio con accesibilidad total
          </p>
        </div>

        {/* Welcome Video */}
        <div className="max-w-4xl mx-auto mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <VideoWithLSB
            title="Video de Bienvenida"
            description="Te damos la bienvenida a AS Emprende, donde tu discapacidad no es un límite para emprender. Nuestros mentores especializados te guiarán paso a paso para convertir tu idea en realidad."
            subtitles={welcomeSubtitles}
            onAudioPlay={() => speakText("Reproduciendo video de bienvenida con intérprete de lengua de señas boliviana")}
          />
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300 animate-fade-in-up"
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              <div className="text-primary mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ¿Listo para empezar?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Te acompañaremos desde tu primera idea hasta la creación de tu producto mínimo viable
            </p>
            
            <Button
              onClick={() => {
                speakText("Iniciando tu jornada emprendedora");
                onStart();
              }}
              size="lg"
              className="btn-accessible bg-gradient-to-r from-green-600 to-purple-600 hover:from-green-700 hover:to-purple-700 text-white px-8 py-4 text-xl font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto"
              aria-label="Comenzar el proceso de desarrollo de tu idea de negocio"
            >
              Comenzar Ahora
              <ArrowRight className="h-6 w-6" />
            </Button>

            {voiceControlEnabled && (
              <p className="text-sm text-gray-500 mt-4">
                💡 Tip: Puedes decir "Comenzar" para iniciar
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500">
          <p>Una iniciativa de 2Gether International para el emprendimiento inclusivo en Bolivia</p>
        </div>
      </div>
    </div>
  );
};
