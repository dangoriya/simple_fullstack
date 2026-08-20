import "./globals.css";

export const metadata = {
  title: "App Workspace - Centralized Launchpad",
  description: "Centralized workspace app gallery for quick access based on user role.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}