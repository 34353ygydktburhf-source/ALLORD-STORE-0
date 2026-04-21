import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { saveStatuses, getStatuses } from "@/lib/statusDb";

export interface AdminStatus {
  id: string;
  type: "image" | "video";
  url: string;
  caption?: string;
  timestamp: string;
  duration?: number; // for video
  action?: {
    label: string;
    link: string;
  };
}

interface AdminStatusContextType {
  statuses: AdminStatus[];
  addStatus: (status: Omit<AdminStatus, "id" | "timestamp">) => void;
  removeStatus: (id: string) => void;
  hasActiveStatus: boolean;
  markStatusAsSeen: () => void;
  isStatusSeen: boolean;
  isViewerOpen: boolean;
  openViewer: (onClose?: () => void) => void;
  closeViewer: () => void;
}

const AdminStatusContext = createContext<AdminStatusContextType | undefined>(undefined);

export function AdminStatusProvider({ children }: { children: ReactNode }) {
  const [statuses, setStatuses] = useState<AdminStatus[]>([]);
  const [isStatusSeen, setIsStatusSeen] = useState<boolean>(true);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [viewerCallback, setViewerCallback] = useState<(() => void) | undefined>(undefined);

  // Load and Cleanup
  useEffect(() => {
    const loadStatuses = async () => {
      const stored = await getStatuses();
      const lastSeenTime = localStorage.getItem("al-lord-status-last-seen");
      
      if (stored && stored.length > 0) {
        try {
          const now = new Date().getTime();
          const twentyFourHours = 24 * 60 * 60 * 1000;
          
          // Filter out statuses older than 24 hours
          const active = stored.filter(s => {
            const statusTime = new Date(s.timestamp).getTime();
            return now - statusTime < twentyFourHours;
          });
          
          setStatuses(active);
          
          // Check if there are new statuses since last seen
          const latestStatusTime = Math.max(...active.map(s => new Date(s.timestamp).getTime()));
          if (!lastSeenTime || latestStatusTime > parseInt(lastSeenTime)) {
            setIsStatusSeen(false);
          } else {
            setIsStatusSeen(true);
          }
          
          // Save cleaned list (sync back to IDB)
          if (active.length !== stored.length) {
            await saveStatuses(active);
          }
        } catch (e) {
          console.error("Failed to parse statuses", e);
        }
      } else {
        // Default Status if empty
        const defaultStatus: AdminStatus = {
          id: "welcome-story",
          type: "image",
          url: "https://i.pinimg.com/736x/0b/91/a5/0b91a5919e54ac44629a8f5ca01e84b3.jpg",
          caption: "Welcome to AL LORD STORE! Check our latest offers 🚀",
          timestamp: new Date().toISOString()
        };
        setStatuses([defaultStatus]);
        setIsStatusSeen(false);
        await saveStatuses([defaultStatus]);
      }
    };

    loadStatuses();
    
    // Cleanup interval
    const interval = setInterval(loadStatuses, 60000 * 30); // Check every 30 mins
    return () => clearInterval(interval);
  }, []);

  const addStatus = async (status: Omit<AdminStatus, "id" | "timestamp">) => {
    const newStatus: AdminStatus = {
      ...status,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString()
    };
    
    const updated = [...statuses, newStatus];
    setStatuses(updated);
    setIsStatusSeen(false);
    await saveStatuses(updated);
  };

  const removeStatus = async (id: string) => {
    const updated = statuses.filter(s => s.id !== id);
    setStatuses(updated);
    await saveStatuses(updated);
    if (updated.length === 0) setIsStatusSeen(true);
  };

  const markStatusAsSeen = () => {
    setIsStatusSeen(true);
    localStorage.setItem("al-lord-status-last-seen", new Date().getTime().toString());
  };

  const openViewer = (onClose?: () => void) => {
    setViewerCallback(() => onClose);
    setIsViewerOpen(true);
  };

  const closeViewer = () => {
    setIsViewerOpen(false);
    if (viewerCallback) {
      viewerCallback();
      setViewerCallback(undefined);
    }
  };

  return (
    <AdminStatusContext.Provider 
      value={{ 
        statuses, 
        addStatus, 
        removeStatus, 
        hasActiveStatus: statuses.length > 0,
        markStatusAsSeen,
        isStatusSeen,
        isViewerOpen,
        openViewer,
        closeViewer
      }}
    >
      {children}
    </AdminStatusContext.Provider>
  );
}

export function useAdminStatus() {
  const context = useContext(AdminStatusContext);
  if (!context) {
    throw new Error("useAdminStatus must be used within an AdminStatusProvider");
  }
  return context;
}
