"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/SvgSprite";
import { PRODUCTS, Product } from "@/data/products";

// ========================================================
// TYPES & INTERFACES
// ========================================================
interface AdminOrder {
  id: string;
  customerName: string;
  workshopName: string;
  date: string;
  items: string;
  units: number;
  total: number;
  paymentMethod: string;
  status: "Processing" | "Dispatched" | "Delivered";
  paymentStatus: "Paid" | "Pending";
}

interface QuoteInquiry {
  id: string;
  name: string;
  garage: string;
  phone: string;
  parts: string;
  qty: string;
  status: "Pending" | "Quoted" | "Fulfilled";
  date: string;
}

interface AdminCategory {
  id: string;
  name: string;
  brand: "Nexcolle" | "FUJI";
  slug: string;
  skuCount: number;
  description: string;
  status: "Active" | "Inactive";
  displayOrder: number;
}

interface AdminCustomer {
  id: string;
  name: string;
  garage: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  tier: "Gold Wholesale Partner" | "Silver Garage" | "Retail Mechanic";
  ordersCount: number;
  totalSpend: number;
  verified: boolean;
  joinedDate: string;
}

interface AdminReview {
  id: string;
  customerName: string;
  garage: string;
  city: string;
  productName: string;
  rating: number;
  comment: string;
  date: string;
  status: "Approved" | "Pending";
}

interface AdminCoupon {
  id: string;
  code: string;
  description: string;
  discountType: "Percentage" | "Flat";
  discountValue: number;
  minOrder: number;
  usageCount: number;
  usageLimit: number;
  expiryDate: string;
  status: "Active" | "Expired";
}

interface AdminSubscriber {
  id: string;
  email: string;
  garageName: string;
  date: string;
  type: "Verified Garage" | "Retail Mechanic" | "Fleet Owner";
  status: "Active" | "Unsubscribed";
}

interface AdminHeroSlide {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  status: "Active" | "Draft";
  order: number;
}

interface AdminFAQ {
  id: string;
  question: string;
  answer: string;
  category: "Compatibility" | "Batteries" | "Engine Spares" | "B2B Trade";
}

// ========================================================
// COMPONENT
// ========================================================
export default function AdminDashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [adminUser, setAdminUser] = useState<{ name: string; email: string; role: string } | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Active section state
  const [currentSection, setCurrentSection] = useState<
    | "dashboard"
    | "categories"
    | "products"
    | "orders"
    | "home-customization"
    | "customers"
    | "reviews"
    | "inquiries"
    | "subscribers"
    | "hero-slides"
    | "announcements"
    | "coupons"
    | "delivery-settings"
    | "faqs"
  >("dashboard");

  // Read section param on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const sec = params.get("section");
      if (sec && [
        "dashboard", "categories", "products", "orders", "home-customization",
        "customers", "reviews", "inquiries", "subscribers", "hero-slides",
        "announcements", "coupons", "delivery-settings", "faqs"
      ].includes(sec)) {
        setCurrentSection(sec as any);
      }
    }
  }, []);

  const handleSelectSection = (sectionId: typeof currentSection) => {
    setCurrentSection(sectionId);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("section", sectionId);
      window.history.pushState({}, "", url.toString());
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // 1. Categories State
  const [categories, setCategories] = useState<AdminCategory[]>([
    {
      id: "cat-1",
      name: "Batteries & Power Systems",
      brand: "Nexcolle",
      slug: "battery",
      skuCount: 3,
      description: "Maintenance-Free VRLA AGM motorcycle batteries with 36-month warranty",
      status: "Active",
      displayOrder: 1,
    },
    {
      id: "cat-2",
      name: "Forged & Cast Pistons",
      brand: "FUJI",
      slug: "piston",
      skuCount: 4,
      description: "Japanese AC8A hypereutectic metallurgy piston kits with micro-tin skirt coating",
      status: "Active",
      displayOrder: 2,
    },
    {
      id: "cat-3",
      name: "Centrifugal Cylinder Liners",
      brand: "FUJI",
      slug: "liner",
      skuCount: 2,
      description: "Centrifugally cast grey iron sleeves with diamond plateau crosshatching",
      status: "Active",
      displayOrder: 3,
    },
    {
      id: "cat-4",
      name: "Precision Valve Sets",
      brand: "FUJI",
      slug: "valves",
      skuCount: 2,
      description: "SUH-35 friction welded bimetallic valves with stellite-faced seats",
      status: "Active",
      displayOrder: 4,
    },
  ]);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [newCatBrand, setNewCatBrand] = useState<"Nexcolle" | "FUJI">("FUJI");
  const [newCatSlug, setNewCatSlug] = useState("");
  const [newCatDesc, setNewCatDesc] = useState("");

  // 2. Inventory / Products State
  const [inventoryList, setInventoryList] = useState<Product[]>(PRODUCTS);
  const [productSearch, setProductSearch] = useState("");
  const [productBrandFilter, setProductBrandFilter] = useState("all");
  const [productCategoryFilter, setProductCategoryFilter] = useState("all");
  const [productStockFilter, setProductStockFilter] = useState("all");
  const [editingStockId, setEditingStockId] = useState<string | null>(null);
  const [newStockVal, setNewStockVal] = useState<number>(0);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProdTitle, setNewProdTitle] = useState("");
  const [newProdBrand, setNewProdBrand] = useState<"Nexcolle" | "FUJI">("FUJI");
  const [newProdCategory, setNewProdCategory] = useState<"battery" | "piston" | "liner" | "valves">("piston");
  const [newProdPrice, setNewProdPrice] = useState(850);
  const [newProdStock, setNewProdStock] = useState(25);

  // 3. Orders State
  const [orders, setOrders] = useState<AdminOrder[]>([
    {
      id: "SHK-729415",
      customerName: "Md Irshad",
      workshopName: "Apex Moto Works, Patna",
      date: "Today, 11:42 AM",
      items: "Nexcolle Pro-Power 12V 4Ah + FUJI Piston Kit",
      units: 4,
      total: 5100,
      paymentMethod: "UPI / Net Banking",
      status: "Dispatched",
      paymentStatus: "Paid",
    },
    {
      id: "SHK-729402",
      customerName: "Deepak Sharma",
      workshopName: "Sharma Auto Works, Pune",
      date: "Yesterday",
      items: "Nexcolle Heavy-Duty 12V 5Ah VRLA Battery",
      units: 10,
      total: 16500,
      paymentMethod: "B2B Trade Invoice",
      status: "Processing",
      paymentStatus: "Paid",
    },
    {
      id: "SHK-729388",
      customerName: "Manoj Kumar",
      workshopName: "SpeedPoint Performance, Bengaluru",
      date: "09 Nov 2026",
      items: "FUJI Centrifugal Cast Iron Cylinder Liner",
      units: 6,
      total: 5880,
      paymentMethod: "Razorpay Gateway",
      status: "Delivered",
      paymentStatus: "Paid",
    },
    {
      id: "SHK-729364",
      customerName: "Vikram Rathi",
      workshopName: "Rathi Motors & Spares, Jaipur",
      date: "08 Nov 2026",
      items: "FUJI Precision Valve Set + Head Gasket",
      units: 12,
      total: 8280,
      paymentMethod: "Cash on Delivery",
      status: "Processing",
      paymentStatus: "Paid",
    },
  ]);
  const [orderStatusFilter, setOrderStatusFilter] = useState<"all" | "Processing" | "Dispatched" | "Delivered">("all");
  const [orderSearchQuery, setOrderSearchQuery] = useState("");

  // 4. Inquiries State
  const [quotes, setQuotes] = useState<QuoteInquiry[]>([
    {
      id: "RFQ-104",
      name: "Rajesh Verma",
      garage: "Verma Two Wheeler Works, Lucknow",
      phone: "+91 98390 12345",
      parts: "FUJI 150cc Piston Kits & Gaskets",
      qty: "50 Units Slab",
      status: "Pending",
      date: "2 hours ago",
    },
    {
      id: "RFQ-103",
      name: "Suresh Pillai",
      garage: "Kochi Moto Spares, Kerala",
      phone: "+91 94470 54321",
      parts: "Nexcolle 12V 4Ah & 5Ah VRLA Batteries",
      qty: "100 Units Wholesale",
      status: "Quoted",
      date: "Yesterday",
    },
    {
      id: "RFQ-102",
      name: "Anil Kulkarni",
      garage: "Deccan Riders Garage, Pune",
      phone: "+91 98220 98765",
      parts: "FUJI Valves & Centrifugal Liners",
      qty: "30 Units Batch",
      status: "Pending",
      date: "3 days ago",
    },
  ]);
  const [rfqFilter, setRfqFilter] = useState<"all" | "Pending" | "Quoted" | "Fulfilled">("all");

  // 5. Customers State
  const [customers, setCustomers] = useState<AdminCustomer[]>([
    {
      id: "CUST-101",
      name: "Md Irshad",
      garage: "Apex Moto Works",
      city: "Patna",
      state: "Bihar",
      phone: "+91 98765 43210",
      email: "irshad.apex@gmail.com",
      tier: "Gold Wholesale Partner",
      ordersCount: 8,
      totalSpend: 78500,
      verified: true,
      joinedDate: "12 Oct 2025",
    },
    {
      id: "CUST-102",
      name: "Deepak Sharma",
      garage: "Sharma Auto Works",
      city: "Pune",
      state: "Maharashtra",
      phone: "+91 98234 11223",
      email: "deepak.sharma.auto@gmail.com",
      tier: "Gold Wholesale Partner",
      ordersCount: 14,
      totalSpend: 142000,
      verified: true,
      joinedDate: "28 Aug 2025",
    },
    {
      id: "CUST-103",
      name: "Manoj Kumar",
      garage: "SpeedPoint Performance",
      city: "Bengaluru",
      state: "Karnataka",
      phone: "+91 98450 67890",
      email: "manoj@speedpoint.in",
      tier: "Silver Garage",
      ordersCount: 5,
      totalSpend: 46200,
      verified: true,
      joinedDate: "15 Jan 2026",
    },
    {
      id: "CUST-104",
      name: "Vikram Rathi",
      garage: "Rathi Motors & Spares",
      city: "Jaipur",
      state: "Rajasthan",
      phone: "+91 94140 22334",
      email: "rathi.spares@yahoo.com",
      tier: "Silver Garage",
      ordersCount: 6,
      totalSpend: 54100,
      verified: true,
      joinedDate: "04 Mar 2026",
    },
    {
      id: "CUST-105",
      name: "Ramesh Nair",
      garage: "Nair Two-Wheeler Clinic",
      city: "Kochi",
      state: "Kerala",
      phone: "+91 94470 99887",
      email: "ramesh.nair@gmail.com",
      tier: "Retail Mechanic",
      ordersCount: 2,
      totalSpend: 18200,
      verified: false,
      joinedDate: "02 Nov 2026",
    },
  ]);
  const [customerSearch, setCustomerSearch] = useState("");

  // 6. Reviews State
  const [reviews, setReviews] = useState<AdminReview[]>([
    {
      id: "REV-201",
      customerName: "Md Irshad",
      garage: "Apex Moto Works",
      city: "Patna",
      productName: "Nexcolle Pro-Power 12V 4Ah Maintenance-Free Battery",
      rating: 5,
      comment: "Cold cranking amps are phenomenal. Installed on 10 Pulsar 150s in our workshop without a single warranty claim.",
      date: "Today, 10:15 AM",
      status: "Approved",
    },
    {
      id: "REV-202",
      customerName: "Deepak Sharma",
      garage: "Sharma Auto Works",
      city: "Pune",
      productName: "FUJI Hypereutectic Piston Kit (150cc)",
      rating: 5,
      comment: "Japanese alloy quality is evident right out of the box. Skirt tin coating eliminated break-in scuffing entirely.",
      date: "Yesterday",
      status: "Approved",
    },
    {
      id: "REV-203",
      customerName: "Sanjay Patel",
      garage: "Patel Garage",
      city: "Ahmedabad",
      productName: "FUJI Centrifugal Cylinder Liner",
      rating: 5,
      comment: "Plateau honing on the sleeve saved us boring time. Mechanics love the precision fitment.",
      date: "08 Nov 2026",
      status: "Approved",
    },
    {
      id: "REV-204",
      customerName: "Ramesh Nair",
      garage: "Nair Two-Wheeler Clinic",
      city: "Kochi",
      productName: "Nexcolle Heavy-Duty 12V 5Ah VRLA Battery",
      rating: 5,
      comment: "Excellent battery for self-start scooters. Customer was impressed with instant ignition.",
      date: "07 Nov 2026",
      status: "Pending",
    },
  ]);
  const [reviewFilter, setReviewFilter] = useState<"all" | "Approved" | "Pending">("all");

  // 7. Subscribers State
  const [subscribers, setSubscribers] = useState<AdminSubscriber[]>([
    { id: "SUB-1", email: "irshad.apex@gmail.com", garageName: "Apex Moto Works", date: "12 Oct 2025", type: "Verified Garage", status: "Active" },
    { id: "SUB-2", email: "deepak.sharma.auto@gmail.com", garageName: "Sharma Auto Works", date: "28 Aug 2025", type: "Verified Garage", status: "Active" },
    { id: "SUB-3", email: "manoj@speedpoint.in", garageName: "SpeedPoint Performance", date: "15 Jan 2026", type: "Verified Garage", status: "Active" },
    { id: "SUB-4", email: "rathi.spares@yahoo.com", garageName: "Rathi Motors & Spares", date: "04 Mar 2026", type: "Verified Garage", status: "Active" },
    { id: "SUB-5", email: "delhi.motocare@gmail.com", garageName: "Delhi MotoCare", date: "20 May 2026", type: "Retail Mechanic", status: "Active" },
    { id: "SUB-6", email: "chennai.speed@outlook.com", garageName: "Chennai Speed Hub", date: "10 Jun 2026", type: "Fleet Owner", status: "Active" },
  ]);

  // 8. Hero Slides State
  const [heroSlides, setHeroSlides] = useState<AdminHeroSlide[]>([
    {
      id: "SLIDE-1",
      title: "Power Every Ride. Engineered to Last.",
      subtitle: "Genuine Nexcolle™ high-CCA motorcycle batteries and FUJI™ precision engine components.",
      badge: "OEM-GRADE ENGINEERING & SPARES",
      ctaText: "Explore Catalog",
      ctaLink: "/products",
      image: "/images/hero-rider.jpg",
      status: "Active",
      order: 1,
    },
    {
      id: "SLIDE-2",
      title: "Japanese Metallurgy. Zero Cylinder Scuffing.",
      subtitle: "FUJI hypereutectic pistons with micro-tin skirt coating and gas-nitrided compression rings.",
      badge: "FUJI PRECISION ENGINE SPARES",
      ctaText: "View FUJI Range",
      ctaLink: "/products?brand=FUJI",
      image: "/images/piston.jpg",
      status: "Active",
      order: 2,
    },
    {
      id: "SLIDE-3",
      title: "Instant 400+ Cold Cranking Amps in All Seasons.",
      subtitle: "Nexcolle maintenance-free VRLA AGM batteries with calcium alloy plates.",
      badge: "NEXCOLLE BATTERY SYSTEMS",
      ctaText: "View Batteries",
      ctaLink: "/products?brand=Nexcolle",
      image: "/images/battery.jpg",
      status: "Active",
      order: 3,
    },
  ]);

  // 9. Announcements State
  const [announcement, setAnnouncement] = useState({
    enabled: true,
    badgeText: "Dispatch Center Live",
    marqueeText: "Pan-India Logistics & Wholesale Supply for Verified Garages",
    offerCode: "GARAGE10",
    offerNotice: "Flat 10% Wholesale rebate on orders above ₹10,000 with code GARAGE10",
  });

  // 10. Coupons State
  const [coupons, setCoupons] = useState<AdminCoupon[]>([
    {
      id: "CPN-1",
      code: "GARAGE10",
      description: "Flat 10% Wholesale rebate on orders above ₹10,000 for verified garages",
      discountType: "Percentage",
      discountValue: 10,
      minOrder: 10000,
      usageCount: 38,
      usageLimit: 200,
      expiryDate: "31 Dec 2026",
      status: "Active",
    },
    {
      id: "CPN-2",
      code: "SHKFIRST",
      description: "Welcome credit for new garage registration on first order",
      discountType: "Flat",
      discountValue: 500,
      minOrder: 3000,
      usageCount: 84,
      usageLimit: 500,
      expiryDate: "31 Dec 2026",
      status: "Active",
    },
    {
      id: "CPN-3",
      code: "FUJIBULK",
      description: "Special 15% discount on bulk engine rebuild kits",
      discountType: "Percentage",
      discountValue: 15,
      minOrder: 15000,
      usageCount: 19,
      usageLimit: 100,
      expiryDate: "15 Dec 2026",
      status: "Active",
    },
  ]);
  const [showAddCouponModal, setShowAddCouponModal] = useState(false);
  const [newCouponCode, setNewCouponCode] = useState("");
  const [newCouponDiscount, setNewCouponDiscount] = useState(10);
  const [newCouponMin, setNewCouponMin] = useState(5000);

  // 11. Delivery Settings State
  const [deliverySettings, setDeliverySettings] = useState({
    freeThreshold: 5000,
    standardFee: 150,
    airExpressFee: 350,
    sameDayCutoff: "14:00",
    pincodeEngine: true,
  });

  // 12. FAQs State
  const [faqs, setFaqs] = useState<AdminFAQ[]>([
    {
      id: "FAQ-1",
      question: "Are Nexcolle motorcycle batteries pre-charged and ready to install?",
      answer: "Yes, all Nexcolle batteries are hermetically factory-sealed AGM VRLA units filled with high-purity electrolyte and fully activated. They require zero initial charging or acid handling.",
      category: "Batteries",
    },
    {
      id: "FAQ-2",
      question: "What metallurgy is used in FUJI engine pistons?",
      answer: "FUJI pistons are manufactured from Japanese JIS AC8A high-silicon hypereutectic aluminum alloy with a proprietary micro-tin skirt coating and gas-nitrided compression rings.",
      category: "Engine Spares",
    },
    {
      id: "FAQ-3",
      question: "How do registered workshop garages qualify for wholesale tier pricing?",
      answer: "Garages and retailers registered with valid GST or commercial workshop address automatically access 12%, 20%, and 28% volume rebate slabs directly in their cart.",
      category: "B2B Trade",
    },
    {
      id: "FAQ-4",
      question: "What is the warranty policy on battery and engine component defects?",
      answer: "Nexcolle batteries include a 36-month replacement warranty. FUJI engine spares carry a 12-month manufacturing defect replacement guarantee.",
      category: "Compatibility",
    },
  ]);
  const [showAddFaqModal, setShowAddFaqModal] = useState(false);
  const [newFaqQ, setNewFaqQ] = useState("");
  const [newFaqA, setNewFaqA] = useState("");
  const [newFaqCat, setNewFaqCat] = useState<AdminFAQ["category"]>("Engine Spares");

  // 13. Home Customization State
  const [homeCustom, setHomeCustom] = useState({
    heroHeadline: "Power Every Ride. Engineered to Last.",
    heroSubtitle: "Genuine Nexcolle™ high-CCA motorcycle batteries and FUJI™ precision engine components. Built for extreme heat, heavy duty, and maximum reliability.",
    heroBadge: "OEM-GRADE ENGINEERING & SPARES",
    showCompatibilityMatrix: true,
    showBrandPillars: true,
    showWholesaleSlabs: true,
    showSupplyChainTrust: true,
  });

  // Security Auth Gate: redirect to /admin/login if not authenticated
  useEffect(() => {
    try {
      const isAuth = localStorage.getItem("shk_admin_auth") === "true";
      if (!isAuth) {
        setIsAuthenticated(false);
        router.replace("/admin/login");
        return;
      }
      setIsAuthenticated(true);
      const savedUser = localStorage.getItem("shk_admin_user");
      if (savedUser) {
        setAdminUser(JSON.parse(savedUser));
      } else {
        setAdminUser({ name: "Admin", email: "admin@shkauto.in", role: "Administrator" });
      }
    } catch {
      router.replace("/admin/login");
    }
  }, [router]);

  const handleLogout = () => {
    try {
      localStorage.removeItem("shk_admin_auth");
      localStorage.removeItem("shk_admin_user");
    } catch {
      // Ignore
    }
    router.replace("/admin/login");
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: "Processing" | "Dispatched" | "Delivered") => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    showToast(`Order #${orderId} status updated to ${newStatus}`);
  };

  const handleUpdateStock = (productId: string) => {
    setInventoryList((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stock: newStockVal } : p))
    );
    setEditingStockId(null);
    showToast("Product stock quantity updated");
  };

  if (isAuthenticated === null || isAuthenticated === false) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#070a0f",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff",
          fontFamily: "var(--font-sans)",
        }}
      >
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            border: "3px solid rgba(249, 87, 22, 0.2)",
            borderTopColor: "var(--primary)",
            animation: "adminSpin 0.7s linear infinite",
            marginBottom: "16px",
          }}
        />
        <style>{`@keyframes adminSpin { to { transform: rotate(360deg); } }`}</style>
        <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "#94a3b8" }}>
          Loading Admin Control Center...
        </div>
      </div>
    );
  }

  // Sidebar Menu Items matching user's sidebar
  const sidebarItems: { id: typeof currentSection; label: string; icon: string; count?: number }[] = [
    { id: "dashboard", label: "Dashboard", icon: "grid" },
    { id: "categories", label: "Categories", icon: "layers" },
    { id: "products", label: "Products", icon: "package", count: inventoryList.length },
    { id: "orders", label: "Orders", icon: "cart", count: orders.filter((o) => o.status === "Processing").length },
    { id: "home-customization", label: "Home Customization", icon: "layout" },
    { id: "customers", label: "Customers", icon: "users" },
    { id: "reviews", label: "Reviews", icon: "star" },
    { id: "inquiries", label: "Inquiries", icon: "message-square", count: quotes.filter((q) => q.status === "Pending").length },
    { id: "subscribers", label: "Subscribers", icon: "mail" },
    { id: "hero-slides", label: "Hero Slides", icon: "image" },
    { id: "announcements", label: "Announcements", icon: "megaphone" },
    { id: "coupons", label: "Coupons", icon: "tag" },
    { id: "delivery-settings", label: "Delivery Settings", icon: "truck" },
    { id: "faqs", label: "Global FAQs", icon: "help-circle" },
  ];

  // 14-day sales chart mock bars
  const salesDays = [
    { label: "27 Oct", value: 12 },
    { label: "28 Oct", value: 8 },
    { label: "29 Oct", value: 15 },
    { label: "30 Oct", value: 20 },
    { label: "31 Oct", value: 10 },
    { label: "1 Nov", value: 95, isPeak: true },
    { label: "2 Nov", value: 18 },
    { label: "3 Nov", value: 22 },
    { label: "4 Nov", value: 14 },
    { label: "5 Nov", value: 16 },
    { label: "6 Nov", value: 25 },
    { label: "7 Nov", value: 19 },
    { label: "8 Nov", value: 30 },
    { label: "9 Nov", value: 24 },
  ];

  const pendingOrdersCount = orders.filter((o) => o.status === "Processing").length;
  const pendingInquiriesCount = quotes.filter((q) => q.status === "Pending").length;
  const lowStockCount = inventoryList.filter((p) => p.stock < 10).length;

  // Filtered inventory
  const filteredProducts = inventoryList.filter((p) => {
    const matchSearch =
      productSearch.trim() === "" ||
      p.title.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.id.toLowerCase().includes(productSearch.toLowerCase());
    const matchBrand = productBrandFilter === "all" || p.brand.toLowerCase() === productBrandFilter.toLowerCase();
    const matchCategory = productCategoryFilter === "all" || p.category.toLowerCase() === productCategoryFilter.toLowerCase();
    const matchStock =
      productStockFilter === "all" ||
      (productStockFilter === "low" && p.stock < 10) ||
      (productStockFilter === "instock" && p.stock >= 10);
    return matchSearch && matchBrand && matchCategory && matchStock;
  });

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    const matchStatus = orderStatusFilter === "all" || o.status === orderStatusFilter;
    const matchSearch =
      orderSearchQuery.trim() === "" ||
      o.id.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
      o.workshopName.toLowerCase().includes(orderSearchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  // Filtered RFQs
  const filteredRfqs = quotes.filter((q) => {
    return rfqFilter === "all" || q.status === rfqFilter;
  });

  // Filtered Reviews
  const filteredReviews = reviews.filter((r) => {
    return reviewFilter === "all" || r.status === reviewFilter;
  });

  // Filtered Customers
  const filteredCustomers = customers.filter((c) => {
    return (
      customerSearch.trim() === "" ||
      c.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
      c.garage.toLowerCase().includes(customerSearch.toLowerCase()) ||
      c.city.toLowerCase().includes(customerSearch.toLowerCase())
    );
  });

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#070a0f",
        color: "#ffffff",
        fontFamily: "var(--font-sans)",
      }}
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            backgroundColor: "var(--primary)",
            color: "#ffffff",
            padding: "12px 20px",
            borderRadius: "10px",
            fontWeight: 700,
            fontSize: "0.88rem",
            boxShadow: "0 8px 24px rgba(249, 87, 22, 0.4)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            gap: "8px",
            animation: "fadeIn 0.2s ease",
          }}
        >
          <Icon name="check-circle" style={{ width: "18px", height: "18px" }} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ========================================================
          1. LEFT SIDEBAR (DARK THEME WITH ORANGE ACCENTS)
          ======================================================== */}
      <aside
        style={{
          width: isSidebarCollapsed ? "80px" : "260px",
          backgroundColor: "#0a0e17",
          borderRight: "1px solid rgba(255, 255, 255, 0.08)",
          display: "flex",
          flexDirection: "column",
          transition: "width 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
          flexShrink: 0,
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
          zIndex: 30,
        }}
      >
        {/* Brand Header */}
        <div
          style={{
            padding: isSidebarCollapsed ? "20px 10px" : "20px 22px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            justifyContent: isSidebarCollapsed ? "center" : "flex-start",
          }}
        >
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)",
              display: "grid",
              placeItems: "center",
              fontWeight: 900,
              fontSize: "1.2rem",
              color: "#ffffff",
              boxShadow: "0 4px 14px rgba(249, 87, 22, 0.35)",
              flexShrink: 0,
            }}
          >
            S
          </div>
          {!isSidebarCollapsed && (
            <div>
              <div style={{ fontSize: "1.05rem", fontWeight: 900, letterSpacing: "-0.01em", lineHeight: 1 }}>
                SHK<span style={{ color: "var(--primary)" }}>AUTO</span>
              </div>
              <div style={{ fontSize: "0.62rem", color: "var(--primary)", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", marginTop: "3px" }}>
                ADMIN PANEL
              </div>
            </div>
          )}
        </div>

        {/* Navigation Menu */}
        <nav style={{ padding: "12px 10px", flex: 1, display: "flex", flexDirection: "column", gap: "2px" }}>
          {sidebarItems.map((item) => {
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectSection(item.id)}
                title={isSidebarCollapsed ? item.label : undefined}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: isSidebarCollapsed ? "12px" : "10px 14px",
                  borderRadius: "10px",
                  border: "none",
                  backgroundColor: isActive ? "rgba(249, 87, 22, 0.12)" : "transparent",
                  color: isActive ? "var(--primary)" : "#94a3b8",
                  fontSize: "0.88rem",
                  fontWeight: isActive ? 700 : 500,
                  cursor: "pointer",
                  textAlign: "left",
                  position: "relative",
                  transition: "all 0.15s ease",
                  justifyContent: isSidebarCollapsed ? "center" : "flex-start",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.04)";
                    e.currentTarget.style.color = "#ffffff";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#94a3b8";
                  }
                }}
              >
                {/* Active Indicator Bar on Left */}
                {isActive && (
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "6px",
                      bottom: "6px",
                      width: "3px",
                      backgroundColor: "var(--primary)",
                      borderRadius: "0 4px 4px 0",
                    }}
                  />
                )}

                <Icon
                  name={item.icon}
                  style={{
                    width: "18px",
                    height: "18px",
                    color: isActive ? "var(--primary)" : "#94a3b8",
                    flexShrink: 0,
                  }}
                />

                {!isSidebarCollapsed && (
                  <span style={{ flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {item.label}
                  </span>
                )}

                {!isSidebarCollapsed && item.count !== undefined && item.count > 0 && (
                  <span
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 800,
                      backgroundColor: isActive ? "var(--primary)" : "rgba(255, 255, 255, 0.08)",
                      color: "#ffffff",
                      padding: "1px 6px",
                      borderRadius: "var(--radius-full)",
                    }}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Collapse Sidebar Button at Bottom */}
        <div style={{ padding: "12px 14px", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              color: "#64748b",
              fontSize: "0.82rem",
              fontWeight: 600,
              padding: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              justifyContent: isSidebarCollapsed ? "center" : "flex-start",
              borderRadius: "8px",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
          >
            <Icon
              name="chevron-left"
              style={{
                width: "16px",
                height: "16px",
                transform: isSidebarCollapsed ? "rotate(180deg)" : "none",
                transition: "transform 0.2s ease",
              }}
            />
            {!isSidebarCollapsed && <span>Collapse Sidebar</span>}
          </button>
        </div>
      </aside>

      {/* ========================================================
          2. MAIN CONTENT AREA
          ======================================================== */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Top Header Bar */}
        <header
          style={{
            height: "70px",
            backgroundColor: "#0a0e17",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 32px",
            position: "sticky",
            top: 0,
            zIndex: 20,
          }}
        >
          {/* Breadcrumb Title */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "0.85rem", color: "#64748b" }}>Admin</span>
            <span style={{ fontSize: "0.85rem", color: "#64748b" }}>/</span>
            <span style={{ fontSize: "1.05rem", fontWeight: 700, color: "#ffffff" }}>
              {sidebarItems.find((item) => item.id === currentSection)?.label || "Dashboard"}
            </span>
          </div>

          {/* Right Header Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {/* Storefront Link */}
            <Link
              href="/"
              target="_blank"
              style={{
                fontSize: "0.82rem",
                color: "#cbd5e1",
                textDecoration: "none",
                padding: "5px 12px",
                borderRadius: "var(--radius-full)",
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                fontWeight: 600,
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span>Storefront</span>
            </Link>

            {/* Admin User Profile Pill */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  backgroundColor: "rgba(16, 185, 129, 0.15)",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                  color: "#10b981",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <Icon name="user" style={{ width: "18px", height: "18px" }} />
              </div>
              <div style={{ lineHeight: 1.2 }}>
                <div style={{ fontSize: "0.84rem", fontWeight: 700, color: "#ffffff" }}>
                  {adminUser?.name || "Md Irshad"}
                </div>
                <div style={{ fontSize: "0.68rem", color: "#64748b", fontWeight: 600 }}>
                  {adminUser?.role || "Super Admin"}
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: "transparent",
                border: "none",
                color: "#64748b",
                fontSize: "0.85rem",
                fontWeight: 600,
                cursor: "pointer",
                padding: "8px 12px",
                borderRadius: "8px",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#ef4444";
                e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#64748b";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <Icon name="logout" style={{ width: "16px", height: "16px" }} />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Dashboard Body */}
        <main style={{ padding: "32px 36px 64px 36px", maxWidth: "1400px", width: "100%", margin: "0 auto" }}>
          
          {/* ========================================================
              VIEW 1: DASHBOARD / STORE OVERVIEW
              ======================================================== */}
          {currentSection === "dashboard" && (
            <div>
              {/* Store Overview Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  marginBottom: "28px",
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                <div>
                  <h1
                    style={{
                      fontSize: "2.1rem",
                      fontWeight: 900,
                      letterSpacing: "-0.02em",
                      color: "#ffffff",
                      margin: "0 0 6px 0",
                      fontFamily: "var(--font-heading)",
                    }}
                  >
                    Store Overview
                  </h1>
                  <p style={{ color: "#94a3b8", fontSize: "0.95rem", margin: 0 }}>
                    Welcome back! Here&apos;s what needs your attention and how the store is doing.
                  </p>
                </div>
                <div style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 600 }}>
                  {new Date().toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                </div>
              </div>

              {/* Row 1: Attention Cards */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                  gap: "16px",
                  marginBottom: "20px",
                }}
              >
                {/* Orders to process */}
                <div
                  onClick={() => handleSelectSection("orders")}
                  style={{
                    backgroundColor: "#0d121c",
                    borderRadius: "16px",
                    padding: "18px 20px",
                    border: "1px solid rgba(255, 255, 255, 0.07)",
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.07)")}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      backgroundColor: "rgba(249, 87, 22, 0.12)",
                      display: "grid",
                      placeItems: "center",
                      color: "var(--primary)",
                      flexShrink: 0,
                    }}
                  >
                    <Icon name="cart" style={{ width: "20px", height: "20px" }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "1.3rem", fontWeight: 900, color: "#ffffff", lineHeight: 1.1 }}>
                      {pendingOrdersCount}
                    </div>
                    <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#f8fafc", marginTop: "2px" }}>
                      Orders to process
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "#64748b" }}>
                      Pending or processing
                    </div>
                  </div>
                </div>

                {/* Reviews to approve */}
                <div
                  onClick={() => handleSelectSection("reviews")}
                  style={{
                    backgroundColor: "#0d121c",
                    borderRadius: "16px",
                    padding: "18px 20px",
                    border: "1px solid rgba(255, 255, 255, 0.07)",
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#10b981")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.07)")}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      backgroundColor: "rgba(16, 185, 129, 0.12)",
                      display: "grid",
                      placeItems: "center",
                      color: "#10b981",
                      flexShrink: 0,
                    }}
                  >
                    <Icon name="check-circle" style={{ width: "20px", height: "20px" }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "1.3rem", fontWeight: 900, color: "#ffffff", lineHeight: 1.1 }}>
                      {reviews.filter((r) => r.status === "Pending").length}
                    </div>
                    <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#f8fafc", marginTop: "2px" }}>
                      Reviews to approve
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "#64748b" }}>
                      {reviews.filter((r) => r.status === "Pending").length > 0 ? "Pending moderation" : "Nothing waiting"}
                    </div>
                  </div>
                </div>

                {/* Open inquiries */}
                <div
                  onClick={() => handleSelectSection("inquiries")}
                  style={{
                    backgroundColor: "#0d121c",
                    borderRadius: "16px",
                    padding: "18px 20px",
                    border: "1px solid rgba(255, 255, 255, 0.07)",
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.07)")}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      backgroundColor: pendingInquiriesCount > 0 ? "rgba(249, 87, 22, 0.12)" : "rgba(16, 185, 129, 0.12)",
                      display: "grid",
                      placeItems: "center",
                      color: pendingInquiriesCount > 0 ? "var(--primary)" : "#10b981",
                      flexShrink: 0,
                    }}
                  >
                    <Icon name="message-square" style={{ width: "20px", height: "20px" }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "1.3rem", fontWeight: 900, color: "#ffffff", lineHeight: 1.1 }}>
                      {pendingInquiriesCount}
                    </div>
                    <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#f8fafc", marginTop: "2px" }}>
                      Open inquiries
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "#64748b" }}>
                      {pendingInquiriesCount > 0 ? `${pendingInquiriesCount} RFQs waiting` : "No open inquiries"}
                    </div>
                  </div>
                </div>

                {/* Low stock variants */}
                <div
                  onClick={() => handleSelectSection("products")}
                  style={{
                    backgroundColor: "#0d121c",
                    borderRadius: "16px",
                    padding: "18px 20px",
                    border: "1px solid rgba(255, 255, 255, 0.07)",
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#10b981")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.07)")}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      backgroundColor: "rgba(16, 185, 129, 0.12)",
                      display: "grid",
                      placeItems: "center",
                      color: "#10b981",
                      flexShrink: 0,
                    }}
                  >
                    <Icon name="check-circle" style={{ width: "20px", height: "20px" }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "1.3rem", fontWeight: 900, color: "#ffffff", lineHeight: 1.1 }}>
                      {lowStockCount}
                    </div>
                    <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#f8fafc", marginTop: "2px" }}>
                      Low stock variants
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "#64748b" }}>
                      {lowStockCount === 0 ? "Stock looks healthy" : `${lowStockCount} items below threshold`}
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2: 4 Key Metric Cards */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                  gap: "16px",
                  marginBottom: "28px",
                }}
              >
                {/* Metric 1 */}
                <div style={{ backgroundColor: "#0d121c", borderRadius: "16px", padding: "20px", border: "1px solid rgba(255, 255, 255, 0.07)" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "10px", backgroundColor: "rgba(249, 87, 22, 0.15)", color: "var(--primary)", display: "grid", placeItems: "center", fontWeight: 800, fontSize: "1.1rem", marginBottom: "16px" }}>
                    ₹
                  </div>
                  <div style={{ fontSize: "1.9rem", fontWeight: 900, color: "#ffffff", letterSpacing: "-0.02em" }}>
                    ₹4,82,650
                  </div>
                  <div style={{ fontSize: "0.82rem", color: "#94a3b8", fontWeight: 600, marginTop: "4px" }}>
                    Total Revenue
                  </div>
                </div>

                {/* Metric 2 */}
                <div style={{ backgroundColor: "#0d121c", borderRadius: "16px", padding: "20px", border: "1px solid rgba(255, 255, 255, 0.07)" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "10px", backgroundColor: "rgba(16, 185, 129, 0.15)", color: "#10b981", display: "grid", placeItems: "center", marginBottom: "16px" }}>
                    <Icon name="cart" style={{ width: "18px", height: "18px" }} />
                  </div>
                  <div style={{ fontSize: "1.9rem", fontWeight: 900, color: "#ffffff", letterSpacing: "-0.02em" }}>
                    {orders.length}
                  </div>
                  <div style={{ fontSize: "0.82rem", color: "#94a3b8", fontWeight: 600, marginTop: "4px" }}>
                    Total Orders
                  </div>
                </div>

                {/* Metric 3 */}
                <div style={{ backgroundColor: "#0d121c", borderRadius: "16px", padding: "20px", border: "1px solid rgba(255, 255, 255, 0.07)" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "10px", backgroundColor: "rgba(59, 130, 246, 0.15)", color: "#60a5fa", display: "grid", placeItems: "center", marginBottom: "16px" }}>
                    <Icon name="users" style={{ width: "18px", height: "18px" }} />
                  </div>
                  <div style={{ fontSize: "1.9rem", fontWeight: 900, color: "#ffffff", letterSpacing: "-0.02em" }}>
                    {customers.length}
                  </div>
                  <div style={{ fontSize: "0.82rem", color: "#94a3b8", fontWeight: 600, marginTop: "4px" }}>
                    Registered Workshop Garages
                  </div>
                </div>

                {/* Metric 4 */}
                <div style={{ backgroundColor: "#0d121c", borderRadius: "16px", padding: "20px", border: "1px solid rgba(255, 255, 255, 0.07)" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "10px", backgroundColor: "rgba(245, 158, 11, 0.15)", color: "#f59e0b", display: "grid", placeItems: "center", marginBottom: "16px" }}>
                    <Icon name="package" style={{ width: "18px", height: "18px" }} />
                  </div>
                  <div style={{ fontSize: "1.9rem", fontWeight: 900, color: "#ffffff", letterSpacing: "-0.02em" }}>
                    {inventoryList.length} <span style={{ fontSize: "0.95rem", color: "#64748b", fontWeight: 600 }}>active SKUs</span>
                  </div>
                  <div style={{ fontSize: "0.82rem", color: "#94a3b8", fontWeight: 600, marginTop: "4px" }}>
                    Active Catalog SKUs
                  </div>
                </div>
              </div>

              {/* Row 3: Sales Chart & Top Products */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr",
                  gap: "20px",
                  marginBottom: "28px",
                }}
              >
                {/* Sales Chart */}
                <div style={{ backgroundColor: "#0d121c", borderRadius: "20px", padding: "24px", border: "1px solid rgba(255, 255, 255, 0.07)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 800, fontSize: "1rem", color: "#f8fafc" }}>
                      <Icon name="trending-up" style={{ width: "18px", height: "18px", color: "var(--primary)" }} />
                      <span>Sales, last 14 days</span>
                    </div>
                    <div style={{ display: "flex", gap: "16px", fontSize: "0.78rem" }}>
                      <div><span style={{ color: "#64748b" }}>Today: </span><span style={{ fontWeight: 800, color: "#ffffff" }}>₹5,100</span></div>
                      <div><span style={{ color: "#64748b" }}>7 days: </span><span style={{ fontWeight: 800, color: "#ffffff" }}>₹42,850</span></div>
                      <div><span style={{ color: "#64748b" }}>30 days: </span><span style={{ fontWeight: 800, color: "var(--primary)" }}>₹4,82,650</span></div>
                    </div>
                  </div>

                  <div style={{ height: "180px", display: "flex", alignItems: "flex-end", gap: "8px", paddingBottom: "10px" }}>
                    {salesDays.map((bar, i) => (
                      <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                        <div
                          style={{
                            width: "100%",
                            height: `${Math.max(bar.value * 1.5, 8)}px`,
                            borderRadius: "6px 6px 2px 2px",
                            backgroundColor: bar.isPeak ? "var(--primary)" : "rgba(255, 255, 255, 0.08)",
                          }}
                        />
                        <span style={{ fontSize: "0.62rem", color: bar.isPeak ? "var(--primary)" : "#64748b", fontWeight: bar.isPeak ? 800 : 500 }}>
                          {bar.label.split(" ")[0]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Products */}
                <div style={{ backgroundColor: "#0d121c", borderRadius: "20px", padding: "24px", border: "1px solid rgba(255, 255, 255, 0.07)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 800, fontSize: "1rem", color: "#f8fafc" }}>
                      <Icon name="package" style={{ width: "18px", height: "18px", color: "var(--primary)" }} />
                      <span>Top products</span>
                    </div>
                    <span style={{ fontSize: "0.72rem", color: "#64748b", fontWeight: 600 }}>last 30 days</span>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", fontWeight: 700 }}>
                        <span style={{ color: "#ffffff" }}>1. Nexcolle Pro-Power 12V 4Ah</span>
                        <span style={{ color: "var(--primary)" }}>₹1,98,000</span>
                      </div>
                      <div style={{ width: "100%", height: "4px", backgroundColor: "rgba(255, 255, 255, 0.06)", borderRadius: "2px", marginTop: "6px", overflow: "hidden" }}>
                        <div style={{ width: "85%", height: "100%", backgroundColor: "var(--primary)" }} />
                      </div>
                      <div style={{ fontSize: "0.7rem", color: "#64748b", marginTop: "3px" }}>120 packs sold</div>
                    </div>

                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", fontWeight: 700 }}>
                        <span style={{ color: "#ffffff" }}>2. FUJI Precision Piston Kit 150cc</span>
                        <span style={{ color: "var(--primary)" }}>₹1,44,500</span>
                      </div>
                      <div style={{ width: "100%", height: "4px", backgroundColor: "rgba(255, 255, 255, 0.06)", borderRadius: "2px", marginTop: "6px", overflow: "hidden" }}>
                        <div style={{ width: "65%", height: "100%", backgroundColor: "var(--primary)" }} />
                      </div>
                      <div style={{ fontSize: "0.7rem", color: "#64748b", marginTop: "3px" }}>85 units sold</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 4: Quick Actions */}
              <div style={{ backgroundColor: "#0d121c", borderRadius: "20px", padding: "24px", border: "1px solid rgba(255, 255, 255, 0.07)", marginBottom: "28px" }}>
                <div style={{ fontSize: "1rem", fontWeight: 800, color: "#ffffff", marginBottom: "16px" }}>
                  Quick Shortcuts
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
                  <button
                    onClick={() => {
                      handleSelectSection("products");
                      setShowAddProductModal(true);
                    }}
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "12px", padding: "14px", color: "#ffffff", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}
                  >
                    <Icon name="plus" style={{ width: "16px", height: "16px", color: "var(--primary)" }} />
                    <span>Add New SKU</span>
                  </button>

                  <button
                    onClick={() => handleSelectSection("categories")}
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "12px", padding: "14px", color: "#ffffff", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}
                  >
                    <Icon name="layers" style={{ width: "16px", height: "16px", color: "var(--primary)" }} />
                    <span>Manage Categories</span>
                  </button>

                  <button
                    onClick={() => handleSelectSection("coupons")}
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "12px", padding: "14px", color: "#ffffff", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}
                  >
                    <Icon name="tag" style={{ width: "16px", height: "16px", color: "var(--primary)" }} />
                    <span>Create Promo Coupon</span>
                  </button>

                  <button
                    onClick={() => handleSelectSection("delivery-settings")}
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "12px", padding: "14px", color: "#ffffff", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}
                  >
                    <Icon name="truck" style={{ width: "16px", height: "16px", color: "var(--primary)" }} />
                    <span>Logistics Rules</span>
                  </button>
                </div>
              </div>

              {/* Row 5: Recent Orders Table */}
              <div style={{ backgroundColor: "#0d121c", borderRadius: "20px", padding: "24px", border: "1px solid rgba(255, 255, 255, 0.07)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                  <div style={{ fontWeight: 800, fontSize: "1.05rem", color: "#ffffff" }}>
                    Recent Customer Orders
                  </div>
                  <button
                    onClick={() => handleSelectSection("orders")}
                    style={{ background: "transparent", border: "none", color: "var(--primary)", fontSize: "0.85rem", fontWeight: 700, cursor: "pointer" }}
                  >
                    View All Orders
                  </button>
                </div>

                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.86rem" }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.08)", color: "#64748b", fontSize: "0.75rem", fontWeight: 800 }}>
                        <th style={{ padding: "12px 16px" }}>ORDER NUMBER</th>
                        <th style={{ padding: "12px 16px" }}>CUSTOMER / WORKSHOP</th>
                        <th style={{ padding: "12px 16px" }}>TOTAL AMOUNT</th>
                        <th style={{ padding: "12px 16px" }}>ORDER STATUS</th>
                        <th style={{ padding: "12px 16px" }}>PAYMENT</th>
                        <th style={{ padding: "12px 16px", textAlign: "right" }}>DATE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, 4).map((o) => (
                        <tr key={o.id} style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.04)" }}>
                          <td style={{ padding: "14px 16px", fontWeight: 800, color: "#ffffff" }}>#{o.id}</td>
                          <td style={{ padding: "14px 16px" }}>
                            <div style={{ fontWeight: 700, color: "#f8fafc" }}>{o.workshopName}</div>
                            <div style={{ fontSize: "0.75rem", color: "#64748b" }}>{o.customerName}</div>
                          </td>
                          <td style={{ padding: "14px 16px", fontWeight: 800, color: "var(--primary)" }}>
                            ₹{o.total.toLocaleString("en-IN")}
                          </td>
                          <td style={{ padding: "14px 16px" }}>
                            <span style={{ padding: "3px 10px", borderRadius: "var(--radius-full)", fontSize: "0.75rem", fontWeight: 700, backgroundColor: o.status === "Delivered" ? "rgba(16, 185, 129, 0.15)" : o.status === "Dispatched" ? "rgba(59, 130, 246, 0.15)" : "rgba(249, 87, 22, 0.15)", color: o.status === "Delivered" ? "#10b981" : o.status === "Dispatched" ? "#60a5fa" : "var(--primary)" }}>
                              {o.status}
                            </span>
                          </td>
                          <td style={{ padding: "14px 16px" }}>
                            <span style={{ padding: "3px 8px", borderRadius: "4px", fontSize: "0.72rem", fontWeight: 700, backgroundColor: "rgba(16, 185, 129, 0.12)", color: "#10b981" }}>
                              {o.paymentStatus}
                            </span>
                          </td>
                          <td style={{ padding: "14px 16px", textAlign: "right", color: "#64748b", fontSize: "0.82rem" }}>
                            {o.date}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              VIEW 2: CATEGORIES MANAGEMENT
              ======================================================== */}
          {currentSection === "categories" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
                <div>
                  <h1 style={{ fontSize: "2rem", fontWeight: 900, color: "#ffffff", margin: "0 0 6px 0", letterSpacing: "-0.02em" }}>
                    Categories Management
                  </h1>
                  <p style={{ color: "#94a3b8", fontSize: "0.95rem", margin: 0 }}>
                    Structure engine spares & electrical families for vehicle fitment and mechanic search.
                  </p>
                </div>
                <button
                  onClick={() => setShowAddCategoryModal(true)}
                  style={{ backgroundColor: "var(--primary)", color: "#ffffff", border: "none", padding: "10px 18px", borderRadius: "10px", fontWeight: 700, fontSize: "0.88rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 4px 14px rgba(249, 87, 22, 0.35)" }}
                >
                  <Icon name="plus" style={{ width: "16px", height: "16px" }} />
                  <span>Add New Category</span>
                </button>
              </div>

              {/* Categories Summary Cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "24px" }}>
                <div style={{ backgroundColor: "#0d121c", borderRadius: "16px", padding: "18px", border: "1px solid rgba(255, 255, 255, 0.07)" }}>
                  <div style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>Total Categories</div>
                  <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#ffffff", marginTop: "4px" }}>{categories.length}</div>
                </div>
                <div style={{ backgroundColor: "#0d121c", borderRadius: "16px", padding: "18px", border: "1px solid rgba(255, 255, 255, 0.07)" }}>
                  <div style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>Active Product SKUs</div>
                  <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "var(--primary)", marginTop: "4px" }}>{inventoryList.length}</div>
                </div>
                <div style={{ backgroundColor: "#0d121c", borderRadius: "16px", padding: "18px", border: "1px solid rgba(255, 255, 255, 0.07)" }}>
                  <div style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>Associated Brands</div>
                  <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#10b981", marginTop: "4px" }}>2 (Nexcolle & FUJI)</div>
                </div>
              </div>

              {/* Categories Table */}
              <div style={{ backgroundColor: "#0d121c", borderRadius: "20px", border: "1px solid rgba(255, 255, 255, 0.07)", overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.86rem" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.08)", color: "#64748b", fontSize: "0.75rem", fontWeight: 800 }}>
                      <th style={{ padding: "14px 20px" }}>CATEGORY NAME</th>
                      <th style={{ padding: "14px 20px" }}>BRAND</th>
                      <th style={{ padding: "14px 20px" }}>SLUG</th>
                      <th style={{ padding: "14px 20px" }}>ACTIVE SKUS</th>
                      <th style={{ padding: "14px 20px" }}>STATUS</th>
                      <th style={{ padding: "14px 20px", textAlign: "right" }}>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((cat) => (
                      <tr key={cat.id} style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.04)" }}>
                        <td style={{ padding: "16px 20px" }}>
                          <div style={{ fontWeight: 800, color: "#ffffff", fontSize: "0.92rem" }}>{cat.name}</div>
                          <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "2px" }}>{cat.description}</div>
                        </td>
                        <td style={{ padding: "16px 20px" }}>
                          <span style={{ padding: "3px 10px", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 800, backgroundColor: cat.brand === "Nexcolle" ? "rgba(249, 87, 22, 0.15)" : "rgba(245, 158, 11, 0.15)", color: cat.brand === "Nexcolle" ? "var(--primary)" : "#f59e0b" }}>
                            {cat.brand}
                          </span>
                        </td>
                        <td style={{ padding: "16px 20px", color: "#94a3b8", fontFamily: "monospace" }}>
                          {cat.slug}
                        </td>
                        <td style={{ padding: "16px 20px", fontWeight: 800, color: "#ffffff" }}>
                          {inventoryList.filter((p) => p.category.toLowerCase().includes(cat.slug.toLowerCase())).length || cat.skuCount} SKUs
                        </td>
                        <td style={{ padding: "16px 20px" }}>
                          <button
                            onClick={() => {
                              setCategories((prev) =>
                                prev.map((c) =>
                                  c.id === cat.id ? { ...c, status: c.status === "Active" ? "Inactive" : "Active" } : c
                                )
                              );
                              showToast(`Category ${cat.name} updated`);
                            }}
                            style={{ padding: "4px 10px", borderRadius: "var(--radius-full)", fontSize: "0.75rem", fontWeight: 700, border: "none", cursor: "pointer", backgroundColor: cat.status === "Active" ? "rgba(16, 185, 129, 0.15)" : "rgba(255, 255, 255, 0.06)", color: cat.status === "Active" ? "#10b981" : "#94a3b8" }}
                          >
                            {cat.status}
                          </button>
                        </td>
                        <td style={{ padding: "16px 20px", textAlign: "right" }}>
                          <button
                            onClick={() => {
                              setProductCategoryFilter(cat.slug);
                              handleSelectSection("products");
                            }}
                            style={{ background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)", color: "#cbd5e1", padding: "6px 12px", borderRadius: "8px", fontSize: "0.78rem", fontWeight: 700, cursor: "pointer", marginRight: "8px" }}
                          >
                            View SKUs
                          </button>
                          <button
                            onClick={() => {
                              setCategories((prev) => prev.filter((c) => c.id !== cat.id));
                              showToast(`Deleted ${cat.name}`);
                            }}
                            style={{ background: "rgba(239, 68, 68, 0.1)", border: "none", color: "#ef4444", padding: "6px 10px", borderRadius: "8px", fontSize: "0.78rem", fontWeight: 700, cursor: "pointer" }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Add Category Modal */}
              {showAddCategoryModal && (
                <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0, 0, 0, 0.75)", display: "grid", placeItems: "center", zIndex: 999 }}>
                  <div style={{ backgroundColor: "#0d121c", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "20px", padding: "28px", maxWidth: "480px", width: "90%" }}>
                    <h3 style={{ fontSize: "1.3rem", fontWeight: 900, color: "#ffffff", marginTop: 0 }}>Add New Category</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "18px" }}>
                      <div>
                        <label style={{ fontSize: "0.78rem", color: "#94a3b8", fontWeight: 700 }}>Category Name</label>
                        <input
                          type="text"
                          value={newCatName}
                          onChange={(e) => setNewCatName(e.target.value)}
                          placeholder="e.g. Engine Gasket Kits"
                          style={{ width: "100%", backgroundColor: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "8px", padding: "10px", color: "#ffffff", fontSize: "0.88rem", marginTop: "4px" }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: "0.78rem", color: "#94a3b8", fontWeight: 700 }}>Brand</label>
                        <select
                          value={newCatBrand}
                          onChange={(e) => setNewCatBrand(e.target.value as any)}
                          style={{ width: "100%", backgroundColor: "#0d121c", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "8px", padding: "10px", color: "#ffffff", fontSize: "0.88rem", marginTop: "4px" }}
                        >
                          <option value="FUJI">FUJI (Engine Components)</option>
                          <option value="Nexcolle">Nexcolle (Batteries)</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ fontSize: "0.78rem", color: "#94a3b8", fontWeight: 700 }}>URL Slug</label>
                        <input
                          type="text"
                          value={newCatSlug}
                          onChange={(e) => setNewCatSlug(e.target.value)}
                          placeholder="e.g. gasket-kits"
                          style={{ width: "100%", backgroundColor: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "8px", padding: "10px", color: "#ffffff", fontSize: "0.88rem", marginTop: "4px" }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: "0.78rem", color: "#94a3b8", fontWeight: 700 }}>Description</label>
                        <textarea
                          value={newCatDesc}
                          onChange={(e) => setNewCatDesc(e.target.value)}
                          placeholder="High-tensile asbestos-free gaskets..."
                          rows={2}
                          style={{ width: "100%", backgroundColor: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "8px", padding: "10px", color: "#ffffff", fontSize: "0.88rem", marginTop: "4px" }}
                        />
                      </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "24px" }}>
                      <button
                        onClick={() => setShowAddCategoryModal(false)}
                        style={{ backgroundColor: "transparent", border: "1px solid rgba(255, 255, 255, 0.1)", color: "#cbd5e1", padding: "8px 16px", borderRadius: "8px", cursor: "pointer" }}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          if (!newCatName) return;
                          setCategories((prev) => [
                            ...prev,
                            {
                              id: `cat-${Date.now()}`,
                              name: newCatName,
                              brand: newCatBrand,
                              slug: newCatSlug || newCatName.toLowerCase().replace(/\s+/g, "-"),
                              skuCount: 0,
                              description: newCatDesc,
                              status: "Active",
                              displayOrder: prev.length + 1,
                            },
                          ]);
                          setShowAddCategoryModal(false);
                          setNewCatName("");
                          setNewCatSlug("");
                          setNewCatDesc("");
                          showToast("New category created successfully");
                        }}
                        style={{ backgroundColor: "var(--primary)", border: "none", color: "#ffffff", padding: "8px 18px", borderRadius: "8px", fontWeight: 700, cursor: "pointer" }}
                      >
                        Create Category
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================
              VIEW 3: PRODUCTS & INVENTORY
              ======================================================== */}
          {currentSection === "products" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
                <div>
                  <h1 style={{ fontSize: "2rem", fontWeight: 900, color: "#ffffff", margin: "0 0 6px 0", letterSpacing: "-0.02em" }}>
                    Products & Inventory
                  </h1>
                  <p style={{ color: "#94a3b8", fontSize: "0.95rem", margin: 0 }}>
                    Manage OEM-spec spare parts, stock levels, and wholesale volume pricing.
                  </p>
                </div>
                <button
                  onClick={() => setShowAddProductModal(true)}
                  style={{ backgroundColor: "var(--primary)", color: "#ffffff", border: "none", padding: "10px 18px", borderRadius: "10px", fontWeight: 700, fontSize: "0.88rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 4px 14px rgba(249, 87, 22, 0.35)" }}
                >
                  <Icon name="plus" style={{ width: "16px", height: "16px" }} />
                  <span>Add New Product</span>
                </button>
              </div>

              {/* Filters Bar */}
              <div style={{ backgroundColor: "#0d121c", borderRadius: "16px", padding: "16px 20px", border: "1px solid rgba(255, 255, 255, 0.07)", display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center", marginBottom: "20px" }}>
                <div style={{ flex: "1 1 240px", position: "relative" }}>
                  <Icon name="search" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", width: "16px", height: "16px", color: "#64748b" }} />
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Search by SKU, title or vehicle fitment..."
                    style={{ width: "100%", backgroundColor: "rgba(255, 255, 255, 0.04)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "8px", padding: "8px 12px 8px 36px", color: "#ffffff", fontSize: "0.85rem" }}
                  />
                </div>

                <select
                  value={productBrandFilter}
                  onChange={(e) => setProductBrandFilter(e.target.value)}
                  style={{ backgroundColor: "#0d121c", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "8px", padding: "8px 12px", color: "#ffffff", fontSize: "0.82rem" }}
                >
                  <option value="all">All Brands</option>
                  <option value="Nexcolle">Nexcolle</option>
                  <option value="FUJI">FUJI</option>
                </select>

                <select
                  value={productCategoryFilter}
                  onChange={(e) => setProductCategoryFilter(e.target.value)}
                  style={{ backgroundColor: "#0d121c", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "8px", padding: "8px 12px", color: "#ffffff", fontSize: "0.82rem" }}
                >
                  <option value="all">All Categories</option>
                  <option value="battery">Batteries</option>
                  <option value="piston">Pistons</option>
                  <option value="liner">Liners</option>
                  <option value="valves">Valves</option>
                </select>

                <select
                  value={productStockFilter}
                  onChange={(e) => setProductStockFilter(e.target.value)}
                  style={{ backgroundColor: "#0d121c", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "8px", padding: "8px 12px", color: "#ffffff", fontSize: "0.82rem" }}
                >
                  <option value="all">All Stock Status</option>
                  <option value="low">Low Stock (&lt; 10)</option>
                  <option value="instock">In Stock (&gt;= 10)</option>
                </select>
              </div>

              {/* Products Table */}
              <div style={{ backgroundColor: "#0d121c", borderRadius: "20px", border: "1px solid rgba(255, 255, 255, 0.07)", overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.86rem" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.08)", color: "#64748b", fontSize: "0.75rem", fontWeight: 800 }}>
                      <th style={{ padding: "14px 20px" }}>PRODUCT</th>
                      <th style={{ padding: "14px 20px" }}>BRAND</th>
                      <th style={{ padding: "14px 20px" }}>BASE PRICE</th>
                      <th style={{ padding: "14px 20px" }}>INVENTORY STOCK</th>
                      <th style={{ padding: "14px 20px" }}>STATUS</th>
                      <th style={{ padding: "14px 20px", textAlign: "right" }}>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((p) => (
                      <tr key={p.id} style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.04)" }}>
                        <td style={{ padding: "16px 20px" }}>
                          <div style={{ fontWeight: 800, color: "#ffffff" }}>{p.title}</div>
                          <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "2px" }}>
                            SKU: {p.id} • {p.category.toUpperCase()}
                          </div>
                        </td>
                        <td style={{ padding: "16px 20px" }}>
                          <span style={{ padding: "3px 8px", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 800, backgroundColor: p.brand === "Nexcolle" ? "rgba(249, 87, 22, 0.15)" : "rgba(245, 158, 11, 0.15)", color: p.brand === "Nexcolle" ? "var(--primary)" : "#f59e0b" }}>
                            {p.brand}
                          </span>
                        </td>
                        <td style={{ padding: "16px 20px", fontWeight: 800, color: "var(--primary)" }}>
                          ₹{p.price.toLocaleString("en-IN")}
                        </td>
                        <td style={{ padding: "16px 20px" }}>
                          {editingStockId === p.id ? (
                            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                              <input
                                type="number"
                                value={newStockVal}
                                onChange={(e) => setNewStockVal(Number(e.target.value))}
                                style={{ width: "70px", backgroundColor: "#070a0f", border: "1px solid var(--primary)", borderRadius: "6px", padding: "4px 8px", color: "#ffffff", fontSize: "0.85rem" }}
                              />
                              <button
                                onClick={() => handleUpdateStock(p.id)}
                                style={{ backgroundColor: "var(--primary)", border: "none", color: "#ffffff", padding: "4px 8px", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 700, cursor: "pointer" }}
                              >
                                Save
                              </button>
                            </div>
                          ) : (
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              <span style={{ fontWeight: 800, color: p.stock < 10 ? "#f59e0b" : "#ffffff" }}>{p.stock} units</span>
                              <button
                                onClick={() => {
                                  setEditingStockId(p.id);
                                  setNewStockVal(p.stock);
                                }}
                                style={{ background: "transparent", border: "none", color: "var(--primary)", fontSize: "0.75rem", fontWeight: 700, cursor: "pointer", textDecoration: "underline" }}
                              >
                                Edit
                              </button>
                            </div>
                          )}
                        </td>
                        <td style={{ padding: "16px 20px" }}>
                          <span style={{ padding: "3px 10px", borderRadius: "var(--radius-full)", fontSize: "0.75rem", fontWeight: 700, backgroundColor: p.stock >= 10 ? "rgba(16, 185, 129, 0.15)" : "rgba(245, 158, 11, 0.15)", color: p.stock >= 10 ? "#10b981" : "#f59e0b" }}>
                            {p.stock >= 10 ? "In Stock" : "Low Stock"}
                          </span>
                        </td>
                        <td style={{ padding: "16px 20px", textAlign: "right" }}>
                          <Link
                            href={`/products/${p.slug}`}
                            target="_blank"
                            style={{ background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)", color: "#cbd5e1", padding: "6px 12px", borderRadius: "8px", fontSize: "0.78rem", fontWeight: 700, textDecoration: "none", marginRight: "8px" }}
                          >
                            Preview
                          </Link>
                          <button
                            onClick={() => {
                              setInventoryList((prev) => prev.filter((item) => item.id !== p.id));
                              showToast(`Removed SKU ${p.id}`);
                            }}
                            style={{ background: "rgba(239, 68, 68, 0.1)", border: "none", color: "#ef4444", padding: "6px 10px", borderRadius: "8px", fontSize: "0.78rem", fontWeight: 700, cursor: "pointer" }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Add Product Modal */}
              {showAddProductModal && (
                <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0, 0, 0, 0.75)", display: "grid", placeItems: "center", zIndex: 999 }}>
                  <div style={{ backgroundColor: "#0d121c", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "20px", padding: "28px", maxWidth: "520px", width: "90%" }}>
                    <h3 style={{ fontSize: "1.3rem", fontWeight: 900, color: "#ffffff", marginTop: 0 }}>Add New Spare Part</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "16px" }}>
                      <div>
                        <label style={{ fontSize: "0.78rem", color: "#94a3b8", fontWeight: 700 }}>Part Title</label>
                        <input
                          type="text"
                          value={newProdTitle}
                          onChange={(e) => setNewProdTitle(e.target.value)}
                          placeholder="e.g. FUJI 125cc Bore Kit"
                          style={{ width: "100%", backgroundColor: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "8px", padding: "10px", color: "#ffffff", fontSize: "0.88rem" }}
                        />
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                        <div>
                          <label style={{ fontSize: "0.78rem", color: "#94a3b8", fontWeight: 700 }}>Brand</label>
                          <select
                            value={newProdBrand}
                            onChange={(e) => setNewProdBrand(e.target.value as any)}
                            style={{ width: "100%", backgroundColor: "#0d121c", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "8px", padding: "10px", color: "#ffffff", fontSize: "0.88rem" }}
                          >
                            <option value="FUJI">FUJI</option>
                            <option value="Nexcolle">Nexcolle</option>
                          </select>
                        </div>
                        <div>
                          <label style={{ fontSize: "0.78rem", color: "#94a3b8", fontWeight: 700 }}>Category</label>
                          <select
                            value={newProdCategory}
                            onChange={(e) => setNewProdCategory(e.target.value as any)}
                            style={{ width: "100%", backgroundColor: "#0d121c", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "8px", padding: "10px", color: "#ffffff", fontSize: "0.88rem" }}
                          >
                            <option value="piston">Piston</option>
                            <option value="battery">Battery</option>
                            <option value="liner">Cylinder Liner</option>
                            <option value="valves">Valves</option>
                          </select>
                        </div>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                        <div>
                          <label style={{ fontSize: "0.78rem", color: "#94a3b8", fontWeight: 700 }}>Price (₹)</label>
                          <input
                            type="number"
                            value={newProdPrice}
                            onChange={(e) => setNewProdPrice(Number(e.target.value))}
                            style={{ width: "100%", backgroundColor: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "8px", padding: "10px", color: "#ffffff", fontSize: "0.88rem" }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: "0.78rem", color: "#94a3b8", fontWeight: 700 }}>Initial Stock</label>
                          <input
                            type="number"
                            value={newProdStock}
                            onChange={(e) => setNewProdStock(Number(e.target.value))}
                            style={{ width: "100%", backgroundColor: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "8px", padding: "10px", color: "#ffffff", fontSize: "0.88rem" }}
                          />
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "24px" }}>
                      <button
                        onClick={() => setShowAddProductModal(false)}
                        style={{ backgroundColor: "transparent", border: "1px solid rgba(255, 255, 255, 0.1)", color: "#cbd5e1", padding: "8px 16px", borderRadius: "8px", cursor: "pointer" }}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          if (!newProdTitle) return;
                          const newId = `shk-custom-${Date.now()}`;
                          const newSlug = newProdTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                          const newProduct: Product = {
                            id: newId,
                            slug: newSlug,
                            title: newProdTitle,
                            brand: newProdBrand,
                            category: newProdCategory,
                            price: newProdPrice,
                            originalPrice: Math.round(newProdPrice * 1.25),
                            discount: 20,
                            stock: newProdStock,
                            inStock: newProdStock > 0,
                            shortDesc: "Commercial grade spare part engineered for Indian road duty.",
                            description: "Precision manufactured to strict OEM fitment standards.",
                            image: newProdBrand === "Nexcolle" ? "/images/battery.jpg" : "/images/piston.jpg",
                            gallery: [newProdBrand === "Nexcolle" ? "/images/battery.jpg" : "/images/piston.jpg"],
                            badge: `${newProdBrand}™`,
                            meta: "Commercial Spares",
                            specs: ["JIS Grade Metallurgy", "100% Quality Inspected"],
                            specDetails: { "Fitment": "Universal 100-150cc", "Warranty": "12 Months" },
                            oemTag: "OEM Spec",
                            rating: 5.0,
                            reviewsCount: 1,
                            compatibleBikes: ["Hero Splendor", "Honda Activa", "Bajaj Pulsar"],
                            warranty: "12 Months Replacement Warranty",
                            wholesaleTiers: [
                              { minQty: 10, discountPercent: 12, pricePerUnit: Math.round(newProdPrice * 0.88) },
                              { minQty: 30, discountPercent: 20, pricePerUnit: Math.round(newProdPrice * 0.80) },
                              { minQty: 100, discountPercent: 28, pricePerUnit: Math.round(newProdPrice * 0.72) },
                            ],
                          };
                          setInventoryList((prev) => [newProduct, ...prev]);
                          setShowAddProductModal(false);
                          setNewProdTitle("");
                          showToast("New product SKU added to catalog");
                        }}
                        style={{ backgroundColor: "var(--primary)", border: "none", color: "#ffffff", padding: "8px 18px", borderRadius: "8px", fontWeight: 700, cursor: "pointer" }}
                      >
                        Add to Catalog
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================
              VIEW 4: ORDERS MANAGEMENT
              ======================================================== */}
          {currentSection === "orders" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
                <div>
                  <h1 style={{ fontSize: "2rem", fontWeight: 900, color: "#ffffff", margin: "0 0 6px 0", letterSpacing: "-0.02em" }}>
                    Orders & Workshop Dispatches
                  </h1>
                  <p style={{ color: "#94a3b8", fontSize: "0.95rem", margin: 0 }}>
                    Track B2B garage orders, courier logistics, and invoice statuses.
                  </p>
                </div>
                <button
                  onClick={() => showToast("Exported orders to CSV format")}
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)", color: "#cbd5e1", padding: "10px 18px", borderRadius: "10px", fontWeight: 700, fontSize: "0.88rem", cursor: "pointer" }}
                >
                  Export Orders CSV
                </button>
              </div>

              {/* Status Filter Tabs & Search */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
                <div style={{ display: "flex", gap: "8px", backgroundColor: "#0d121c", padding: "4px", borderRadius: "10px", border: "1px solid rgba(255, 255, 255, 0.07)" }}>
                  {(["all", "Processing", "Dispatched", "Delivered"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setOrderStatusFilter(tab)}
                      style={{
                        padding: "6px 14px",
                        borderRadius: "8px",
                        border: "none",
                        backgroundColor: orderStatusFilter === tab ? "var(--primary)" : "transparent",
                        color: orderStatusFilter === tab ? "#ffffff" : "#94a3b8",
                        fontWeight: 700,
                        fontSize: "0.82rem",
                        cursor: "pointer",
                      }}
                    >
                      {tab === "all" ? "All Orders" : tab} ({tab === "all" ? orders.length : orders.filter((o) => o.status === tab).length})
                    </button>
                  ))}
                </div>

                <div style={{ width: "260px" }}>
                  <input
                    type="text"
                    value={orderSearchQuery}
                    onChange={(e) => setOrderSearchQuery(e.target.value)}
                    placeholder="Search order ID or workshop..."
                    style={{ width: "100%", backgroundColor: "#0d121c", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "8px", padding: "8px 12px", color: "#ffffff", fontSize: "0.85rem" }}
                  />
                </div>
              </div>

              {/* Orders Table */}
              <div style={{ backgroundColor: "#0d121c", borderRadius: "20px", border: "1px solid rgba(255, 255, 255, 0.07)", overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.86rem" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.08)", color: "#64748b", fontSize: "0.75rem", fontWeight: 800 }}>
                      <th style={{ padding: "14px 20px" }}>ORDER #</th>
                      <th style={{ padding: "14px 20px" }}>WORKSHOP & CUSTOMER</th>
                      <th style={{ padding: "14px 20px" }}>ORDER ITEMS</th>
                      <th style={{ padding: "14px 20px" }}>TOTAL (₹)</th>
                      <th style={{ padding: "14px 20px" }}>STATUS</th>
                      <th style={{ padding: "14px 20px", textAlign: "right" }}>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((o) => (
                      <tr key={o.id} style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.04)" }}>
                        <td style={{ padding: "16px 20px" }}>
                          <div style={{ fontWeight: 800, color: "#ffffff" }}>#{o.id}</div>
                          <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "2px" }}>{o.date}</div>
                        </td>
                        <td style={{ padding: "16px 20px" }}>
                          <div style={{ fontWeight: 700, color: "#f8fafc" }}>{o.workshopName}</div>
                          <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{o.customerName} • {o.paymentMethod}</div>
                        </td>
                        <td style={{ padding: "16px 20px" }}>
                          <div style={{ color: "#cbd5e1", fontSize: "0.82rem" }}>{o.items}</div>
                          <div style={{ fontSize: "0.72rem", color: "var(--primary)", fontWeight: 700, marginTop: "2px" }}>{o.units} units total</div>
                        </td>
                        <td style={{ padding: "16px 20px", fontWeight: 800, color: "var(--primary)", fontSize: "0.95rem" }}>
                          ₹{o.total.toLocaleString("en-IN")}
                        </td>
                        <td style={{ padding: "16px 20px" }}>
                          <select
                            value={o.status}
                            onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value as any)}
                            style={{
                              backgroundColor: "#070a0f",
                              color: o.status === "Delivered" ? "#10b981" : o.status === "Dispatched" ? "#60a5fa" : "var(--primary)",
                              border: "1px solid rgba(255, 255, 255, 0.1)",
                              borderRadius: "6px",
                              padding: "4px 8px",
                              fontSize: "0.8rem",
                              fontWeight: 700,
                              cursor: "pointer",
                            }}
                          >
                            <option value="Processing">Processing</option>
                            <option value="Dispatched">Dispatched</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                        </td>
                        <td style={{ padding: "16px 20px", textAlign: "right" }}>
                          <button
                            onClick={() => showToast(`Invoice generated for order #${o.id}`)}
                            style={{ background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)", color: "#cbd5e1", padding: "6px 12px", borderRadius: "8px", fontSize: "0.78rem", fontWeight: 700, cursor: "pointer" }}
                          >
                            Invoice
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================
              VIEW 5: HOME CUSTOMIZATION
              ======================================================== */}
          {currentSection === "home-customization" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "24px" }}>
                <div>
                  <h1 style={{ fontSize: "2rem", fontWeight: 900, color: "#ffffff", margin: "0 0 6px 0", letterSpacing: "-0.02em" }}>
                    Home Page Customization
                  </h1>
                  <p style={{ color: "#94a3b8", fontSize: "0.95rem", margin: 0 }}>
                    Configure hero headlines, brand spotlight sections, and vehicle compatibility lookup.
                  </p>
                </div>
                <button
                  onClick={() => showToast("Homepage settings saved successfully")}
                  style={{ backgroundColor: "var(--primary)", color: "#ffffff", border: "none", padding: "10px 20px", borderRadius: "10px", fontWeight: 700, fontSize: "0.88rem", cursor: "pointer", boxShadow: "0 4px 14px rgba(249, 87, 22, 0.35)" }}
                >
                  Save Changes
                </button>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                {/* Hero Settings */}
                <div style={{ backgroundColor: "#0d121c", borderRadius: "20px", padding: "24px", border: "1px solid rgba(255, 255, 255, 0.07)" }}>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#ffffff", marginTop: 0, marginBottom: "16px" }}>
                    Hero Banner Typography
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    <div>
                      <label style={{ fontSize: "0.78rem", color: "#94a3b8", fontWeight: 700 }}>Top Badge</label>
                      <input
                        type="text"
                        value={homeCustom.heroBadge}
                        onChange={(e) => setHomeCustom({ ...homeCustom, heroBadge: e.target.value })}
                        style={{ width: "100%", backgroundColor: "rgba(255, 255, 255, 0.04)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "8px", padding: "10px", color: "#ffffff", fontSize: "0.85rem", marginTop: "4px" }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "0.78rem", color: "#94a3b8", fontWeight: 700 }}>Main Headline</label>
                      <input
                        type="text"
                        value={homeCustom.heroHeadline}
                        onChange={(e) => setHomeCustom({ ...homeCustom, heroHeadline: e.target.value })}
                        style={{ width: "100%", backgroundColor: "rgba(255, 255, 255, 0.04)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "8px", padding: "10px", color: "#ffffff", fontSize: "0.85rem", marginTop: "4px" }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "0.78rem", color: "#94a3b8", fontWeight: 700 }}>Sub-headline Paragraph</label>
                      <textarea
                        rows={3}
                        value={homeCustom.heroSubtitle}
                        onChange={(e) => setHomeCustom({ ...homeCustom, heroSubtitle: e.target.value })}
                        style={{ width: "100%", backgroundColor: "rgba(255, 255, 255, 0.04)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "8px", padding: "10px", color: "#ffffff", fontSize: "0.85rem", marginTop: "4px" }}
                      />
                    </div>
                  </div>
                </div>

                {/* Section Visibility Toggles */}
                <div style={{ backgroundColor: "#0d121c", borderRadius: "20px", padding: "24px", border: "1px solid rgba(255, 255, 255, 0.07)" }}>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#ffffff", marginTop: 0, marginBottom: "16px" }}>
                    Homepage Sections Visibility
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {[
                      { key: "showCompatibilityMatrix", label: "OEM Two-Wheeler Compatibility Matrix", desc: "Display quick brand picker for Hero, Honda, Bajaj, TVS, Yamaha, Enfield" },
                      { key: "showBrandPillars", label: "Brand Pillars Spotlight (Nexcolle & FUJI)", desc: "Engineering legacy, battery specs and metallurgy breakdown" },
                      { key: "showWholesaleSlabs", label: "Wholesale Garage Volume Slabs", desc: "Show 10+, 30+, 100+ units volume discount banners" },
                      { key: "showSupplyChainTrust", label: "Mechanic Supply Chain Trust Assurance", desc: "Show Japanese AC8A & VRLA warranty trust banner" },
                    ].map((sec) => (
                      <div key={sec.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "12px", borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "#ffffff" }}>{sec.label}</div>
                          <div style={{ fontSize: "0.75rem", color: "#64748b" }}>{sec.desc}</div>
                        </div>
                        <button
                          onClick={() => {
                            const k = sec.key as keyof typeof homeCustom;
                            setHomeCustom({ ...homeCustom, [k]: !homeCustom[k] });
                          }}
                          style={{
                            width: "48px",
                            height: "26px",
                            borderRadius: "13px",
                            border: "none",
                            backgroundColor: homeCustom[sec.key as keyof typeof homeCustom] ? "var(--primary)" : "rgba(255, 255, 255, 0.15)",
                            cursor: "pointer",
                            position: "relative",
                            transition: "background 0.2s ease",
                          }}
                        >
                          <span
                            style={{
                              position: "absolute",
                              top: "3px",
                              left: homeCustom[sec.key as keyof typeof homeCustom] ? "25px" : "3px",
                              width: "20px",
                              height: "20px",
                              borderRadius: "50%",
                              backgroundColor: "#ffffff",
                              transition: "left 0.2s ease",
                            }}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              VIEW 6: CUSTOMERS / WORKSHOP GARAGES
              ======================================================== */}
          {currentSection === "customers" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "24px" }}>
                <div>
                  <h1 style={{ fontSize: "2rem", fontWeight: 900, color: "#ffffff", margin: "0 0 6px 0", letterSpacing: "-0.02em" }}>
                    Registered Garages & Mechanics
                  </h1>
                  <p style={{ color: "#94a3b8", fontSize: "0.95rem", margin: 0 }}>
                    Directory of verified automotive retailers, mechanics, and trade workshop accounts.
                  </p>
                </div>
              </div>

              <div style={{ backgroundColor: "#0d121c", borderRadius: "16px", padding: "16px 20px", border: "1px solid rgba(255, 255, 255, 0.07)", marginBottom: "20px" }}>
                <input
                  type="text"
                  value={customerSearch}
                  onChange={(e) => setCustomerSearch(e.target.value)}
                  placeholder="Filter by workshop name, mechanic name, or city..."
                  style={{ width: "100%", backgroundColor: "rgba(255, 255, 255, 0.04)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "8px", padding: "10px 14px", color: "#ffffff", fontSize: "0.85rem" }}
                />
              </div>

              <div style={{ backgroundColor: "#0d121c", borderRadius: "20px", border: "1px solid rgba(255, 255, 255, 0.07)", overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.86rem" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.08)", color: "#64748b", fontSize: "0.75rem", fontWeight: 800 }}>
                      <th style={{ padding: "14px 20px" }}>GARAGE & OWNER</th>
                      <th style={{ padding: "14px 20px" }}>LOCATION</th>
                      <th style={{ padding: "14px 20px" }}>CONTACT</th>
                      <th style={{ padding: "14px 20px" }}>TRADE TIER</th>
                      <th style={{ padding: "14px 20px" }}>TOTAL ORDERS</th>
                      <th style={{ padding: "14px 20px" }}>VERIFICATION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCustomers.map((c) => (
                      <tr key={c.id} style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.04)" }}>
                        <td style={{ padding: "16px 20px" }}>
                          <div style={{ fontWeight: 800, color: "#ffffff" }}>{c.garage}</div>
                          <div style={{ fontSize: "0.75rem", color: "#64748b" }}>{c.name} • #{c.id}</div>
                        </td>
                        <td style={{ padding: "16px 20px", color: "#cbd5e1" }}>
                          {c.city}, {c.state}
                        </td>
                        <td style={{ padding: "16px 20px" }}>
                          <div style={{ color: "var(--primary)", fontWeight: 700 }}>{c.phone}</div>
                          <div style={{ fontSize: "0.75rem", color: "#64748b" }}>{c.email}</div>
                        </td>
                        <td style={{ padding: "16px 20px" }}>
                          <span style={{ padding: "3px 8px", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 800, backgroundColor: "rgba(59, 130, 246, 0.15)", color: "#60a5fa" }}>
                            {c.tier}
                          </span>
                        </td>
                        <td style={{ padding: "16px 20px" }}>
                          <div style={{ fontWeight: 800, color: "#ffffff" }}>{c.ordersCount} orders</div>
                          <div style={{ fontSize: "0.75rem", color: "#10b981", fontWeight: 700 }}>₹{c.totalSpend.toLocaleString("en-IN")}</div>
                        </td>
                        <td style={{ padding: "16px 20px" }}>
                          <button
                            onClick={() => {
                              setCustomers((prev) =>
                                prev.map((cust) => (cust.id === c.id ? { ...cust, verified: !cust.verified } : cust))
                              );
                              showToast(`Updated verification for ${c.garage}`);
                            }}
                            style={{ padding: "4px 10px", borderRadius: "var(--radius-full)", fontSize: "0.75rem", fontWeight: 700, border: "none", cursor: "pointer", backgroundColor: c.verified ? "rgba(16, 185, 129, 0.15)" : "rgba(245, 158, 11, 0.15)", color: c.verified ? "#10b981" : "#f59e0b" }}
                          >
                            {c.verified ? "Verified B2B" : "Pending"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================
              VIEW 7: REVIEWS MODERATION
              ======================================================== */}
          {currentSection === "reviews" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "24px" }}>
                <div>
                  <h1 style={{ fontSize: "2rem", fontWeight: 900, color: "#ffffff", margin: "0 0 6px 0", letterSpacing: "-0.02em" }}>
                    Reviews & Feedback Moderation
                  </h1>
                  <p style={{ color: "#94a3b8", fontSize: "0.95rem", margin: 0 }}>
                    Approve or moderate technician reviews before they appear on product pages.
                  </p>
                </div>
              </div>

              {/* Filter Tabs */}
              <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
                {(["all", "Approved", "Pending"] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setReviewFilter(st)}
                    style={{
                      padding: "6px 14px",
                      borderRadius: "8px",
                      border: "none",
                      backgroundColor: reviewFilter === st ? "var(--primary)" : "#0d121c",
                      color: reviewFilter === st ? "#ffffff" : "#94a3b8",
                      fontWeight: 700,
                      fontSize: "0.82rem",
                      cursor: "pointer",
                    }}
                  >
                    {st === "all" ? "All Reviews" : st} ({st === "all" ? reviews.length : reviews.filter((r) => r.status === st).length})
                  </button>
                ))}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {filteredReviews.map((r) => (
                  <div key={r.id} style={{ backgroundColor: "#0d121c", borderRadius: "16px", padding: "20px 24px", border: "1px solid rgba(255, 255, 255, 0.07)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                      <div>
                        <div style={{ fontWeight: 800, color: "#ffffff", fontSize: "0.95rem" }}>
                          {r.customerName} <span style={{ color: "#64748b", fontWeight: 500 }}>({r.garage}, {r.city})</span>
                        </div>
                        <div style={{ fontSize: "0.78rem", color: "var(--primary)", fontWeight: 700, marginTop: "2px" }}>
                          Product: {r.productName}
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <span style={{ color: "#f59e0b", fontSize: "1rem" }}>{"★".repeat(r.rating)}</span>
                        <span style={{ padding: "2px 8px", borderRadius: "4px", fontSize: "0.72rem", fontWeight: 800, backgroundColor: r.status === "Approved" ? "rgba(16, 185, 129, 0.15)" : "rgba(245, 158, 11, 0.15)", color: r.status === "Approved" ? "#10b981" : "#f59e0b" }}>
                          {r.status}
                        </span>
                      </div>
                    </div>
                    <p style={{ color: "#cbd5e1", fontSize: "0.88rem", margin: "10px 0 14px 0", lineHeight: 1.5 }}>
                      &ldquo;{r.comment}&rdquo;
                    </p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "0.75rem", color: "#64748b" }}>Posted: {r.date}</span>
                      <div style={{ display: "flex", gap: "8px" }}>
                        {r.status === "Pending" && (
                          <button
                            onClick={() => {
                              setReviews((prev) => prev.map((item) => (item.id === r.id ? { ...item, status: "Approved" } : item)));
                              showToast("Review approved and published to product page");
                            }}
                            style={{ backgroundColor: "#10b981", border: "none", color: "#ffffff", padding: "6px 12px", borderRadius: "6px", fontSize: "0.78rem", fontWeight: 700, cursor: "pointer" }}
                          >
                            Approve Review
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setReviews((prev) => prev.filter((item) => item.id !== r.id));
                            showToast("Review removed");
                          }}
                          style={{ backgroundColor: "rgba(239, 68, 68, 0.1)", border: "none", color: "#ef4444", padding: "6px 12px", borderRadius: "6px", fontSize: "0.78rem", fontWeight: 700, cursor: "pointer" }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              VIEW 8: INQUIRIES & B2B RFQS
              ======================================================== */}
          {currentSection === "inquiries" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "24px" }}>
                <div>
                  <h1 style={{ fontSize: "2rem", fontWeight: 900, color: "#ffffff", margin: "0 0 6px 0", letterSpacing: "-0.02em" }}>
                    B2B Inquiries & Quotation RFQs
                  </h1>
                  <p style={{ color: "#94a3b8", fontSize: "0.95rem", margin: 0 }}>
                    Wholesale volume quotation requests submitted by workshops and parts retailers.
                  </p>
                </div>
              </div>

              {/* Status Tabs */}
              <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
                {(["all", "Pending", "Quoted", "Fulfilled"] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setRfqFilter(st)}
                    style={{
                      padding: "6px 14px",
                      borderRadius: "8px",
                      border: "none",
                      backgroundColor: rfqFilter === st ? "var(--primary)" : "#0d121c",
                      color: rfqFilter === st ? "#ffffff" : "#94a3b8",
                      fontWeight: 700,
                      fontSize: "0.82rem",
                      cursor: "pointer",
                    }}
                  >
                    {st === "all" ? "All Inquiries" : st} ({st === "all" ? quotes.length : quotes.filter((q) => q.status === st).length})
                  </button>
                ))}
              </div>

              <div style={{ backgroundColor: "#0d121c", borderRadius: "20px", border: "1px solid rgba(255, 255, 255, 0.07)", overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.86rem" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.08)", color: "#64748b", fontSize: "0.75rem", fontWeight: 800 }}>
                      <th style={{ padding: "14px 20px" }}>RFQ ID</th>
                      <th style={{ padding: "14px 20px" }}>WORKSHOP & CONTACT</th>
                      <th style={{ padding: "14px 20px" }}>REQUESTED PARTS & VOLUME</th>
                      <th style={{ padding: "14px 20px" }}>STATUS</th>
                      <th style={{ padding: "14px 20px", textAlign: "right" }}>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRfqs.map((q) => (
                      <tr key={q.id} style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.04)" }}>
                        <td style={{ padding: "16px 20px" }}>
                          <div style={{ fontWeight: 800, color: "#ffffff" }}>#{q.id}</div>
                          <div style={{ fontSize: "0.75rem", color: "#64748b" }}>{q.date}</div>
                        </td>
                        <td style={{ padding: "16px 20px" }}>
                          <div style={{ fontWeight: 800, color: "#f8fafc" }}>{q.garage}</div>
                          <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{q.name} • {q.phone}</div>
                        </td>
                        <td style={{ padding: "16px 20px" }}>
                          <div style={{ color: "#ffffff", fontWeight: 700 }}>{q.parts}</div>
                          <div style={{ fontSize: "0.75rem", color: "var(--primary)", fontWeight: 800 }}>{q.qty}</div>
                        </td>
                        <td style={{ padding: "16px 20px" }}>
                          <select
                            value={q.status}
                            onChange={(e) => {
                              const newSt = e.target.value as any;
                              setQuotes((prev) => prev.map((item) => (item.id === q.id ? { ...item, status: newSt } : item)));
                              showToast(`RFQ #${q.id} marked as ${newSt}`);
                            }}
                            style={{ backgroundColor: "#070a0f", color: q.status === "Fulfilled" ? "#10b981" : q.status === "Quoted" ? "#60a5fa" : "var(--primary)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "6px", padding: "4px 8px", fontSize: "0.8rem", fontWeight: 700, cursor: "pointer" }}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Quoted">Quoted</option>
                            <option value="Fulfilled">Fulfilled</option>
                          </select>
                        </td>
                        <td style={{ padding: "16px 20px", textAlign: "right" }}>
                          <a
                            href={`https://wa.me/${q.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hello ${q.name}, regards from SHK Auto. Here is your wholesale rate quote for ${q.parts}.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ backgroundColor: "#10b981", color: "#ffffff", padding: "6px 12px", borderRadius: "8px", fontSize: "0.78rem", fontWeight: 700, textDecoration: "none", display: "inline-block" }}
                          >
                            WhatsApp Quote
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================
              VIEW 9: SUBSCRIBERS
              ======================================================== */}
          {currentSection === "subscribers" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "24px" }}>
                <div>
                  <h1 style={{ fontSize: "2rem", fontWeight: 900, color: "#ffffff", margin: "0 0 6px 0", letterSpacing: "-0.02em" }}>
                    Trade Newsletter Subscribers
                  </h1>
                  <p style={{ color: "#94a3b8", fontSize: "0.95rem", margin: 0 }}>
                    Mechanics and parts dealers subscribed to wholesale price drop bulletins and stock notifications.
                  </p>
                </div>
                <button
                  onClick={() => showToast("Subscribers list exported")}
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)", color: "#cbd5e1", padding: "10px 18px", borderRadius: "10px", fontWeight: 700, fontSize: "0.88rem", cursor: "pointer" }}
                >
                  Export CSV
                </button>
              </div>

              <div style={{ backgroundColor: "#0d121c", borderRadius: "20px", border: "1px solid rgba(255, 255, 255, 0.07)", overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.86rem" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.08)", color: "#64748b", fontSize: "0.75rem", fontWeight: 800 }}>
                      <th style={{ padding: "14px 20px" }}>EMAIL ADDRESS</th>
                      <th style={{ padding: "14px 20px" }}>GARAGE / MECHANIC</th>
                      <th style={{ padding: "14px 20px" }}>TYPE</th>
                      <th style={{ padding: "14px 20px" }}>JOINED DATE</th>
                      <th style={{ padding: "14px 20px", textAlign: "right" }}>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.map((s) => (
                      <tr key={s.id} style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.04)" }}>
                        <td style={{ padding: "16px 20px", fontWeight: 800, color: "#ffffff" }}>{s.email}</td>
                        <td style={{ padding: "16px 20px", color: "#cbd5e1" }}>{s.garageName}</td>
                        <td style={{ padding: "16px 20px" }}>
                          <span style={{ padding: "3px 8px", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 700, backgroundColor: "rgba(59, 130, 246, 0.15)", color: "#60a5fa" }}>
                            {s.type}
                          </span>
                        </td>
                        <td style={{ padding: "16px 20px", color: "#64748b" }}>{s.date}</td>
                        <td style={{ padding: "16px 20px", textAlign: "right" }}>
                          <span style={{ padding: "3px 10px", borderRadius: "var(--radius-full)", fontSize: "0.75rem", fontWeight: 700, backgroundColor: "rgba(16, 185, 129, 0.15)", color: "#10b981" }}>
                            {s.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================
              VIEW 10: HERO SLIDES
              ======================================================== */}
          {currentSection === "hero-slides" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "24px" }}>
                <div>
                  <h1 style={{ fontSize: "2rem", fontWeight: 900, color: "#ffffff", margin: "0 0 6px 0", letterSpacing: "-0.02em" }}>
                    Hero Carousel Slides
                  </h1>
                  <p style={{ color: "#94a3b8", fontSize: "0.95rem", margin: 0 }}>
                    Manage promotional carousel slides and banners on the storefront homepage.
                  </p>
                </div>
                <button
                  onClick={() => showToast("Slide creation modal")}
                  style={{ backgroundColor: "var(--primary)", color: "#ffffff", border: "none", padding: "10px 18px", borderRadius: "10px", fontWeight: 700, fontSize: "0.88rem", cursor: "pointer" }}
                >
                  + Add Slide
                </button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {heroSlides.map((slide) => (
                  <div key={slide.id} style={{ backgroundColor: "#0d121c", borderRadius: "18px", padding: "20px 24px", border: "1px solid rgba(255, 255, 255, 0.07)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "20px" }}>
                    <div>
                      <span style={{ fontSize: "0.72rem", color: "var(--primary)", fontWeight: 800, textTransform: "uppercase" }}>{slide.badge}</span>
                      <div style={{ fontSize: "1.1rem", fontWeight: 900, color: "#ffffff", marginTop: "4px" }}>{slide.title}</div>
                      <div style={{ fontSize: "0.85rem", color: "#94a3b8", marginTop: "2px" }}>{slide.subtitle}</div>
                      <div style={{ fontSize: "0.78rem", color: "#64748b", marginTop: "6px" }}>Button: &ldquo;{slide.ctaText}&rdquo; &bull; Link: {slide.ctaLink}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <button
                        onClick={() => {
                          setHeroSlides((prev) => prev.map((s) => (s.id === slide.id ? { ...s, status: s.status === "Active" ? "Draft" : "Active" } : s)));
                          showToast(`Updated slide status to ${slide.status === "Active" ? "Draft" : "Active"}`);
                        }}
                        style={{ padding: "6px 12px", borderRadius: "var(--radius-full)", fontSize: "0.75rem", fontWeight: 700, border: "none", cursor: "pointer", backgroundColor: slide.status === "Active" ? "rgba(16, 185, 129, 0.15)" : "rgba(255, 255, 255, 0.1)", color: slide.status === "Active" ? "#10b981" : "#94a3b8" }}
                      >
                        {slide.status}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              VIEW 11: ANNOUNCEMENTS
              ======================================================== */}
          {currentSection === "announcements" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "24px" }}>
                <div>
                  <h1 style={{ fontSize: "2rem", fontWeight: 900, color: "#ffffff", margin: "0 0 6px 0", letterSpacing: "-0.02em" }}>
                    Store Announcements & Top Banner
                  </h1>
                  <p style={{ color: "#94a3b8", fontSize: "0.95rem", margin: 0 }}>
                    Configure the top notification banner and promotional marquee shown across the storefront.
                  </p>
                </div>
                <button
                  onClick={() => showToast("Announcement bar updated live on storefront")}
                  style={{ backgroundColor: "var(--primary)", color: "#ffffff", border: "none", padding: "10px 20px", borderRadius: "10px", fontWeight: 700, fontSize: "0.88rem", cursor: "pointer" }}
                >
                  Save Banner
                </button>
              </div>

              {/* Live Preview Card */}
              <div style={{ backgroundColor: "#0d121c", borderRadius: "18px", padding: "20px", border: "1px solid rgba(255, 255, 255, 0.07)", marginBottom: "24px" }}>
                <div style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: 700, textTransform: "uppercase", marginBottom: "12px" }}>
                  Live Storefront Banner Preview
                </div>
                <div style={{ backgroundColor: "#06090e", borderRadius: "10px", padding: "12px 20px", border: "1px solid rgba(255, 255, 255, 0.08)", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.85rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ backgroundColor: "rgba(16, 185, 129, 0.2)", color: "#10b981", padding: "2px 8px", borderRadius: "var(--radius-full)", fontSize: "0.72rem", fontWeight: 800 }}>
                      ● {announcement.badgeText}
                    </span>
                    <span style={{ color: "#f8fafc" }}>{announcement.marqueeText}</span>
                  </div>
                  <div style={{ color: "var(--primary)", fontWeight: 700, fontSize: "0.8rem" }}>
                    {announcement.offerNotice}
                  </div>
                </div>
              </div>

              {/* Form Controls */}
              <div style={{ backgroundColor: "#0d121c", borderRadius: "20px", padding: "24px", border: "1px solid rgba(255, 255, 255, 0.07)" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div>
                    <label style={{ fontSize: "0.78rem", color: "#94a3b8", fontWeight: 700 }}>Badge Text</label>
                    <input
                      type="text"
                      value={announcement.badgeText}
                      onChange={(e) => setAnnouncement({ ...announcement, badgeText: e.target.value })}
                      style={{ width: "100%", backgroundColor: "rgba(255, 255, 255, 0.04)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "8px", padding: "10px", color: "#ffffff", fontSize: "0.85rem", marginTop: "4px" }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.78rem", color: "#94a3b8", fontWeight: 700 }}>Main Marquee Headline</label>
                    <input
                      type="text"
                      value={announcement.marqueeText}
                      onChange={(e) => setAnnouncement({ ...announcement, marqueeText: e.target.value })}
                      style={{ width: "100%", backgroundColor: "rgba(255, 255, 255, 0.04)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "8px", padding: "10px", color: "#ffffff", fontSize: "0.85rem", marginTop: "4px" }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.78rem", color: "#94a3b8", fontWeight: 700 }}>Special Promo Notice</label>
                    <input
                      type="text"
                      value={announcement.offerNotice}
                      onChange={(e) => setAnnouncement({ ...announcement, offerNotice: e.target.value })}
                      style={{ width: "100%", backgroundColor: "rgba(255, 255, 255, 0.04)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "8px", padding: "10px", color: "#ffffff", fontSize: "0.85rem", marginTop: "4px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              VIEW 12: COUPONS & DISCOUNTS
              ======================================================== */}
          {currentSection === "coupons" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "24px" }}>
                <div>
                  <h1 style={{ fontSize: "2rem", fontWeight: 900, color: "#ffffff", margin: "0 0 6px 0", letterSpacing: "-0.02em" }}>
                    Coupons & Trade Discount Codes
                  </h1>
                  <p style={{ color: "#94a3b8", fontSize: "0.95rem", margin: 0 }}>
                    Manage promotional coupons for new workshops and seasonal volume bulk orders.
                  </p>
                </div>
                <button
                  onClick={() => setShowAddCouponModal(true)}
                  style={{ backgroundColor: "var(--primary)", color: "#ffffff", border: "none", padding: "10px 18px", borderRadius: "10px", fontWeight: 700, fontSize: "0.88rem", cursor: "pointer" }}
                >
                  + Create New Coupon
                </button>
              </div>

              <div style={{ backgroundColor: "#0d121c", borderRadius: "20px", border: "1px solid rgba(255, 255, 255, 0.07)", overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.86rem" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.08)", color: "#64748b", fontSize: "0.75rem", fontWeight: 800 }}>
                      <th style={{ padding: "14px 20px" }}>COUPON CODE</th>
                      <th style={{ padding: "14px 20px" }}>DISCOUNT</th>
                      <th style={{ padding: "14px 20px" }}>MIN ORDER (₹)</th>
                      <th style={{ padding: "14px 20px" }}>USAGE COUNT</th>
                      <th style={{ padding: "14px 20px" }}>STATUS</th>
                      <th style={{ padding: "14px 20px", textAlign: "right" }}>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coupons.map((c) => (
                      <tr key={c.id} style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.04)" }}>
                        <td style={{ padding: "16px 20px" }}>
                          <span style={{ fontWeight: 800, color: "var(--primary)", fontFamily: "monospace", fontSize: "0.95rem", letterSpacing: "0.05em" }}>
                            {c.code}
                          </span>
                          <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "2px" }}>{c.description}</div>
                        </td>
                        <td style={{ padding: "16px 20px", fontWeight: 800, color: "#ffffff" }}>
                          {c.discountType === "Percentage" ? `${c.discountValue}% OFF` : `₹${c.discountValue} FLAT`}
                        </td>
                        <td style={{ padding: "16px 20px", color: "#cbd5e1" }}>
                          ₹{c.minOrder.toLocaleString("en-IN")}
                        </td>
                        <td style={{ padding: "16px 20px", color: "#94a3b8" }}>
                          {c.usageCount} / {c.usageLimit}
                        </td>
                        <td style={{ padding: "16px 20px" }}>
                          <button
                            onClick={() => {
                              setCoupons((prev) => prev.map((item) => (item.id === c.id ? { ...item, status: item.status === "Active" ? "Expired" : "Active" } : item)));
                              showToast(`Coupon ${c.code} updated`);
                            }}
                            style={{ padding: "4px 10px", borderRadius: "var(--radius-full)", fontSize: "0.75rem", fontWeight: 700, border: "none", cursor: "pointer", backgroundColor: c.status === "Active" ? "rgba(16, 185, 129, 0.15)" : "rgba(255, 255, 255, 0.1)", color: c.status === "Active" ? "#10b981" : "#94a3b8" }}
                          >
                            {c.status}
                          </button>
                        </td>
                        <td style={{ padding: "16px 20px", textAlign: "right" }}>
                          <button
                            onClick={() => {
                              setCoupons((prev) => prev.filter((item) => item.id !== c.id));
                              showToast(`Deleted coupon ${c.code}`);
                            }}
                            style={{ background: "rgba(239, 68, 68, 0.1)", border: "none", color: "#ef4444", padding: "6px 10px", borderRadius: "8px", fontSize: "0.78rem", fontWeight: 700, cursor: "pointer" }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Add Coupon Modal */}
              {showAddCouponModal && (
                <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0, 0, 0, 0.75)", display: "grid", placeItems: "center", zIndex: 999 }}>
                  <div style={{ backgroundColor: "#0d121c", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "20px", padding: "28px", maxWidth: "460px", width: "90%" }}>
                    <h3 style={{ fontSize: "1.3rem", fontWeight: 900, color: "#ffffff", marginTop: 0 }}>Create Coupon Code</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "16px" }}>
                      <div>
                        <label style={{ fontSize: "0.78rem", color: "#94a3b8", fontWeight: 700 }}>Promo Code (e.g. FESTIVE20)</label>
                        <input
                          type="text"
                          value={newCouponCode}
                          onChange={(e) => setNewCouponCode(e.target.value.toUpperCase())}
                          style={{ width: "100%", backgroundColor: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "8px", padding: "10px", color: "#ffffff", fontSize: "0.88rem", textTransform: "uppercase" }}
                        />
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                        <div>
                          <label style={{ fontSize: "0.78rem", color: "#94a3b8", fontWeight: 700 }}>Discount (%)</label>
                          <input
                            type="number"
                            value={newCouponDiscount}
                            onChange={(e) => setNewCouponDiscount(Number(e.target.value))}
                            style={{ width: "100%", backgroundColor: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "8px", padding: "10px", color: "#ffffff", fontSize: "0.88rem" }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: "0.78rem", color: "#94a3b8", fontWeight: 700 }}>Min Order (₹)</label>
                          <input
                            type="number"
                            value={newCouponMin}
                            onChange={(e) => setNewCouponMin(Number(e.target.value))}
                            style={{ width: "100%", backgroundColor: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "8px", padding: "10px", color: "#ffffff", fontSize: "0.88rem" }}
                          />
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "24px" }}>
                      <button onClick={() => setShowAddCouponModal(false)} style={{ backgroundColor: "transparent", border: "1px solid rgba(255, 255, 255, 0.1)", color: "#cbd5e1", padding: "8px 16px", borderRadius: "8px", cursor: "pointer" }}>Cancel</button>
                      <button
                        onClick={() => {
                          if (!newCouponCode) return;
                          setCoupons((prev) => [
                            ...prev,
                            {
                              id: `cpn-${Date.now()}`,
                              code: newCouponCode,
                              description: `${newCouponDiscount}% Discount for workshop orders`,
                              discountType: "Percentage",
                              discountValue: newCouponDiscount,
                              minOrder: newCouponMin,
                              usageCount: 0,
                              usageLimit: 100,
                              expiryDate: "31 Dec 2026",
                              status: "Active",
                            },
                          ]);
                          setShowAddCouponModal(false);
                          setNewCouponCode("");
                          showToast("Coupon created successfully");
                        }}
                        style={{ backgroundColor: "var(--primary)", border: "none", color: "#ffffff", padding: "8px 18px", borderRadius: "8px", fontWeight: 700, cursor: "pointer" }}
                      >
                        Create
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================
              VIEW 13: DELIVERY SETTINGS
              ======================================================== */}
          {currentSection === "delivery-settings" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "24px" }}>
                <div>
                  <h1 style={{ fontSize: "2rem", fontWeight: 900, color: "#ffffff", margin: "0 0 6px 0", letterSpacing: "-0.02em" }}>
                    Delivery & Logistics Settings
                  </h1>
                  <p style={{ color: "#94a3b8", fontSize: "0.95rem", margin: 0 }}>
                    Configure free delivery thresholds, expedited air freight rates, and courier dispatch.
                  </p>
                </div>
                <button
                  onClick={() => showToast("Logistics rules saved")}
                  style={{ backgroundColor: "var(--primary)", color: "#ffffff", border: "none", padding: "10px 20px", borderRadius: "10px", fontWeight: 700, fontSize: "0.88rem", cursor: "pointer" }}
                >
                  Save Settings
                </button>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                <div style={{ backgroundColor: "#0d121c", borderRadius: "20px", padding: "24px", border: "1px solid rgba(255, 255, 255, 0.07)" }}>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#ffffff", marginTop: 0, marginBottom: "16px" }}>
                    Freight & Surcharge Rules
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    <div>
                      <label style={{ fontSize: "0.78rem", color: "#94a3b8", fontWeight: 700 }}>Free Delivery Minimum Threshold (₹)</label>
                      <input
                        type="number"
                        value={deliverySettings.freeThreshold}
                        onChange={(e) => setDeliverySettings({ ...deliverySettings, freeThreshold: Number(e.target.value) })}
                        style={{ width: "100%", backgroundColor: "rgba(255, 255, 255, 0.04)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "8px", padding: "10px", color: "#ffffff", fontSize: "0.85rem", marginTop: "4px" }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "0.78rem", color: "#94a3b8", fontWeight: 700 }}>Standard Surface Shipping Fee (₹)</label>
                      <input
                        type="number"
                        value={deliverySettings.standardFee}
                        onChange={(e) => setDeliverySettings({ ...deliverySettings, standardFee: Number(e.target.value) })}
                        style={{ width: "100%", backgroundColor: "rgba(255, 255, 255, 0.04)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "8px", padding: "10px", color: "#ffffff", fontSize: "0.85rem", marginTop: "4px" }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "0.78rem", color: "#94a3b8", fontWeight: 700 }}>Priority Air Freight Fee (₹)</label>
                      <input
                        type="number"
                        value={deliverySettings.airExpressFee}
                        onChange={(e) => setDeliverySettings({ ...deliverySettings, airExpressFee: Number(e.target.value) })}
                        style={{ width: "100%", backgroundColor: "rgba(255, 255, 255, 0.04)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "8px", padding: "10px", color: "#ffffff", fontSize: "0.85rem", marginTop: "4px" }}
                      />
                    </div>
                  </div>
                </div>

                <div style={{ backgroundColor: "#0d121c", borderRadius: "20px", padding: "24px", border: "1px solid rgba(255, 255, 255, 0.07)" }}>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#ffffff", marginTop: 0, marginBottom: "16px" }}>
                    Courier Logistics Partners
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {[
                      { name: "Delhivery Surface & Express", status: "Active (API Integrated)" },
                      { name: "Blue Dart Aviation Air Freight", status: "Active (Priority Surcharge)" },
                      { name: "DTDC Heavy Surface Cargo", status: "Active (Workshop Batch)" },
                      { name: "VRL Logistics Pallet Dispatch", status: "Active (100+ Unit Slabs)" },
                    ].map((p, idx) => (
                      <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", backgroundColor: "rgba(255, 255, 255, 0.03)", borderRadius: "10px" }}>
                        <span style={{ fontWeight: 700, color: "#ffffff", fontSize: "0.88rem" }}>{p.name}</span>
                        <span style={{ color: "#10b981", fontSize: "0.78rem", fontWeight: 700 }}>{p.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              VIEW 14: GLOBAL FAQS
              ======================================================== */}
          {currentSection === "faqs" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "24px" }}>
                <div>
                  <h1 style={{ fontSize: "2rem", fontWeight: 900, color: "#ffffff", margin: "0 0 6px 0", letterSpacing: "-0.02em" }}>
                    Global Store FAQs
                  </h1>
                  <p style={{ color: "#94a3b8", fontSize: "0.95rem", margin: 0 }}>
                    Frequently asked questions displayed across product pages, cart, and trade inquiries.
                  </p>
                </div>
                <button
                  onClick={() => setShowAddFaqModal(true)}
                  style={{ backgroundColor: "var(--primary)", color: "#ffffff", border: "none", padding: "10px 18px", borderRadius: "10px", fontWeight: 700, fontSize: "0.88rem", cursor: "pointer" }}
                >
                  + Add New FAQ
                </button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {faqs.map((f) => (
                  <div key={f.id} style={{ backgroundColor: "#0d121c", borderRadius: "16px", padding: "20px 24px", border: "1px solid rgba(255, 255, 255, 0.07)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                      <span style={{ fontWeight: 800, color: "#ffffff", fontSize: "0.98rem" }}>
                        Q: {f.question}
                      </span>
                      <span style={{ padding: "2px 8px", borderRadius: "4px", fontSize: "0.72rem", fontWeight: 800, backgroundColor: "rgba(249, 87, 22, 0.15)", color: "var(--primary)" }}>
                        {f.category}
                      </span>
                    </div>
                    <p style={{ color: "#94a3b8", fontSize: "0.86rem", margin: "6px 0 12px 0", lineHeight: 1.5 }}>
                      {f.answer}
                    </p>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                      <button
                        onClick={() => {
                          setFaqs((prev) => prev.filter((item) => item.id !== f.id));
                          showToast("FAQ removed");
                        }}
                        style={{ backgroundColor: "rgba(239, 68, 68, 0.1)", border: "none", color: "#ef4444", padding: "4px 10px", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 700, cursor: "pointer" }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add FAQ Modal */}
              {showAddFaqModal && (
                <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0, 0, 0, 0.75)", display: "grid", placeItems: "center", zIndex: 999 }}>
                  <div style={{ backgroundColor: "#0d121c", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "20px", padding: "28px", maxWidth: "480px", width: "90%" }}>
                    <h3 style={{ fontSize: "1.3rem", fontWeight: 900, color: "#ffffff", marginTop: 0 }}>Add New FAQ</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "16px" }}>
                      <div>
                        <label style={{ fontSize: "0.78rem", color: "#94a3b8", fontWeight: 700 }}>Question</label>
                        <input
                          type="text"
                          value={newFaqQ}
                          onChange={(e) => setNewFaqQ(e.target.value)}
                          placeholder="e.g. What is the delivery time for bulk orders?"
                          style={{ width: "100%", backgroundColor: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "8px", padding: "10px", color: "#ffffff", fontSize: "0.88rem" }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: "0.78rem", color: "#94a3b8", fontWeight: 700 }}>Answer</label>
                        <textarea
                          rows={3}
                          value={newFaqA}
                          onChange={(e) => setNewFaqA(e.target.value)}
                          placeholder="Provide a clear, technical response for mechanics..."
                          style={{ width: "100%", backgroundColor: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "8px", padding: "10px", color: "#ffffff", fontSize: "0.88rem" }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: "0.78rem", color: "#94a3b8", fontWeight: 700 }}>Category</label>
                        <select
                          value={newFaqCat}
                          onChange={(e) => setNewFaqCat(e.target.value as any)}
                          style={{ width: "100%", backgroundColor: "#0d121c", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "8px", padding: "10px", color: "#ffffff", fontSize: "0.88rem" }}
                        >
                          <option value="Engine Spares">Engine Spares</option>
                          <option value="Batteries">Batteries</option>
                          <option value="Compatibility">Compatibility</option>
                          <option value="B2B Trade">B2B Trade</option>
                        </select>
                      </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "24px" }}>
                      <button onClick={() => setShowAddFaqModal(false)} style={{ backgroundColor: "transparent", border: "1px solid rgba(255, 255, 255, 0.1)", color: "#cbd5e1", padding: "8px 16px", borderRadius: "8px", cursor: "pointer" }}>Cancel</button>
                      <button
                        onClick={() => {
                          if (!newFaqQ || !newFaqA) return;
                          setFaqs((prev) => [
                            ...prev,
                            { id: `faq-${Date.now()}`, question: newFaqQ, answer: newFaqA, category: newFaqCat },
                          ]);
                          setShowAddFaqModal(false);
                          setNewFaqQ("");
                          setNewFaqA("");
                          showToast("New FAQ added successfully");
                        }}
                        style={{ backgroundColor: "var(--primary)", border: "none", color: "#ffffff", padding: "8px 18px", borderRadius: "8px", fontWeight: 700, cursor: "pointer" }}
                      >
                        Add FAQ
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
