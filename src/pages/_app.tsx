import '../app/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes'; 
import mapboxgl from 'mapbox-gl'; 

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
  >
    <Component {...pageProps} />
  </ThemeProvider>
  );
}

export default MyApp;
