import React, { createContext, useContext, useState, useCallback } from "react";

export type Role = "buyer" | "seller" | "agent";

export type OrderStatus =
  | "pending_payment"
  | "payment_confirmed"
  | "in_transit"
  | "delivered"
  | "dispute";

export interface Order {
  id: string;
  buyerName: string;
  buyerLocation: string;
  sellerName: string;
  sellerLocation: string;
  item: string;
  itemPrice: number;
  deliveryFee: number;
  totalAmount: number;
  status: OrderStatus;
  referenceCode: string;
  createdAt: string;
  logisticsPhoto?: string;
}

interface TrustEscrowContextType {
  orders: Order[];
  currentRole: Role | null;
  setCurrentRole: (role: Role) => void;
  placeOrder: (order: Omit<Order, "id" | "status" | "referenceCode" | "createdAt">) => void;
  confirmPayment: (orderId: string) => void;
  releaseFunds: (orderId: string) => void;
  flagDispute: (orderId: string) => void;
  confirmLogistics: (orderId: string) => void;
  getOrderByReference: (ref: string) => Order | undefined;
  getOrdersByRole: (role: Role) => Order[];
}

const TrustEscrowContext = createContext<TrustEscrowContextType | null>(null);

const MOCK_ORDERS: Order[] = [
  {
    id: "ORD-001",
    buyerName: "Tunde",
    buyerLocation: "London, UK",
    sellerName: "Mama Bose",
    sellerLocation: "Balogun, Lagos",
    item: "Aso-Oke Lace Fabric",
    itemPrice: 150000,
    deliveryFee: 25000,
    totalAmount: 175000,
    status: "pending_payment",
    referenceCode: "TM-2847",
    createdAt: "2025-01-15T10:30:00Z",
  },
  {
    id: "ORD-002",
    buyerName: "Amina",
    buyerLocation: "New York, USA",
    sellerName: "Chief Ade",
    sellerLocation: "Bodija, Ibadan",
    item: "Adire Textile",
    itemPrice: 85000,
    deliveryFee: 20000,
    totalAmount: 105000,
    status: "payment_confirmed",
    referenceCode: "TM-2848",
    createdAt: "2025-01-14T08:00:00Z",
  },
  {
    id: "ORD-003",
    buyerName: "Chinedu",
    buyerLocation: "Toronto, Canada",
    sellerName: "Mama Blessing",
    sellerLocation: "Balogun, Lagos",
    item: "Gele Headwrap",
    itemPrice: 45000,
    deliveryFee: 15000,
    totalAmount: 60000,
    status: "in_transit",
    referenceCode: "TM-2849",
    createdAt: "2025-01-13T14:20:00Z",
  },
  {
    id: "ORD-004",
    buyerName: "Fatima",
    buyerLocation: "Lagos, Nigeria",
    sellerName: "Uncle Bola",
    sellerLocation: "Idi-Araba, Lagos",
    item: "Agbada Fabric",
    itemPrice: 200000,
    deliveryFee: 10000,
    totalAmount: 210000,
    status: "delivered",
    referenceCode: "TM-2850",
    createdAt: "2025-01-12T09:00:00Z",
  },
];

export const TrustEscrowProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [currentRole, setCurrentRole] = useState<Role | null>(null);

  const placeOrder = useCallback(
    (orderData: Omit<Order, "id" | "status" | "referenceCode" | "createdAt">) => {
      const newOrder: Order = {
        ...orderData,
        id: `ORD-${String(orders.length + 1).padStart(3, "0")}`,
        status: "pending_payment",
        referenceCode: `TM-${2847 + orders.length}`,
        createdAt: new Date().toISOString(),
      };
      setOrders((prev) => [newOrder, ...prev]);
    },
    [orders.length]
  );

  const confirmPayment = useCallback((orderId: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? { ...order, status: "payment_confirmed" as OrderStatus }
          : order
      )
    );
  }, []);

  const releaseFunds = useCallback((orderId: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? { ...order, status: "delivered" as OrderStatus }
          : order
      )
    );
  }, []);

  const flagDispute = useCallback((orderId: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? { ...order, status: "dispute" as OrderStatus }
          : order
      )
    );
  }, []);

  const confirmLogistics = useCallback((orderId: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? { ...order, status: "in_transit" as OrderStatus }
          : order
      )
    );
  }, []);

  const getOrderByReference = useCallback(
    (ref: string) => orders.find((o) => o.referenceCode === ref),
    [orders]
  );

  const getOrdersByRole = useCallback(
    (role: Role) => {
      switch (role) {
        case "buyer":
          return orders.filter(
            (o) =>
              o.status === "pending_payment" ||
              o.status === "payment_confirmed" ||
              o.status === "in_transit" ||
              o.status === "delivered"
          );
        case "seller":
          return orders.filter(
            (o) =>
              o.status === "pending_payment" ||
              o.status === "payment_confirmed" ||
              o.status === "in_transit" ||
              o.status === "delivered"
          );
        case "agent":
          return orders;
        default:
          return orders;
      }
    },
    [orders]
  );

  return (
    <TrustEscrowContext.Provider
      value={{
        orders,
        currentRole,
        setCurrentRole,
        placeOrder,
        confirmPayment,
        releaseFunds,
        flagDispute,
        confirmLogistics,
        getOrderByReference,
        getOrdersByRole,
      }}
    >
      {children}
    </TrustEscrowContext.Provider>
  );
};

export const useTrustEscrow = () => {
  const context = useContext(TrustEscrowContext);
  if (!context) {
    throw new Error("useTrustEscrow must be used within TrustEscrowProvider");
  }
  return context;
};

export const formatNaira = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const getStatusLabel = (status: OrderStatus): string => {
  switch (status) {
    case "pending_payment":
      return "Pending Payment";
    case "payment_confirmed":
      return "Payment Confirmed";
    case "in_transit":
      return "In Transit";
    case "delivered":
      return "Delivered";
    case "dispute":
      return "Dispute Flagged";
    default:
      return status;
  }
};

export const getStatusColor = (status: OrderStatus): string => {
  switch (status) {
    case "pending_payment":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "payment_confirmed":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "in_transit":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "delivered":
      return "bg-green-100 text-green-800 border-green-200";
    case "dispute":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};
