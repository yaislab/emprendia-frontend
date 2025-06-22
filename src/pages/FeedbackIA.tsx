import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { VideoWithLSB } from '@/components/VideoWithLSB';
import { AccessibilityToolbar } from '@/components/AccessibilityToolbar';
import { ArrowRight, ArrowLeft, MessageCircle } from 'lucide-react';

const tutorialSubtitles = [
  "Ahora recibirás retroalimentación de la IA sobre tu MVP y próximos pasos.",
  "Puedes hacer preguntas o pedir sugerencias para mejorar tu proyecto.",
  "La IA te responderá con consejos y recomendaciones personalizadas.",
  "Escribe tu mensaje o usa el micrófono si lo prefieres."
];

const ejemplosMensajes = [
  "¿Qué puedo mejorar en mi propuesta de valor?",
  "¿Cómo puedo validar mi MVP con clientes reales?",
  "¿Qué canales de venta me recomiendas para mi producto?"
];

const mensajesIA = [
  '¡Bien hecho! Has completado la etapa anterior. Ahora revisa tu propuesta y piensa en cómo podrías mejorarla.',
  'Recuerda: un MVP debe ser simple y funcional. ¿Qué es lo más importante que tu cliente necesita probar?',
  '¿Te gustaría recibir sugerencias para tu plan de ventas o marketing?',
];

export const FeedbackIA: React.FC = () => {
  const [mensajes, setMensajes] = useState([
    { autor: 'ia', texto: mensajesIA[0] },
  ]);
  const [input, setInput] = useState('');
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [paso, setPaso] = useState(0);
  const navigate = (window as any).navigate || ((url: string) => { window.location.href = url; });

  const enviarMensaje = () => {
    if (!input.trim()) return;
    setMensajes([...mensajes, { autor: 'usuario', texto: input }]);
    setInput('');
    // Simula respuesta de IA
    if (paso < mensajesIA.length - 1) {
      setTimeout(() => {
        setMensajes(m => [...m, { autor: 'ia', texto: mensajesIA[paso + 1] }]);
        setPaso(paso + 1);
      }, 1000);
    } else {
      setTimeout(() => navigate('/resumen'), 1500);
    }
  };

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
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">6</div>
              <div className="w-16 h-1 bg-primary"></div>
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">7</div>
            </div>
          </div>
          <p className="text-center text-gray-600">Paso 6 de 7: Retroalimentación de IA</p>
        </div>

        {/* Tutorial Video */}
        <div className="max-w-4xl mx-auto mb-8">
          <VideoWithLSB
            title="¿Cómo recibir feedback de la IA?"
            description="En este video aprenderás a interactuar con la IA para obtener sugerencias y mejorar tu proyecto."
            subtitles={tutorialSubtitles}
          />
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <MessageCircle className="h-16 w-16 text-purple-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Chatea con la IA mentora
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Escribe tus dudas o pide sugerencias. La IA te responderá para ayudarte a mejorar tu negocio.
              </p>
            </div>

            {/* Ejemplos */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Ejemplos de mensajes:</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {ejemplosMensajes.map((ejemplo, index) => (
                  <div key={index} className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
                    <p className="text-gray-700">{ejemplo}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat */}
            <div className="flex-1 overflow-y-auto mb-4 space-y-4" style={{ minHeight: 200 }}>
              {mensajes.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.autor === 'ia' ? 'justify-start' : 'justify-end'}`}>
                  <div className={`rounded-2xl px-4 py-3 max-w-[80%] shadow-md ${msg.autor === 'ia' ? 'bg-blue-100 text-gray-900' : 'bg-green-100 text-gray-900'}`}>
                    <span>{msg.texto}</span>
                  </div>
                </div>
              ))}
            </div>
            <form
              className="flex gap-2 mt-2"
              onSubmit={e => {
                e.preventDefault();
                enviarMensaje();
              }}
            >
              <input
                className="flex-1 rounded-lg border border-gray-300 p-3 text-base focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Escribe tu respuesta o pregunta..."
                value={input}
                onChange={e => setInput(e.target.value)}
                aria-label="Mensaje para la IA"
                autoComplete="off"
              />
              <Button
                type="submit"
                size="lg"
                className="bg-gradient-to-r from-green-600 to-purple-600 text-white px-6 py-3 text-lg font-semibold rounded-xl shadow-lg hover:scale-105 transition-all"
                aria-label="Enviar mensaje"
                disabled={!input.trim()}
              >
                Enviar
              </Button>
            </form>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t">
              <Button
                onClick={() => navigate('/mvp')}
                variant="outline"
                className="btn-accessible flex items-center gap-2"
                aria-label="Volver a la construcción del MVP"
              >
                <ArrowLeft className="h-4 w-4" />
                Volver
              </Button>

              <Button
                onClick={() => navigate('/resumen')}
                className="btn-accessible bg-primary hover:bg-primary/90 flex items-center gap-2"
                aria-label="Ir al resumen final"
                disabled={mensajes.length < 2}
              >
                Finalizar
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            {mensajes.length < 2 && (
              <p className="text-amber-600 text-center mt-4" role="alert">
                Envía al menos un mensaje para finalizar y ver el resumen.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackIA; 