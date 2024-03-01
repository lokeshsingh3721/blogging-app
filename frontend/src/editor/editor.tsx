import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./menu";
import { useNavigate } from "react-router-dom";
import { createBlog } from "../lib/postHandler";

// define your extension array
const extensions = [StarterKit];

const content = "<p>Hello World!</p>";

const Tiptap = () => {
  const navigate = useNavigate();

  const editor = useEditor({
    extensions,
    content,
  });

  const postHandler = () => {
    if (!editor) return;

    const editorAsJson = editor?.getJSON();
    const editorAsString = JSON.stringify(editorAsJson);

    console.log(editorAsString);

    const data = createBlog(editor);

    // if everything is good return to the home page
    navigate("/");
  };

  return (
    <div className="mt-40 w-full sm:w-1/2 mx-auto   ">
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
        className=" block mx-auto px-3 py-2 w-32 cursor-pointer rounded-md mt-2"
      >
        Post
      </button>
    </div>
  );
};

export default Tiptap;
