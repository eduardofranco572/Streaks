import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header />

            {children}
          </ThemeProvider>
          
        </body>
      </html>
    </>
  )
}