import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "600", "800"],
});

export const metadata = {
  title: "BSpecial Business Ltd | Premium Liquor Distributors in Kigali",
  description: "BSpecial Business Ltd is a premier wholesale distributor of high-quality liquor in Kigali, Nyarugenge Market. We supply Gilbey's, Bond 7, Smirnoff, Tusker, Guinness, and more. Your trusted beverage partner.",
  keywords: ["Liquor distributor Kigali", "Wholesale beverages Rwanda", "Buy Gilbey's Kigali", "Bond 7 wholesale", "Tusker beer Kigali", "BSpecial Business Ltd", "Nyarugenge Market liquor", "Beverage supplier Rwanda"],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "BSpecial Business Ltd | Premium Liquor Distributors",
    description: "Your trusted wholesale liquor distributor located in Nyarugenge Market, Kigali.",
    url: "https://bspecialbusinessltd.com",
    siteName: "BSpecial Business Ltd",
    images: [
      {
        url: "/images/Gilbeys_big.jfif",
        width: 800,
        height: 800,
        alt: "BSpecial Business Ltd - Premium Liquor",
      },
    ],
    locale: "en_RW",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={outfit.className}>{children}</body>
    </html>
  );
}
