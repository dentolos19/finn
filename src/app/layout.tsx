import LayoutContainer from "@/components/layout-container";
import theme from "@/lib/theme";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Finanical Inclusion",
  description: "hacksingapore 2024",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <LayoutContainer>
              {children}
            </LayoutContainer>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}