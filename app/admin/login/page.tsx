"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/SvgSprite";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // If already authenticated, redirect to /admin directly
  useEffect(() => {
    try {
      const isAuth = localStorage.getItem("shk_admin_auth") === "true";
      if (isAuth) {
        router.replace("/admin");
      }
    } catch {
      // Ignore
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    setTimeout(() => {
      const cleanEmail = email.trim().toLowerCase();
      const cleanPass = password.trim();

      // Flexible validation: matches standard demo or any valid email with password >= 6
      if (
        (cleanEmail === "admin@shkauto.in" && cleanPass === "admin123") ||
        (cleanEmail.includes("@") && cleanPass.length >= 6)
      ) {
        try {
          localStorage.setItem("shk_admin_auth", "true");
          localStorage.setItem(
            "shk_admin_user",
            JSON.stringify({
              name: "Md Irshad",
              role: "Super Admin",
              email: cleanEmail || "admin@shkauto.in",
              loginTime: new Date().toISOString(),
            })
          );
        } catch {
          // Ignore
        }
        router.push("/admin");
      } else {
        setIsLoading(false);
        setErrorMessage("Invalid credentials. Try: admin@shkauto.in with password: admin123");
      }
    }, 600);
  };

  const handleFillDemo = () => {
    setEmail("admin@shkauto.in");
    setPassword("admin123");
    setErrorMessage(null);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#070a0f",
        backgroundImage: "radial-gradient(ellipse at 50% 0%, rgba(249, 87, 22, 0.12) 0%, transparent 60%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily: "var(--font-sans)",
        color: "#ffffff",
      }}
    >
      {/* Container Box */}
      <div
        style={{
          width: "100%",
          maxWidth: "440px",
          backgroundColor: "#0e131d",
          borderRadius: "24px",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.6), 0 0 40px rgba(249, 87, 22, 0.08)",
          padding: "clamp(28px, 5vw, 40px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle orange accent bar at top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, var(--primary) 0%, #ff753e 100%)",
          }}
        />

        {/* Brand Header */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)",
                display: "grid",
                placeItems: "center",
                fontWeight: 900,
                fontSize: "1.3rem",
                color: "#ffffff",
                boxShadow: "0 6px 18px rgba(249, 87, 22, 0.35)",
              }}
            >
              S
            </div>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: "1.35rem", fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1 }}>
                SHK<span style={{ color: "var(--primary)" }}>AUTO</span>
              </div>
              <div style={{ fontSize: "0.68rem", color: "#94a3b8", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginTop: "3px" }}>
                Admin Control Portal
              </div>
            </div>
          </div>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(249, 87, 22, 0.12)",
              border: "1px solid rgba(249, 87, 22, 0.25)",
              padding: "4px 12px",
              borderRadius: "var(--radius-full)",
              fontSize: "0.72rem",
              fontWeight: 700,
              color: "#ff753e",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            <Icon name="lock" style={{ width: "12px", height: "12px" }} />
            Restricted Admin Area
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div
            style={{
              backgroundColor: "rgba(239, 68, 68, 0.12)",
              border: "1px solid rgba(239, 68, 68, 0.35)",
              borderRadius: "12px",
              padding: "12px 16px",
              fontSize: "0.82rem",
              color: "#fca5a5",
              marginBottom: "20px",
              lineHeight: 1.45,
            }}
          >
            {errorMessage}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Email / Username */}
          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="admin-email"
              style={{
                display: "block",
                fontSize: "0.82rem",
                fontWeight: 700,
                color: "#cbd5e1",
                marginBottom: "8px",
              }}
            >
              Administrator Email
            </label>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#64748b",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Icon name="user" style={{ width: "16px", height: "16px" }} />
              </div>
              <input
                id="admin-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@shkauto.in"
                style={{
                  width: "100%",
                  height: "46px",
                  padding: "0 14px 0 42px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  backgroundColor: "#131926",
                  color: "#ffffff",
                  fontSize: "0.92rem",
                  outline: "none",
                  transition: "border-color 0.2s ease",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255, 255, 255, 0.12)")}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="admin-password"
              style={{
                display: "block",
                fontSize: "0.82rem",
                fontWeight: 700,
                color: "#cbd5e1",
                marginBottom: "8px",
              }}
            >
              Admin Master Password
            </label>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#64748b",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Icon name="lock" style={{ width: "16px", height: "16px" }} />
              </div>
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                style={{
                  width: "100%",
                  height: "46px",
                  padding: "0 44px 0 42px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  backgroundColor: "#131926",
                  color: "#ffffff",
                  fontSize: "0.92rem",
                  outline: "none",
                  transition: "border-color 0.2s ease",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255, 255, 255, 0.12)")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "transparent",
                  border: "none",
                  color: "#94a3b8",
                  cursor: "pointer",
                  display: "grid",
                  placeItems: "center",
                  padding: "4px",
                }}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <Icon name="eye" style={{ width: "16px", height: "16px" }} />
              </button>
            </div>
          </div>

          {/* Remember Workstation */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "24px",
              fontSize: "0.82rem",
            }}
          >
            <label style={{ display: "flex", alignItems: "center", gap: "8px", color: "#94a3b8", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ accentColor: "var(--primary)", cursor: "pointer" }}
              />
              Remember this workstation
            </label>
            <span style={{ color: "#64748b", fontSize: "0.78rem" }}>256-Bit SSL</span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: "100%",
              height: "48px",
              backgroundColor: "var(--primary)",
              color: "#ffffff",
              border: "none",
              borderRadius: "var(--radius-full)",
              fontSize: "0.95rem",
              fontWeight: 800,
              cursor: isLoading ? "not-allowed" : "pointer",
              boxShadow: "0 8px 25px rgba(249, 87, 22, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
            }}
          >
            {isLoading ? (
              <span>Authenticating Admin...</span>
            ) : (
              <>
                <Icon name="bolt" style={{ width: "16px", height: "16px" }} />
                <span>Enter Admin Console</span>
              </>
            )}
          </button>
        </form>

        {/* Quick Demo Credentials Pill */}
        <div style={{ marginTop: "24px", textAlign: "center" }}>
          <button
            type="button"
            onClick={handleFillDemo}
            style={{
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px dashed rgba(255, 255, 255, 0.2)",
              color: "#cbd5e1",
              fontSize: "0.76rem",
              padding: "6px 14px",
              borderRadius: "var(--radius-full)",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--primary)";
              e.currentTarget.style.color = "var(--primary-light)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
              e.currentTarget.style.color = "#cbd5e1";
            }}
          >
            <span>Auto-Fill Demo Credentials (admin@shkauto.in)</span>
          </button>
        </div>

        {/* Return to Customer Storefront */}
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <Link
            href="/"
            style={{
              fontSize: "0.82rem",
              color: "#94a3b8",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
          >
            Return to Customer Storefront
          </Link>
        </div>
      </div>
    </div>
  );
}

