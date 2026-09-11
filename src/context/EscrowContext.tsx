import React, { createContext, useContext, useState, useEffect } from "react";

export type TransactionStatus =
  | "pending-payment"       // Buyer created order, waiting for payment/agent confirmation
  | "payment-confirmed"     // Agent verified funds -> Money safely locked in escrow
  | "in-transit"            // Seller handed goods to dispatch rider with photo proof
  | "delivered"             // Buyer confirmed receipt of item
  | "funds-released"        // Agent sent payout to Seller Mama Bose & Dispatch Rider
  | "disputed";             // Flagged for investigation

export interface AuditLog {
  id: string;
  time: string;
  actor: "Buyer" | "Seller" | "Agent" | "Logistics";
  action: string;
  detail: string;
  type: "info" | "success" | "warning" | "alert";
}

export interface EscrowTransaction {
  id: string;
  reference: string;
  buyerName: string;
  buyerLocation: string;
  buyerPhone: string;
  buyerAvatar: string;
  sellerName: string;
  sellerShop: string;
  sellerMarket: string;
  sellerPhone: string;
  sellerAvatar: string;
  itemName: string;
  itemCategory: string;
  itemDescription: string;
  itemImage: string;
  itemPrice: number;
  deliveryFee: number;
  escrowFee: number;
  totalAmount: number;
  status: TransactionStatus;
  createdAt: string;
  paymentMethod: "Bank Transfer" | "UK Remittance / Card" | "USSD" | "Cash to Agent Hub";
  paymentReference: string;
  handoverPhoto?: string;
  riderName?: string;
  riderPhone?: string;
  riderCode?: string;
  buyerConfirmedAt?: string;
  fundsReleasedAt?: string;
  disputeReason?: string;
  agentNotes: string[];
  logs: AuditLog[];
  voiceNoteUrl?: string;
}

const INITIAL_TRANSACTIONS: EscrowTransaction[] = [
  {
    id: "TXN-001",
    reference: "TM-2847",
    buyerName: "Tunde Adeyemi",
    buyerLocation: "London, UK (Diaspora)",
    buyerPhone: "+44 7911 123456",
    buyerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    sellerName: "Mama Bose Fabrics",
    sellerShop: "Shop 42, Arowolo Line",
    sellerMarket: "Balogun Market, Lagos Island",
    sellerPhone: "+234 803 555 0192",
    sellerAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    itemName: "Royal Voile Swiss Lace (5 Yards)",
    itemCategory: "Fabrics & Aso-Ebi",
    itemDescription: "Hand-embellished heavy stones, magenta & gold royal swiss lace for upcoming wedding event.",
    itemImage: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&auto=format&fit=crop&q=80",
    itemPrice: 150000,
    deliveryFee: 25000,
    escrowFee: 0, // Free prototype escrow guarantee
    totalAmount: 175000,
    status: "pending-payment",
    createdAt: "Today at 10:24 AM",
    paymentMethod: "UK Remittance / Card",
    paymentReference: "TM-2847-GTB-ESCROW",
    agentNotes: ["Tunde requested expedited dispatch once Mama Bose provides lace sample photo."],
    logs: [
      {
        id: "log-1",
        time: "10:24 AM",
        actor: "Buyer",
        action: "Order Created",
        detail: "Tunde placed order for 5 yards Swiss Lace from London.",
        type: "info",
      },
      {
        id: "log-2",
        time: "10:26 AM",
        actor: "Buyer",
        action: "Payment Initiated",
        detail: "Buyer paid ₦175,000 into TrustEscrow Central Account (Ref: TM-2847).",
        type: "info",
      },
    ],
  },
  {
    id: "TXN-002",
    reference: "TM-2851",
    buyerName: "Aisha Danjuma",
    buyerLocation: "Maitama, Abuja",
    buyerPhone: "+234 802 888 1234",
    buyerAvatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80",
    sellerName: "Uncle Chidi Spices & Grains",
    sellerShop: "Block C, Grains Section",
    sellerMarket: "Bodija Market, Ibadan",
    sellerPhone: "+234 809 777 9921",
    sellerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    itemName: "Export Grade Palm Oil (50L Kegs x 2)",
    itemCategory: "Foodstuff & Provisions",
    itemDescription: "100% unadulterated Nsukka red palm oil in tamper-sealed export kegs.",
    itemImage: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80",
    itemPrice: 110000,
    deliveryFee: 18000,
    escrowFee: 0,
    totalAmount: 128000,
    status: "payment-confirmed",
    createdAt: "Today at 09:15 AM",
    paymentMethod: "Bank Transfer",
    paymentReference: "TM-2851-ZENITH",
    agentNotes: ["Payment confirmed by Agent Femi. Waiting for Uncle Chidi to package kegs."],
    logs: [
      {
        id: "log-1",
        time: "09:15 AM",
        actor: "Buyer",
        action: "Order Created",
        detail: "Aisha ordered 2x 50L Palm Oil kegs.",
        type: "info",
      },
      {
        id: "log-2",
        time: "09:28 AM",
        actor: "Agent",
        action: "Payment Confirmed & Locked",
        detail: "Agent verified ₦128,000 received in Zenith escrow vault.",
        type: "success",
      },
    ],
  },
  {
    id: "TXN-003",
    reference: "TM-2855",
    buyerName: "Kemi Adeleke",
    buyerLocation: "Toronto, Canada (Diaspora)",
    buyerPhone: "+1 416 555 0184",
    buyerAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    sellerName: "Mallam Sani Leather Crafts",
    sellerShop: "Shed 12, Kurmi Heritage",
    sellerMarket: "Kurmi Market, Kano",
    sellerPhone: "+234 814 222 3456",
    sellerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    itemName: "Genuine Goat Hide Duffle & Sandals Set",
    itemCategory: "Handcrafted Leather",
    itemDescription: "Hand-tanned camel and goat leather travel duffle with matching slide sandals.",
    itemImage: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop&q=80",
    itemPrice: 85000,
    deliveryFee: 20000,
    escrowFee: 0,
    totalAmount: 105000,
    status: "in-transit",
    createdAt: "Yesterday at 04:30 PM",
    paymentMethod: "UK Remittance / Card",
    paymentReference: "TM-2855-FLUTTER",
    handoverPhoto: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80",
    riderName: "Ibrahim GOKADA Dispatch",
    riderPhone: "+234 805 111 2233",
    riderCode: "KNO-784",
    agentNotes: ["Package handed over to GOKADA logistics in Kano. Transit tracking active."],
    logs: [
      {
        id: "log-1",
        time: "Yesterday",
        actor: "Agent",
        action: "Payment Locked",
        detail: "₦105,000 secured in escrow.",
        type: "success",
      },
      {
        id: "log-2",
        time: "Yesterday 05:45 PM",
        actor: "Seller",
        action: "Handed to Rider",
        detail: "Mallam Sani snapped parcel photo with Ibrahim GOKADA.",
        type: "info",
      },
    ],
  },
  {
    id: "TXN-004",
    reference: "TM-2860",
    buyerName: "Ngozi Okafor",
    buyerLocation: "Houston, Texas",
    buyerPhone: "+1 713 555 0199",
    buyerAvatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80",
    sellerName: "Auntie Funmi Coral Treasures",
    sellerShop: "Line 7, Jewelry Wing",
    sellerMarket: "Ariaria Market, Aba",
    sellerPhone: "+234 803 999 4433",
    sellerAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    itemName: "Original Edo Royal Coral Beads Set",
    itemCategory: "Traditional Jewelry",
    itemDescription: "Certified authentic heavy coral beads neckpiece with earrings and wrist coral.",
    itemImage: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80",
    itemPrice: 240000,
    deliveryFee: 30000,
    escrowFee: 0,
    totalAmount: 270000,
    status: "delivered",
    createdAt: "2 days ago",
    paymentMethod: "Bank Transfer",
    paymentReference: "TM-2860-UBA",
    buyerConfirmedAt: "Today at 08:30 AM",
    agentNotes: ["Ngozi confirmed reception via WhatsApp voice note in Houston. Funds ready for release."],
    logs: [
      {
        id: "log-1",
        time: "2 days ago",
        actor: "Agent",
        action: "Payment Locked",
        detail: "₦270,000 held in Escrow.",
        type: "success",
      },
      {
        id: "log-2",
        time: "Today 08:30 AM",
        actor: "Buyer",
        action: "Delivery Confirmed",
        detail: "Ngozi confirmed beads in perfect condition.",
        type: "success",
      },
    ],
  },
];

interface EscrowContextType {
  transactions: EscrowTransaction[];
  activeTxnId: string;
  activeTxn: EscrowTransaction;
  setActiveTxnId: (id: string) => void;
  // Human Agent actions
  confirmPaymentReceived: (id: string, notes?: string) => void;
  releaseFundsToSeller: (id: string) => void;
  flagDispute: (id: string, reason: string) => void;
  resolveDispute: (id: string, resolutionNotes: string) => void;
  addAgentNote: (id: string, note: string) => void;
  // Seller actions
  confirmLogisticsHandover: (id: string, photoUrl: string, riderName: string, riderPhone: string) => void;
  // Buyer actions
  confirmItemReceived: (id: string) => void;
  initiateBuyerPayment: (id: string, method: string) => void;
  // Reset demo
  resetDemoData: () => void;
}

const EscrowContext = createContext<EscrowContextType | undefined>(undefined);

const STORAGE_KEY = "trust_escrow_marketplace_txns_v2";

export const EscrowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactionsList, setTransactionsList] = useState<EscrowTransaction[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved transactions", e);
      }
    }
    return INITIAL_TRANSACTIONS;
  });

  const [activeTxnId, setActiveTxnId] = useState<string>("TXN-001");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactionsList));
  }, [transactionsList]);

  const activeTxn =
    transactionsList.find((t) => t.id === activeTxnId) || transactionsList[0];

  const updateTransaction = (
    id: string,
    updater: (prev: EscrowTransaction) => EscrowTransaction
  ) => {
    setTransactionsList((prev) =>
      prev.map((txn) => (txn.id === id ? updater(txn) : txn))
    );
  };

  // 1. Agent confirms payment received from bank/card
  const confirmPaymentReceived = (id: string, notes?: string) => {
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    updateTransaction(id, (prev) => {
      const newLogs: AuditLog[] = [
        ...prev.logs,
        {
          id: `log-${Date.now()}`,
          time: now,
          actor: "Agent",
          action: "Payment Verified & Locked in Escrow",
          detail: `Human Agent confirmed ₦${prev.totalAmount.toLocaleString()} received. Safe in escrow lock. Seller notified to pack and hand over.`,
          type: "success",
        },
      ];

      return {
        ...prev,
        status: "payment-confirmed",
        agentNotes: notes ? [...prev.agentNotes, notes] : prev.agentNotes,
        logs: newLogs,
      };
    });
  };

  // 2. Seller confirms package handover to rider
  const confirmLogisticsHandover = (
    id: string,
    photoUrl: string,
    riderName: string,
    riderPhone: string
  ) => {
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    updateTransaction(id, (prev) => {
      const newLogs: AuditLog[] = [
        ...prev.logs,
        {
          id: `log-${Date.now()}`,
          time: now,
          actor: "Seller",
          action: "Package Handed to Logistics",
          detail: `${prev.sellerName} handed parcel to dispatch rider (${riderName} - ${riderPhone}). Photo proof attached.`,
          type: "info",
        },
      ];

      return {
        ...prev,
        status: "in-transit",
        handoverPhoto: photoUrl,
        riderName,
        riderPhone,
        riderCode: `RDR-${Math.floor(100 + Math.random() * 900)}`,
        logs: newLogs,
      };
    });
  };

  // 3. Buyer confirms item received in good shape
  const confirmItemReceived = (id: string) => {
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    updateTransaction(id, (prev) => {
      const newLogs: AuditLog[] = [
        ...prev.logs,
        {
          id: `log-${Date.now()}`,
          time: now,
          actor: "Buyer",
          action: "Goods Received & Approved",
          detail: `${prev.buyerName} confirmed receipt of goods. Escrow release authorized.`,
          type: "success",
        },
      ];

      return {
        ...prev,
        status: "delivered",
        buyerConfirmedAt: `Today at ${now}`,
        logs: newLogs,
      };
    });
  };

  // 4. Agent releases funds to seller
  const releaseFundsToSeller = (id: string) => {
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    updateTransaction(id, (prev) => {
      const newLogs: AuditLog[] = [
        ...prev.logs,
        {
          id: `log-${Date.now()}`,
          time: now,
          actor: "Agent",
          action: "Funds Disbursed to Seller",
          detail: `Agent released ₦${prev.itemPrice.toLocaleString()} to ${prev.sellerName}'s bank account & ₦${prev.deliveryFee.toLocaleString()} to dispatch logistics. Escrow closed.`,
          type: "success",
        },
      ];

      return {
        ...prev,
        status: "funds-released",
        fundsReleasedAt: `Today at ${now}`,
        logs: newLogs,
      };
    });
  };

  // 5. Flag dispute
  const flagDispute = (id: string, reason: string) => {
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    updateTransaction(id, (prev) => {
      const newLogs: AuditLog[] = [
        ...prev.logs,
        {
          id: `log-${Date.now()}`,
          time: now,
          actor: "Agent",
          action: "Dispute Flagged & Payout Paused",
          detail: `Dispute opened: "${reason}". Agent contacting both parties on WhatsApp.`,
          type: "alert",
        },
      ];

      return {
        ...prev,
        status: "disputed",
        disputeReason: reason,
        logs: newLogs,
      };
    });
  };

  // 6. Resolve dispute
  const resolveDispute = (id: string, resolutionNotes: string) => {
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    updateTransaction(id, (prev) => {
      const newLogs: AuditLog[] = [
        ...prev.logs,
        {
          id: `log-${Date.now()}`,
          time: now,
          actor: "Agent",
          action: "Dispute Resolved",
          detail: `Resolution: ${resolutionNotes}`,
          type: "success",
        },
      ];

      return {
        ...prev,
        status: "in-transit",
        disputeReason: undefined,
        agentNotes: [...prev.agentNotes, `Dispute resolved: ${resolutionNotes}`],
        logs: newLogs,
      };
    });
  };

  const addAgentNote = (id: string, note: string) => {
    updateTransaction(id, (prev) => ({
      ...prev,
      agentNotes: [...prev.agentNotes, note],
    }));
  };

  const initiateBuyerPayment = (id: string, method: string) => {
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    updateTransaction(id, (prev) => ({
      ...prev,
      paymentMethod: method as any,
      logs: [
        ...prev.logs,
        {
          id: `log-${Date.now()}`,
          time: now,
          actor: "Buyer",
          action: `Payment Initiated via ${method}`,
          detail: `Reference ${prev.reference} submitted to escrow ledger.`,
          type: "info",
        },
      ],
    }));
  };

  const resetDemoData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setTransactionsList(INITIAL_TRANSACTIONS);
    setActiveTxnId("TXN-001");
  };

  return (
    <EscrowContext.Provider
      value={{
        transactions: transactionsList,
        activeTxnId,
        activeTxn,
        setActiveTxnId,
        confirmPaymentReceived,
        releaseFundsToSeller,
        flagDispute,
        resolveDispute,
        addAgentNote,
        confirmLogisticsHandover,
        confirmItemReceived,
        initiateBuyerPayment,
        resetDemoData,
      }}
    >
      {children}
    </EscrowContext.Provider>
  );
};

export const useEscrow = () => {
  const context = useContext(EscrowContext);
  if (!context) {
    throw new Error("useEscrow must be used within an EscrowProvider");
  }
  return context;
};
