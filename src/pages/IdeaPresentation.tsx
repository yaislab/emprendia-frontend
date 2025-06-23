import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { VideoWithLSB } from '@/components/VideoWithLSB';
import { ArrowRight, ArrowLeft, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AccessibilityToolbar } from '@/components/AccessibilityToolbar';
import SignCamera from '@/components/SignCamera';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction
} from '@/components/ui/alert-dialog';
import { VoiceButton } from '@/components/VoiceButton';

export const IdeaPresentation: React.FC = () => {
  const [idea, setIdea] = useState('');
  const voiceSessionBaseText = useRef('');
  const [partialIdea, setPartialIdea] = useState('');
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [voiceControlEnabled, setVoiceControlEnabled] = useState(false);
  const [signCameraEnabled, setSignCameraEnabled] = useState(false);
  const [showSignGemmaDialog, setShowSignGemmaDialog] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

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

  // Simulación de traducción de señas a texto usando SignGemma
  const handleSignCameraClose = () => {
    setSignCameraEnabled(false);
    setIdea(
      'Quiero crear una aplicación que ayude a las personas sordas a comunicarse fácilmente con intérpretes de LSB en Bolivia.'
    );
    setShowSignGemmaDialog(true);
  };

  const handleVoiceStart = () => {
    setPartialIdea('');
  };

  const handleVoiceResult = (text: string) => {
    setIdea(prev => [prev.trim(), text].filter(Boolean).join(' ') + ' ');
    setPartialIdea('');
  };

  const handlePartialResult = (text: string) => {
    setPartialIdea(text);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setIdea(newText);
    voiceSessionBaseText.current = newText;
  };

  useEffect(() => {
    console.log({
      idea,
      partialIdea,
    });
  }, [idea, partialIdea]);

  return (
    <div className={`min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-8 ${highContrast ? 'high-contrast' : ''} ${largeText ? 'large-text' : ''}`}>
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
      <SignCamera enabled={signCameraEnabled} onClose={handleSignCameraClose} />
      <AlertDialog open={showSignGemmaDialog} onOpenChange={setShowSignGemmaDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Simulación de traducción de señas a texto</AlertDialogTitle>
            <AlertDialogDescription>
              <span className="block mb-2">
                <strong>¡Simulación exitosa!</strong> El texto en el área "Escribe tu idea aquí" fue generado automáticamente a partir de una seña capturada por la cámara.<br/>
              </span>
              <span className="text-sm text-gray-700 block mb-2">
                <strong>Nota:</strong> Esta funcionalidad es una <u>demo conceptual</u>. En el futuro, podrás comunicarte en Lengua de Señas Boliviana (LSB) y ver la traducción automática a texto en tiempo real, gracias a modelos abiertos como <a href="https://blog.google/technology/developers/google-ai-developer-updates-io-2025/" target="_blank" rel="noopener noreferrer" className="underline font-semibold">SignGemma de Google</a>.<br/>
                SignGemma es una tecnología de inteligencia artificial desarrollada por Google para traducir lenguaje de señas a texto y voz en tiempo real.<br/>
                También puedes ver el video oficial de Google DeepMind sobre SignGemma en <a href="https://x.com/GoogleDeepMind/status/1927375853551235160?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1927375853551235160%7Ctwgr%5E98806dc06fae5d5e00de05bc40402c18515d3d0b%7Ctwcon%5Es1_&ref_url=https%3A%2F%2Fwww.gadgets360.com%2Fai%2Fnews%2Fgoogle-signgemma-ai-model-translate-sign-language-to-spoken-text-unveiled-8537400" target="_blank" rel="noopener noreferrer" className="underline font-semibold">X (Twitter)</a>.<br/>
                <span className="block mt-2">Ya realizamos la postulación para tener acceso temprano y experimentar con este modelo en emprendIA.</span>
              </span>
              <span className="text-xs text-gray-500 block mt-2">
                Cuando esta tecnología esté disponible, podrás usar la cámara para comunicarte en LSB y ver la traducción automática en la plataforma.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowSignGemmaDialog(false)}>
              Aceptar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
                  value={partialIdea ? [idea.trim(), partialIdea].filter(Boolean).join(' ') : idea}
                  onChange={(e) => setIdea(e.target.value)}
                  placeholder="Describe tu idea de negocio... Por ejemplo: 'Quiero crear una aplicación que ayude a las personas sordas a...'"
                  className="min-h-32 text-lg p-4 border-2 border-gray-300 focus:border-primary rounded-lg"
                  aria-describedby="idea-help"
                />
                <p id="idea-help" className="text-sm text-gray-500 mt-2">
                  Mínimo 10 palabras. Puedes usar el micrófono (o la cámara) para dictar tu idea.<br/>
                  <span className="text-xs text-gray-400">Atajo: <kbd className="px-1 py-0.5 bg-gray-200 rounded">Alt + M</kbd> para activar el micrófono.</span>
                </p>
              </div>

              {/* Botones de cámara de señas y micrófono juntos, alineados horizontalmente */}
              <div className="flex flex-row gap-4 justify-center mt-4">
                <VoiceButton
                  onStart={handleVoiceStart}
                  onResult={handleVoiceResult}
                  onPartial={handlePartialResult}
                  lang="es-ES"
                  shortcut="Alt+M"
                  size="lg"
                  ariaLabel="Hablar para escribir"
                />
                <Button
                  onClick={() => setSignCameraEnabled(true)}
                  variant="outline"
                  size="lg"
                  className="btn-accessible flex items-center gap-2"
                  aria-label="Activar reconocimiento de lenguaje de señas por cámara"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M4 6.5A2.5 2.5 0 016.5 4h7A2.5 2.5 0 0116 6.5v11A2.5 2.5 0 0113.5 20h-7A2.5 2.5 0 014 17.5v-11z" /></svg>
                  Cámara de señas
                </Button>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t">
              <Button
                onClick={() => navigate('/bienvenida')}
                variant="outline"
                className="btn-accessible flex items-center gap-2"
                aria-label="Volver a la página de bienvenida"
              >
                <ArrowLeft className="h-4 w-4" />
                Volver
              </Button>

              <Button
                onClick={() => navigate('/problema')}
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
