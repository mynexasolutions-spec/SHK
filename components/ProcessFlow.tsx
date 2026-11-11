import React from "react";
import { Icon } from "./SvgSprite";

export function ProcessFlow() {
  const steps = [
    {
      num: "01",
      icon: "search",
      title: "Select Part & Fitment",
      desc: "Specify bike model (Royal Enfield, Pulsar, Splendor, KTM) or bore diameter from our verified database.",
    },
    {
      num: "02",
      icon: "shield-check",
      title: "Micron-Precision QA",
      desc: "Every batch is micrometer-inspected, optical-measured, and laser-etched to JIS B8032 Japanese standards.",
    },
    {
      num: "03",
      icon: "credit-card",
      title: "Wholesale B2B Invoice",
      desc: "Automatic volume tier pricing applied with instant GST e-way bill generation and express packaging approval.",
    },
    {
      num: "04",
      icon: "truck",
      title: "Express Bay Delivery",
      desc: "Reinforced hermetic packaging dispatched via surface or air express directly to your workshop bay nationwide.",
    },
  ];

  return (
    <section className="process-flow-section" id="process">
      <div className="container">
        <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto" }}>
          <span className="kicker-pill" style={{ color: "var(--primary-light)" }}>
            OUR 4-STEP SUPPLY CHAIN PROCESS
          </span>
          <h2
            style={{
              fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.03em",
              marginTop: "4px",
            }}
          >
            How We Deliver Reliability to 120+ Workshops
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "0.95rem", marginTop: "12px" }}>
            From precision part selection to doorstep delivery, every component is rigorously verified to prevent engine teardown comebacks.
          </p>
        </div>

        <div className="process-steps-row">
          {steps.map((step, idx) => (
            <div key={step.num} className="process-step-item">
              <div className="process-step-top">
                <div className="process-step-icon">
                  <Icon name={step.icon} style={{ width: "22px", height: "22px" }} />
                </div>
                <div className="process-step-number">{step.num}</div>
                {idx < steps.length - 1 && <div className="process-step-line" />}
              </div>
              <div className="process-step-title">{step.title}</div>
              <p className="process-step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

