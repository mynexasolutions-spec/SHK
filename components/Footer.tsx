"use client";

import React from "react";
import Link from "next/link";
import { Icon } from "./SvgSprite";

interface FooterProps {
  onSelectCategory?: (category: string) => void;
}

export function Footer({ onSelectCategory }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleCategoryClick = (cat: string) => {
    if (onSelectCategory) {
      onSelectCategory(cat);
    } else {
      window.location.href = `/#catalog`;
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo">
              <div className="logo-badge">S</div>
              <div className="logo-text">
                <div className="logo-title" style={{ color: "#fff" }}>
                  SHK<span style={{ color: "var(--primary)" }}>AUTO</span>
                </div>
                <div className="logo-sub">Precision Automotive Spares</div>
              </div>
            </div>
            <p>
              Authorized supplier and distributor of Nexcolle&trade; High-Performance Batteries and FUJI&trade; Precision Engine Spares for two-wheeler workshops, dealerships, and fleet services across India.
            </p>
            <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  display: "grid",
                  placeItems: "center",
                  color: "#ffffff",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#ffffff")}
                aria-label="LinkedIn"
              >
                <Icon name="linkedin" style={{ width: "16px", height: "16px" }} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  display: "grid",
                  placeItems: "center",
                  color: "#ffffff",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#ffffff")}
                aria-label="Instagram"
              >
                <Icon name="instagram" style={{ width: "16px", height: "16px" }} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  display: "grid",
                  placeItems: "center",
                  color: "#ffffff",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#ffffff")}
                aria-label="Facebook"
              >
                <Icon name="facebook" style={{ width: "16px", height: "16px" }} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="footer-title">Quick Navigation</h4>
            <ul className="footer-links">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/products">Products Catalog</Link>
              </li>
              <li>
                <Link href="/brands">Authorized Brands</Link>
              </li>
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
              <li>
                <Link href="/track-order">Track Your Order</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="footer-title">Product Categories</h4>
            <ul className="footer-links">
              <li>
                <Link href="/products?category=battery">
                  Nexcolle Batteries
                </Link>
              </li>
              <li>
                <Link href="/products?category=piston">
                  Piston &amp; Con-Rod Kits
                </Link>
              </li>
              <li>
                <Link href="/products?category=liner">
                  Cylinder Liners &amp; Sleeves
                </Link>
              </li>
              <li>
                <Link href="/products?category=valves">
                  High-Heat Engine Valves
                </Link>
              </li>
              <li>
                <Link href="/products?category=gasket">
                  Head Gaskets &amp; Sets
                </Link>
              </li>
              <li>
                <Link href="/products?category=gasket">
                  Gasket Cloth &amp; Sheets
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="footer-title">Direct Contact</h4>
            <ul className="footer-contact-list">
              <li className="footer-contact-item">
                <Icon name="map-pin" />
                <span>Main Auto Market, Central Hub, Industrial Area, India</span>
              </li>
              <li className="footer-contact-item">
                <Icon name="phone" />
                <a href="tel:+919876543210">+91 98765 43210</a>
              </li>
              <li className="footer-contact-item">
                <Icon name="mail" />
                <a href="mailto:info@shkauto.in">info@shkauto.in</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container">
            <div>
              &copy; <span>{currentYear}</span> SHK Auto. All rights reserved.
            </div>
            <div>
              Nexcolle&trade; &amp; FUJI&trade; are registered trademarks distributed by SHK Auto.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

