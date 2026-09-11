import { ShoppingBag, Store, UsersRound } from "lucide-react";
import type { Role } from "./TrustEscrowProvider";

interface RoleOption {
  role: Role;
  label: string;
  description: string;
  icon: typeof ShoppingBag;
  color: string;
}

const roleOptions: RoleOption[] = [
  {
    role: "buyer",
    label: "Buyer",
    description: "Shop safely and pay with confidence",
    icon: ShoppingBag,
    color: "bg-brand-500",
  },
  {
    role: "seller",
    label: "Seller",
    description: "Receive orders and get paid securely",
    icon: Store,
    color: "bg-money-600",
  },
  {
    role: "agent",
    label: "Agent",
    description: "Manage transactions and verify payments",
    icon: UsersRound,
    color: "bg-purple-600",
  },
];

interface RoleSelectorProps {
  onSelect: (role: Role) => void;
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({ onSelect }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {roleOptions.map((option) => {
        const Icon = option.icon;
        return (
          <button
            key={option.role}
            onClick={() => onSelect(option.role)}
            className="group relative flex flex-col items-center p-6 text-center border-2 rounded-2xl bg-white hover:border-brand-300 hover:shadow-lg hover:shadow-brand-500/10 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
          >
            <div
              className={`flex items-center justify-center w-16 h-16 mb-4 rounded-2xl text-white shadow-lg transition-transform group-hover:scale-110 ${option.color}`}
            >
              <Icon size={30} strokeWidth={2.5} />
            </div>
            <h3 className="text-lg font-bold text-foreground">{option.label}</h3>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
              {option.description}
            </p>
            <div className="absolute top-4 right-4 w-5 h-5 rounded-full border-2 border-border bg-white group-hover:border-brand-500 transition-colors" />
          </button>
        );
      })}
    </div>
  );
};
