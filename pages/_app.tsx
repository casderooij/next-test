import "@/styles/globals.css";
import { AnimatePresence } from "framer-motion";
import type { AppProps } from "next/app";
import Link from "next/link";

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex gap-5 p-4 text-red-500">
        <Link href="/">home</Link>
        <Link href="/about">about</Link>
        <Link href="/contact">contact</Link>
      </header>

      <main className="flex-1 p-4">
        <AnimatePresence mode="wait" initial={false}>
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </main>
    </div>
  );
}
