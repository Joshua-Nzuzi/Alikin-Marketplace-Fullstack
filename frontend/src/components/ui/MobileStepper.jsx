import React from 'react';
import { Check, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';

const MobileStepper = ({
  steps,
  currentStep,
  onStepClick,
  className,
  showStepNumbers = true,
  showStepLabels = true,
  variant = 'default',
  ...props
}) => {
  const getStepStatus = (stepIndex) => {
    if (stepIndex < currentStep) return 'completed';
    if (stepIndex === currentStep) return 'current';
    return 'upcoming';
  };

  const getStepIcon = (stepIndex, status) => {
    if (status === 'completed') {
      return <Check className="h-4 w-4 text-white" />;
    }
    if (status === 'current') {
      return <span className="text-sm font-medium text-primary">{stepIndex + 1}</span>;
    }
    return <span className="text-sm font-medium text-gray-400">{stepIndex + 1}</span>;
  };

  const getStepClasses = (status) => {
    const baseClasses = 'flex items-center justify-center rounded-full transition-all duration-200';
    
    switch (status) {
      case 'completed':
        return cn(baseClasses, 'bg-success text-white w-8 h-8');
      case 'current':
        return cn(baseClasses, 'bg-primary text-white w-8 h-8 ring-2 ring-primary/20');
      case 'upcoming':
        return cn(baseClasses, 'bg-gray-200 text-gray-400 w-8 h-8');
      default:
        return baseClasses;
    }
  };

  const getConnectorClasses = (stepIndex) => {
    if (stepIndex === steps.length - 1) return 'hidden';
    
    const isCompleted = stepIndex < currentStep;
    return cn(
      'flex-1 h-0.5 transition-colors duration-200',
      isCompleted ? 'bg-success' : 'bg-gray-200'
    );
  };

  return (
    <div className={cn('w-full', className)} {...props}>
      {/* Mobile Stepper */}
      <div className="flex items-center space-x-2 md:space-x-4">
        {steps.map((step, index) => {
          const status = getStepStatus(index);
          const isClickable = onStepClick && (status === 'completed' || status === 'current');
          
          return (
            <div key={index} className="flex items-center flex-1">
              {/* Step */}
              <div className="flex flex-col items-center space-y-2">
                <button
                  onClick={() => isClickable && onStepClick(index)}
                  disabled={!isClickable}
                  className={cn(
                    getStepClasses(status),
                    isClickable && 'cursor-pointer hover:scale-105 active:scale-95',
                    !isClickable && 'cursor-default'
                  )}
                  aria-label={`Étape ${index + 1}: ${step.label}`}
                >
                  {getStepIcon(index, status)}
                </button>
                
                {/* Step Label */}
                {showStepLabels && (
                  <span
                    className={cn(
                      'text-xs font-medium text-center max-w-20 md:max-w-24',
                      status === 'current' && 'text-primary',
                      status === 'completed' && 'text-success',
                      status === 'upcoming' && 'text-gray-400'
                    )}
                  >
                    {step.label}
                  </span>
                )}
              </div>
              
              {/* Connector */}
              <div className="flex-1 mx-2">
                <div className={getConnectorClasses(index)} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Current Step Description */}
      {steps[currentStep]?.description && (
        <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-sm font-medium text-primary">
              Étape {currentStep + 1} sur {steps.length}
            </span>
            <ChevronRight className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-gray-900">
              {steps[currentStep].label}
            </span>
          </div>
          <p className="text-sm text-gray-600">
            {steps[currentStep].description}
          </p>
        </div>
      )}
    </div>
  );
};

// Step Component
MobileStepper.Step = ({ 
  children, 
  className, 
  isActive = false,
  isCompleted = false,
  ...props 
}) => {
  return (
    <div
      className={cn(
        'p-4 rounded-lg border transition-all duration-200',
        isActive && 'border-primary bg-primary/5',
        isCompleted && 'border-success bg-success/5',
        !isActive && !isCompleted && 'border-gray-200 bg-gray-50',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// Step Content Component
MobileStepper.StepContent = ({ 
  children, 
  className, 
  title,
  description,
  ...props 
}) => {
  return (
    <div className={cn('space-y-3', className)} {...props}>
      {title && (
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      )}
      {description && (
        <p className="text-sm text-gray-600">{description}</p>
      )}
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

// Step Actions Component
MobileStepper.StepActions = ({ 
  children, 
  className,
  onNext,
  onPrevious,
  onComplete,
  isFirstStep = false,
  isLastStep = false,
  canProceed = true,
  ...props 
}) => {
  return (
    <div className={cn('flex flex-col sm:flex-row gap-3 pt-4', className)} {...props}>
      {!isFirstStep && (
        <button
          onClick={onPrevious}
          className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent touch-target"
        >
          Précédent
        </button>
      )}
      
      <div className="flex gap-3">
        {isLastStep ? (
          <button
            onClick={onComplete}
            disabled={!canProceed}
            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-success rounded-lg hover:bg-success/90 focus:outline-none focus:ring-2 focus:ring-success focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed touch-target"
          >
            Terminer
          </button>
        ) : (
          <button
            onClick={onNext}
            disabled={!canProceed}
            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed touch-target"
          >
            Suivant
          </button>
        )}
      </div>
      
      {children}
    </div>
  );
};

export default MobileStepper;
