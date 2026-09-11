import { CircleDot, CheckCircle2, Truck, PackageCheck, AlertTriangle } from "lucide-react";
import type { OrderStatus } from "./TrustEscrowProvider";
import { getStatusColor, getStatusLabel } from "./TrustEscrowProvider";

interface StatusBadgeProps {
  status: OrderStatus;
  large?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, large = false }) => {
  const icons = {
    pending_payment: CircleDot,
    payment_confirmed: CheckCircle2,
    in_transit: Truck,
    delivered: PackageCheck,
    dispute: AlertTriangle,
  };

  const Icon = icons[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 border rounded-full font-semibold ${getStatusColor(
        status
      )} ${large ? "px-4 py-2 text-sm" : "px-3 py-1 text-xs"}`}
    >
      <Icon size={large ? 16 : 14} strokeWidth={2.5} />
      {getStatusLabel(status)}
    </span>
  );
};
