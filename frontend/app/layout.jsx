import "./globals.css";

export const metadata = {
  title: "Sales Insight Automator",
  description:
    "Upload sales data and receive AI-powered executive summaries delivered to your inbox.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
