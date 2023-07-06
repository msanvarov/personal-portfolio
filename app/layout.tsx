import {
  HamburgerMenu,
  LeftNavbar,
  MainMenu,
  MediaBackground,
} from "@/components/layout";
import { Analytics } from "@vercel/analytics/react";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Lato } from "next/font/google";
import "./globals.css";
import "./responsive.css";

const lato = Lato({ weight: ["400"], subsets: ["latin"] });

export const metadata = {
  title: "Sal Anvarov - Personal Portfolio",
  description:
    "Sal Anvarov - Hard-working developer with a flair for creating elegant solutions to complex problems. Team player with a can-do attitude, and a strong focus on client satisfaction. Diverse experience with modern technologies and cloud providers like AWS, and GCP, with enterprise DevOps experience. Likes to contribute to open-source and create apps on his free-time.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css"
        ></link>
      </head>
      <body
        className={lato.className}
        style={{
          backgroundColor: "#1f1f1f",
        }}
      >
        <MediaBackground video="/background-liquid-waves.mp4" />
        <LeftNavbar />
        <HamburgerMenu />
        <MainMenu />
        <main className="drake-main">
          <div id="smooth-wrapper">
            <div id="smooth-content">{children}</div>
          </div>
        </main>
        <Analytics />
      </body>
    </html>
  );
}
