import React from "react";
import { FaHome } from "react-icons/fa";
import { PiSignOut } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");

  function logoutHandler() {
    localStorage.clear();
    navigate("/signin");
  }

  return (
    <nav
      className="flex
    justify-between items-center shadow-md p-4  mb-4 "
    >
      <div className="flex flex-row justify-center items-center gap-6 ">
        <FaHome
          onClick={() => {
            navigate("/");
          }}
          className="w-10 h-auto cursor-pointer"
        />
        <button
          onClick={() => {
            navigate("/new");
          }}
          className="cursor-pointer px-3 text-lg bg-white border-2  border-solid border-black"
        >
          New
        </button>
      </div>
      <div className="flex flex-row justify-center items-center gap-4 ">
        <div
          className={`text-lg rounded-full px-4 py-1 border-2 border-solid border-black-300 ${
            name ? "block" : "hidden"
          } `}
        >
          {name ? name.split(" ")[0][0].toUpperCase() : ""}
        </div>
        <PiSignOut
          onClick={() => {
            logoutHandler();
          }}
          className="w-10 h-auto cursor-pointer "
        />
      </div>
    </nav>
  );
};

export default Navbar;
