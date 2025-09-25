import React from 'react';
import { CheckIcon } from '@heroicons/react/24/solid';

interface ProgressStepsProps {
  currentStep: number;
  totalSteps: number;
  isMusico: boolean;
  isGestor: boolean;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ 
  currentStep,
  isMusico,
  isGestor
}) => {
  // Definir as etapas baseado no tipo de usuário
  const steps = [
    'Dados Pessoais',
    'Endereço',
    'Credenciais',
    ...(isMusico ? ['Instrumentos'] : []),
    ...(isGestor ? ['Dados da Banda'] : [])
  ];
  
  console.log('Etapas do progresso:', { steps, isMusico, isGestor });

  // Recalcular o total de etapas
  const actualTotalSteps = steps.length;
  
  // Ajustar o passo atual para não ultrapassar o total de etapas
  const adjustedCurrentStep = Math.min(currentStep, actualTotalSteps);
  
  // Calcula a porcentagem da barra de progresso
  const progressPercentage = ((adjustedCurrentStep - 1) / (actualTotalSteps - 1)) * 100;

  return (
    <div className="w-full px-2">
      <div className="relative">
        {/* Barra de progresso */}
        <div className="absolute top-5 left-0 right-0 h-1.5 bg-gray-100 z-0 rounded-full">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        
        {/* Passos */}
        <div className="flex justify-between relative z-10">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isActive = stepNumber === currentStep;

            return (
              <div 
                key={index} 
                className="relative flex flex-col items-center flex-1 px-1 group"
              >
                {/* Número do passo */}
                <div className="flex flex-col items-center w-full">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 transform ${
                      isCompleted
                        ? 'bg-gradient-to-br from-purple-600 to-purple-500 border-transparent text-white shadow-lg shadow-purple-100 scale-100'
                        : isActive
                        ? 'border-purple-600 bg-white text-purple-600 font-bold scale-110 shadow-md'
                        : 'border-gray-200 bg-white text-gray-400 group-hover:border-purple-300 group-hover:text-purple-500'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckIcon className="w-5 h-5 text-white" />
                    ) : (
                      <span className={`text-base font-medium ${isActive ? 'text-purple-700' : 'text-inherit'}`}>
                        {stepNumber}
                      </span>
                    )}
                  </div>
                  
                  {/* Nome do passo */}
                  <span
                    className={`mt-2 text-xs font-medium text-center px-1 line-clamp-2 h-10 flex items-center justify-center transition-colors ${
                      isCompleted 
                        ? 'text-purple-700 font-semibold' 
                        : isActive 
                          ? 'text-gray-900 font-semibold' 
                          : 'text-gray-500 group-hover:text-gray-700'
                    }`}
                  >
                    {step}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Indicador de progresso para acessibilidade */}
      <div className="sr-only" aria-live="polite">
        Passo {adjustedCurrentStep} de {actualTotalSteps}: {steps[adjustedCurrentStep - 1]}
      </div>
      
      {/* Indicador de progresso visível */}
      <div className="mt-4 text-center text-sm text-gray-500">
        Etapa {adjustedCurrentStep} de {actualTotalSteps}: <span className="font-medium text-purple-600">{steps[adjustedCurrentStep - 1]}</span>
      </div>
    </div>
  );
};

export default ProgressSteps;
