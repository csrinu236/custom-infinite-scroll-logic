import Navbar from "@/components/Navbar";
import "@/styles/globals.scss";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar></Navbar>
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}
