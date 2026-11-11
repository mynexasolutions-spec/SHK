"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Icon } from "./SvgSprite";

export function AuthModal() {
  const { isAuthModalOpen, authMode, closeAuthModal, openAuthModal, login, signup } = useAuth();

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup form state
  const [signupName, setSignupName] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [accountType, setAccountType] = useState<"workshop" | "retailer" | "rider">("workshop");
  const [signupPassword, setSignupPassword] = useState("");

  const [loading, setLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginIdentifier || !loginPassword) return;
    setLoading(true);
    await login(loginIdentifier, loginPassword);
    setLoading(false);
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupName || !signupPhone || !signupPassword) return;
    setLoading(true);
    await signup({
      name: signupName,
      email: signupEmail || `${signupPhone}@shkauto.in`,
      phone: signupPhone,
      accountType,
      password: signupPassword,
    });
    setLoading(false);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(9, 13, 22, 0.75)",
        backdropFilter: "blur(5px)",
        padding: "16px",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeAuthModal();
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "440px",
          backgroundColor: "#ffffff",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-xl)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Header Tabs */}
        <div
          style={{
            display: "flex",
            borderBottom: "1px solid var(--light-border)",
            background: "#f8fafc",
          }}
        >
          <button
            onClick={() => openAuthModal("login")}
            style={{
              flex: 1,
              padding: "16px 12px",
              border: "none",
              borderBottom: authMode === "login" ? "3px solid var(--primary)" : "3px solid transparent",
              background: authMode === "login" ? "#ffffff" : "transparent",
              color: authMode === "login" ? "var(--primary)" : "var(--text-muted)",
              fontWeight: 800,
              fontSize: "0.95rem",
              cursor: "pointer",
            }}
          >
            Log In
          </button>
          <button
            onClick={() => openAuthModal("signup")}
            style={{
              flex: 1,
              padding: "16px 12px",
              border: "none",
              borderBottom: authMode === "signup" ? "3px solid var(--primary)" : "3px solid transparent",
              background: authMode === "signup" ? "#ffffff" : "transparent",
              color: authMode === "signup" ? "var(--primary)" : "var(--text-muted)",
              fontWeight: 800,
              fontSize: "0.95rem",
              cursor: "pointer",
            }}
          >
            Create Account
          </button>
          <button
            onClick={closeAuthModal}
            style={{
              width: "44px",
              background: "transparent",
              border: "none",
              color: "var(--text-muted)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            aria-label="Close"
          >
            <Icon name="x" />
          </button>
        </div>

        {/* Form Body */}
        <div style={{ padding: "24px 28px" }}>
          {authMode === "login" ? (
            /* Login Form */
            <form onSubmit={handleLoginSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ textAlign: "center", marginBottom: "8px" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-main)" }}>
                  Welcome Back
                </h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "4px" }}>
                  Access your trade prices, order tracking &amp; GST invoices.
                </p>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "6px" }}>
                  Mobile Number / Email
                </label>
                <input
                  type="text"
                  required
                  placeholder="+91 98765 43210 or email"
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "11px 14px",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--light-border)",
                    fontSize: "0.9rem",
                  }}
                />
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <label style={{ fontSize: "0.85rem", fontWeight: 700 }}>Password</label>
                  <a href="#" style={{ fontSize: "0.75rem", color: "var(--primary)", fontWeight: 600 }}>
                    Forgot Password?
                  </a>
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "11px 14px",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--light-border)",
                    fontSize: "0.9rem",
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{ width: "100%", justifyContent: "center", marginTop: "8px", height: "44px" }}
              >
                {loading ? "Authenticating..." : "Sign In to Account"}
              </button>

              <div style={{ textAlign: "center", marginTop: "12px", fontSize: "0.85rem", color: "var(--text-muted)" }}>
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => openAuthModal("signup")}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "var(--primary)",
                    fontWeight: 700,
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  Sign Up Free
                </button>
              </div>
            </form>
          ) : (
            /* Signup Form */
            <form onSubmit={handleSignupSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ textAlign: "center", marginBottom: "4px" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-main)" }}>
                  Register Trade Account
                </h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "4px" }}>
                  Unlock B2B dealer tier pricing &amp; priority express logistics.
                </p>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, marginBottom: "4px" }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Md Irshad"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--light-border)",
                    fontSize: "0.85rem",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, marginBottom: "4px" }}>
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={signupPhone}
                  onChange={(e) => setSignupPhone(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--light-border)",
                    fontSize: "0.85rem",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, marginBottom: "4px" }}>
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--light-border)",
                    fontSize: "0.85rem",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, marginBottom: "4px" }}>
                  Password *
                </label>
                <input
                  type="password"
                  required
                  placeholder="At least 6 characters"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--light-border)",
                    fontSize: "0.85rem",
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{ width: "100%", justifyContent: "center", marginTop: "6px", height: "44px" }}
              >
                {loading ? "Registering..." : "Create Account"}
              </button>

              <div style={{ textAlign: "center", marginTop: "10px", fontSize: "0.85rem", color: "var(--text-muted)" }}>
                Already registered?{" "}
                <button
                  type="button"
                  onClick={() => openAuthModal("login")}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "var(--primary)",
                    fontWeight: 700,
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  Log In
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

