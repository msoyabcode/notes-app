import Navbar from "@/components/Navbar";
import "./globals.css"

export const metadata = {
  title: "Notes App",
  description: "Your personal notes manager",
  keywords: ["notes", "note book", "todo app", "next.js projct full stack"]
}
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Navbar />
        {children}
        </body>
    </html>
  );
}

