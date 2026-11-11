import React from "react";
import { Icon } from "./SvgSprite";

export function EngineeringSection() {
  return (
    <section className="engineering-section" id="engineering">
      <div className="container">
        <div className="section-header">
          <span className="pill-tag dark">Inside The Metal</span>
          <h2 className="section-title">Anatomy of Engine Reliability</h2>
          <p className="section-desc">
            Why professional mechanics choose FUJI over cheap market replacements.
          </p>
        </div>

        <div className="eng-grid">
          <div className="eng-image-card">
            <img
              src="/images/cylinder-liner-cutaway.jpg"
              alt="Cylinder Liner Cutaway Anatomy"
            />
          </div>

          <div className="eng-features-list">
            <div className="eng-feature-box">
              <div className="eng-icon-circle">
                <Icon name="gear" />
              </div>
              <div>
                <h4>Centrifugal Casting Matrix</h4>
                <p>
                  Dense, pore-free gray cast iron prevents micro-cracks and maintains
                  bore roundness under severe thermodynamic expansion.
                </p>
              </div>
            </div>

            <div className="eng-feature-box">
              <div className="eng-icon-circle">
                <Icon name="shield-check" />
              </div>
              <div>
                <h4>Anti-Scuff Skirt Coating</h4>
                <p>
                  Molybdenum disulfide impregnated skirt on FUJI pistons ensures
                  seamless break-in without cylinder wall scoring.
                </p>
              </div>
            </div>

            <div className="eng-feature-box">
              <div className="eng-icon-circle">
                <Icon name="bolt" />
              </div>
              <div>
                <h4>High-Thermal Flow Metallurgy</h4>
                <p>
                  Rapid heat conduction away from the combustion bowl prevents
                  pre-ignition knocking and valve deformation under peak RPMs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

