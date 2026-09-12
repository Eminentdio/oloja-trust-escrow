import React, { createContext, useContext, useState, ReactNode } from "react";
import { Transaction, User } from "@/types/transaction";
import { transactions as initialTransactions, users } from "@/lib/mockData";

interface AppContextType {
  role: User["role"] | null;
  setRole: (role: User["role"] | null) => void;
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  transactions: Transaction[];
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<User["role"] | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    setTransactions((prev) =>
      prev.map((tx) =>
        tx.id === id
          ? {
              ...tx,
              ...updates,
              updatedAt: new Date(),
            }
          : tx
      )
    );
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        currentUser,
        setCurrentUser,
        transactions,
        updateTransaction,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};