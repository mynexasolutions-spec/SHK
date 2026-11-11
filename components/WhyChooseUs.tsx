import React from "react";
import { Icon } from "./SvgSprite";

export function WhyChooseUs() {
  const points = [
    {
      icon: "award",
      title: "30+ Years Trade Legacy",
      desc: "Over three decades supplying North India's premier engine rebuilders and automotive distributors.",
    },
    {
      icon: "gear",
      title: "Japanese Metallurgy Standards",
      desc: "Forged AC8A aluminum and spun-cast grey iron manufactured to strict JIS & DIN specifications.",
    },
    {
      icon: "tag",
      title: "Direct Wholesale Margins",
      desc: "Transparent factory-gate pricing with up to 25% bulk volume margin for registered garages.",
    },
    {
      icon: "shield-check",
      title: "Zero-Defect Guarantee",
      desc: "Guaranteed micrometer fitment backed by a 36-month hassle-free replacement warranty on batteries.",
    },
  ];

  return (
    <section className="why-choose-us-section" id="why-us">
      <div className="container">
        <div className="why-choose-us-grid">
          {/* Left Column matching NEDEN BİZ? */}
          <div className="why-choose-us-left">
            <span className="kicker-pill">WHY CHOOSE SHK AUTO</span>
            <h2>Engineering Expertise That Mechanics Depend On</h2>
          </div>

          {/* Right Column: 4 Value Items */}
          <div className="why-items-row">
            {points.map((pt, idx) => (
              <div key={idx} className="why-item">
                <div className="why-item-icon">
                  <Icon name={pt.icon} style={{ width: "32px", height: "32px" }} />
                </div>
                <div className="why-item-title">{pt.title}</div>
                <div className="why-item-desc">{pt.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

