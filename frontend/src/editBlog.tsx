import { Content } from "@tiptap/react";
import React from "react";

const EditBlog = () => {
  let content: Content;
  const editorStateString = localStorage.getItem("editor");

  if (editorStateString !== null) {
    content = JSON.parse(editorStateString);
  }

  return <div></div>;
};

export default EditBlog;
