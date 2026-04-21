import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useNotifications } from "./NotificationContext";

interface UserData {
  id: string;
  name: string;
  contact: string;
  method: "email" | "phone" | "google";
  date: string;
}

export interface SavedAccount {
  id: string;
  game: string;
  accountId: string;
}

interface LoginContextType {
  isLoginOpen: boolean;
  openLogin: () => void;
  closeLogin: () => void;
  isLoggedIn: boolean;
  userType: "user" | "guest" | null;
  userData: UserData | null;
  savedAccounts: SavedAccount[];
  login: (type: "user" | "guest", data?: UserData) => void;
  logout: () => void;
  saveAccount: (game: string, accountId: string) => void;
  deleteAccount: (id: string) => void;
  updateAccount: (id: string, newAccountId: string) => void;
  isLogoutConfirmOpen: boolean;
  openLogoutConfirm: () => void;
  closeLogoutConfirm: () => void;
  isProfileOpen: boolean;
  openProfile: () => void;
  closeProfile: () => void;
}

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export function LoginProvider({ children }: { children: ReactNode }) {
  const { addNotification } = useNotifications();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<"user" | "guest" | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [savedAccounts, setSavedAccounts] = useState<SavedAccount[]>([]);

  useEffect(() => {
    const savedLogin = localStorage.getItem("is_logged_in");
    const savedUserType = localStorage.getItem("user_type");
    const savedUserData = localStorage.getItem("user_data");
    const storedAccounts = localStorage.getItem("saved_accounts");

    if (savedLogin === "true") {
      setIsLoggedIn(true);
      setUserType(savedUserType as "user" | "guest");
      
      if (savedUserData) {
        try {
          const parsedData = JSON.parse(savedUserData);
          if (parsedData && typeof parsedData === 'object') {
            // Patch: if user has no ID, generate one
            if (!parsedData.id) {
              parsedData.id = `AL-${Math.floor(10000 + Math.random() * 90000)}`;
              localStorage.setItem("user_data", JSON.stringify(parsedData));
              localStorage.setItem("user_id", parsedData.id);
            }
            setUserData(parsedData);
          }
        } catch (e) {
          console.error("Failed to parse user data", e);
        }
      }
      
      if (storedAccounts) {
        try {
          const parsedAccounts = JSON.parse(storedAccounts);
          if (Array.isArray(parsedAccounts)) {
            setSavedAccounts(parsedAccounts);
          }
        } catch (e) {
          console.error("Failed to parse accounts", e);
        }
      }
    }
  }, []);

  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);

  const openLogoutConfirm = () => setIsLogoutConfirmOpen(true);
  const closeLogoutConfirm = () => setIsLogoutConfirmOpen(false);
  
  const openProfile = () => setIsProfileOpen(true);
  const closeProfile = () => setIsProfileOpen(false);

  const login = (type: "user" | "guest", data?: Omit<UserData, 'id'> & { id?: string }) => {
    setIsLoggedIn(true);
    setUserType(type);
    localStorage.setItem("is_logged_in", "true");
    localStorage.setItem("user_type", type);
    
    if (data) {
      const finalData: UserData = {
        ...data,
        id: data.id || `AL-${Math.floor(10000 + Math.random() * 90000)}`
      } as UserData;

      setUserData(finalData);
      localStorage.setItem("user_data", JSON.stringify(finalData));
      localStorage.setItem("user_name", finalData.name);
      localStorage.setItem("user_contact", finalData.contact);
      localStorage.setItem("user_id", finalData.id);
      
      addNotification(
         "مرحباً بك مجدداً! 👋", 
         `أهلاً بك يا ${data.name} في متجر اللورد. نتمنى لك تجربة ممتعة.`,
         "success"
      );
    } else if (type === "guest") {
      const guestData: UserData = {
        id: `GUEST-${Math.floor(1000 + Math.random() * 9000)}`,
        name: "Guest",
        contact: "Anonymous Access",
        method: "google",
        date: new Date().toLocaleDateString()
      };
      setUserData(guestData);
      localStorage.setItem("user_data", JSON.stringify(guestData));
      localStorage.setItem("user_id", guestData.id);
      
      addNotification(
        "دخول كضيف 🕵️", 
        "أهلاً بك! يمكنك تصفح الموقع بالكامل كضيف الآن.",
        "info"
      );
    }
    
    closeLogin();
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserType(null);
    setUserData(null);
    setSavedAccounts([]);
    localStorage.removeItem("is_logged_in");
    localStorage.removeItem("user_type");
    localStorage.removeItem("user_data");
    localStorage.removeItem("user_contact");
    localStorage.removeItem("user_name");
    localStorage.removeItem("saved_accounts");
    closeLogoutConfirm();
  };

  const saveAccount = (game: string, accountId: string) => {
    const newAccount: SavedAccount = {
      id: Math.random().toString(36).substr(2, 9),
      game,
      accountId
    };
    const updatedAccounts = [...savedAccounts, newAccount];
    setSavedAccounts(updatedAccounts);
    localStorage.setItem("saved_accounts", JSON.stringify(updatedAccounts));
  };

  const deleteAccount = (id: string) => {
    const updatedAccounts = savedAccounts.filter(acc => acc.id !== id);
    setSavedAccounts(updatedAccounts);
    localStorage.setItem("saved_accounts", JSON.stringify(updatedAccounts));
  };

  const updateAccount = (id: string, newAccountId: string) => {
    const updatedAccounts = savedAccounts.map(acc => 
      acc.id === id ? { ...acc, accountId: newAccountId } : acc
    );
    setSavedAccounts(updatedAccounts);
    localStorage.setItem("saved_accounts", JSON.stringify(updatedAccounts));
  };

  return (
    <LoginContext.Provider 
      value={{ 
        isLoginOpen, 
        openLogin, 
        closeLogin, 
        isLoggedIn, 
        userType, 
        userData,
        savedAccounts,
        login, 
        logout,
        saveAccount,
        deleteAccount,
        updateAccount,
        isLogoutConfirmOpen,
        openLogoutConfirm,
        closeLogoutConfirm,
        isProfileOpen,
        openProfile,
        closeProfile
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}

export function useLogin() {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLogin must be used within a LoginProvider");
  }
  return context;
}
