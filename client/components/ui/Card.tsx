import { cn } from "@/lib/utils";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return <div className={cn("rounded-lg border border-slate-200 bg-white p-4 shadow-sm", className)} {...props} />;
}
