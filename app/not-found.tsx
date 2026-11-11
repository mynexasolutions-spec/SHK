import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "40px 20px",
        background: "#090c13",
        color: "#ffffff",
      }}
    >
      <span
        style={{
          display: "inline-block",
          fontSize: "0.85rem",
          fontWeight: 800,
          color: "var(--primary)",
          letterSpacing: "0.15em",
          marginBottom: "12px",
        }}
      >
        ERROR 404
      </span>
      <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "16px" }}>
        Part or Page Not Found
      </h1>
      <p style={{ color: "#94a3b8", maxWidth: "480px", marginBottom: "32px", fontSize: "1rem" }}>
        The requested motorcycle component or page does not exist or has been relocated to another category.
      </p>
      <Link
        href="/"
        className="btn btn-primary"
        style={{
          borderRadius: "var(--radius-full)",
          padding: "12px 28px",
          fontWeight: 700,
        }}
      >
        Return to Catalog Home
      </Link>
    </div>
  );
}

