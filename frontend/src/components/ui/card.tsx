import { cn } from "@/components/ui/utils";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return <div className={cn("rounded-3xl bg-white shadow-soft ring-1 ring-slate-200/80", className)} {...props} />;
}