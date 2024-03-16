// ... (other imports)

import { Content, EditorContent } from "@tiptap/react";

import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { deleteBlog, getBlog } from "./lib/postHandler";
import { FaRegCircleUser } from "react-icons/fa6";

const Blog = () => {
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const { id } = useParams();

  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");

  useEffect(() => {
    async function init() {
      const data = await getBlog(id as string);
      setAuthor(data.post.authorId);
      setContent(data.post.content);
      setTitle(data.post.title);
    }

    init();
  }, [id]);

  function editHandler() {
    navigate(`/edit/${id}`);
  }

  async function deleteHandler() {
    if (id) {
      const data = await deleteBlog(id);

      if (data.success) {
        navigate("/");
      } else {
        alert("unable to delete post right now ");
      }
    }
  }

  if (!content) {
    return <h2 className="text-center text-2xl">Loading post...</h2>;
  }

  return (
    <div className="w-full mt-10 sm:w-3/4 sm:mx-auto ">
      <div className="*:m-0 border  flex justify-between flex-row px-3  gap-2 ">
        <div className="flex sm:gap-4">
          <FaRegCircleUser className="w-12 h-auto" />

          <div className="flex flex-col m-0 sm:gap-1 px-2">
            <p className=" m-0 text-xl sm:text-2xl">{name} </p>
            <p className="m-0 text-md sm:text-lg text-gray-400 ">1 mar, 2024</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              editHandler();
            }}
            className={`cursor-pointer px-3 text-lg bg-white border border-solid border-gray-300  ${
              author === userId ? "block" : "hidden"
            } `}
          >
            Edit
          </button>
          <button
            onClick={() => {
              deleteHandler();
            }}
            className={`cursor-pointer px-3 text-lg bg-white border border-solid border-gray-300  ${
              author === userId ? "block" : "hidden"
            } `}
          >
            Delete
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-center border border-solid border-gray-300 mx-4 p-2 sm:p-4 rounded-md ">
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
