import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Head>
        <title>Moni</title>
      </Head>
      <main className="mainBackground">
        <section className="content-login">
          <div className="logo-home">
            <Image
              src="/moni-logo-primary-small.svg"
              alt="Moni Logo"
              width={80}
              height={30}
              layout="responsive"
              priority={true}
            />
          </div>

          <h2 className="txt-subtitle">Te presto hasta $1.000.000 pesos</h2>
          <h1 className="txt-title">
            ¡PRÉSTAMOS ONLINE
            <br />
            EN EL ACTO!
          </h1>
          <div className="btn-container">
            <Link href="/prestamos" className="btn btn-accent">
              Quiero un préstamo
            </Link>
            <Link href="/login" className="btn-secondary">
              Ingresar al sitio de Administacion
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
