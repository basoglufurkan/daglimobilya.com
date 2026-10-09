export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex flex-col leading-none ${className}`}>
      <span className="font-display text-[1.65rem] font-medium tracking-[0.18em]">DAĞLI</span>
      <span className="mt-1 pl-[0.1em] text-[0.55rem] font-semibold tracking-[0.62em] text-brass-light">
        MOBİLYA
      </span>
    </span>
  );
}
