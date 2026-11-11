"use client";

import React, { useState } from "react";
import { Icon } from "./SvgSprite";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "What is the dispatch turnaround time for bulk orders?",
      a: "Orders placed before 2:00 PM are processed and dispatched on the same business day from our central warehouse. Standard road and express air delivery across India typically takes between 24 and 48 hours depending on your state and pin code.",
    },
    {
      q: "What warranty is offered on Nexcolle Two-Wheeler Batteries?",
      a: "Nexcolle batteries come with comprehensive warranty coverage ranging from 24 to 36 months (including pro-rata terms) depending on the specific model and ampere rating. Each battery comes serialized with a tamper-proof barcode for hassle-free digital registration.",
    },
    {
      q: "Are FUJI Engine Spare Parts compatible with BS6 and fuel-injected bikes?",
      a: "Yes. All FUJI engine spares — including pistons, rings, valves, and cylinder sleeves — are manufactured to match the tight clearance and high-combustion temperatures required by modern BS4 and BS6/OBD-2 electronic fuel injection (EFI) engines.",
    },
    {
      q: "Can small local garages purchase directly without high minimum order quantities?",
      a: "Absolutely. We support independent workshops with flexible minimum order quantities (MOQs). You can order starter sample kits or specific fast-moving part bundles tailored to your daily repair volume.",
    },
    {
      q: "How do I get an exact price quote for my inventory requirements?",
      a: "Simply click the \"Request Quote\" button or WhatsApp us directly with your list of required models and quantities. Our trade team will respond within 30 minutes with our current wholesale catalog and tiered dealer discounts.",
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="section faq-section" id="faq">
      <div className="container">
        <div className="section-header">
          <span className="pill-tag">Frequently Asked Questions</span>
          <h2 className="section-title">Answers For Buyers &amp; Dealers</h2>
          <p className="section-desc">
            Everything you need to know about ordering, warranty, and part compatibility.
          </p>
        </div>

        <div className="faq-wrapper">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`faq-item ${openIndex === idx ? "open" : ""}`}
            >
              <button
                className="faq-question"
                onClick={() => toggle(idx)}
                type="button"
                aria-expanded={openIndex === idx}
              >
                <span>{faq.q}</span>
                <Icon name="chevron-down" />
              </button>
              <div className="faq-answer">{faq.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

