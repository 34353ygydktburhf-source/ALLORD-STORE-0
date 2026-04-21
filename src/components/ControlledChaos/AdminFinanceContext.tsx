import React, { createContext, useContext, useState, ReactNode } from "react";

export type UserRating = "VIP" | "NORMAL" | "WARNING" | "BANNED";

export interface CRMUser {
  id: string;
  name: string;
  contact?: string;
  totalPosts: number;
  totalPurchases: number;
  totalSpent: number;
  avgSpending: number;
  middlemanUses: number;
  rating: UserRating;
  joinDate: string;
}

export interface StoreExpense {
  id: string;
  title: string;
  amount: number;
  category: "Ads" | "Server" | "Salaries" | "Other";
  date: string;
}

interface AdminFinanceContextType {
  crmUsers: CRMUser[];
  expenses: StoreExpense[];
  totalIncome: number;
  addExpense: (expense: Omit<StoreExpense, "id">) => void;
  removeExpense: (id: string) => void;
  updateUserRating: (id: string, rating: UserRating) => void;
  deleteUser: (id: string) => void;
}

const MOCK_USERS: CRMUser[] = [
  { id: "u1", name: "Ahmed Gamer", contact: "01012345678", totalPosts: 5, totalPurchases: 12, totalSpent: 4500, avgSpending: 375, middlemanUses: 2, rating: "VIP", joinDate: "2023-05-12" },
  { id: "u2", name: "Kareem_99", contact: "01198765432", totalPosts: 1, totalPurchases: 2, totalSpent: 150, avgSpending: 75, middlemanUses: 0, rating: "NORMAL", joinDate: "2024-01-22" },
  { id: "u3", name: "Scammer_X", contact: "01200000000", totalPosts: 8, totalPurchases: 0, totalSpent: 0, avgSpending: 0, middlemanUses: 5, rating: "WARNING", joinDate: "2024-03-10" },
  { id: "u4", name: "Mona_FreeFire", contact: "01511112222", totalPosts: 0, totalPurchases: 25, totalSpent: 12000, avgSpending: 480, middlemanUses: 1, rating: "VIP", joinDate: "2022-11-05" },
  { id: "u5", name: "Youssef_COD", contact: "01099887766", totalPosts: 2, totalPurchases: 4, totalSpent: 800, avgSpending: 200, middlemanUses: 0, rating: "NORMAL", joinDate: "2023-08-30" },
  { id: "u6", name: "Tariq Seller", contact: "01233445566", totalPosts: 14, totalPurchases: 1, totalSpent: 50, avgSpending: 50, middlemanUses: 10, rating: "VIP", joinDate: "2023-01-14" },
  { id: "u7", name: "FakeAccount99", contact: "01122223333", totalPosts: 3, totalPurchases: 0, totalSpent: 0, avgSpending: 0, middlemanUses: 0, rating: "BANNED", joinDate: "2024-04-01" },
  { id: "u8", name: "Sarah PUBG", contact: "01555556666", totalPosts: 1, totalPurchases: 8, totalSpent: 3200, avgSpending: 400, middlemanUses: 0, rating: "NORMAL", joinDate: "2023-09-18" },
  { id: "u9", name: "Ali_Roblox", contact: "", totalPosts: 0, totalPurchases: 1, totalSpent: 200, avgSpending: 200, middlemanUses: 0, rating: "NORMAL", joinDate: "2024-02-14" },
  { id: "u10", name: "BigWhale", contact: "01000009999", totalPosts: 0, totalPurchases: 55, totalSpent: 45000, avgSpending: 818, middlemanUses: 0, rating: "VIP", joinDate: "2021-12-05" }
];

const MOCK_EXPENSES: StoreExpense[] = [
  { id: "e1", title: "TikTok Ads Campaign", amount: 1500, category: "Ads", date: new Date().toISOString() },
  { id: "e2", title: "Monthly Server Hosting", amount: 350, category: "Server", date: new Date().toISOString() },
];

const AdminFinanceContext = createContext<AdminFinanceContextType | undefined>(undefined);

export function AdminFinanceProvider({ children }: { children: ReactNode }) {
  const [crmUsers, setCrmUsers] = useState<CRMUser[]>(MOCK_USERS);
  const [expenses, setExpenses] = useState<StoreExpense[]>(MOCK_EXPENSES);
  const totalIncome = 125000; // Mock static income for the dashboard

  const addExpense = (expense: Omit<StoreExpense, "id">) => {
    setExpenses([...expenses, { ...expense, id: Math.random().toString(36).substr(2, 9) }]);
  };

  const removeExpense = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  const updateUserRating = (id: string, rating: UserRating) => {
    setCrmUsers(crmUsers.map(u => u.id === id ? { ...u, rating } : u));
  };

  const deleteUser = (id: string) => {
    setCrmUsers(crmUsers.filter(u => u.id !== id));
  };

  return (
    <AdminFinanceContext.Provider value={{
      crmUsers,
      expenses,
      totalIncome,
      addExpense,
      removeExpense,
      updateUserRating,
      deleteUser
    }}>
      {children}
    </AdminFinanceContext.Provider>
  );
}

export function useAdminFinance() {
  const context = useContext(AdminFinanceContext);
  if (!context) {
    throw new Error("useAdminFinance must be used within an AdminFinanceProvider");
  }
  return context;
}
