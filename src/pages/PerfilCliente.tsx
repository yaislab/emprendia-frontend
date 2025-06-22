import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { VideoWithLSB } from '@/components/VideoWithLSB';
import { AccessibilityToolbar } from '@/components/AccessibilityToolbar';
import { ArrowRight, ArrowLeft, Users } from 'lucide-react';

const tutorialSubtitles = [
  "Ahora vamos a definir quién es tu cliente ideal.",
  "Piensa en la edad, ocupación, intereses y necesidades de la persona que más se beneficiaría de tu solución.",
  "Describe a tu cliente de la forma más clara y sencilla posible.",
  "Puedes escribirlo o usar el micrófono si lo prefieres."
];

const ejemplosCliente = [
  "Jóvenes sordos de 18 a 30 años que buscan empleo y necesitan intérpretes de LSB.",
  "Madres con discapacidad visual que desean acceder a cursos en línea accesibles.",
  "Emprendedores con movilidad reducida interesados en vender productos desde casa.",
];

export const PerfilCliente: React.FC = () => {
  const [cliente, setCliente] = useState('');
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const navigate = (window as any).navigate || ((url: string) => { window.location.href = url; });

  return (
    <div className={`min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-8 ${highContrast ? 'high-contrast' : ''} ${largeText ? 'large-text' : ''}`}>
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
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">3</div>
              <div className="w-16 h-1 bg-primary"></div>
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">4</div>
              <div className="w-16 h-1 bg-gray-300"></div>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold">5</div>
            </div>
          </div>
          <p className="text-center text-gray-600">Paso 3 de 7: Perfil del Cliente</p>
        </div>

        {/* Tutorial Video */}
        <div className="max-w-4xl mx-auto mb-8">
          <VideoWithLSB
            title="¿Cómo definir el cliente ideal?"
            description="En este video aprenderás a identificar y describir a la persona que más se beneficiará de tu solución."
            subtitles={tutorialSubtitles}
          />
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <Users className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Describe a tu cliente ideal
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Explica quién es, qué necesita y por qué tu solución es importante para esa persona.
              </p>
            </div>

            {/* Ejemplos */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Ejemplos de clientes:</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {ejemplosCliente.map((ejemplo, index) => (
                  <div key={index} className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                    <p className="text-gray-700">{ejemplo}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="space-y-6">
              <div>
                <label htmlFor="cliente-textarea" className="block text-lg font-semibold text-gray-900 mb-3">
                  Escribe el perfil de tu cliente aquí:
                </label>
                <Textarea
                  id="cliente-textarea"
                  value={cliente}
                  onChange={(e) => setCliente(e.target.value)}
                  placeholder="Describe a tu cliente ideal..."
                  className="min-h-32 text-lg p-4 border-2 border-gray-300 focus:border-primary rounded-lg"
                  aria-describedby="cliente-help"
                />
                <p id="cliente-help" className="text-sm text-gray-500 mt-2">
                  Mínimo 10 palabras. Puedes usar el micrófono si prefieres dictar el perfil.
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t">
              <Button
                onClick={() => navigate('/problema')}
                variant="outline"
                className="btn-accessible flex items-center gap-2"
                aria-label="Volver a la validación del problema"
              >
                <ArrowLeft className="h-4 w-4" />
                Volver
              </Button>

              <Button
                onClick={() => navigate('/propuesta')}
                disabled={cliente.trim().length < 10}
                className="btn-accessible bg-primary hover:bg-primary/90 flex items-center gap-2"
                aria-label="Continuar al siguiente paso: propuesta de valor"
              >
                Continuar
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            {cliente.trim().length < 10 && cliente.length > 0 && (
              <p className="text-amber-600 text-center mt-4" role="alert">
                Por favor, describe el perfil de tu cliente con al menos 10 palabras para continuar.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilCliente; 