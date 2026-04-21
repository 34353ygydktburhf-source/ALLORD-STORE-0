import React, { createContext, useContext, useState } from "react";

export interface Coupon {
  id: string;
  code: string;
  discountPercent: number; // e.g. 0.15 for 15%
  isActive: boolean;
}

const DEFAULT_COUPONS: Coupon[] = [
  { id: "c1", code: "LORD15", discountPercent: 0.15, isActive: true },
  { id: "c2", code: "WELCOME", discountPercent: 0.10, isActive: true }
];

interface CouponContextType {
  coupons: Coupon[];
  addCoupon: (coupon: Omit<Coupon, "id">) => void;
  updateCoupon: (id: string, updates: Partial<Coupon>) => void;
  removeCoupon: (id: string) => void;
  validateCoupon: (code: string) => Coupon | null;
}

const CouponContext = createContext<CouponContextType | undefined>(undefined);

export const useCoupons = () => {
  const context = useContext(CouponContext);
  if (!context) throw new Error("useCoupons must be used within CouponProvider");
  return context;
};

export const CouponProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const stored = localStorage.getItem("al-lord-coupons");
    return stored ? JSON.parse(stored) : DEFAULT_COUPONS;
  });

  const saveCoupons = (newCoupons: Coupon[]) => {
    setCoupons(newCoupons);
    localStorage.setItem("al-lord-coupons", JSON.stringify(newCoupons));
  };

  const addCoupon = (coupon: Omit<Coupon, "id">) => {
    const newCoupon: Coupon = { ...coupon, id: "cpn-" + Math.random().toString(36).substring(2, 9) };
    saveCoupons([...coupons, newCoupon]);
  };

  const updateCoupon = (id: string, updates: Partial<Coupon>) => {
    saveCoupons(coupons.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  };

  const removeCoupon = (id: string) => {
    saveCoupons(coupons.filter((c) => c.id !== id));
  };

  const validateCoupon = (code: string) => {
    const found = coupons.find((c) => c.code.toUpperCase() === code.trim().toUpperCase() && c.isActive);
    return found || null;
  };

  return (
    <CouponContext.Provider value={{ coupons, addCoupon, updateCoupon, removeCoupon, validateCoupon }}>
      {children}
    </CouponContext.Provider>
  );
};
