import React from "react";

interface CategoryStripProps {
  onSelectCategory: (category: string) => void;
}

export function CategoryStrip({ onSelectCategory }: CategoryStripProps) {
  const categories = [
    {
      id: "battery",
      title: "Two-Wheeler Batteries",
      img: "/images/battery.jpg",
      alt: "Batteries",
    },
    {
      id: "piston",
      title: "Pistons & Assemblies",
      img: "/images/piston-conrod.jpg",
      alt: "Pistons",
    },
    {
      id: "liner",
      title: "Cylinder Liners & Sleeves",
      img: "/images/cylinder-liner.jpg",
      alt: "Cylinder Liners",
    },
    {
      id: "valves",
      title: "High-Heat Engine Valves",
      img: "/images/valves.jpg",
      alt: "Engine Valves",
    },
    {
      id: "gasket",
      title: "Cylinder Head Gaskets",
      img: "/images/head-gasket.jpg",
      alt: "Head Gaskets",
    },
    {
      id: "gasket",
      title: "Full Overhaul Gasket Sets",
      img: "/images/gasket-set.jpg",
      alt: "Gasket Sets",
    },
    {
      id: "gasket",
      title: "Heat-Proof Gasket Cloth",
      img: "/images/gasket-cloth.jpg",
      alt: "Gasket Material",
    },
  ];

  return (
    <div className="cat-strip-section">
      <div className="container">
        <div className="cat-scroll-container">
          {categories.map((cat, idx) => (
            <a
              key={idx}
              href="#catalog"
              className="cat-card-item"
              onClick={() => onSelectCategory(cat.id)}
            >
              <div className="cat-img-wrap">
                <img src={cat.img} alt={cat.alt} />
              </div>
              <span className="cat-title">{cat.title}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

