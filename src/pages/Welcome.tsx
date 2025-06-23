import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { VideoWithLSB } from '@/components/VideoWithLSB';
import { AccessibilityToolbar } from '@/components/AccessibilityToolbar';
import { ArrowRight, Users, Lightbulb, Target, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export const Welcome: React.FC = () => {
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [voiceControlEnabled, setVoiceControlEnabled] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const navigate = useNavigate();

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

      {/* Modal de tutorial de instalación */}
      <Dialog open={showTutorial} onOpenChange={setShowTutorial}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Cómo instalar la app móvil en Android?</DialogTitle>
            <DialogDescription>
              <div>
                <div className="mb-2">Sigue estos pasos:</div>
                <ol className="list-decimal pl-5 space-y-2 text-left">
                  <li>Haz clic en el botón <b>Abrir carpeta de descargas (APK)</b> y accede a Google Drive si es necesario.</li>
                  <li>Descarga la <b>versión más reciente</b> del archivo APK desde la carpeta de Google Drive en tu dispositivo Android.</li>
                  <li>Cuando termine la descarga, abre el archivo APK desde la barra de notificaciones o la carpeta de descargas.</li>
                  <li>Si es la primera vez que instalas una app fuera de Google Play, tu teléfono te pedirá permiso para instalar apps de "orígenes desconocidos". Acepta y sigue las instrucciones.</li>
                  <li>Confirma la instalación. ¡Listo! Ya puedes abrir la app desde tu menú de aplicaciones.</li>
                </ol>
                <div className="mt-4 text-sm text-gray-600">
                  <b>Nota:</b> Descarga siempre la versión más reciente del archivo APK en la carpeta de Google Drive. Si tienes dudas, puedes pedir ayuda a un familiar o amigo, o contactarnos para soporte. Puede requerir iniciar sesión con tu cuenta de Google.
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setShowTutorial(false)} autoFocus>
              Entendido
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
            emprendIA
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transformando ideas inclusivas en negocios de impacto con el poder de la IA
          </p>
        </div>

        {/* Welcome Video */}
        <div className="max-w-4xl mx-auto mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <VideoWithLSB
            title="Bienvenido a emprendIA"
            description="Te damos la bienvenida a emprendIA, donde tu discapacidad no es un límite para emprender. Nuestros mentores especializados te guiarán paso a paso para convertir tu idea en realidad."
            subtitles={welcomeSubtitles}
            onAudioPlay={() => speakText("Reproduciendo video de bienvenida con intérprete de lengua de señas boliviana")}
            videoUrl="https://www.youtube.com/embed/NJS9TQqFUvs"
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

            {/* Botón de descarga de la app móvil con instrucciones accesibles */}
            <div className="mb-6 flex flex-col items-center gap-2">
              <Button
                asChild
                size="lg"
                className="btn-accessible bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-xl font-semibold rounded-xl shadow-lg hover:shadow-xl flex items-center gap-3"
                aria-label="Abrir carpeta de descargas de la app móvil para Android (APK)"
              >
                <a
                  href="https://drive.google.com/drive/folders/1bduWOwClz8nSjOV6WigWut7449pP1JzQ?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Smartphone className="h-7 w-7" />
                  Abrir carpeta de descargas (APK)
                </a>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="mt-1"
                onClick={() => setShowTutorial(true)}
                aria-label="¿Cómo instalar la app móvil?"
              >
                ¿Cómo instalar la app?
              </Button>
              <span className="text-gray-500 text-sm max-w-md text-center">
                Versión de prueba. Descarga siempre la versión más reciente del APK desde la carpeta de Google Drive. Puede requerir iniciar sesión con Google para acceder.
              </span>
            </div>
            
            <Button
              onClick={() => {
                speakText("Iniciando tu jornada emprendedora");
                navigate('/idea');
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
          <p>Una iniciativa de YAIS para el emprendimiento inclusivo en Bolivia</p>
        </div>
      </div>
    </div>
  );
};