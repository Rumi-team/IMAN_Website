import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Source_Sans_3,
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

const BASE_URL = "https://iman.org";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "IMAN | Iranian-American Muslim Association of North America",
    template: "%s | IMAN",
  },
  description:
    "Serving the Iranian-American Muslim community in Los Angeles since 1990. Prayer times, Quran classes, cultural events, marriage and memorial services at IMAN Center, 3376 Motor Ave.",
  keywords: [
    "IMAN",
    "Iranian-American Muslim Association",
    "Iranian mosque Los Angeles",
    "Persian mosque LA",
    "IMAN Center",
    "prayer times Los Angeles",
    "Shia mosque Los Angeles",
    "Iranian community LA",
    "Quran classes Los Angeles",
    "Dua Kumayl",
    "Jumu'ah prayer",
    "Islamic center LA",
    "Nowruz Los Angeles",
    "Iranian cultural center",
    "مسجد ایرانیان لس آنجلس",
    "انجمن اسلامی ایرانیان",
  ],
  authors: [{ name: "IMAN - Iranian-American Muslim Association of North America" }],
  creator: "IMAN",
  publisher: "IMAN",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "IMAN | Iranian-American Muslim Association of North America",
    description:
      "Serving the Iranian-American Muslim community in Los Angeles since 1990. Prayer times, Quran classes, cultural events, and community services.",
    url: BASE_URL,
    siteName: "IMAN",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IMAN | Iranian-American Muslim Association of North America",
    description:
      "Serving the Iranian-American Muslim community in Los Angeles since 1990. Prayer times, events, classes, and community services.",
  },
  other: {
    "google-site-verification": "",
  },
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
      "@id": `${BASE_URL}/#organization`,
      name: "IMAN - Iranian-American Muslim Association of North America",
      alternateName: ["IMAN", "IMAN Center", "انجمن اسلامی ایرانیان آمریکای شمالی"],
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/icon.svg`,
      },
      description:
        "Serving the Iranian-American Muslim community in Los Angeles since 1990. Prayer times, Quran classes, cultural events, marriage and memorial services.",
      foundingDate: "1990",
      sameAs: [
        "https://www.instagram.com/imancenter",
        "https://www.youtube.com/@IMANCenter",
        "https://www.facebook.com/IMANCulturalCenter/",
        "https://t.me/IMANCenter",
        "https://x.com/imaninformation",
        "https://linkedin.com/company/imancenter",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+1-310-202-8181",
        email: "info@iman.org",
        contactType: "customer service",
        availableLanguage: ["English", "Persian"],
      },
    },
    {
      "@type": ["LocalBusiness", "PlaceOfWorship", "Mosque"],
      "@id": `${BASE_URL}/#localbusiness`,
      name: "IMAN Center",
      url: BASE_URL,
      telephone: "(310) 202-8181",
      email: "info@iman.org",
      description:
        "Iranian-American Islamic center in Los Angeles offering daily prayers, Quran classes, cultural events, marriage and memorial services. Bilingual community (English/Farsi).",
      address: {
        "@type": "PostalAddress",
        streetAddress: "3376 Motor Ave",
        addressLocality: "Los Angeles",
        addressRegion: "CA",
        postalCode: "90034",
        addressCountry: "US",
      },
      openingHours: ["Mo-Su 09:00-18:00"],
      geo: {
        "@type": "GeoCoordinates",
        latitude: 34.0242,
        longitude: -118.3964,
      },
      priceRange: "Free",
      currenciesAccepted: "USD",
      paymentAccepted: "Cash, Credit Card",
      isAccessibleForFree: true,
      hasMap: "https://maps.google.com/?q=3376+Motor+Ave+Los+Angeles+CA+90034",
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "IMAN",
      publisher: { "@id": `${BASE_URL}/#organization` },
      inLanguage: ["en", "fa"],
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
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
