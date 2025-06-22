import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { VideoWithLSB } from '@/components/VideoWithLSB';
import { AccessibilityToolbar } from '@/components/AccessibilityToolbar';
import { ArrowRight, ArrowLeft, Star } from 'lucide-react';

const tutorialSubtitles = [
  "Ahora vamos a definir tu propuesta de valor.",
  "Piensa en qué hace única tu solución y por qué los clientes la elegirían.",
  "Describe los beneficios clave y cómo resuelves el problema mejor que otros.",
  "Puedes escribirlo o usar el micrófono si lo prefieres."
];

const ejemplosPropuesta = [
  "Nuestra app conecta a personas sordas con intérpretes de LSB en tiempo real, algo que no existe actualmente en Bolivia.",
  "Ofrecemos cursos en línea con materiales accesibles y tutores capacitados en discapacidad visual, garantizando inclusión total.",
  "Creamos una tienda virtual donde emprendedores con movilidad reducida pueden vender sin salir de casa, con soporte logístico personalizado."
];

export const PropuestaValor: React.FC = () => {
  const [propuesta, setPropuesta] = useState('');
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const navigate = (window as any).navigate || ((url: string) => { window.location.href = url; });

  return (
    <div className={`min-h-screen bg-gradient-to-br from-yellow-50 via-white to-purple-50 py-8 ${highContrast ? 'high-contrast' : ''} ${largeText ? 'large-text' : ''}`}>
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
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">4</div>
              <div className="w-16 h-1 bg-primary"></div>
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">5</div>
              <div className="w-16 h-1 bg-gray-300"></div>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold">6</div>
            </div>
          </div>
          <p className="text-center text-gray-600">Paso 4 de 7: Propuesta de Valor</p>
        </div>

        {/* Tutorial Video */}
        <div className="max-w-4xl mx-auto mb-8">
          <VideoWithLSB
            title="¿Cómo definir tu propuesta de valor?"
            description="En este video aprenderás a identificar y comunicar claramente qué hace única tu solución."
            subtitles={tutorialSubtitles}
          />
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <Star className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Escribe tu propuesta de valor
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Explica qué te hace diferente, cómo resuelves el problema y por qué los clientes deberían elegirte.
              </p>
            </div>

            {/* Ejemplos */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Ejemplos de propuesta de valor:</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {ejemplosPropuesta.map((ejemplo, index) => (
                  <div key={index} className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                    <p className="text-gray-700">{ejemplo}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="space-y-6">
              <div>
                <label htmlFor="propuesta-textarea" className="block text-lg font-semibold text-gray-900 mb-3">
                  Escribe tu propuesta de valor aquí:
                </label>
                <Textarea
                  id="propuesta-textarea"
                  value={propuesta}
                  onChange={(e) => setPropuesta(e.target.value)}
                  placeholder="Describe tu propuesta de valor..."
                  className="min-h-32 text-lg p-4 border-2 border-gray-300 focus:border-primary rounded-lg"
                  aria-describedby="propuesta-help"
                />
                <p id="propuesta-help" className="text-sm text-gray-500 mt-2">
                  Mínimo 10 palabras. Puedes usar el micrófono si prefieres dictar la propuesta.
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t">
              <Button
                onClick={() => navigate('/cliente')}
                variant="outline"
                className="btn-accessible flex items-center gap-2"
                aria-label="Volver al perfil del cliente"
              >
                <ArrowLeft className="h-4 w-4" />
                Volver
              </Button>

              <Button
                onClick={() => navigate('/mvp')}
                disabled={propuesta.trim().length < 10}
                className="btn-accessible bg-primary hover:bg-primary/90 flex items-center gap-2"
                aria-label="Continuar al siguiente paso: construcción del MVP"
              >
                Continuar
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            {propuesta.trim().length < 10 && propuesta.length > 0 && (
              <p className="text-amber-600 text-center mt-4" role="alert">
                Por favor, describe tu propuesta de valor con al menos 10 palabras para continuar.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropuestaValor; 