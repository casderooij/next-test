import { useEffect, useState } from "react";

export default function Home() {
  const [_, setShow] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => {
      setShow(true);
    }, 1000);

    return () => clearTimeout(id);
  }, []);

  return (
    <>
      <div>Home</div>
    </>
  );
}
