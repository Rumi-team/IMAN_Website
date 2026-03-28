import type { Metadata } from "next";

const BASE_URL = "https://iman.org";
const SITE_NAME = "IMAN";

export function generatePageMetadata(
  title: string,
  description: string,
  path: string
): Metadata {
  const url = `${BASE_URL}${path}`;

  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
    },
  };
}
