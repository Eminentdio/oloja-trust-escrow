import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Transaction,
  TransactionStatus,
  UserRole,
  INITIAL_TRANSACTIONS,
  TimelineEvent,
} from "@/lib/mockData";
import { toast } from "sonner";

interface EscrowContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  transactions: Transaction[];
  currentTransactionId: string;
  setCurrentTransactionId: (id: string) => void;
  currentTransaction: Transaction;
  
  // Agent Actions
  agentConfirmPayment: (transactionId: string, notes?: string) => void;
  agentReleaseFunds: (transactionId: string) => void;
  agentFlagDispute: (transactionId: string, reason: string) => void;
  agentResolveDispute: (transactionId: string, resolutionNotes: string) => void;

  // Buyer Actions
  buyerPayIntoEscrow: (transactionId: string) => void;
  buyerConfirmDelivery: (transactionId: string, rating?: number, comment?: string) => void;
  buyerReportIssue: (transactionId: string, issue: string) => void;

  // Seller Actions
  sellerHandoverLogistics: (
    transactionId: string,
    riderName: string,
    riderPhone: string,
    proofPhotoUrl?: string
  ) => void;
  sellerSendVoiceNote: (transactionId: string, transcript: string, duration?: string) => void;

  // Utilities
  resetDemoData: () => void;
  createNewTransaction: (data: Partial<Transaction>) => string;
}

const EscrowContext = createContext<EscrowContextType | undefined>(undefined);

const STORAGE_KEY = "trustescrow_transactions_v2";

export const EscrowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem("trustescrow_active_role");
    return (saved as UserRole) || "buyer";
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
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

  const [currentTransactionId, setCurrentTransactionId] = useState<string>("TXN-2847");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("trustescrow_active_role", role);
  }, [role]);

  const currentTransaction =
    transactions.find((t) => t.id === currentTransactionId) || transactions[0];

  const updateTransaction = (
    transactionId: string,
    updater: (prev: Transaction) => Partial<Transaction>,
    timelineEvent?: Omit<TimelineEvent, "id" | "timestamp">
  ) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    setTransactions((prev) =>
      prev.map((t) => {
        if (t.id !== transactionId) return t;

        const partial = updater(t);
        const newTimeline = [...t.timeline];
        if (timelineEvent) {
          newTimeline.push({
            id: `tl-${Date.now()}`,
            timestamp: timeStr,
            ...timelineEvent,
          });
        }

        return {
          ...t,
          ...partial,
          timeline: newTimeline,
        };
      })
    );
  };

  // Agent Confirm Payment
  const agentConfirmPayment = (transactionId: string, notes?: string) => {
    updateTransaction(
      transactionId,
      () => ({
        status: "payment-confirmed",
        agentNotes: notes || "Payment confirmed by bank alert. Funds locked in Escrow Vault.",
      }),
      {
        title: "Payment Confirmed & Locked in Escrow",
        description: "Agent verified bank transfer of funds. Seller Mama Bose has been notified that it is safe to dispatch goods.",
        actor: "Agent (TrustEscrow Operator)",
        type: "success",
      }
    );
    toast.success("Payment confirmed & locked in Escrow!", {
      description: "Mama Bose (Seller) has been alerted to dispatch the goods.",
    });
  };

  // Agent Release Funds
  const agentReleaseFunds = (transactionId: string) => {
    const target = transactions.find((t) => t.id === transactionId);
    const amountStr = target ? `₦${target.itemPrice.toLocaleString()}` : "funds";

    updateTransaction(
      transactionId,
      () => ({
        status: "funds-released",
      }),
      {
        title: "Funds Released to Seller",
        description: `Agent sent instant payout of ${amountStr} directly to seller's ${target?.sellerBank.bankName || "bank"} account (${target?.sellerBank.accountNumber || ""}). Trade successfully completed!`,
        actor: "Agent (TrustEscrow Operator)",
        type: "success",
      }
    );
    toast.success("Funds Released to Seller!", {
      description: `Payout successfully transferred to ${target?.sellerName || "Seller"}.`,
    });
  };

  // Agent Flag Dispute
  const agentFlagDispute = (transactionId: string, reason: string) => {
    updateTransaction(
      transactionId,
      () => ({
        status: "disputed",
        agentNotes: `Dispute opened: ${reason}`,
      }),
      {
        title: "Dispute Flagged by Agent",
        description: `Escrow payout paused. Reason: ${reason}. Human agent will mediate via WhatsApp/Voice note.`,
        actor: "Agent (TrustEscrow Operator)",
        type: "error",
      }
    );
    toast.error("Dispute Flagged", {
      description: "Escrow release frozen. Mediation active.",
    });
  };

  // Agent Resolve Dispute
  const agentResolveDispute = (transactionId: string, resolutionNotes: string) => {
    updateTransaction(
      transactionId,
      () => ({
        status: "in-transit",
        agentNotes: `Dispute resolved: ${resolutionNotes}`,
      }),
      {
        title: "Dispute Resolved by Agent",
        description: `Resolution: ${resolutionNotes}. Transaction resumed.`,
        actor: "Agent (TrustEscrow Operator)",
        type: "info",
      }
    );
    toast.success("Dispute Resolved", {
      description: "Transaction status restored to in-transit.",
    });
  };

  // Buyer Pay into Escrow
  const buyerPayIntoEscrow = (transactionId: string) => {
    updateTransaction(
      transactionId,
      () => ({
        status: "pending-payment",
      }),
      {
        title: "Buyer Initiated Escrow Payment",
        description: "Buyer transferred funds with reference TM-2847. Awaiting Agent confirmation.",
        actor: "Buyer (Tunde)",
        type: "info",
      }
    );
    toast.info("Payment reference submitted!", {
      description: "Human Agent is reviewing the bank credit alert.",
    });
  };

  // Buyer Confirm Delivery
  const buyerConfirmDelivery = (
    transactionId: string,
    rating: number = 5,
    comment: string = "Items received in perfect condition."
  ) => {
    updateTransaction(
      transactionId,
      () => ({
        status: "delivered",
        buyerDeliveryRating: rating,
        buyerDeliveryComment: comment,
      }),
      {
        title: "Buyer Confirmed Delivery",
        description: `Tunde inspected package and confirmed receipt ("${comment}"). Agent notified to release payout.`,
        actor: "Buyer (Tunde)",
        type: "success",
      }
    );
    toast.success("Delivery Confirmed!", {
      description: "Thank you! The human agent will now release funds to Mama Bose.",
    });
  };

  // Buyer Report Issue
  const buyerReportIssue = (transactionId: string, issue: string) => {
    updateTransaction(
      transactionId,
      () => ({
        status: "disputed",
      }),
      {
        title: "Buyer Reported Issue",
        description: `Issue report from Buyer: ${issue}. Assigned to Human Agent for prompt resolution.`,
        actor: "Buyer (Tunde)",
        type: "warning",
      }
    );
    toast.warning("Issue submitted to Agent", {
      description: "Your human agent has paused release and will contact you directly.",
    });
  };

  // Seller Handover Logistics
  const sellerHandoverLogistics = (
    transactionId: string,
    riderName: string,
    riderPhone: string,
    proofPhotoUrl: string = "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&auto=format&fit=crop&q=80"
  ) => {
    updateTransaction(
      transactionId,
      () => ({
        status: "in-transit",
        dispatchRiderName: riderName || "Dispatch Express Rider",
        dispatchRiderPhone: riderPhone || "0803-555-4321",
        dispatchProofImage: proofPhotoUrl,
      }),
      {
        title: "Goods Handed to Dispatch Logistics",
        description: `Mama Bose handed parcel to ${riderName} (${riderPhone}). Photo proof attached. Tracking active.`,
        actor: "Seller (Mama Bose)",
        type: "info",
      }
    );
    toast.success("Handover confirmed!", {
      description: "Buyer and Agent have been notified that goods are on the way.",
    });
  };

  // Seller Send Voice Note
  const sellerSendVoiceNote = (
    transactionId: string,
    transcript: string,
    duration: string = "0:20"
  ) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    setTransactions((prev) =>
      prev.map((t) => {
        if (t.id !== transactionId) return t;
        return {
          ...t,
          voiceNotes: [
            ...t.voiceNotes,
            {
              id: `vn-${Date.now()}`,
              sender: "Seller",
              duration,
              transcript,
              recordedAt: timeStr,
            },
          ],
        };
      })
    );
    toast.success("Voice note sent to Buyer & Agent!", {
      description: "Audio snippet attached to transaction record.",
    });
  };

  const resetDemoData = () => {
    setTransactions(INITIAL_TRANSACTIONS);
    setCurrentTransactionId("TXN-2847");
    localStorage.removeItem(STORAGE_KEY);
    toast.info("Demo data reset to initial state");
  };

  const createNewTransaction = (data: Partial<Transaction>): string => {
    const newId = `TXN-${Math.floor(1000 + Math.random() * 9000)}`;
    const refCode = `TM-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const newTxn: Transaction = {
      id: newId,
      reference: refCode,
      buyerName: data.buyerName || "Tunde in London",
      buyerPhone: data.buyerPhone || "+44 7911 123456",
      buyerLocation: data.buyerLocation || "London / Ikeja",
      sellerName: data.sellerName || "Mama Bose Fabrics",
      sellerPhone: data.sellerPhone || "+234 803 555 0192",
      sellerMarket: data.sellerMarket || "Balogun Market, Lagos",
      sellerBank: data.sellerBank || {
        bankName: "Access Bank",
        accountNumber: "0123948572",
        accountName: "Bose Kudirat Olaleye",
      },
      itemName: data.itemName || "Sample Goods",
      itemDescription: data.itemDescription || "Market goods order",
      itemCategory: data.itemCategory || "General",
      itemImage:
        data.itemImage ||
        "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&auto=format&fit=crop&q=80",
      itemPrice: data.itemPrice || 100000,
      deliveryFee: data.deliveryFee || 20000,
      escrowFee: 0,
      totalAmount: (data.itemPrice || 100000) + (data.deliveryFee || 20000),
      status: "pending-payment",
      createdAt: "Just now",
      agentName: "Agent Chinedu (Lagos Hub)",
      voiceNotes: [],
      timeline: [
        {
          id: `tl-${Date.now()}`,
          title: "Order Created",
          description: `Order ${refCode} initiated via TrustEscrow`,
          actor: "Buyer (Tunde)",
          timestamp: timeStr,
          type: "info",
        },
      ],
    };

    setTransactions((prev) => [newTxn, ...prev]);
    setCurrentTransactionId(newId);
    toast.success(`New order ${refCode} created!`);
    return newId;
  };

  return (
    <EscrowContext.Provider
      value={{
        role,
        setRole,
        transactions,
        currentTransactionId,
        setCurrentTransactionId,
        currentTransaction,
        agentConfirmPayment,
        agentReleaseFunds,
        agentFlagDispute,
        agentResolveDispute,
        buyerPayIntoEscrow,
        buyerConfirmDelivery,
        buyerReportIssue,
        sellerHandoverLogistics,
        sellerSendVoiceNote,
        resetDemoData,
        createNewTransaction,
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
