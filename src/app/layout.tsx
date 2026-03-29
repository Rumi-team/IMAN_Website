import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Source_Sans_3,
} from "next/font/google";
import DailyWisdom from "@/components/DailyWisdom";
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

export const metadata: Metadata = {
  title: "IMAN | Iranian-American Muslim Association of North America",
  description:
    "Serving the Iranian-American Muslim community in Los Angeles. Prayer times, events, classes, and community services.",
};

const darkModeScript = `
(function(){
  try {
    var d = new Date(new Date().toLocaleString('en-US',{timeZone:'America/Los_Angeles'}));
    var m = d.getHours()*60+d.getMinutes();
    if(m>=1170||m<330) document.documentElement.classList.add('dark');
  } catch(e) {}
})();
`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://iman.org/#organization",
      name: "IMAN - Iranian-American Muslim Association of North America",
      url: "https://iman.org",
      logo: "https://iman.org/logo.png",
      sameAs: [],
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://iman.org/#localbusiness",
      name: "IMAN Center",
      url: "https://iman.org",
      telephone: "(310) 202-8181",
      email: "info@iman.org",
      address: {
        "@type": "PostalAddress",
        streetAddress: "3376 Motor Ave",
        addressLocality: "Los Angeles",
        addressRegion: "CA",
        postalCode: "90034",
        addressCountry: "US",
      },
      openingHours: "Mo-Su 09:00-18:00",
      geo: {
        "@type": "GeoCoordinates",
        latitude: 34.0242,
        longitude: -118.3964,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${sourceSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: darkModeScript }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-[family-name:var(--font-body)]">
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <DailyWisdom />
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
