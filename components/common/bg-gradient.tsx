import { cn } from "@/lib/utils";

export default function BgGradient({
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative isolate`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:top-30"
      >
        <div className={cn("relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-br from-pink-500 via-cyan-500 to-rose-500 opacity-20 sm:left-[cale(50%-30rem)] sm:w-[72rem]", className)}></div>
      </div>
    </div>
  );
}
