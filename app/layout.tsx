import "./globals.css";

export const metadata = {
  title: "SmartVitals",
  description: "Remote patient monitoring prototype"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
