import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type ModalProps = {
  title: string;
  stepLabel: string;
  children: React.ReactNode;
  onClose: () => void;
  onBack?: () => void;
  onNext?: () => void;
  onSubmit?: () => void;
  backLabel?: string;
  nextLabel?: string;
  submitLabel?: string;
  isLastStep?: boolean;
};

export function Modal({
  title,
  stepLabel,
  children,
  onClose,
  onBack,
  onNext,
  onSubmit,
  backLabel = "Back",
  nextLabel = "Next",
  submitLabel = "Finish",
  isLastStep = false
}: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4 py-6 backdrop-blur-sm">
      <Card className="w-full max-w-2xl overflow-hidden">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sage-700">{stepLabel}</p>
            <h2 className="mt-2 text-xl font-semibold text-ink-900">{title}</h2>
          </div>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>
        <div className="px-6 py-6">{children}</div>
        <div className="flex flex-col gap-3 border-t border-slate-200 px-6 py-5 sm:flex-row sm:justify-between">
          <div className="flex gap-3">
            {onBack ? (
              <Button variant="secondary" onClick={onBack}>
                {backLabel}
              </Button>
            ) : null}
          </div>
          <div className="flex gap-3 sm:justify-end">
            {!isLastStep && onNext ? (
              <Button onClick={onNext}>{nextLabel}</Button>
            ) : null}
            {isLastStep && onSubmit ? <Button onClick={onSubmit}>{submitLabel}</Button> : null}
          </div>
        </div>
      </Card>
    </div>
  );
}