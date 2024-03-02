import React from "react";
import { FaImage } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const navigate = useNavigate();

  function editHandler() {
    navigate("/editor");
  }

  return (
    <div className="w-full ">
      <div className="*:m-0 border  flex justify-between flex-row px-3  gap-2 ">
        <div className="flex">
          <FaRegCircleUser className="w-12 h-auto" />

          <div className="flex flex-col m-0 px-2">
            <p className=" m-0 text-xl">John cena </p>
            <p className="m-0 text-md text-gray-400 ">1 mar, 2024</p>
          </div>
        </div>
        <button
          onClick={() => {
            editHandler();
          }}
          className=" cursor-pointer px-3 text-lg bg-white border border-solid border-gray-300 "
        >
          Edit
        </button>
      </div>

      <p className="px-4 align-">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic neque
        molestias reiciendis voluptatem vel, quia, modi soluta eius tempore
        quibusdam vitae officia illum similique. Numquam enim, ullam ipsa totam
        sapiente, veniam odit quidem distinctio vitae pariatur alias, est
        nesciunt voluptatum. Autem dolore sit voluptatem voluptates, modi nemo
        porro corporis id ducimus nam, obcaecati laboriosam tempora consequatur
        cumque. Animi nostrum perferendis laborum dolorum commodi earum id
        placeat soluta beatae, dolore fuga? Dolor, cumque vero. Consequuntur
        unde libero, corrupti facere amet obcaecati saepe fugiat doloremque
        minima velit molestias, earum fugit possimus corporis dolor voluptatum
        impedit incidunt omnis. Iste, possimus quas quidem architecto vero
        deleniti nobis quam itaque a magni aspernatur odio ab qui recusandae eos
        tenetur perspiciatis? Repellendus sint velit, commodi aliquid ipsum
        obcaecati laudantium, fuga voluptatum sunt nobis doloremque alias itaque
        harum, voluptatem accusamus aut. Ducimus possimus eaque earum, adipisci
        similique temporibus hic voluptates, quas quis aspernatur mollitia
        dolorem culpa exercitationem, debitis facilis consequuntur commodi
        expedita aperiam nihil! Corporis recusandae ea sed tenetur consectetur
        esse beatae voluptatibus modi sequi tempora eos error similique, iste
        ipsam magni perspiciatis ad illo laudantium dolore sint reiciendis
        numquam optio, ut vel. Rem omnis voluptate ab voluptas itaque, eius ex
        provident tempore, praesentium consectetur blanditiis quos.
      </p>
    </div>
  );
};

export default Blog;
