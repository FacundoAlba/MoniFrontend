import "@/styles/globals.css";

import { useRouter } from "next/router";
import { useEffect } from "react";
import { getCurrentUser } from "../services/authServices";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const user = getCurrentUser();
    const protectedRoutes = ["/administracion"];

    if (!user && protectedRoutes.includes(router.pathname)) {
      router.push("/login");
    }
  }, [router]);

  return <Component {...pageProps} />;
}

export default MyApp;
