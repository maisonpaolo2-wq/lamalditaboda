import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  display: "swap",
});

export const metadata: Metadata = {
  title: "La Maldita Boda · Pilar Gómez",
  description:
    "Wedding planner especializada en bodas con personalidad. Coordinación integral, servicio de día de la boda y consultorías para parejas con criterio.",
  openGraph: {
    title: "La Maldita Boda · Pilar Gómez",
    description: "Bodas con personalidad. Coordinación integral.",
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={dmSans.variable}>{children}</body>
    </html>
  );
}
