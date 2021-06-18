import React, { ReactNode } from "react";
import Link from "next/link";
// import { useAuth } from "src/auth/useAuth";

interface Iprops {
  main: ReactNode;
}

const Layout: React.FC<Iprops> = ({ main }) => {
  return (
    <div className="bg-gray-900 max-w-screen-2xl mx-auto text-white">
      {main}
    </div>
  );
};

export default Layout;
