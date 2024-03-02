// ... (other imports)

import { Content, EditorContent } from "@tiptap/react";

import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getBlog } from "./lib/postHandler";
import { FaRegCircleUser } from "react-icons/fa6";

const Blog = () => {
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const navigate = useNavigate();

  const { id } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get("name");

  useEffect(() => {
    async function init() {
      const data = await getBlog(id as string);

      setContent(data.post.content);
      setTitle(data.post.title);
    }

    init();
  }, [id]);

  function editHandler() {
    navigate(`/edit/${id}`);
  }

  if (!content) {
    return <h2 className="text-center text-2xl">Loading post...</h2>;
  }

  return (
    <div className="w-full ">
      <div className="*:m-0 border  flex justify-between flex-row px-3  gap-2 ">
        <div className="flex">
          <FaRegCircleUser className="w-12 h-auto" />

          <div className="flex flex-col m-0 px-2">
            <p className=" m-0 text-xl">{name} </p>
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

      <div>
        <h2 className="text-center border border-solid border-gray-300 mx-4 p-2 rounded-md ">
          {title}
        </h2>
        <div
          className="  border border-solid border-gray-300  outline-none m-4 p-4 rounded-md shadow-sm "
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
};

export default Blog;
