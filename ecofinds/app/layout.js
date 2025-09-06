import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // we’ll add later

export const metadata = {
  title: "EcoFinds",
  description: "Discover eco-friendly and sustainable products",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
