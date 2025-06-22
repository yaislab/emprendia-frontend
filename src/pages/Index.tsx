
import React, { useState } from 'react';
import { Welcome } from './Welcome';
import { IdeaPresentation } from './IdeaPresentation';

type CurrentStep = 'welcome' | 'idea-presentation' | 'problem-validation' | 'customer-profile' | 'value-proposition' | 'mvp-construction' | 'ai-feedback' | 'business-summary';

interface BusinessData {
  idea: string;
  problem: string;
  customer: any;
  valueProposition: string;
  mvp: any;
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState<CurrentStep>('welcome');
  const [businessData, setBusinessData] = useState<BusinessData>({
    idea: '',
    problem: '',
    customer: null,
    valueProposition: '',
    mvp: null,
  });

  const handleStart = () => {
    setCurrentStep('idea-presentation');
  };

  const handleIdeaNext = (idea: string) => {
    setBusinessData(prev => ({ ...prev, idea }));
    setCurrentStep('problem-validation');
  };

  const handleBack = () => {
    switch (currentStep) {
      case 'idea-presentation':
        setCurrentStep('welcome');
        break;
      case 'problem-validation':
        setCurrentStep('idea-presentation');
        break;
      // Add more cases as we implement more steps
      default:
        setCurrentStep('welcome');
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'welcome':
        return <Welcome onStart={handleStart} />;
      case 'idea-presentation':
        return <IdeaPresentation onNext={handleIdeaNext} onBack={handleBack} />;
      // TODO: Add more steps as we implement them
      case 'problem-validation':
        return (
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
            <div className="text-center p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Paso 2: Validación del Problema</h1>
              <p className="text-lg text-gray-600 mb-6">Próximamente implementaremos esta pantalla...</p>
              <p className="text-gray-500">Tu idea: "{businessData.idea}"</p>
            </div>
          </div>
        );
      default:
        return <Welcome onStart={handleStart} />;
    }
  };

  return renderCurrentStep();
};

export default Index;
