import { Content, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect, useState } from "react";
import MenuBar from "./editor/menu";
import { getBlog, updateBlog } from "./lib/postHandler";
import { useNavigate, useParams } from "react-router-dom";

const EditBlog = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<Content>();
  const { id } = useParams();
  const navigate = useNavigate();

  const extensions = [StarterKit];

  useEffect(() => {
    async function init() {
      const data = await getBlog(id as string);

      setContent(data.post.content);
      setTitle(data.post.title);
    }

    init();
  }, [id]);

  const editor = useEditor(
    {
      extensions,
      content,
    },
    [content]
  );

  async function updateHandler() {
    if (!editor) {
      return;
    }
    const data = await updateBlog(id, title, editor);

    if (data.success) {
      navigate("/");
    } else {
      alert("server error please try later");
    }
  }

  if (!content) {
    return <h2 className="text-center text-2xl">loading...</h2>;
  }

  return (
    <div className="mt-10 px-4 sm:w-1/2  ">
      <input
        className="w-full py-2 block border outline-none border-gray-400  text-2xl font-bold rounded-2xl mb-5 text-center"
        type="text"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        placeholder="Enter title"
      />

      <EditorContent
        className="w-full  border border-solid border-gray-300  outline-none  "
        editor={editor}
      >
        <MenuBar editor={editor ? editor : null} />
      </EditorContent>
      <button
        onClick={() => {
          updateHandler();
        }}
        className=" block bg-white   border-solid border-[1px] border-gray-300 mx-auto px-3 py-3 w-32 cursor-pointer rounded-md mt-6"
      >
        Update
      </button>
    </div>
  );
};

export default EditBlog;
