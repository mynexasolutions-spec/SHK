"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Icon } from "./SvgSprite";

interface HeaderProps {
  onOpenQuote?: (productName?: string) => void;
}

export function Header({ onOpenQuote }: HeaderProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const { itemCount, wishlist } = useCart();
  const { user, openAuthModal, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    if (!isHome) return;

    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      const sections = document.querySelectorAll<HTMLElement>("section[id], header[id]");

      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute("id");
        if (id && scrollPos >= top && scrollPos < top + height) {
          setActiveSection(id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header" style={{ border: "none", borderBottom: "none", boxShadow: "none", outline: "none" }}>
      <div className="container">
        <Link href="/" className="logo" aria-label="SHK Auto Homepage">
          <div className="logo-badge">S</div>
          <div className="logo-text">
            <div className="logo-title">
              SHK<span>AUTO</span>
            </div>
            <div className="logo-sub">Batteries &amp; Engine Spares</div>
          </div>
        </Link>

        <nav>
          <ul className={`nav-links ${menuOpen ? "active" : ""}`} id="navLinks">
            <li>
              <Link
                href="/"
                className={isHome && activeSection === "home" ? "active" : ""}
                onClick={closeMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className={pathname.startsWith("/products") ? "active" : ""}
                onClick={closeMenu}
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/brands"
                className={pathname.startsWith("/brands") ? "active" : ""}
                onClick={closeMenu}
              >
                Brands
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={pathname === "/about" ? "active" : ""}
                onClick={closeMenu}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className={pathname === "/contact" ? "active" : ""}
                onClick={closeMenu}
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>

        <div className="header-actions" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Like / Wishlist Button -> Redirects to /wishlist */}
          <Link
            href="/wishlist"
            style={{
              position: "relative",
              background: pathname === "/wishlist" ? "var(--primary)" : "rgba(255, 255, 255, 0.08)",
              color: "#ffffff",
              border: pathname === "/wishlist" ? "1px solid var(--primary)" : "1px solid rgba(255, 255, 255, 0.14)",
              borderRadius: "var(--radius-full)",
              padding: "8px 12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              cursor: "pointer",
              boxShadow: pathname === "/wishlist" ? "0 4px 14px rgba(249, 87, 22, 0.35)" : "var(--shadow-sm)",
              transition: "var(--transition)",
              textDecoration: "none",
            }}
            aria-label="View saved parts"
            title="Wishlist / Saved Parts"
          >
            <Icon
              name="heart"
              style={{
                width: "18px",
                height: "18px",
                color: "#ffffff",
                fill: wishlist.length > 0 ? "#ffffff" : "none",
              }}
            />
            {wishlist.length > 0 && (
              <span
                style={{
                  background: pathname === "/wishlist" ? "#ffffff" : "var(--primary)",
                  color: pathname === "/wishlist" ? "var(--primary)" : "#ffffff",
                  borderRadius: "999px",
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  padding: "2px 7px",
                  minWidth: "18px",
                  height: "18px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart Button -> Redirects to /cart */}
          <Link
            href="/cart"
            style={{
              position: "relative",
              background: pathname === "/cart" ? "var(--primary)" : "rgba(255, 255, 255, 0.08)",
              color: "#ffffff",
              border: pathname === "/cart" ? "1px solid var(--primary)" : "1px solid rgba(255, 255, 255, 0.14)",
              borderRadius: "var(--radius-full)",
              padding: "8px 14px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              fontSize: "0.85rem",
              fontWeight: 700,
              boxShadow: pathname === "/cart" ? "0 4px 14px rgba(249, 87, 22, 0.35)" : "var(--shadow-sm)",
              transition: "var(--transition)",
              textDecoration: "none",
            }}
            aria-label="View shopping cart"
            title="Shopping Cart"
          >
            <Icon
              name="cart"
              style={{
                width: "18px",
                height: "18px",
                color: "#ffffff",
              }}
            />
            {itemCount > 0 && (
              <span
                style={{
                  background: pathname === "/cart" ? "#ffffff" : "var(--primary)",
                  color: pathname === "/cart" ? "var(--primary)" : "#ffffff",
                  borderRadius: "999px",
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  padding: "2px 7px",
                  minWidth: "18px",
                  height: "18px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {itemCount}
              </span>
            )}
          </Link>

          {/* User Profile Button -> Redirects to /profile */}
          {user ? (
            <div style={{ position: "relative" }}>
              <Link
                href="/profile"
                style={{
                  background: pathname === "/profile" ? "var(--primary)" : "rgba(255, 255, 255, 0.08)",
                  border: pathname === "/profile" ? "1px solid var(--primary)" : "1px solid rgba(255, 255, 255, 0.16)",
                  borderRadius: "var(--radius-full)",
                  padding: "6px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  color: "#ffffff",
                  textDecoration: "none",
                  boxShadow: pathname === "/profile" ? "0 4px 14px rgba(249, 87, 22, 0.35)" : "var(--shadow-sm)",
                  transition: "var(--transition)",
                }}
                title="My Profile"
              >
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    background: pathname === "/profile" ? "#ffffff" : "var(--primary)",
                    color: pathname === "/profile" ? "var(--primary)" : "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.75rem",
                    fontWeight: 800,
                  }}
                >
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span>{user.name}</span>
                <Icon name="chevron-down" style={{ width: "12px", height: "12px" }} />
              </Link>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button
                onClick={() => openAuthModal("login")}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#cbd5e1",
                  fontWeight: 700,
                  fontSize: "0.88rem",
                  cursor: "pointer",
                  padding: "8px 12px",
                  transition: "color 0.2s",
                }}
              >
                Login
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => openAuthModal("signup")}
                style={{
                  borderRadius: "var(--radius-full)",
                  padding: "9px 20px",
                  fontSize: "0.88rem",
                  boxShadow: "0 4px 18px rgba(249, 87, 22, 0.35)",
                }}
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            className="mobile-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Navigation"
          >
            <Icon name={menuOpen ? "x" : "menu"} id="menuIcon" />
          </button>
        </div>
      </div>
    </header>
  );
}
