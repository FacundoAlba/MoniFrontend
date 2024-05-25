import Image from "next/image";

function Footer() {
  return (
    <footer className="bg-primary-dark">
      <div className="footer">
        <p className="footer-text">Todas tus finanzas, más fácil.</p>
        <div className="logo-footer">
          <Image
            src="/moni-logo-secondary.svg"
            alt="Moni Logo"
            width={80}
            height={30}
            layout="responsive"
            priority={false}
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
