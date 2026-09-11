import { cn } from "@/lib/utils";
import { TransactionStatus } from "@/lib/mockData";

export const StatusBadge = ({ status }: { status: TransactionStatus }) => {
  const statusMap: Record<TransactionStatus, { bg: string; text: string; label: string }> = {
    "pending-payment": {
      bg: "bg-orange-100 text-orange-800",
      text: "bg-orange-100",
      label: "Pending Payment",
    },
    "payment-confirmed": {
      bg: "bg-green-100 text-green-800",
      text: "bg-green-100",
      label: "Payment Confirmed",
    },
    "in-transit": {
      bg: "bg-blue-100 text-blue-800",
      text: "bg-blue-100",
      label: "In Transit",
    },
    delivered: {
      bg: "bg-gray-100 text-gray-800",
      text: "bg-gray-100",
      label: "Delivered",
    },
  };

  const { bg, text, label } = statusMap[status] || statusMap["pending-payment"];

  return (
    <span className={cn(
      "inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium",
      text
    )}>
      {label}
    </span>
  );
};