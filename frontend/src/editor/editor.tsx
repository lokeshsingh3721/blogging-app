import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./menu";
import { useNavigate } from "react-router-dom";
import { createBlog } from "../lib/postHandler";

// define your extension array
const extensions = [StarterKit];

let content = "<p>Hello World!</p>";
const editorStateString = localStorage.getItem("editor");

if (editorStateString !== null) {
  content = JSON.parse(editorStateString);
}

const Tiptap = () => {
  const navigate = useNavigate();

  const editor = useEditor({
    extensions,
    content,
  });

  const postHandler = () => {
    if (!editor) return;

    const data = createBlog(editor);

    // if everything is good return to the home page
    navigate("/");
  };

  return (
    <div className="mt-10 px-4 sm:w-1/2  ">
      <input
        className="w-full py-2 block border outline-none border-gray-400  text-2xl font-bold rounded-2xl mb-5 text-center"
        type="text"
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
          postHandler();
        }}
        className=" block bg-white   border-solid border-[1px] border-gray-300 mx-auto px-3 py-3 w-32 cursor-pointer rounded-md mt-6"
      >
        Post
      </button>
    </div>
  );
};

export default Tiptap;
