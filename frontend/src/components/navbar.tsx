import React from "react";
import { FaHome } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="w-full flex justify-between  mb-8 ">
      <div className="flex flex-row justify-center items-center gap-8 p-2">
        <FaHome className="w-6 h-auto" />
        <p className="text-lg">hello user </p>
      </div>
      <div className="flex flex-row justify-center items-center gap-8 p-2">
        <p>Blogs</p>
        Logout
      </div>
    </nav>
  );
};

export default Navbar;
