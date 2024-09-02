import Navbar from "@/components/Navbar";
import "@/styles/globals.scss";
import { QueryClientProvider, QueryClient } from "react-query";
const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar></Navbar>
      <QueryClientProvider client={queryClient}>
        <main id="main">
          <Component {...pageProps} />
        </main>
      </QueryClientProvider>
    </>
  );
}
