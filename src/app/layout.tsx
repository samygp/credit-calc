import '@/app/globals.css';
import theme from '@/app/theme';
import '@fontsource/roboto';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head >
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </head>
      <body suppressHydrationWarning={true} >
        <AppRouterCacheProvider>
          <CssBaseline />
          <ThemeProvider theme={theme}>
              {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
