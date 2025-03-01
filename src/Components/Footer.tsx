import { useEffect, useState } from "react";
import "../styles/footer.css";

const Footer = () => {
  const [showFooter, setShowFooter] = useState(false);
  let timeoutId: NodeJS.Timeout;

  useEffect(() => {
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setShowFooter(window.innerHeight + window.scrollY >= document.body.offsetHeight - 10);
      }, 100); 
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return showFooter ? (
    <footer className="footer">
      <p>© 2025 MyStore. All rights reserved.</p>
      <button onClick={scrollToTop} className="back-to-top">⬆ Back to Top</button>
      <p>Made By Arushi Kansal</p>
    </footer>
  ) : null;
};

export default Footer;
