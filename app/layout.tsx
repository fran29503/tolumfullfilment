import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tolum | Canada's Premier Fulfillment Partner",
  description:
    "Tolum delivers end-to-end fulfillment solutions across Canada and worldwide. Flexible warehousing, precision pick & pack, global shipping, and real-time inventory management — so your brand can scale without limits.",
  keywords: [
    "fulfillment Canada",
    "Canadian 3PL",
    "warehouse fulfillment",
    "ecommerce fulfillment Canada",
    "pick and pack Canada",
    "global shipping fulfillment",
    "Canadian fulfillment center",
    "Tolum fulfillment",
    "logistics Canada",
    "order fulfillment services",
  ],
  openGraph: {
    title: "Tolum | Canada's Premier Fulfillment Partner",
    description:
      "From coast to coast and beyond every border. Tolum handles your warehousing, fulfillment, and global shipping.",
    type: "website",
    locale: "en_CA",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <body className="font-inter antialiased bg-black text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
