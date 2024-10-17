import { ReactNode } from 'react'; // Ensure ReactNode is imported for children type
import { ThemeProvider } from "@/components/theme-provider"; // Or 'next-themes' if needed

// Define the props type
interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
