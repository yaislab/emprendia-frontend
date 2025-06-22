import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { VideoWithLSB } from '@/components/VideoWithLSB';
import { AccessibilityToolbar } from '@/components/AccessibilityToolbar';
import { ArrowRight, ArrowLeft, Layout } from 'lucide-react';

const tutorialSubtitles = [
  "Ahora vas a construir un prototipo mínimo de tu producto o servicio.",
  "Elige los componentes básicos que mostrarán cómo funciona tu idea.",
  "No necesitas que sea perfecto, solo que transmita la esencia de tu solución.",
  "Puedes seleccionar botones, textos o imágenes para armar tu MVP visual."
];

const ejemplosMVP = [
  "Una app con una pantalla de inicio, un botón de solicitar intérprete y un chat básico.",
  "Un curso online con una página de bienvenida, un video accesible y un botón de inscripción.",
  "Una tienda virtual con una galería de productos, botón de compra y sección de contacto."
];

const componentes = [
  { tipo: 'Botón', descripcion: 'Agrega un botón grande para acciones importantes.' },
  { tipo: 'Texto', descripcion: 'Incluye un área de texto para instrucciones o información.' },
  { tipo: 'Imagen', descripcion: 'Añade una imagen ilustrativa o logo.' },
];

export const ConstruccionMVP: React.FC = () => {
  const [seleccionados, setSeleccionados] = useState<string[]>([]);
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const navigate = (window as any).navigate || ((url: string) => { window.location.href = url; });

  const toggleComponente = (tipo: string) => {
    setSeleccionados(prev =>
      prev.includes(tipo) ? prev.filter(t => t !== tipo) : [...prev, tipo]
    );
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8 ${highContrast ? 'high-contrast' : ''} ${largeText ? 'large-text' : ''}`}>
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
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">5</div>
              <div className="w-16 h-1 bg-primary"></div>
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">6</div>
              <div className="w-16 h-1 bg-gray-300"></div>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold">7</div>
            </div>
          </div>
          <p className="text-center text-gray-600">Paso 5 de 7: Construcción del MVP</p>
        </div>

        {/* Tutorial Video */}
        <div className="max-w-4xl mx-auto mb-8">
          <VideoWithLSB
            title="¿Cómo construir tu MVP?"
            description="En este video aprenderás a seleccionar los elementos clave para mostrar cómo funciona tu idea."
            subtitles={tutorialSubtitles}
          />
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <Layout className="h-16 w-16 text-blue-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Selecciona los componentes de tu MVP
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Elige los elementos que mejor representen tu producto o servicio. Puedes combinar varios.
              </p>
            </div>

            {/* Ejemplos */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Ejemplos de MVP:</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {ejemplosMVP.map((ejemplo, index) => (
                  <div key={index} className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                    <p className="text-gray-700">{ejemplo}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Componentes seleccionables */}
            <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {componentes.map((comp) => (
                <div
                  key={comp.tipo}
                  className={`rounded-xl border-2 p-4 flex flex-col items-center gap-3 shadow-md transition-all ${seleccionados.includes(comp.tipo) ? 'border-primary bg-blue-50' : 'border-gray-200 bg-white'}`}
                >
                  <span className="font-semibold text-gray-900 text-lg">{comp.tipo}</span>
                  <p className="text-gray-600 text-sm text-center">{comp.descripcion}</p>
                  <Button
                    onClick={() => toggleComponente(comp.tipo)}
                    size="lg"
                    className={`w-full mt-2 ${seleccionados.includes(comp.tipo) ? 'bg-gradient-to-r from-green-600 to-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                    aria-label={seleccionados.includes(comp.tipo) ? `Quitar ${comp.tipo}` : `Agregar ${comp.tipo}`}
                  >
                    {seleccionados.includes(comp.tipo) ? 'Quitar' : 'Agregar'}
                  </Button>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t">
              <Button
                onClick={() => navigate('/propuesta')}
                variant="outline"
                className="btn-accessible flex items-center gap-2"
                aria-label="Volver a la propuesta de valor"
              >
                <ArrowLeft className="h-4 w-4" />
                Volver
              </Button>

              <Button
                onClick={() => navigate('/feedback')}
                disabled={seleccionados.length === 0}
                className="btn-accessible bg-primary hover:bg-primary/90 flex items-center gap-2"
                aria-label="Continuar al siguiente paso: retroalimentación de IA"
              >
                Continuar
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            {seleccionados.length === 0 && (
              <p className="text-amber-600 text-center mt-4" role="alert">
                Selecciona al menos un componente para continuar.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConstruccionMVP; 