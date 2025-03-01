import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

type LayoutProps = {
  children: ReactNode;
  onSearch: (query: string) => void; 
};

const Layout = ({ children, onSearch }: LayoutProps) => {
  const location = useLocation();

  return (
    <>
      <Header onSearch={location.pathname === "/" ? onSearch : () => {}} />
      <main style={{ paddingBottom: "60px" }}>{children}</main>
      <Footer/>
    </>
  );
};

export default Layout;
