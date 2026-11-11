import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SvgSprite } from "@/components/SvgSprite";
import { CartProvider } from "@/context/CartContext";
import { WishlistDrawer } from "@/components/WishlistDrawer";
import { AuthProvider } from "@/context/AuthContext";
import { AuthModal } from "@/components/AuthModal";

export const metadata: Metadata = {
  title: "SHK Auto | E-Commerce Store for Batteries & Precision Engine Spare Parts",
  description:
    "Order genuine Nexcolle™ High-Performance Two-Wheeler Batteries & FUJI™ Precision Engine Spares online. Direct pan-India dispatch and wholesale trade pricing.",
  icons: {
    icon: "/favicon.svg",
  },
  other: {
    google: "notranslate",
  },
};

export const viewport: Viewport = {
  themeColor: "#0e1424",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="notranslate" translate="no">
      <head>
        <meta name="google" content="notranslate" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="notranslate" translate="no">
        <AuthProvider>
          <CartProvider>
            <SvgSprite />
            <WishlistDrawer />
            <AuthModal />
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
