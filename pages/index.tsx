import { ExitTransition } from "@/components/Transition";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => {
      setShow(true);
    }, 1000);

    return () => clearTimeout(id);
  }, []);

  return (
    <>
      <ExitTransition />
      <div>Home</div>
    </>
  );
}
