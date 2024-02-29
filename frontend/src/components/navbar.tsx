import React from "react";
import { FaHome } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="w-full flex justify-between  mb-5 px-10 py-5">
      <div className="flex flex-row justify-center items-center gap-10">
        <FaHome className="w-5 h-5" />
        <p>hello user </p>
      </div>
      <div className="flex flex-row justify-center items-center gap-10">
        <p>Blogs</p>
        Logout
      </div>
    </nav>
  );
};

export default Navbar;
