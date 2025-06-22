
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { VoiceInput } from '@/components/VoiceInput';
import { VideoWithLSB } from '@/components/VideoWithLSB';
import { ArrowRight, ArrowLeft, Lightbulb } from 'lucide-react';

interface IdeaPresentationProps {
  onNext: (idea: string) => void;
  onBack: () => void;
}

export const IdeaPresentation: React.FC<IdeaPresentationProps> = ({ onNext, onBack }) => {
  const [idea, setIdea] = useState('');
  const [showVoiceInput, setShowVoiceInput] = useState(false);

  const handleVoiceInput = (voiceText: string) => {
    setIdea(voiceText);
    setShowVoiceInput(false);
  };

  const tutorialSubtitles = [
    "¡Hola emprendedor/a! Es momento de compartir tu idea de negocio.",
    "Piensa en algo que te apasione o en un problema que hayas identificado.",
    "No te preocupes por los detalles, solo describe lo que tienes en mente.",
    "Puedes escribir tu idea o usar el micrófono para dictarla."
  ];

  const examples = [
    "Una aplicación móvil para conectar personas sordas con intérpretes de LSB",
    "Un servicio de delivery adaptado para personas con movilidad reducida",
    "Una plataforma de cursos en línea con contenido accesible para personas ciegas",
    "Un restaurante inclusivo con menús en braille y personal capacitado en LSB"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-8">
      <div className="container mx-auto px-4">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">1</div>
              <div className="w-16 h-1 bg-primary"></div>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold">2</div>
              <div className="w-16 h-1 bg-gray-300"></div>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold">3</div>
            </div>
          </div>
          <p className="text-center text-gray-600">Paso 1 de 7: Presenta tu idea</p>
        </div>

        {/* Tutorial Video */}
        <div className="max-w-4xl mx-auto mb-8">
          <VideoWithLSB
            title="Cómo presentar tu idea de negocio"
            description="En este video aprenderás a describir tu idea de manera clara y efectiva. Nuestro mentor te guiará sobre qué aspectos incluir y cómo organizar tus pensamientos para que tu propuesta sea comprensible."
            subtitles={tutorialSubtitles}
          />
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <Lightbulb className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Comparte tu idea de negocio
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Describe tu idea en tus propias palabras. No importa si aún no está completamente desarrollada, 
                lo importante es que compartas lo que tienes en mente.
              </p>
            </div>

            {/* Examples */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Ejemplos de ideas:</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {examples.map((example, index) => (
                  <div key={index} className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                    <p className="text-gray-700">{example}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="space-y-6">
              <div>
                <label htmlFor="idea-textarea" className="block text-lg font-semibold text-gray-900 mb-3">
                  Escribe tu idea aquí:
                </label>
                <Textarea
                  id="idea-textarea"
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  placeholder="Describe tu idea de negocio... Por ejemplo: 'Quiero crear una aplicación que ayude a las personas sordas a...'"
                  className="min-h-32 text-lg p-4 border-2 border-gray-300 focus:border-primary rounded-lg"
                  aria-describedby="idea-help"
                />
                <p id="idea-help" className="text-sm text-gray-500 mt-2">
                  Mínimo 10 palabras. Puedes usar el micrófono si prefieres dictar tu idea.
                </p>
              </div>

              {/* Voice Input Toggle */}
              <div className="text-center">
                <Button
                  onClick={() => setShowVoiceInput(!showVoiceInput)}
                  variant="outline"
                  className="btn-accessible"
                  aria-label="Activar entrada por voz para dictar tu idea"
                >
                  {showVoiceInput ? 'Ocultar micrófono' : 'Usar micrófono'}
                </Button>
              </div>

              {/* Voice Input Component */}
              {showVoiceInput && (
                <div className="bg-gray-50 p-6 rounded-lg">
                  <VoiceInput
                    onVoiceInput={handleVoiceInput}
                    placeholder="Presiona el micrófono y describe tu idea de negocio..."
                  />
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t">
              <Button
                onClick={onBack}
                variant="outline"
                className="btn-accessible flex items-center gap-2"
                aria-label="Volver a la página de bienvenida"
              >
                <ArrowLeft className="h-4 w-4" />
                Volver
              </Button>

              <Button
                onClick={() => onNext(idea)}
                disabled={idea.trim().length < 10}
                className="btn-accessible bg-primary hover:bg-primary/90 flex items-center gap-2"
                aria-label="Continuar al siguiente paso: validación del problema"
              >
                Continuar
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            {idea.trim().length < 10 && idea.length > 0 && (
              <p className="text-amber-600 text-center mt-4" role="alert">
                Por favor, describe tu idea con al menos 10 palabras para continuar.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
