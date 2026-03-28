import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Source_Sans_3,
  Vazirmatn,
  Noto_Nastaliq_Urdu,
} from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-farsi",
  display: "swap",
});

const nastaliq = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-nastaliq",
  display: "swap",
});

export const metadata: Metadata = {
  title: "IMAN | Iranian-American Muslim Association of North America",
  description:
    "Serving the Iranian-American Muslim community in Los Angeles. Prayer times, events, classes, and community services.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${sourceSans.variable} ${vazirmatn.variable} ${nastaliq.variable}`}
    >
      <body className="font-[family-name:var(--font-body)]">{children}</body>
    </html>
  );
}
