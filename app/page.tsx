"use client";

import React, { useState } from "react";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { FeatureShowcase } from "@/components/FeatureShowcase";
import { ProcessFlow } from "@/components/ProcessFlow";
import { ProductCatalog } from "@/components/ProductCatalog";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { StatsTicker } from "@/components/StatsTicker";
import { EngineeringSection } from "@/components/EngineeringSection";
import { CompatibilityMatrix } from "@/components/CompatibilityMatrix";
import { WorkshopSpotlight } from "@/components/WorkshopSpotlight";
import { Testimonials } from "@/components/Testimonials";
import { CtaBanner } from "@/components/CtaBanner";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { QuoteModal } from "@/components/QuoteModal";

export default function Home() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("General Inquiry");
  const [activeCategory, setActiveCategory] = useState("all");

  const handleOpenQuote = (productName?: string) => {
    setSelectedProduct(productName || "General Inquiry");
    setQuoteModalOpen(true);
  };

  const handleCloseQuote = () => {
    setQuoteModalOpen(false);
  };

  const handleSelectCategory = (category: string) => {
    setActiveCategory(category);
    // Smooth scroll down to catalog if selected from feature showcase
    const catalogEl = document.getElementById("catalog");
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <TopBar />
      <Header onOpenQuote={handleOpenQuote} />

      <main>
        {/* SECTION 1: Industrial Hero with Floating 4-Part Preview Strip */}
        <Hero onOpenQuote={handleOpenQuote} />

        {/* SECTION 2: BAZI ÖRNEKLER (Dispatch-Ready Product Catalog with Pill Category Filters) */}
        <ProductCatalog
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
          onOpenQuote={handleOpenQuote}
        />

        {/* SECTION 3: HİZMETLERİMİZ (2-Column Feature & Core Component Showcase) */}
        <FeatureShowcase onSelectCategory={handleSelectCategory} />

        {/* SECTION 4: ÇALIŞMA SÜRECİMİZ (Dark 4-Step Supply Chain Process with Connected Lines) */}
        <ProcessFlow />

        {/* SECTION 5: NEDEN BİZ? (Engineering Expertise & 4-Column Value Prop) */}
        <WhyChooseUs />

        {/* TECHNICAL DEPTH & PROOFS */}
        <StatsTicker />
        <EngineeringSection />
        <CompatibilityMatrix />
        <WorkshopSpotlight />
        <Testimonials />

        {/* SECTION 6: High-Contrast Dark CTA Banner with Orange Action Button */}
        <CtaBanner onOpenQuote={handleOpenQuote} />
      </main>

      {/* SECTION 7: Multi-Column Dark Industrial Footer */}
      <Footer onSelectCategory={handleSelectCategory} />
      <WhatsAppFloat />

      <QuoteModal
        isOpen={quoteModalOpen}
        selectedProduct={selectedProduct}
        onClose={handleCloseQuote}
      />
    </>
  );
}
