import Footer from "./Footer";
import Navbar from "./Navbar";

function Layout(props) {
  const { children } = props;

  return (
    <div className="content">
      <Navbar />
      <div className="main-content">{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
