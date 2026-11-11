"use client";

import React, { useState, useEffect } from "react";
import { Icon } from "./SvgSprite";

interface QuoteModalProps {
  isOpen: boolean;
  selectedProduct: string;
  onClose: () => void;
}

const WHATSAPP_NUMBER = "919876543210";

export function QuoteModal({
  isOpen,
  selectedProduct,
  onClose,
}: QuoteModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [product, setProduct] = useState("Nexcolle Two-Wheeler Batteries");
  const [details, setDetails] = useState("");

  useEffect(() => {
    if (selectedProduct) {
      // Find closest matching option or set directly
      const options = [
        "Nexcolle Two-Wheeler Batteries",
        "FUJI Pistons & Con-Rods",
        "FUJI Cylinder Liners & Sleeves",
        "FUJI Engine Intake & Exhaust Valves",
        "FUJI Cylinder Head Gaskets",
        "FUJI Full Overhaul Gasket Sets",
        "FUJI Gasket Cloth Sheet",
        "Wholesale Dealership Program",
        "Other Inquiries",
      ];
      const match = options.find((opt) =>
        opt.toLowerCase().includes(selectedProduct.toLowerCase())
      );
      if (match) {
        setProduct(match);
      } else {
        setProduct(selectedProduct);
      }
    }
  }, [selectedProduct]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message =
      "Hello SHK Auto!%0A%0A*New Inquiry Details:*%0A" +
      "- *Name/Garage:* " +
      encodeURIComponent(name.trim()) +
      "%0A" +
      "- *Contact:* " +
      encodeURIComponent(phone.trim()) +
      "%0A" +
      "- *Product:* " +
      encodeURIComponent(product) +
      "%0A" +
      "- *Details/Quantity:* " +
      encodeURIComponent(details.trim() || "Catalog request");

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
      "_blank",
      "noopener,noreferrer"
    );

    setName("");
    setPhone("");
    setDetails("");
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(9, 13, 22, 0.75)",
        backdropFilter: "blur(4px)",
        padding: "16px",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "480px",
          background: "#151f34",
          color: "#fff",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-xl)",
          padding: "24px",
          position: "relative",
        }}
      >
        <div className="modal-header">
          <div>
            <h3 id="modalHeading">
              {selectedProduct && selectedProduct !== "General Inquiry"
                ? `Quote for ${selectedProduct}`
                : "Request Instant Quote"}
            </h3>
            <p style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: "2px" }}>
              Fast direct response on WhatsApp &amp; Phone
            </p>
          </div>
          <button
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close Modal"
            type="button"
          >
            <Icon name="x" />
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="clientName">Full Name / Garage Name *</label>
            <input
              type="text"
              id="clientName"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ramesh Sharma (Apex Motors)"
            />
          </div>

          <div className="form-group">
            <label htmlFor="clientPhone">WhatsApp / Mobile Number *</label>
            <input
              type="tel"
              id="clientPhone"
              name="phone"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
            />
          </div>

          <div className="form-group">
            <label htmlFor="productSelect">Product Interest</label>
            <select
              id="productSelect"
              name="product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value="Nexcolle Two-Wheeler Batteries">
                Nexcolle Two-Wheeler Batteries
              </option>
              <option value="FUJI Pistons & Con-Rods">
                FUJI Pistons &amp; Con-Rods
              </option>
              <option value="FUJI Cylinder Liners & Sleeves">
                FUJI Cylinder Liners &amp; Sleeves
              </option>
              <option value="FUJI Engine Intake & Exhaust Valves">
                FUJI Engine Intake &amp; Exhaust Valves
              </option>
              <option value="FUJI Cylinder Head Gaskets">
                FUJI Cylinder Head Gaskets
              </option>
              <option value="FUJI Full Overhaul Gasket Sets">
                FUJI Full Overhaul Gasket Sets
              </option>
              <option value="FUJI Gasket Cloth Sheet">
                FUJI Gasket Cloth Sheet
              </option>
              <option value="Wholesale Dealership Program">
                Wholesale Dealership Program
              </option>
              <option value="Other Inquiries">Other Inquiries</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="orderQuantity">Estimated Quantity / Vehicle Models</label>
            <textarea
              id="orderQuantity"
              name="details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="e.g. 20 sets of Splendor Pistons, 10 Nexcolle 12V 4Ah batteries..."
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%" }}
          >
            Send Inquiry via WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}

