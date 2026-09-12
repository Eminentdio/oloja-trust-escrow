export type UserRole = "buyer" | "seller" | "agent";

export type TransactionStatus =
  | "pending-payment"
  | "payment-confirmed"
  | "in-transit"
  | "delivered";

export interface Transaction {
  id: string;
  reference: string;
  buyerName: string;
  sellerName: string;
  itemName: string;
  itemDescription: string;
  itemImage: string;
  itemPrice: number;
  deliveryFee: number;
  totalAmount: number;
  status: TransactionStatus;
  createdAt: string;
  location: string;
  notes: string;
}

export const transactions: Transaction[] = [
  {
    id: "TXN-001",
    reference: "TM-2847",
    buyerName: "Tunde in London",
    sellerName: "Mama Bose",
    itemName: "Lace",
    itemDescription: "Premium Ankara lace fabric for special occasions",
    itemImage: "/placeholder.svg",
    itemPrice: 150000,
    deliveryFee: 25000,
    totalAmount: 175000,
    status: "pending-payment",
    createdAt: "2024-01-15",
    location: "Balogun Market, Lagos",
    notes: "Buyer prefers voice confirmation for delivery updates",
  },
  {
    id: "TXN-002",
    reference: "TM-2851",
    buyerName: "Aisha in Abuja",
    sellerName: "Uncle Chidi",
    itemName: "Gold Watch",
    itemDescription: "Classic wristwatch with leather strap",
    itemImage: "/placeholder.svg",
    itemPrice: 320000,
    deliveryFee: 15000,
    totalAmount: 335000,
    status: "payment-confirmed",
    createdAt: "2024-01-14",
    location: "Bodija Market, Ibadan",
    notes: "Seller confirmed pickup with photo",
  },
  {
    id: "TXN-003",
    reference: "TM-2855",
    buyerName: "Kemi in Toronto",
    sellerName: "Mallam Sani",
    itemName: "Leather Bag",
    itemDescription: "Handmade leather tote bag",
    itemImage: "/placeholder.svg",
    itemPrice: 85000,
    deliveryFee: 20000,
    totalAmount: 105000,
    status: "in-transit",
    createdAt: "2024-01-13",
    location: "Kura Market, Kano",
    notes: "Delivery in progress to buyer address",
  },
  {
    id: "TXN-004",
    reference: "TM-2860",
    buyerName: "Ngozi in Houston",
    sellerName: "Auntie Funmi",
    itemName: "Beads Set",
    itemDescription: "Traditional coral beads set",
    itemImage: "/placeholder.svg",
    itemPrice: 240000,
    deliveryFee: 30000,
    totalAmount: 270000,
    status: "delivered",
    createdAt: "2024-01-12",
    location: "Ariaria Market, Aba",
    notes: "Delivered and confirmed by buyer",
  },
];

export const formatNaira = (amount: number): string => {
  return `₦${amount.toLocaleString("en-NG")}`;
};

export const getStatusLabel = (status: TransactionStatus): string => {
  switch (status) {
    case "pending-payment":
      return "Pending Payment";
    case "payment-confirmed":
      return "Payment Confirmed";
    case "in-transit":
      return "In Transit";
    case "delivered":
      return "Delivered";
  }
};

export const getRoleLabel = (role: UserRole): string => {
  switch (role) {
    case "buyer":
      return "Buyer";
    case "seller":
      return "Seller";
    case "agent":
      return "Agent";
  }
};
