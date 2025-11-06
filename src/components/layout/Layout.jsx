import { useEffect } from "react";

import { Menu } from "../tabMenu/Menu";

export const Layout = ({ children }) => {
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, []);

  return (
    <>
      {children}
      <Menu />
    </>
  );
};
