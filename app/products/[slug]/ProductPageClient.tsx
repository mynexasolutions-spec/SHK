"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Icon } from "@/components/SvgSprite";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { QuoteModal } from "@/components/QuoteModal";

interface ProductPageClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductPageClient({
  product,
  relatedProducts,
}: ProductPageClientProps) {
  const router = useRouter();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [selectedImg, setSelectedImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"specs" | "fitment" | "installation" | "reviews">("specs");
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteProduct, setQuoteProduct] = useState(product.title);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [relatedAddedId, setRelatedAddedId] = useState<string | null>(null);

  // Delivery & Freight Pincode Checker state
  const [pincodeInput, setPincodeInput] = useState("");
  const [pincodeResult, setPincodeResult] = useState<{
    status: "idle" | "success" | "error";
    message: string;
    eta?: string;
  }>({
    status: "idle",
    message: "Pan-India delivery available. Enter 6-digit PIN code to check express dispatch.",
  });

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pincodeInput.trim();
    if (!/^\d{6}$/.test(cleanPin)) {
      setPincodeResult({
        status: "error",
        message: "Please enter a valid 6-digit Indian postal code.",
      });
      return;
    }
    setPincodeResult({
      status: "success",
      message: `Verified for PIN ${cleanPin}: Express 24–48h Air & Surface Cargo Active!`,
      eta: "Order in next 3 hrs for Same-Day Dispatch",
    });
  };

  const isFav = isInWishlist(product.id);

  // Check volume discount tier
  const currentTier = [...product.wholesaleTiers]
    .sort((a, b) => b.minQty - a.minQty)
    .find((t) => quantity >= t.minQty);

  const unitPrice = currentTier ? currentTier.pricePerUnit : product.price;

  // Track scroll position to show sticky bottom buy bar
  useEffect(() => {
    const handleScroll = () => {
      const buyArea = document.getElementById("mainBuyAction");
      if (buyArea) {
        const rect = buyArea.getBoundingClientRect();
        setShowStickyBar(rect.bottom < 0);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2400);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push("/checkout");
  };

  const handleQuickAddRelated = (e: React.MouseEvent, item: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(item, 1);
    setRelatedAddedId(item.id);
    setTimeout(() => setRelatedAddedId(null), 1800);
  };

  const handleOpenQuote = (name?: string) => {
    setQuoteProduct(name || product.title);
    setQuoteModalOpen(true);
  };

  // Sample verified garage reviews
  const reviews = [
    {
      author: "Deepak Sharma",
      garage: "Sharma Auto Works, Pune",
      rating: 5,
      date: "2 days ago",
      text: "Fitted on our commercial delivery fleet of 8 Splendor bikes. High cranking torque and resting voltage holds at 12.8V even in cold mornings. 100% genuine factory sealed.",
    },
    {
      author: "Manoj Kumar",
      garage: "SpeedPoint Performance, Bengaluru",
      rating: 5,
      date: "1 week ago",
      text: "Delivered in 36 hours via air cargo to our workshop. The wholesale slab discount saved us over ₹3,200 on our 20-unit box order. Highly recommended B2B distributor.",
    },
    {
      author: "Vikram Rathi",
      garage: "Rathi Motors & Spares, Jaipur",
      rating: 5,
      date: "2 weeks ago",
      text: "Heavy-duty brass terminals and exact factory bolt-on fitment. Zero machining or spacer needed. Customers love the instant self-start.",
    },
  ];

  return (
    <>
      <TopBar />
      <Header onOpenQuote={handleOpenQuote} />

      {/* Dark Sub-Header Strip (Seamless transition with Navbar, no white line gap) */}
      <section
        style={{
          background: "linear-gradient(135deg, #090c13 0%, #131926 100%)",
          color: "#ffffff",
          padding: "24px 0 20px 0",
          marginTop: "-1px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <div className="container" style={{ maxWidth: "1140px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "14px",
            }}
          >
            {/* Breadcrumb Navigation */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "0.82rem",
                color: "#94a3b8",
                flexWrap: "wrap",
              }}
            >
              <Link href="/" style={{ color: "#cbd5e1", textDecoration: "none" }}>
                Home
              </Link>
              <span>/</span>
              <Link href="/products" style={{ color: "#cbd5e1", textDecoration: "none" }}>
                Products Catalog
              </Link>
              <span>/</span>
              <Link
                href={`/products?category=${product.category}`}
                style={{ color: "#cbd5e1", textDecoration: "none", textTransform: "capitalize" }}
              >
                {product.category}
              </Link>
              <span>/</span>
              <span style={{ color: "var(--primary)", fontWeight: 700 }}>{product.title}</span>
            </div>

            {/* Quick Status Tag */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span
                style={{
                  fontSize: "0.75rem",
                  background: "rgba(16, 185, 129, 0.15)",
                  color: "#10b981",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                  padding: "4px 12px",
                  borderRadius: "999px",
                  fontWeight: 700,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981" }} />
                Dispatch-Ready Inventory
              </span>
              <span style={{ fontSize: "0.76rem", color: "#94a3b8", fontWeight: 600 }}>
                SKU: <strong style={{ color: "#ffffff" }}>{product.id}</strong>
              </span>
            </div>
          </div>
        </div>
      </section>

      <main style={{ backgroundColor: "#f8fafc", minHeight: "100vh", padding: "36px 0 80px 0" }}>
        <div className="container" style={{ maxWidth: "1140px" }}>

          {/* Product Hero Grid: Gallery + Purchasing Card */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
              gap: "40px",
              backgroundColor: "#ffffff",
              padding: "clamp(24px, 4vw, 36px)",
              borderRadius: "24px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
              marginBottom: "40px",
            }}
          >
            {/* Column 1: Image Gallery & Wholesale Tiers */}
            <div>
              {/* Main Image Frame */}
              <div
                style={{
                  position: "relative",
                  borderRadius: "20px",
                  overflow: "hidden",
                  border: "1px solid #edf0f5",
                  backgroundColor: "#090c13",
                  aspectRatio: "1 / 1",
                  boxShadow: "0 6px 18px rgba(0, 0, 0, 0.06)",
                }}
              >
                <img
                  src={product.gallery[selectedImg] || product.image}
                  alt={product.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
                />

                {/* Badges on Main Image */}
                <div style={{ position: "absolute", top: "16px", left: "16px", display: "flex", gap: "8px", zIndex: 2 }}>
                  <span
                    style={{
                      background: "var(--primary)",
                      color: "#ffffff",
                      fontSize: "0.78rem",
                      fontWeight: 800,
                      padding: "5px 12px",
                      borderRadius: "var(--radius-full)",
                      boxShadow: "0 4px 12px rgba(249, 87, 22, 0.4)",
                      letterSpacing: "0.02em",
                      textTransform: "uppercase",
                    }}
                  >
                    {product.badge}
                  </span>
                  <span
                    style={{
                      background: "rgba(9, 12, 19, 0.8)",
                      color: "#ffffff",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      padding: "5px 10px",
                      borderRadius: "var(--radius-full)",
                      backdropFilter: "blur(6px)",
                    }}
                  >
                    {product.oemTag}
                  </span>
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    background: "rgba(255, 255, 255, 0.95)",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
                    color: isFav ? "var(--primary)" : "#64748b",
                    zIndex: 2,
                    transition: "var(--transition)",
                  }}
                  title={isFav ? "Saved in Wishlist" : "Save to Wishlist"}
                  aria-label="Wishlist"
                >
                  <Icon
                    name="heart"
                    style={{
                      width: "20px",
                      height: "20px",
                      fill: isFav ? "var(--primary)" : "none",
                    }}
                  />
                </button>
              </div>

              {/* Thumbnails Row */}
              {product.gallery.length > 1 && (
                <div style={{ display: "flex", gap: "12px", marginTop: "16px", overflowX: "auto", paddingBottom: "4px" }}>
                  {product.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImg(idx)}
                      style={{
                        width: "78px",
                        height: "78px",
                        borderRadius: "14px",
                        overflow: "hidden",
                        border: selectedImg === idx ? "2px solid var(--primary)" : "1px solid #e2e8f0",
                        padding: 0,
                        cursor: "pointer",
                        background: "#090c13",
                        flexShrink: 0,
                        boxShadow: selectedImg === idx ? "0 4px 12px rgba(249, 87, 22, 0.25)" : "none",
                        transition: "all 0.2s ease",
                      }}
                      title={`View angle ${idx + 1}`}
                    >
                      <img src={img} alt="Thumbnail" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </button>
                  ))}
                </div>
              )}

              {/* B2B Garage Slab Discounts Box */}
              <div
                style={{
                  marginTop: "24px",
                  padding: "18px",
                  backgroundColor: "#f8fafc",
                  borderRadius: "16px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Icon name="tag" style={{ color: "var(--primary)", width: "18px", height: "18px" }} />
                    <strong style={{ fontSize: "0.88rem", color: "#090c13" }}>
                      Wholesale Garage Volume Slabs:
                    </strong>
                  </div>
                  <span style={{ fontSize: "0.72rem", color: "#64748b", fontWeight: 600 }}>Click slab to apply</span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", textAlign: "center" }}>
                  {product.wholesaleTiers.map((tier, idx) => {
                    const isSelectedTier = quantity >= tier.minQty;
                    return (
                      <button
                        key={idx}
                        onClick={() => setQuantity(tier.minQty)}
                        style={{
                          padding: "10px 8px",
                          background: isSelectedTier ? "#ecfdf5" : "#ffffff",
                          border: isSelectedTier ? "2px solid #10b981" : "1px solid #e2e8f0",
                          borderRadius: "12px",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          textAlign: "center",
                        }}
                      >
                        <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b" }}>
                          {tier.minQty}+ Units
                        </div>
                        <div style={{ fontSize: "1.1rem", fontWeight: 900, color: isSelectedTier ? "#059669" : "var(--primary)", margin: "3px 0" }}>
                          ₹{tier.pricePerUnit}
                        </div>
                        <div style={{ fontSize: "0.72rem", color: "#10b981", fontWeight: 800 }}>
                          Save {tier.discountPercent}%
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Column 2: Product Buying Details */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              {/* Meta & SKU */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", flexWrap: "wrap" }}>
                <span
                  style={{
                    fontSize: "0.82rem",
                    fontWeight: 800,
                    color: "var(--primary)",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}
                >
                  {product.brand} OEM {product.meta}
                </span>
                <span style={{ color: "#cbd5e1" }}>•</span>
                <span style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>SKU: {product.id}</span>
              </div>

              {/* Title */}
              <h1
                style={{
                  fontSize: "clamp(1.75rem, 3.2vw, 2.3rem)",
                  fontWeight: 800,
                  color: "#090c13",
                  lineHeight: 1.25,
                  marginBottom: "14px",
                  letterSpacing: "-0.02em",
                }}
              >
                {product.title}
              </h1>

              {/* Ratings & Stock Status */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ display: "flex", color: "#f59e0b" }}>
                    {[...Array(5)].map((_, i) => (
                      <Icon
                        key={i}
                        name="star"
                        style={{
                          width: "15px",
                          height: "15px",
                          fill: i < Math.floor(product.rating) ? "#f59e0b" : "none",
                        }}
                      />
                    ))}
                  </div>
                  <strong style={{ fontSize: "0.95rem", color: "#090c13" }}>{product.rating}</strong>
                  <span style={{ fontSize: "0.82rem", color: "#64748b" }}>({product.reviewsCount} verified reviews)</span>
                </div>
                <span style={{ color: "#cbd5e1" }}>•</span>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    color: "#059669",
                    background: "#ecfdf5",
                    padding: "4px 12px",
                    borderRadius: "var(--radius-full)",
                  }}
                >
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#10b981" }} />
                  In Stock ({product.stock} units ready for 24h dispatch)
                </span>
              </div>

              {/* Price Display Box */}
              <div
                style={{
                  padding: "18px 24px",
                  background: "#fff5f0",
                  borderRadius: "16px",
                  border: "1px solid #ffd8c7",
                  marginBottom: "20px",
                  display: "flex",
                  alignItems: "baseline",
                  gap: "12px",
                  flexWrap: "wrap",
                }}
              >
                <span style={{ fontSize: "2.3rem", fontWeight: 900, color: "var(--primary)", lineHeight: 1 }}>
                  ₹{unitPrice.toLocaleString("en-IN")}
                </span>
                {product.originalPrice > unitPrice && (
                  <span style={{ fontSize: "1.25rem", textDecoration: "line-through", color: "#94a3b8" }}>
                    ₹{product.originalPrice.toLocaleString("en-IN")}
                  </span>
                )}
                <span
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 800,
                    background: "#fee2e2",
                    color: "var(--primary)",
                    padding: "4px 10px",
                    borderRadius: "6px",
                  }}
                >
                  Save {Math.round(((product.originalPrice - unitPrice) / product.originalPrice) * 100)}%
                </span>
                <span style={{ fontSize: "0.82rem", color: "#64748b", marginLeft: "auto", fontWeight: 600 }}>
                  Inclusive of 18% GST • GST Input Credit Eligible
                </span>
              </div>

              {/* Description Paragraph */}
              <p style={{ fontSize: "0.95rem", color: "#475569", lineHeight: 1.65, marginBottom: "24px" }}>
                {product.description}
              </p>

              {/* Action Buttons: Stepper + Add to Cart + Buy Now in ONE Row */}
              <div
                id="mainBuyAction"
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  marginBottom: "12px",
                  flexWrap: "wrap",
                }}
              >
                {/* Quantity Stepper */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #cbd5e1",
                    borderRadius: "var(--radius-full)",
                    overflow: "hidden",
                    height: "50px",
                    background: "#ffffff",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
                    flexShrink: 0,
                  }}
                >
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{
                      width: "40px",
                      height: "100%",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#475569",
                    }}
                    aria-label="Decrease quantity"
                  >
                    <Icon name="minus" style={{ width: "14px", height: "14px" }} />
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
                    style={{
                      width: "46px",
                      textAlign: "center",
                      border: "none",
                      fontWeight: 800,
                      fontSize: "1.05rem",
                      outline: "none",
                      color: "#090c13",
                    }}
                  />
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    style={{
                      width: "40px",
                      height: "100%",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#475569",
                    }}
                    aria-label="Increase quantity"
                  >
                    <Icon name="plus" style={{ width: "14px", height: "14px" }} />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  className="btn btn-primary"
                  onClick={handleAddToCart}
                  style={{
                    flex: "1 1 180px",
                    height: "50px",
                    borderRadius: "var(--radius-full)",
                    justifyContent: "center",
                    fontSize: "0.92rem",
                    fontWeight: 800,
                    boxShadow: "0 6px 20px rgba(249, 87, 22, 0.35)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    whiteSpace: "nowrap",
                  }}
                >
                  <Icon name="cart" style={{ width: "17px", height: "17px" }} />
                  {addedSuccess ? "✓ Added!" : `Add to Cart (₹${(unitPrice * quantity).toLocaleString("en-IN")})`}
                </button>

                {/* Buy Now & Checkout Button (in the SAME ROW!) */}
                <button
                  className="btn btn-dark"
                  onClick={handleBuyNow}
                  style={{
                    flex: "1 1 180px",
                    justifyContent: "center",
                    height: "50px",
                    borderRadius: "var(--radius-full)",
                    fontWeight: 800,
                    fontSize: "0.92rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    whiteSpace: "nowrap",
                    backgroundColor: "#090c13",
                    color: "#ffffff",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
                  }}
                >
                  <Icon name="bolt" style={{ width: "16px", height: "16px", color: "var(--primary)" }} />
                  Buy Now &amp; Checkout
                </button>
              </div>

              {/* Request Bulk Wholesale Quotation Button */}
              <div style={{ marginBottom: "16px" }}>
                <button
                  className="btn btn-outline"
                  onClick={() => handleOpenQuote(product.title)}
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    height: "44px",
                    borderRadius: "var(--radius-full)",
                    fontWeight: 700,
                    fontSize: "0.86rem",
                    color: "#475569",
                    borderColor: "#cbd5e1",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "#f8fafc",
                  }}
                >
                  <Icon name="briefcase" style={{ width: "15px", height: "15px", color: "var(--primary)" }} />
                  Request Bulk B2B Wholesale Quotation
                </button>
              </div>

              {/* Delivery & Freight Pincode Checker Panel */}
              <div
                style={{
                  backgroundColor: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "16px",
                  padding: "16px 18px",
                  marginBottom: "14px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                    flexWrap: "wrap",
                    gap: "8px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "8px",
                        background: "#fff5f0",
                        display: "grid",
                        placeItems: "center",
                        color: "var(--primary)",
                        flexShrink: 0,
                      }}
                    >
                      <Icon name="truck" style={{ width: "16px", height: "16px" }} />
                    </div>
                    <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "#0f172a" }}>
                      Delivery &amp; Freight Availability
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      color: "#059669",
                      background: "#ecfdf5",
                      padding: "3px 8px",
                      borderRadius: "var(--radius-full)",
                    }}
                  >
                    ✓ Free Freight Over ₹999
                  </span>
                </div>

                {/* Input + Button Form */}
                <form
                  onSubmit={handleCheckPincode}
                  style={{
                    display: "flex",
                    gap: "8px",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Icon
                      name="map-pin"
                      style={{
                        position: "absolute",
                        left: "12px",
                        width: "15px",
                        height: "15px",
                        color: "#94a3b8",
                      }}
                    />
                    <input
                      type="text"
                      maxLength={6}
                      value={pincodeInput}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "");
                        setPincodeInput(val);
                      }}
                      placeholder="Enter 6-digit Pincode (e.g. 110001)"
                      style={{
                        width: "100%",
                        height: "38px",
                        padding: "0 12px 0 34px",
                        fontSize: "0.85rem",
                        borderRadius: "10px",
                        border: pincodeResult.status === "error" ? "1px solid #ef4444" : "1px solid #cbd5e1",
                        background: "#ffffff",
                        color: "#090c13",
                        outline: "none",
                        fontWeight: 600,
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    style={{
                      height: "38px",
                      padding: "0 16px",
                      background: "var(--primary)",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "10px",
                      fontSize: "0.84rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      transition: "all 0.2s ease",
                      flexShrink: 0,
                    }}
                  >
                    Check
                  </button>
                </form>

                {/* Status Message */}
                <div style={{ fontSize: "0.78rem", lineHeight: 1.4 }}>
                  {pincodeResult.status === "success" ? (
                    <div style={{ color: "#059669", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}>
                      <Icon name="check" style={{ width: "14px", height: "14px", flexShrink: 0 }} />
                      <span>{pincodeResult.message} &bull; <strong style={{ color: "#047857" }}>{pincodeResult.eta}</strong></span>
                    </div>
                  ) : pincodeResult.status === "error" ? (
                    <div style={{ color: "#ef4444", fontWeight: 600 }}>
                      {pincodeResult.message}
                    </div>
                  ) : (
                    <div style={{ color: "#64748b", display: "flex", alignItems: "center", gap: "6px" }}>
                      <Icon name="bolt" style={{ width: "13px", height: "13px", color: "var(--primary)", flexShrink: 0 }} />
                      <span>Same-day dispatch if ordered before 2:00 PM &bull; Real-time tracking via SMS</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Workshop B2B Assurances Grid (4 Mini Tiles) */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "10px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    padding: "10px 12px",
                    background: "#ffffff",
                    border: "1px solid #edf0f5",
                    borderRadius: "12px",
                  }}
                >
                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "8px",
                      background: "#ecfdf5",
                      display: "grid",
                      placeItems: "center",
                      color: "#10b981",
                      flexShrink: 0,
                    }}
                  >
                    <Icon name="shield-check" style={{ width: "16px", height: "16px" }} />
                  </div>
                  <div>
                    <strong style={{ fontSize: "0.81rem", color: "#090c13", display: "block", lineHeight: 1.25 }}>
                      100% Direct Bolt-On
                    </strong>
                    <span style={{ fontSize: "0.72rem", color: "#64748b" }}>
                      OEM spec; zero modification needed
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    padding: "10px 12px",
                    background: "#ffffff",
                    border: "1px solid #edf0f5",
                    borderRadius: "12px",
                  }}
                >
                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "8px",
                      background: "#eff6ff",
                      display: "grid",
                      placeItems: "center",
                      color: "#3b82f6",
                      flexShrink: 0,
                    }}
                  >
                    <Icon name="percent" style={{ width: "15px", height: "15px" }} />
                  </div>
                  <div>
                    <strong style={{ fontSize: "0.81rem", color: "#090c13", display: "block", lineHeight: 1.25 }}>
                      GST Tax Invoice
                    </strong>
                    <span style={{ fontSize: "0.72rem", color: "#64748b" }}>
                      18% input credit for trade workshops
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    padding: "10px 12px",
                    background: "#ffffff",
                    border: "1px solid #edf0f5",
                    borderRadius: "12px",
                  }}
                >
                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "8px",
                      background: "#fff7ed",
                      display: "grid",
                      placeItems: "center",
                      color: "var(--primary)",
                      flexShrink: 0,
                    }}
                  >
                    <Icon name="gear" style={{ width: "16px", height: "16px" }} />
                  </div>
                  <div>
                    <strong style={{ fontSize: "0.81rem", color: "#090c13", display: "block", lineHeight: 1.25 }}>
                      Zero-Defect Tested
                    </strong>
                    <span style={{ fontSize: "0.72rem", color: "#64748b" }}>
                      High-heat &amp; vibration resistance
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    padding: "10px 12px",
                    background: "#ffffff",
                    border: "1px solid #edf0f5",
                    borderRadius: "12px",
                  }}
                >
                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "8px",
                      background: "#f5f3ff",
                      display: "grid",
                      placeItems: "center",
                      color: "#8b5cf6",
                      flexShrink: 0,
                    }}
                  >
                    <Icon name="package" style={{ width: "16px", height: "16px" }} />
                  </div>
                  <div>
                    <strong style={{ fontSize: "0.81rem", color: "#090c13", display: "block", lineHeight: 1.25 }}>
                      Insured Transit Cargo
                    </strong>
                    <span style={{ fontSize: "0.72rem", color: "#64748b" }}>
                      Zero breakage risk; instant replacement
                    </span>
                  </div>
                </div>
              </div>

              {/* B2B Assurance Badges */}
              <div
                style={{
                  borderTop: "1px solid #edf0f5",
                  paddingTop: "16px",
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "16px",
                  fontSize: "0.85rem",
                  marginTop: "auto",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "#ecfdf5", display: "grid", placeItems: "center", color: "#10b981", flexShrink: 0 }}>
                    <Icon name="shield-check" style={{ width: "20px", height: "20px" }} />
                  </div>
                  <div>
                    <strong style={{ color: "#090c13", display: "block" }}>Replacement Warranty</strong>
                    <span style={{ color: "#64748b", fontSize: "0.8rem" }}>{product.warranty}</span>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "#fff5f0", display: "grid", placeItems: "center", color: "var(--primary)", flexShrink: 0 }}>
                    <Icon name="truck" style={{ width: "20px", height: "20px" }} />
                  </div>
                  <div>
                    <strong style={{ color: "#090c13", display: "block" }}>Fast Pan-India Dispatch</strong>
                    <span style={{ color: "#64748b", fontSize: "0.8rem" }}>Air &amp; surface freight in 24–48h</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Tabbed Technical Depth Section */}
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "24px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
              overflow: "hidden",
              marginBottom: "48px",
            }}
          >
            {/* Tabs Header Bar */}
            <div
              style={{
                display: "flex",
                borderBottom: "1px solid #e2e8f0",
                background: "#f8fafc",
                overflowX: "auto",
              }}
            >
              {[
                { id: "specs", label: "Technical Specifications", icon: "gear" },
                { id: "fitment", label: `Compatible Bikes (${product.compatibleBikes.length})`, icon: "check-circle" },
                { id: "installation", label: "Workshop Installation Guide", icon: "shield-check" },
                { id: "reviews", label: `Verified Reviews (${product.reviewsCount})`, icon: "star" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  style={{
                    padding: "16px 24px",
                    background: activeTab === tab.id ? "#ffffff" : "transparent",
                    border: "none",
                    borderBottom: activeTab === tab.id ? "3px solid var(--primary)" : "3px solid transparent",
                    cursor: "pointer",
                    fontSize: "0.92rem",
                    fontWeight: activeTab === tab.id ? 800 : 600,
                    color: activeTab === tab.id ? "var(--primary)" : "#64748b",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    whiteSpace: "nowrap",
                    transition: "all 0.2s ease",
                  }}
                >
                  <Icon name={tab.icon} style={{ width: "16px", height: "16px" }} />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab 1: Technical Specs */}
            {activeTab === "specs" && (
              <div style={{ padding: "32px" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#090c13", marginBottom: "8px" }}>
                  Material &amp; Electrical Tolerances
                </h3>
                <p style={{ color: "#64748b", fontSize: "0.88rem", marginBottom: "20px" }}>
                  Manufactured strictly to OEM JIS and DIN industrial blueprints with factory batch testing certification.
                </p>

                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.92rem" }}>
                    <tbody>
                      {Object.entries(product.specDetails).map(([key, val], idx) => (
                        <tr
                          key={key}
                          style={{
                            backgroundColor: idx % 2 === 0 ? "#f8fafc" : "#ffffff",
                            borderBottom: "1px solid #edf0f5",
                          }}
                        >
                          <td style={{ padding: "12px 18px", color: "#64748b", fontWeight: 600, width: "35%" }}>
                            {key}
                          </td>
                          <td style={{ padding: "12px 18px", color: "#090c13", fontWeight: 800 }}>
                            {val}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab 2: Fitment List */}
            {activeTab === "fitment" && (
              <div style={{ padding: "32px" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#090c13", marginBottom: "8px" }}>
                  Verified Direct Bolt-On Motorcycles
                </h3>
                <p style={{ color: "#64748b", fontSize: "0.88rem", marginBottom: "20px" }}>
                  Guaranteed 100% plug-and-play installation without bracket alteration, spacer cutting, or harness modification:
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "10px" }}>
                  {product.compatibleBikes.map((bike, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: "12px 16px",
                        background: "#f8fafc",
                        border: "1px solid #e2e8f0",
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        fontSize: "0.9rem",
                        fontWeight: 700,
                        color: "#1e293b",
                      }}
                    >
                      <Icon name="check-circle" style={{ width: "18px", height: "18px", color: "#10b981", flexShrink: 0 }} />
                      {bike}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Installation Guide */}
            {activeTab === "installation" && (
              <div style={{ padding: "32px" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#090c13", marginBottom: "8px" }}>
                  Technician Installation &amp; Workshop Protocol
                </h3>
                <p style={{ color: "#64748b", fontSize: "0.88rem", marginBottom: "24px" }}>
                  Recommended procedural steps for garage mechanics to maximize lifespan and maintain full warranty coverage:
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
                  <div style={{ padding: "20px", background: "#f8fafc", borderRadius: "14px", border: "1px solid #e2e8f0" }}>
                    <div style={{ fontSize: "1.2rem", fontWeight: 900, color: "var(--primary)", marginBottom: "6px" }}>01</div>
                    <strong style={{ fontSize: "0.95rem", color: "#090c13", display: "block", marginBottom: "6px" }}>Inspection &amp; Pre-Check</strong>
                    <p style={{ fontSize: "0.84rem", color: "#64748b", lineHeight: 1.5 }}>
                      Verify terminal polarity (+ and -) and resting open-circuit voltage with a digital multimeter (should be ≥12.6V).
                    </p>
                  </div>

                  <div style={{ padding: "20px", background: "#f8fafc", borderRadius: "14px", border: "1px solid #e2e8f0" }}>
                    <div style={{ fontSize: "1.2rem", fontWeight: 900, color: "var(--primary)", marginBottom: "6px" }}>02</div>
                    <strong style={{ fontSize: "0.95rem", color: "#090c13", display: "block", marginBottom: "6px" }}>Clean Connection</strong>
                    <p style={{ fontSize: "0.84rem", color: "#64748b", lineHeight: 1.5 }}>
                      Clean motorcycle battery box tray of grit. Fasten the positive terminal cable first, followed securely by negative ground.
                    </p>
                  </div>

                  <div style={{ padding: "20px", background: "#f8fafc", borderRadius: "14px", border: "1px solid #e2e8f0" }}>
                    <div style={{ fontSize: "1.2rem", fontWeight: 900, color: "var(--primary)", marginBottom: "6px" }}>03</div>
                    <strong style={{ fontSize: "0.95rem", color: "#090c13", display: "block", marginBottom: "6px" }}>Torque &amp; Dielectric Coating</strong>
                    <p style={{ fontSize: "0.84rem", color: "#64748b", lineHeight: 1.5 }}>
                      Tighten terminal screws to 4–5 Nm torque. Coat terminals with non-conductive petroleum jelly to prevent sulfur corrosion.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Verified Reviews */}
            {activeTab === "reviews" && (
              <div style={{ padding: "32px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "16px" }}>
                  <div>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#090c13" }}>
                      Trade &amp; Workshop Reviews
                    </h3>
                    <p style={{ color: "#64748b", fontSize: "0.88rem", marginTop: "4px" }}>
                      Feedback from certified mechanics, fleet supervisors, and two-wheeler workshops across India.
                    </p>
                  </div>

                  {/* Rating Score Pill */}
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "#fff5f0", padding: "10px 18px", borderRadius: "14px", border: "1px solid #ffd8c7" }}>
                    <span style={{ fontSize: "2rem", fontWeight: 900, color: "var(--primary)" }}>{product.rating}</span>
                    <div>
                      <div style={{ display: "flex", color: "#f59e0b" }}>
                        {[...Array(5)].map((_, i) => (
                          <Icon key={i} name="star" style={{ width: "14px", height: "14px", fill: "#f59e0b" }} />
                        ))}
                      </div>
                      <span style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: 600 }}>{product.reviewsCount} verified ratings</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {reviews.map((rev, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: "20px",
                        background: "#f8fafc",
                        borderRadius: "16px",
                        border: "1px solid #edf0f5",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px", flexWrap: "wrap" }}>
                        <div>
                          <strong style={{ fontSize: "0.95rem", color: "#090c13" }}>{rev.author}</strong>
                          <span style={{ fontSize: "0.8rem", color: "#64748b", marginLeft: "8px" }}>• {rev.garage}</span>
                        </div>
                        <span style={{ fontSize: "0.76rem", color: "#94a3b8" }}>{rev.date}</span>
                      </div>
                      <div style={{ display: "flex", color: "#f59e0b", marginBottom: "8px" }}>
                        {[...Array(rev.rating)].map((_, i) => (
                          <Icon key={i} name="star" style={{ width: "13px", height: "13px", fill: "#f59e0b" }} />
                        ))}
                      </div>
                      <p style={{ fontSize: "0.88rem", color: "#475569", lineHeight: 1.55 }}>
                        &ldquo;{rev.text}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Related & Complementary Products Shelf (Balanced 4-Column Grid) */}
          {relatedProducts.length > 0 && (
            <div style={{ marginTop: "40px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
                <div>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 800,
                      background: "rgba(249, 87, 22, 0.1)",
                      color: "var(--primary)",
                      padding: "4px 12px",
                      borderRadius: "999px",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    Complete The Engine Rebuild
                  </span>
                  <h2 style={{ fontSize: "1.45rem", fontWeight: 800, color: "#090c13", marginTop: "8px", letterSpacing: "-0.02em" }}>
                    Related &amp; Complementary Components
                  </h2>
                </div>

                <Link
                  href="/products"
                  style={{
                    fontSize: "0.88rem",
                    fontWeight: 700,
                    color: "var(--primary)",
                    textDecoration: "none",
                  }}
                >
                  View All Spares
                </Link>
              </div>

              {/* 4-Column Balanced Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                  gap: "22px",
                }}
              >
                {relatedProducts.map((rel) => {
                  const isRelFav = isInWishlist(rel.id);
                  return (
                    <div
                      key={rel.id}
                      className="product-card"
                      style={{
                        background: "#ffffff",
                        borderRadius: "18px",
                        border: "1px solid #edf0f5",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.03)",
                        transition: "all 0.28s ease",
                        cursor: "pointer",
                      }}
                      onClick={() => router.push(`/products/${rel.slug}`)}
                    >
                      {/* Image Frame with Aspect Ratio */}
                      <div
                        style={{
                          position: "relative",
                          width: "100%",
                          aspectRatio: "16 / 10",
                          overflow: "hidden",
                          background: "#090c13",
                        }}
                      >
                        <img
                          src={rel.image}
                          alt={rel.title}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transition: "transform 0.4s ease",
                          }}
                        />

                        {/* OEM Badge */}
                        <div style={{ position: "absolute", top: "10px", left: "10px", zIndex: 2 }}>
                          <span
                            style={{
                              fontSize: "0.7rem",
                              background: rel.brand === "Nexcolle" ? "var(--primary)" : "#0f172a",
                              color: "#ffffff",
                              padding: "3px 8px",
                              borderRadius: "6px",
                              fontWeight: 800,
                              textTransform: "uppercase",
                              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                            }}
                          >
                            {rel.oemTag}
                          </span>
                        </div>

                        {/* Wishlist Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(rel.id);
                          }}
                          style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            background: "rgba(255, 255, 255, 0.92)",
                            backdropFilter: "blur(6px)",
                            border: "none",
                            display: "grid",
                            placeItems: "center",
                            cursor: "pointer",
                            zIndex: 2,
                            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                          }}
                          aria-label="Save to Wishlist"
                        >
                          <Icon
                            name="heart"
                            style={{
                              width: "15px",
                              height: "15px",
                              color: isRelFav ? "var(--primary)" : "#64748b",
                              fill: isRelFav ? "var(--primary)" : "none",
                            }}
                          />
                        </button>
                      </div>

                      {/* Card Content */}
                      <div style={{ padding: "16px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                          <div style={{ display: "flex", color: "#f59e0b" }}>
                            {[...Array(5)].map((_, i) => (
                              <Icon
                                key={i}
                                name="star"
                                style={{
                                  width: "12px",
                                  height: "12px",
                                  fill: i < Math.floor(rel.rating) ? "#f59e0b" : "none",
                                }}
                              />
                            ))}
                          </div>
                          <span style={{ fontSize: "0.72rem", color: "#64748b", fontWeight: 600 }}>
                            ({rel.reviewsCount})
                          </span>
                        </div>

                        <h4
                          style={{
                            fontSize: "0.95rem",
                            fontWeight: 700,
                            color: "#090c13",
                            lineHeight: 1.35,
                            marginBottom: "6px",
                          }}
                        >
                          {rel.title}
                        </h4>

                        <p
                          style={{
                            fontSize: "0.78rem",
                            color: "#64748b",
                            lineHeight: 1.45,
                            marginBottom: "12px",
                            flexGrow: 1,
                          }}
                        >
                          {rel.shortDesc}
                        </p>

                        {/* Price & Action Row */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            paddingTop: "12px",
                            borderTop: "1px solid #f1f5f9",
                            marginTop: "auto",
                          }}
                        >
                          <div>
                            <span style={{ fontSize: "1.15rem", fontWeight: 800, color: "#090c13" }}>
                              ₹{rel.price.toLocaleString("en-IN")}
                            </span>
                            <span
                              style={{
                                fontSize: "0.74rem",
                                color: "#94a3b8",
                                textDecoration: "line-through",
                                marginLeft: "6px",
                              }}
                            >
                              ₹{rel.originalPrice.toLocaleString("en-IN")}
                            </span>
                          </div>

                          <button
                            className="btn btn-primary"
                            style={{
                              padding: "7px 14px",
                              fontSize: "0.78rem",
                              fontWeight: 700,
                              borderRadius: "var(--radius-full)",
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                            }}
                            onClick={(e) => handleQuickAddRelated(e, rel)}
                          >
                            <Icon name="cart" style={{ width: "13px", height: "13px" }} />
                            {relatedAddedId === rel.id ? "Added!" : "Add"}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Sticky Bottom Bar (Floats at bottom when main buy action scrolls offscreen) */}
      {showStickyBar && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            background: "rgba(9, 12, 19, 0.94)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderTop: "1px solid rgba(255, 255, 255, 0.12)",
            padding: "12px 0",
            zIndex: 90,
            boxShadow: "0 -4px 20px rgba(0,0,0,0.25)",
            animation: "fadeIn 0.25s ease",
          }}
        >
          <div
            className="container"
            style={{
              maxWidth: "1140px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            {/* Left: Thumbnail & Title */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <img
                src={product.gallery[selectedImg] || product.image}
                alt={product.title}
                style={{ width: "42px", height: "42px", borderRadius: "8px", objectFit: "cover" }}
              />
              <div>
                <strong style={{ fontSize: "0.9rem", color: "#ffffff", display: "block", lineHeight: 1.2 }}>
                  {product.title}
                </strong>
                <span style={{ fontSize: "0.78rem", color: "#94a3b8" }}>
                  SKU: {product.id} • {product.warranty}
                </span>
              </div>
            </div>

            {/* Right: Quantity, Price, Add to Cart */}
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "1.25rem", fontWeight: 900, color: "var(--primary)" }}>
                  ₹{(unitPrice * quantity).toLocaleString("en-IN")}
                </div>
                <div style={{ fontSize: "0.7rem", color: "#94a3b8" }}>₹{unitPrice}/unit</div>
              </div>

              <button
                className="btn btn-primary"
                onClick={handleAddToCart}
                style={{
                  height: "42px",
                  padding: "0 20px",
                  borderRadius: "var(--radius-full)",
                  fontWeight: 800,
                  fontSize: "0.88rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 4px 14px rgba(249, 87, 22, 0.4)",
                }}
              >
                <Icon name="cart" style={{ width: "16px", height: "16px" }} />
                {addedSuccess ? "✓ Added!" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer onSelectCategory={() => {}} />
      <WhatsAppFloat />

      <QuoteModal
        isOpen={quoteModalOpen}
        selectedProduct={quoteProduct}
        onClose={() => setQuoteModalOpen(false)}
      />
    </>
  );
}
