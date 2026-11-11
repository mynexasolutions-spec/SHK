import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PRODUCTS, Product } from "@/data/products";
import { ProductPageClient } from "./ProductPageClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "Product Not Found | SHK Auto",
    };
  }

  return {
    title: `${product.title} - Price ₹${product.price} | SHK Auto`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.title,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Related products from same category or complementary, topped up to 4 items
  const sameBrandOrCat = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.brand === product.brand)
  );
  const otherPopular = PRODUCTS.filter(
    (p) => p.id !== product.id && p.category !== product.category && p.brand !== product.brand
  );
  const relatedProducts = [...sameBrandOrCat, ...otherPopular].slice(0, 4);

  return (
    <ProductPageClient product={product} relatedProducts={relatedProducts} />
  );
}

