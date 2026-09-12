export interface User {
  id: string;
  name: string;
  location: string;
  role: "buyer" | "seller" | "agent";
  avatar: string;
}

export interface Transaction {
  id: string;
  buyerId: string;
  sellerId: string;
  itemName: string;
  itemDescription: string;
  itemPrice: number;
  deliveryFee: number;
  totalAmount: number;
  status: "pending_payment" | "payment_confirmed" | "in_transit" | "delivered";
  buyerName: string;
  sellerName: string;
  location: string;
  itemImage: string;
  createdAt: Date;
  updatedAt: Date;
  paymentReference: string;
  escrowLocked: boolean;
  logisticsConfirmed: boolean;
  deliveryPhoto: string | null;
  buyerConfirmed: boolean;
  disputeFlagged: boolean;
}