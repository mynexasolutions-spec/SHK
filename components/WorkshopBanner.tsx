import React from "react";
import { Icon } from "./SvgSprite";

interface WorkshopBannerProps {
  onOpenQuote: (productName?: string) => void;
}

export function WorkshopBanner({ onOpenQuote }: WorkshopBannerProps) {
  return (
    <section className="section workshop-section" id="workshop">
      <div className="container">
        <div className="workshop-banner">
          <div className="workshop-content">
            <span className="pill-tag dark">Dealer &amp; Garage Partnership</span>
            <h2>Stock Genuine Parts. Boost Your Workshop Reputation.</h2>
            <p>
              Are you a two-wheeler workshop owner, spare parts retailer, or regional distributor? SHK Auto guarantees priority fulfillment, bulk margins, and 100% replacement warranty support.
            </p>

            <div className="workshop-perks">
              <div className="perk-item">
                <Icon name="check" /> Direct Wholesale Tier Pricing
              </div>
              <div className="perk-item">
                <Icon name="check" /> Same-Day Dispatch Guarantee
              </div>
              <div className="perk-item">
                <Icon name="check" /> Low MOQ for Small Garages
              </div>
              <div className="perk-item">
                <Icon name="check" /> Comprehensive Fitment Guidance
              </div>
            </div>

            <div>
              <button
                className="btn btn-primary"
                onClick={() => onOpenQuote("Wholesale Dealership Program")}
              >
                Apply for Wholesale Account
              </button>
            </div>
          </div>

          <div className="workshop-visual">
            <img src="/images/workshop.jpg" alt="Motorcycle Engine Workshop" />
            <div className="workshop-visual-overlay" />
          </div>
        </div>
      </div>
    </section>
  );
}

