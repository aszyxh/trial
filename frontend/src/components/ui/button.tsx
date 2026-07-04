import { cn } from "@/components/ui/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  const variants = {
    primary: "bg-ink-900 text-white hover:bg-ink-800",
    secondary: "bg-white text-ink-900 ring-1 ring-slate-200 hover:bg-slate-50",
    ghost: "bg-transparent text-ink-900 hover:bg-slate-100",
    danger: "bg-alert-red text-white hover:bg-red-700"
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-sage-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}