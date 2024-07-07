import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { EnterTreemap, ExitTreemap } from "./Treemap";

function ExitTransition() {
  const router = useRouter();
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (url === "/about") {
        setShouldAnimate(true);
      }
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => router.events.off("routeChangeStart", handleRouteChange);
  }, [router]);

  return <>{shouldAnimate && <ExitTreemap />}</>;
}

function EnterTransition() {
  return <EnterTreemap />;
}

export { ExitTransition, EnterTransition };
