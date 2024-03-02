import { Editor } from "@tiptap/react";

export function createBlog(editor: Editor) {
  const editorAsJson = editor?.getJSON();
  localStorage.setItem("editor", JSON.stringify(editorAsJson));
  console.log(editorAsJson);
}
