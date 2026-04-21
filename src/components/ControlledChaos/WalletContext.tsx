import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNotifications } from "./NotificationContext";

export interface GemTransaction {
  id: string;
  type: "credit" | "debit";
  amount: number;
  date: string;
  description: string;
}

export interface GiftCode {
  code: string;
  amount: number;
  isActive: boolean;
}

export interface GemPackage {
  id: string;
  name: string;
  nameEn: string;
  gems: number;
  price: number;
  popular: boolean;
  color: string;
}

interface WalletContextType {
  balance: number;
  transactions: GemTransaction[];
  referralCode: string;
  referralCount: number;
  giftCodes: GiftCode[];
  gemPackages: GemPackage[];
  
  addGems: (amount: number, description: string) => void;
  spendGems: (amount: number, description: string) => boolean;
  redeemGiftCode: (code: string) => boolean;
  createGiftCode: (code: string, amount: number) => void;
  deleteGiftCode: (code: string) => void;
  executeReferralReward: () => void;
  addGemPackage: (pkg: GemPackage) => void;
  deleteGemPackage: (id: string) => void;
  updateGemPackage: (id: string, pkg: Partial<GemPackage>) => void;
  addGemsToUser: (userId: string, amount: number, description?: string) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const { addNotification } = useNotifications();
  
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<GemTransaction[]>([]);
  const [referralCode, setReferralCode] = useState("");
  const [referralCount, setReferralCount] = useState(0);
  const [giftCodes, setGiftCodes] = useState<GiftCode[]>([]);
  const [gemPackages, setGemPackages] = useState<GemPackage[]>([
    { id: "pack-1", name: "أصغر باقة", nameEn: "Starter Pack", gems: 100, price: 1.5, popular: false, color: "#fffbf0" },
    { id: "pack-2", name: "الباقة الشعبية", nameEn: "Popular Pack", gems: 500, price: 6.5, popular: true, color: "#ccff00" },
    { id: "pack-3", name: "باقة اللورد", nameEn: "Lord's Pack", gems: 1500, price: 18.0, popular: false, color: "#b084ff" },
    { id: "pack-4", name: "صندوق اللورد الكبير", nameEn: "Lord's Vault", gems: 5000, price: 55.0, popular: false, color: "#ff5e00" }
  ]);

  // Load state from local storage on mount
  useEffect(() => {
    const savedBalance = localStorage.getItem("gem_balance");
    const savedTx = localStorage.getItem("gem_transactions");
    const savedCodes = localStorage.getItem("gem_gift_codes");
    const savedRefCount = localStorage.getItem("gem_referral_count");
    const savedGemPackages = localStorage.getItem("gem_packages");
    
    if (savedBalance) setBalance(parseInt(savedBalance, 10));
    if (savedTx) setTransactions(JSON.parse(savedTx));
    if (savedCodes) setGiftCodes(JSON.parse(savedCodes));
    if (savedRefCount) setReferralCount(parseInt(savedRefCount, 10));
    if (savedGemPackages) setGemPackages(JSON.parse(savedGemPackages));
    
    setReferralCode("AL-LORD-" + Math.random().toString(36).substr(2, 6).toUpperCase());
  }, []);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem("gem_balance", balance.toString());
    localStorage.setItem("gem_transactions", JSON.stringify(transactions));
    localStorage.setItem("gem_gift_codes", JSON.stringify(giftCodes));
    localStorage.setItem("gem_referral_count", referralCount.toString());
    if (gemPackages.length > 0) {
      localStorage.setItem("gem_packages", JSON.stringify(gemPackages));
    }
  }, [balance, transactions, giftCodes, referralCount, gemPackages]);

  const addGems = (amount: number, description: string) => {
    setBalance(prev => prev + amount);
    const tx: GemTransaction = {
      id: "TX-" + Date.now(),
      type: "credit",
      amount,
      date: new Date().toISOString().split('T')[0],
      description
    };
    setTransactions(prev => [tx, ...prev]);
    addNotification("Gems Required", `+${amount} Gems: ${description}`, "success");
  };

  const spendGems = (amount: number, description: string) => {
    if (balance < amount) {
      addNotification("Insufficient Gems", "شحن رصيد المحفظة المطلوب أولاً.", "error");
      return false;
    }
    setBalance(prev => prev - amount);
    const tx: GemTransaction = {
      id: "TX-" + Date.now(),
      type: "debit",
      amount,
      date: new Date().toISOString().split('T')[0],
      description
    };
    setTransactions(prev => [tx, ...prev]);
    return true;
  };

  const redeemGiftCode = (code: string) => {
    const foundCode = giftCodes.find(c => c.code === code && c.isActive);
    if (foundCode) {
      addGems(foundCode.amount, `هديّة الكود: ${code}`);
      setGiftCodes(prev => prev.filter(c => c.code !== code)); // one-time use for simplicity
      return true;
    }
    return false;
  };

  const createGiftCode = (code: string, amount: number) => {
    const newCode: GiftCode = { code, amount, isActive: true };
    setGiftCodes(prev => [...prev, newCode]);
  };

  const deleteGiftCode = (code: string) => {
    setGiftCodes(prev => prev.filter(c => c.code !== code));
  };

  const executeReferralReward = () => {
    setReferralCount(prev => prev + 1);
    addGems(50, "مكافأة دعوة صديق");
  };

  const addGemPackage = (pkg: GemPackage) => setGemPackages(prev => [...prev, pkg]);
  const deleteGemPackage = (id: string) => setGemPackages(prev => prev.filter(p => p.id !== id));
  const updateGemPackage = (id: string, pkg: Partial<GemPackage>) => {
    setGemPackages(prev => prev.map(p => p.id === id ? { ...p, ...pkg } : p));
  };

  const addGemsToUser = (userId: string, amount: number, description?: string) => {
    // In this mock, we just add to the local balance. 
    // In a real app, this would update a database record for that userId.
    addGems(amount, description || `شحن إداري للمستخدم ${userId}`);
    addNotification("Gems Sent", `تم إرسال ${amount} جوهرة إلى ${userId}`, "success");
  };

  return (
    <WalletContext.Provider value={{
      balance,
      transactions,
      referralCode,
      referralCount,
      giftCodes,
      addGems,
      spendGems,
      redeemGiftCode,
      createGiftCode,
      deleteGiftCode,
      executeReferralReward,
      gemPackages,
      addGemPackage,
      deleteGemPackage,
      updateGemPackage,
      addGemsToUser
    }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}
