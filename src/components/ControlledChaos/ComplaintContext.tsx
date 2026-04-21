import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

export interface Complaint {
  id: string;
  userId: string;
  userName: string;
  userContact: string;
  description: string;
  image?: string;
  timestamp: string;
  status: "pending" | "investigating" | "resolved";
}

interface ComplaintContextType {
  complaints: Complaint[];
  submitComplaint: (description: string, image?: string) => void;
  resolveComplaint: (id: string) => void;
  deleteComplaint: (id: string) => void;
}

const ComplaintContext = createContext<ComplaintContextType | undefined>(undefined);

export function ComplaintProvider({ children }: { children: ReactNode }) {
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  // Load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem("al_lord_complaints");
    if (saved) {
      try {
        setComplaints(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse complaints", e);
      }
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem("al_lord_complaints", JSON.stringify(complaints));
  }, [complaints]);

  const submitComplaint = (description: string, image?: string) => {
    // Get user info from existing login context or session (Mocking for now as we'll use actual login info when calling)
    // Actually, the caller will handle getting the user data or it can be done here if we import LoginContext
    // Let's assume the caller provides nothing and we just use whatever is in localStorage or dummy for guest
    
    const storedUser = localStorage.getItem("al_lord_user_data");
    const userData = storedUser ? JSON.parse(storedUser) : null;

    const newComplaint: Complaint = {
      id: "CMP-" + Math.random().toString(36).substring(2, 9).toUpperCase(),
      userId: userData?.contact || "guest-" + Date.now(),
      userName: userData?.name || "Guest User",
      userContact: userData?.contact || "Anonymous",
      description,
      image,
      timestamp: new Date().toISOString(),
      status: "pending"
    };

    setComplaints(prev => [newComplaint, ...prev]);
  };

  const resolveComplaint = (id: string) => {
    setComplaints(prev => prev.map(c => c.id === id ? { ...c, status: "resolved" } : c));
  };

  const deleteComplaint = (id: string) => {
    setPosts(prev => prev.filter(c => c.id !== id));
  };

  return (
    <ComplaintContext.Provider value={{
      complaints,
      submitComplaint,
      resolveComplaint,
      deleteComplaint
    }}>
      {children}
    </ComplaintContext.Provider>
  );
}

export function useComplaints() {
  const context = useContext(ComplaintContext);
  if (!context) {
    throw new Error("useComplaints must be used within a ComplaintProvider");
  }
  return context;
}
