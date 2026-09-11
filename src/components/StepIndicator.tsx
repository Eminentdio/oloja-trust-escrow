import { Check } from "lucide-react";

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex items-start gap-2">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center gap-2 flex-1">
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-bold transition-colors ${
              index < currentStep
                ? "bg-brand-500 border-brand-500 text-white"
                : index === currentStep
                  ? "bg-brand-100 border-brand-500 text-brand-700"
                  : "bg-white border-border text-muted-foreground"
            }`}
          >
            {index < currentStep ? (
              <Check size={16} strokeWidth={3} />
            ) : (
              index + 1
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p
              className={`text-xs font-medium leading-tight ${
                index <= currentStep
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {step}
            </p>
            <div className="h-1 mt-1 rounded-full bg-border overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  index <= currentStep ? "bg-brand-500" : "bg-transparent"
                }`}
                style={{ width: index <= currentStep ? "100%" : "0%" }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
