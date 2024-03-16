import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./menu";
import { useNavigate } from "react-router-dom";
import { createBlog } from "../lib/postHandler";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { loadingAtom } from "../store/loadingAtom";

// define your extension array
const extensions = [StarterKit];

const Tiptap = () => {
  const [title, setTitle] = useState<string>("");
  const [details, setDetails] = useRecoilState(loadingAtom);

  const content = "<p>Hello World!</p>";

  const navigate = useNavigate();

  const editor = useEditor({
    extensions,
    content,
  });

  const postHandler = async () => {
    if (!editor) return;
    setDetails({ isLoading: true, error: null });
    if (!title || !editor) {
      alert("fields cant be empty");
      setDetails({ isLoading: false, error: null });
      navigate("/new");
      return;
    }

    const data = await createBlog(title, editor);

    if (data.success) {
      setDetails({ isLoading: false, error: null });
      navigate("/");
    } else {
      setDetails({ isLoading: false, error: data.message });
    }
  };

  if (details.isLoading) {
    return <h1 className="text-2xl text-center">Posting the blog ...</h1>;
  }

  if (details.error) {
    return (
      <h1 className="text-2xl text-center">
        Server error please trying again later...
      </h1>
    );
  }

  return (
    <div className="mt-10 px-4 sm:w-2/3  sm:mx-auto ">
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
