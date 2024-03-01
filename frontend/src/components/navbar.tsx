import React from "react";
import { FaHome } from "react-icons/fa";
import { PiSignOut } from "react-icons/pi";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4  mb-4 ">
      <div className="flex flex-row justify-center items-center gap-6 ">
        <FaHome className="w-9 h-auto" />
        <div className="text-lg rounded-full px-4 py-1 border-2 border-solid border-black-300 ">
          J
        </div>
      </div>
      <div className="flex flex-row justify-center items-center gap-4 ">
        <p className="text-xl">Blogs</p>
        <PiSignOut className="w-9 h-auto" />
      </div>
    </nav>
  );
};

export default Navbar;
