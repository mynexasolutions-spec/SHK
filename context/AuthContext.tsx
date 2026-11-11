"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  name: string;
  email: string;
  phone: string;
  accountType: "workshop" | "retailer" | "rider";
  workshopName?: string;
  gstin?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

interface AuthContextType {
  user: User | null;
  login: (emailOrPhone: string, password: string) => Promise<{ success: boolean; message?: string }>;
  signup: (userData: {
    name: string;
    email: string;
    phone: string;
    accountType: "workshop" | "retailer" | "rider";
    password: string;
  }) => Promise<{ success: boolean; message?: string }>;
  updateUser: (data: Partial<User>) => void;
  logout: () => void;
  isAuthModalOpen: boolean;
  authMode: "login" | "signup";
  openAuthModal: (mode?: "login" | "signup") => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("shk_auth_user");
      if (savedUser) {
        try {
          const parsed = JSON.parse(savedUser);
          if (parsed && typeof parsed === "object") {
            setUser(parsed);
          }
        } catch {
          localStorage.removeItem("shk_auth_user");
        }
      }
    } catch {
      // Ignore
    }
    setMounted(true);
  }, []);

  const login = async (emailOrPhone: string, _pass: string) => {
    // Simulated authentication
    const displayName = emailOrPhone.includes("@")
      ? emailOrPhone.split("@")[0]
      : "Garage Partner";

    const formattedName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
    const loggedUser: User = {
      name: formattedName,
      email: emailOrPhone.includes("@") ? emailOrPhone : `${emailOrPhone}@shkauto.in`,
      phone: emailOrPhone.match(/^\d+$/) ? emailOrPhone : "+91 98765 43210",
      accountType: "workshop",
    };

    setUser(loggedUser);
    try {
      localStorage.setItem("shk_auth_user", JSON.stringify(loggedUser));
    } catch {
      // Ignore
    }
    setIsAuthModalOpen(false);
    return { success: true };
  };

  const signup = async (userData: {
    name: string;
    email: string;
    phone: string;
    accountType: "workshop" | "retailer" | "rider";
    password: string;
  }) => {
    const newUser: User = {
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      accountType: userData.accountType,
    };

    setUser(newUser);
    try {
      localStorage.setItem("shk_auth_user", JSON.stringify(newUser));
    } catch {
      // Ignore
    }
    setIsAuthModalOpen(false);
    return { success: true };
  };

  const updateUser = (data: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...data };
      try {
        localStorage.setItem("shk_auth_user", JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem("shk_auth_user");
    } catch {
      // Ignore
    }
  };

  const openAuthModal = (mode: "login" | "signup" = "login") => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        updateUser,
        logout,
        isAuthModalOpen,
        authMode,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

