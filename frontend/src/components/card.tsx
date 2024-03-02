import React from "react";

import { FaRegCircleUser } from "react-icons/fa6";
import { FaImage } from "react-icons/fa";
import Blog from "../blog";

type Blog = {
  id: string;
  name: string;
  title: string;
};

const Card = ({ blog }: { blog: Blog }) => {
  const { title, name } = blog;

  return (
    <div className=" flex shadow-sm border-b-2   justify-center gap-2">
      <div className="flex flex-col   ">
        <div className="*:m-0 flex items-center p-3 justify-between gap-2 ">
          <FaRegCircleUser className="w-8 h-auto" />
          <p className="text-lg">{name}</p>
          <p className="m-0 text-lg text-gray-400 ">1 mar, 2024</p>
        </div>

        <h2 className="m-0 py-2 px-3">{title}</h2>
      </div>

      <div className=" ">
        <FaImage className="w-28 h-auto" />
      </div>
    </div>
  );
};

export default Card;
