export const metadata = {
    title: "Simple Fullstack App",
    description: "Next.js + FastAPI Demo",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", background: "#f0f2f5" }}>
                {children}
            </body>
        </html>
    );
}