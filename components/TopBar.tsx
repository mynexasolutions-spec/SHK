import React from "react";
import Link from "next/link";
import { Icon } from "./SvgSprite";

export function TopBar() {
  return (
    <div className="top-bar">
      <div className="container">
        <div className="top-bar-left">
          <span className="status-dot">Dispatch Center Live</span>
          <span>&bull; Pan-India Logistics &amp; Wholesale Supply</span>
        </div>
        <div className="top-bar-right" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Link href="/track-order" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <Icon name="truck" /> Track Order
          </Link>
          <a href="tel:+919876543210">
            <Icon name="phone" /> +91 98765 43210
          </a>
          <a href="mailto:sales@shkauto.in">
            <Icon name="mail" /> sales@shkauto.in
          </a>
        </div>
      </div>
    </div>
  );
}
