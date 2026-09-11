import { ShieldCheck, Handshake } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
}

export const Logo: React.FC<LogoProps> = ({ size = "md" }) => {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-brand-500 text-white shadow-lg shadow-brand-500/30">
        <Handshake size={20} strokeWidth={2.5} />
        <ShieldCheck
          size={12}
          strokeWidth={3}
          className="absolute -bottom-1 -right-1 text-brand-500 bg-white rounded-full p-0.5"
        />
      </div>
      <div className={`font-bold tracking-tight ${sizeClasses[size]} text-foreground`}>
        <span className="text-brand-600">Trust</span>
        <span>Escrow</span>
      </div>
    </div>
  );
};
