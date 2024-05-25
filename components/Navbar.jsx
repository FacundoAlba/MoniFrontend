import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import { logout } from "@/services/authServices";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Navbar() {
  const [showLogout, setShowLogout] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  useEffect(() => {
    const protectedRoutes = ["/administracion"];

    if (protectedRoutes.includes(router.pathname)) {
      setShowLogout(true);
    } else {
      setShowLogout(false);
    }
  }, [router.pathname]);

  return (
    <header className="bg-primary shadow-md">
      <nav className="nav-container">
        <Link href="/">
          <div className="logo-navbar">
            <Image
              src="/moni-logo-primary-small.svg"
              alt="Moni Logo"
              width={80}
              height={30}
              layout="responsive"
              priority={true}
            />
          </div>
        </Link>
        {showLogout && (
          <button className="btn-logout" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
