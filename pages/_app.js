import "@/styles/globals.css";
import { TokenProvider } from "@/hooks/tokenContext";

export default function App({ Component, pageProps }) {
  return (
    <TokenProvider>
        <Component {...pageProps} />
    </TokenProvider>
  );
}
