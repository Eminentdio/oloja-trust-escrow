import { cn } from "@/lib/utils";
import { TransactionStatus } from "@/types/transaction";

interface StatusBadgeProps {
  status: TransactionStatus;
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const statusMap: Record<TransactionStatus, { bg: string; text: string; label: string }> = {
    pending_payment: {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      label: "Pending Payment",
    },
    payment_confirmed: {
      bg: "bg-blue-100",
      text: "text-blue-800",
      label: "Payment Confirmed",
    },
    in_transit: {
      bg: "bg-purple-100",
      text: "text-purple-800",
      label: "In Transit",
    },
    delivered: {
      bg: "bg-green-100",
      text: "text-green-800",
      label: "Delivered",
    },
  };

  const { bg, text, label } = statusMap[status] || statusMap.pending_payment;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium",
        bg,
        text,
        className
      )}
    >
      {label}
    </span>
  );
};