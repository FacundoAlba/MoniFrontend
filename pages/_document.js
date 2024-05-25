import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta
          name= "Préstamos personales online al instante"
          content= "Te presto hasta $1.000.000 pesos y podés devolverme en 12 cuotas. Mis créditos son fáciles, rápidos y seguros. Pedime efectivo ya y te transfiero de forma urgente."
        />
        
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}