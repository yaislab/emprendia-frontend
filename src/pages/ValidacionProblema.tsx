import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { VideoWithLSB } from '@/components/VideoWithLSB';
import { AccessibilityToolbar } from '@/components/AccessibilityToolbar';
import { ArrowRight, ArrowLeft, HelpCircle } from 'lucide-react';

const tutorialSubtitles = [
  "Ahora vamos a validar el problema que tu idea busca resolver.",
  "Piensa en quiénes tienen ese problema y por qué es importante solucionarlo.",
  "Describe el problema de la forma más clara y sencilla posible.",
  "Puedes escribirlo o usar el micrófono si lo prefieres."
];

const ejemplosProblema = [
  "Las personas sordas en Bolivia no encuentran intérpretes de LSB fácilmente para trámites importantes.",
  "Muchos estudiantes con discapacidad visual no pueden acceder a materiales educativos accesibles.",
  "Emprendedores con movilidad reducida tienen dificultades para asistir a ferias presenciales.",
];

export const ValidacionProblema: React.FC = () => {
  const [problema, setProblema] = useState('');
  const [showHelp, setShowHelp] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const navigate = (window as any).navigate || ((url: string) => { window.location.href = url; });

  return (
    <div className={`min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-8 ${highContrast ? 'high-contrast' : ''} ${largeText ? 'large-text' : ''}`}>
      <AccessibilityToolbar
        onToggleHighContrast={() => setHighContrast(!highContrast)}
        onToggleLargeText={() => setLargeText(!largeText)}
        onToggleAudio={() => setAudioEnabled(!audioEnabled)}
        onToggleVoiceControl={() => {}}
        highContrast={highContrast}
        largeText={largeText}
        audioEnabled={audioEnabled}
        voiceControlEnabled={false}
      />
      <div className="container mx-auto px-4">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">2</div>
              <div className="w-16 h-1 bg-primary"></div>
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">3</div>
              <div className="w-16 h-1 bg-gray-300"></div>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold">4</div>
            </div>
          </div>
          <p className="text-center text-gray-600">Paso 2 de 7: Validación del Problema</p>
        </div>

        {/* Tutorial Video */}
        <div className="max-w-4xl mx-auto mb-8">
          <VideoWithLSB
            title="¿Cómo validar el problema?"
            description="En este video aprenderás a identificar y describir claramente el problema que tu idea busca resolver."
            subtitles={tutorialSubtitles}
          />
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <HelpCircle className="h-16 w-16 text-purple-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Describe el problema que quieres resolver
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Explica a quién afecta y por qué es importante. Sé claro y usa tus propias palabras.
              </p>
            </div>

            {/* Ejemplos */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Ejemplos de problemas:</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {ejemplosProblema.map((ejemplo, index) => (
                  <div key={index} className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
                    <p className="text-gray-700">{ejemplo}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="space-y-6">
              <div>
                <label htmlFor="problema-textarea" className="block text-lg font-semibold text-gray-900 mb-3">
                  Escribe el problema aquí:
                </label>
                <Textarea
                  id="problema-textarea"
                  value={problema}
                  onChange={(e) => setProblema(e.target.value)}
                  placeholder="Describe el problema que tu idea busca resolver..."
                  className="min-h-32 text-lg p-4 border-2 border-gray-300 focus:border-primary rounded-lg"
                  aria-describedby="problema-help"
                />
                <p id="problema-help" className="text-sm text-gray-500 mt-2">
                  Mínimo 10 palabras. Puedes usar el micrófono si prefieres dictar el problema.
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t">
              <Button
                onClick={() => navigate('/idea')}
                variant="outline"
                className="btn-accessible flex items-center gap-2"
                aria-label="Volver a la presentación de idea"
              >
                <ArrowLeft className="h-4 w-4" />
                Volver
              </Button>

              <Button
                onClick={() => navigate('/cliente')}
                disabled={problema.trim().length < 10}
                className="btn-accessible bg-primary hover:bg-primary/90 flex items-center gap-2"
                aria-label="Continuar al siguiente paso: perfil del cliente"
              >
                Continuar
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            {problema.trim().length < 10 && problema.length > 0 && (
              <p className="text-amber-600 text-center mt-4" role="alert">
                Por favor, describe el problema con al menos 10 palabras para continuar.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidacionProblema; 