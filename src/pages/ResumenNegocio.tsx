import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { VideoWithLSB } from '@/components/VideoWithLSB';
import { AccessibilityToolbar } from '@/components/AccessibilityToolbar';
import { ArrowLeft, FileText, CheckCircle } from 'lucide-react';

const tutorialSubtitles = [
  "¡Felicidades! Has llegado al resumen de tu negocio.",
  "Aquí verás un resumen visual de tu idea, cliente, propuesta de valor y próximos pasos.",
  "Puedes escuchar el resumen en voz alta o descargarlo próximamente.",
  "Revisa todo y si necesitas, vuelve a editar algún paso."
];

const resumenEjemplo = {
  idea: 'Plataforma accesible para formación de emprendedores con discapacidad.',
  cliente: 'Personas sordas y con discapacidad en Bolivia, interesadas en emprender.',
  propuesta: 'Ofrecemos mentoría, recursos en LSB, subtítulos y herramientas inclusivas para crear negocios.',
  pasos: 'Validar el problema, definir el cliente, construir el MVP y recibir retroalimentación de IA.',
};

export const ResumenNegocio: React.FC = () => {
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const navigate = (window as any).navigate || ((url: string) => { window.location.href = url; });

  const resumenTexto = `Idea principal: ${resumenEjemplo.idea}. Cliente clave: ${resumenEjemplo.cliente}. Propuesta de valor: ${resumenEjemplo.propuesta}. Próximos pasos: ${resumenEjemplo.pasos}.`;

  const speakText = (text: string) => {
    if ('speechSynthesis' in window && audioEnabled) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-yellow-50 via-white to-green-50 py-8 ${highContrast ? 'high-contrast' : ''} ${largeText ? 'large-text' : ''}`}>
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
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">7</div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <p className="text-center text-gray-600">Paso 7 de 7: Resumen Visual del Negocio</p>
        </div>

        {/* Tutorial Video */}
        <div className="max-w-4xl mx-auto mb-8">
          <VideoWithLSB
            title="¿Cómo revisar tu resumen de negocio?"
            description="En este video aprenderás a interpretar el resumen visual y los próximos pasos para tu emprendimiento."
            subtitles={tutorialSubtitles}
          />
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <FileText className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Resumen Visual del Negocio
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Revisa la información clave de tu proyecto. Puedes escuchar el resumen o volver a editar algún paso si lo necesitas.
              </p>
            </div>

            {/* Resumen visual */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-100 rounded-xl p-6 shadow flex flex-col items-center">
                <FileText className="h-8 w-8 text-blue-600 mb-2" />
                <h3 className="font-bold text-lg mb-2 text-blue-900">Idea Principal</h3>
                <p className="text-gray-800 text-center">{resumenEjemplo.idea}</p>
              </div>
              <div className="bg-green-100 rounded-xl p-6 shadow flex flex-col items-center">
                <FileText className="h-8 w-8 text-green-600 mb-2" />
                <h3 className="font-bold text-lg mb-2 text-green-900">Cliente Clave</h3>
                <p className="text-gray-800 text-center">{resumenEjemplo.cliente}</p>
              </div>
              <div className="bg-purple-100 rounded-xl p-6 shadow flex flex-col items-center">
                <FileText className="h-8 w-8 text-purple-600 mb-2" />
                <h3 className="font-bold text-lg mb-2 text-purple-900">Propuesta de Valor</h3>
                <p className="text-gray-800 text-center">{resumenEjemplo.propuesta}</p>
              </div>
              <div className="bg-yellow-100 rounded-xl p-6 shadow flex flex-col items-center">
                <FileText className="h-8 w-8 text-yellow-600 mb-2" />
                <h3 className="font-bold text-lg mb-2 text-yellow-900">Próximos Pasos</h3>
                <p className="text-gray-800 text-center">{resumenEjemplo.pasos}</p>
              </div>
            </div>
            <div className="flex justify-center mb-4">
              <Button
                onClick={() => speakText(resumenTexto)}
                size="lg"
                className="bg-gradient-to-r from-green-600 to-purple-600 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:scale-105 transition-all flex items-center gap-2"
                aria-label="Escuchar resumen del negocio"
              >
                Escuchar Resumen
              </Button>
            </div>
            <div className="flex justify-center mb-4">
              <Button
                onClick={() => navigate('/feedback')}
                variant="outline"
                className="btn-accessible flex items-center gap-2"
                aria-label="Volver a la retroalimentación de IA"
              >
                <ArrowLeft className="h-4 w-4" />
                Volver
              </Button>
            </div>
            <div className="text-center text-gray-500 text-sm">
              <p>¿Necesitas descargar este resumen? (Funcionalidad de PDF accesible próximamente)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumenNegocio; 