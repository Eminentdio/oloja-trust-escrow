export type UserRole = "buyer" | "seller" | "agent";

export type TransactionStatus =
  | "pending-payment"       // Buyer created order, waiting to pay or waiting for agent verification
  | "payment-confirmed"     // Agent verified funds are in escrow lock! Seller is cleared to package/dispatch
  | "in-transit"            // Seller handed goods to dispatch rider & uploaded proof
  | "delivered"             // Buyer received & confirmed goods, waiting for agent payout
  | "funds-released"        // Agent released payout to seller account (Transaction Completed)
  | "disputed";             // Flagged by agent or buyer

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  actor: "Buyer (Tunde)" | "Seller (Mama Bose)" | "Agent (TrustEscrow Operator)" | "System";
  timestamp: string;
  type: "info" | "success" | "warning" | "error";
}

export interface Transaction {
  id: string;
  reference: string;
  buyerName: string;
  buyerPhone: string;
  buyerLocation: string;
  sellerName: string;
  sellerPhone: string;
  sellerMarket: string;
  sellerBank: {
    bankName: string;
    accountNumber: string;
    accountName: string;
  };
  itemName: string;
  itemDescription: string;
  itemCategory: string;
  itemImage: string;
  itemPrice: number;
  deliveryFee: number;
  escrowFee: number;
  totalAmount: number;
  status: TransactionStatus;
  createdAt: string;
  agentName: string;
  agentNotes?: string;
  dispatchProofImage?: string;
  dispatchRiderName?: string;
  dispatchRiderPhone?: string;
  buyerDeliveryRating?: number;
  buyerDeliveryComment?: string;
  voiceNotes: {
    id: string;
    sender: "Agent" | "Seller" | "Buyer";
    duration: string;
    transcript: string;
    recordedAt: string;
  }[];
  timeline: TimelineEvent[];
}

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: "TXN-2847",
    reference: "TM-2847",
    buyerName: "Tunde Adeyemi (Diaspora)",
    buyerPhone: "+44 7911 123456",
    buyerLocation: "London, UK (Delivering to Ikeja, Lagos)",
    sellerName: "Mama Bose Fabrics",
    sellerPhone: "+234 803 555 0192",
    sellerMarket: "Balogun Market, Lagos Island (Block D, Shop 14)",
    sellerBank: {
      bankName: "Access Bank",
      accountNumber: "0123948572",
      accountName: "Bose Kudirat Olaleye",
    },
    itemName: "Royal Blue French Lace (5 Yards)",
    itemDescription: "Original sample lace with heavy stonework, perfect for Owambe/Wedding guest attire.",
    itemCategory: "Fabrics & Lace",
    itemImage: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&auto=format&fit=crop&q=80",
    itemPrice: 150000,
    deliveryFee: 25000,
    escrowFee: 0,
    totalAmount: 175000,
    status: "pending-payment",
    createdAt: "Today, 10:45 AM",
    agentName: "Agent Chinedu (Lagos Hub)",
    voiceNotes: [
      {
        id: "vn-1",
        sender: "Seller",
        duration: "0:24",
        transcript: "E kaaro sir! The lace is ready here in Balogun. Once your agent says money is locked, I will give the rider immediately.",
        recordedAt: "10:50 AM",
      },
      {
        id: "vn-2",
        sender: "Agent",
        duration: "0:18",
        transcript: "Hello Mama Bose, we received Tunde's order. Please keep the lace aside. We are verifying the bank deposit now.",
        recordedAt: "11:02 AM",
      },
    ],
    timeline: [
      {
        id: "tl-1",
        title: "Order Initiated",
        description: "Buyer initiated escrow order via WhatsApp/Web with reference TM-2847",
        actor: "Buyer (Tunde)",
        timestamp: "10:45 AM",
        type: "info",
      },
    ],
  },
  {
    id: "TXN-3012",
    reference: "TM-3012",
    buyerName: "Dr. Chioma Okeke",
    buyerPhone: "+234 802 444 8812",
    buyerLocation: "Lekki Phase 1, Lagos",
    sellerName: "Alhaji Garba Grains",
    sellerPhone: "+234 806 111 9920",
    sellerMarket: "Bodija Market, Ibadan",
    sellerBank: {
      bankName: "Zenith Bank",
      accountNumber: "2094837162",
      accountName: "Garba Ibrahim & Sons",
    },
    itemName: "5 Bags of Premium Ofada Rice",
    itemDescription: "Clean, stone-free organic Ofada rice direct from farm milling.",
    itemCategory: "Foodstuffs",
    itemImage: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&auto=format&fit=crop&q=80",
    itemPrice: 220000,
    deliveryFee: 30000,
    escrowFee: 0,
    totalAmount: 250000,
    status: "payment-confirmed",
    createdAt: "Today, 09:15 AM",
    agentName: "Agent Bisi (Ibadan Desk)",
    voiceNotes: [
      {
        id: "vn-g1",
        sender: "Agent",
        duration: "0:22",
        transcript: "Alhaji, payment of ₦250k is safe with TrustEscrow. Dispatch the 5 bags to interstate haulage.",
        recordedAt: "09:30 AM",
      },
    ],
    timeline: [
      {
        id: "tl-2a",
        title: "Order Placed",
        description: "Buyer generated order code TM-3012",
        actor: "Buyer (Tunde)",
        timestamp: "09:15 AM",
        type: "info",
      },
      {
        id: "tl-2b",
        title: "Payment Verified & Escrow Locked",
        description: "Agent verified ₦250,000 Providus Bank transfer into Escrow Vault #ESC-992",
        actor: "Agent (TrustEscrow Operator)",
        timestamp: "09:28 AM",
        type: "success",
      },
    ],
  },
  {
    id: "TXN-1980",
    reference: "TM-1980",
    buyerName: "Kunle & Folake (USA)",
    buyerPhone: "+1 404 889 2210",
    buyerLocation: "Atlanta, GA (Destination: Victoria Island)",
    sellerName: "Iya Ibeji Aso-Oke",
    sellerPhone: "+234 809 333 4455",
    sellerMarket: "Oja Oba Market, Osogbo",
    sellerBank: {
      bankName: "First Bank",
      accountNumber: "3081928471",
      accountName: "Grace Kehinde Taiwo",
    },
    itemName: "Complete Bridal Aso-Oke Set",
    itemDescription: "Hand-woven metallic champagne gold with matching gele, ipele, and agbada strips.",
    itemCategory: "Bridal Wear",
    itemImage: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&auto=format&fit=crop&q=80",
    itemPrice: 380000,
    deliveryFee: 40000,
    escrowFee: 0,
    totalAmount: 420000,
    status: "in-transit",
    createdAt: "Yesterday, 02:00 PM",
    agentName: "Agent Chinedu",
    dispatchRiderName: "GOKADA Express (Rider: Sikiru - 08023451122)",
    dispatchProofImage: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&auto=format&fit=crop&q=80",
    voiceNotes: [
      {
        id: "vn-k1",
        sender: "Seller",
        duration: "0:30",
        transcript: "I have given the parcel to Rider Sikiru. I took his photo and ID card.",
        recordedAt: "03:40 PM",
      },
    ],
    timeline: [
      {
        id: "tl-3a",
        title: "Payment Confirmed in Escrow",
        description: "₦420,000 held safely in TrustEscrow Vault",
        actor: "Agent (TrustEscrow Operator)",
        timestamp: "Yesterday, 02:30 PM",
        type: "success",
      },
      {
        id: "tl-3b",
        title: "Goods Handed to Logistics",
        description: "Seller uploaded waybill receipt & dispatched via Gokada Express",
        actor: "Seller (Mama Bose)",
        timestamp: "Yesterday, 03:45 PM",
        type: "info",
      },
    ],
  },
  {
    id: "TXN-1540",
    reference: "TM-1540",
    buyerName: "Blessing Eze",
    buyerPhone: "+234 818 909 0011",
    buyerLocation: "Enugu, Nigeria",
    sellerName: "Aunty Funke Goldsmith",
    sellerPhone: "+234 805 777 2200",
    sellerMarket: "Tejuosho Ultra-modern Market, Yaba",
    sellerBank: {
      bankName: "GTBank",
      accountNumber: "0192847561",
      accountName: "Oluwafunke Adeleke",
    },
    itemName: "18 Karat Dubai Gold Earrings",
    itemDescription: "Certified 6.2g gold drop earrings in tamper-proof security pouch.",
    itemCategory: "Jewelry",
    itemImage: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&auto=format&fit=crop&q=80",
    itemPrice: 490000,
    deliveryFee: 15000,
    escrowFee: 0,
    totalAmount: 505000,
    status: "delivered",
    createdAt: "2 days ago",
    agentName: "Agent Bisi",
    buyerDeliveryRating: 5,
    buyerDeliveryComment: "Lace and gold match the video Mama sent perfectly. Very satisfied!",
    timeline: [
      {
        id: "tl-4a",
        title: "Package Delivered & Inspected",
        description: "Buyer opened parcel, inspected with tamper seal intact, and clicked Confirm Received",
        actor: "Buyer (Tunde)",
        timestamp: "Today, 08:30 AM",
        type: "success",
      },
    ],
    voiceNotes: [],
  },
];

export const formatNaira = (amount: number): string => {
  return `₦${amount.toLocaleString("en-NG")}`;
};

export const getStatusDetails = (status: TransactionStatus) => {
  switch (status) {
    case "pending-payment":
      return {
        label: "Pending Payment",
        simpleLabel: "Waiting for Payment Verification",
        bg: "bg-amber-50 border-amber-200 text-amber-900",
        badgeBg: "bg-amber-100 text-amber-800 border-amber-300",
        dotColor: "bg-amber-500",
        step: 1,
        description: "Buyer needs to transfer to Escrow Account. Agent will verify.",
      };
    case "payment-confirmed":
      return {
        label: "Payment Confirmed (In Escrow Lock)",
        simpleLabel: "Money Safe in Escrow 🔒",
        bg: "bg-emerald-50 border-emerald-200 text-emerald-900",
        badgeBg: "bg-emerald-100 text-emerald-800 border-emerald-300",
        dotColor: "bg-emerald-500",
        step: 2,
        description: "Funds securely held by Agent. Seller can now safely give goods to rider.",
      };
    case "in-transit":
      return {
        label: "In Transit",
        simpleLabel: "Rider on the Way 🚚",
        bg: "bg-blue-50 border-blue-200 text-blue-900",
        badgeBg: "bg-blue-100 text-blue-800 border-blue-300",
        dotColor: "bg-blue-500",
        step: 3,
        description: "Seller handed over goods. Delivery rider is moving package to buyer.",
      };
    case "delivered":
      return {
        label: "Delivered (Buyer Confirmed)",
        simpleLabel: "Goods Received by Buyer ✅",
        bg: "bg-purple-50 border-purple-200 text-purple-900",
        badgeBg: "bg-purple-100 text-purple-800 border-purple-300",
        dotColor: "bg-purple-500",
        step: 4,
        description: "Buyer confirmed receipt. Agent is authorized to release payout to seller.",
      };
    case "funds-released":
      return {
        label: "Funds Released (Completed)",
        simpleLabel: "Seller Paid - Completed 💰",
        bg: "bg-green-50 border-green-300 text-green-900",
        badgeBg: "bg-green-100 text-green-900 border-green-400",
        dotColor: "bg-green-600",
        step: 5,
        description: "Agent transferred payout to seller's bank account. Trade successful.",
      };
    case "disputed":
      return {
        label: "Dispute Flagged",
        simpleLabel: "Issue Under Agent Review ⚠️",
        bg: "bg-rose-50 border-rose-200 text-rose-900",
        badgeBg: "bg-rose-100 text-rose-800 border-rose-300",
        dotColor: "bg-rose-500",
        step: 0,
        description: "Agent is mediating between buyer and seller.",
      };
  }
};
