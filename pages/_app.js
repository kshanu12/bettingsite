import "@/styles/globals.css";
import { TokenProvider } from "@/hooks/tokenContext";
import { SocketProvider } from "@/hooks/socketContext";

export default function App({ Component, pageProps }) {
  return (
    <SocketProvider>
      <TokenProvider>
        <Component {...pageProps} />
      </TokenProvider>
    </SocketProvider>
  );
}
