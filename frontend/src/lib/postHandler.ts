import { Editor } from "@tiptap/react";
import editor from "../editor/editor";

export async function createBlog(title: string, editor: Editor) {
  const content = editor.getHTML();

  const token = localStorage.getItem("token");

  const res = await fetch(
    "https://backend.lokiislazy.workers.dev/api/v1/blog",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content }),
    }
  );

  const data = await res.json();
  return data;
}

export async function getBlogs() {
  const token = localStorage.getItem("token");

  const res = await fetch(
    "https://backend.lokiislazy.workers.dev/api/v1/blog",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();

  return data;
}

export async function getBlog(id: string) {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `https://backend.lokiislazy.workers.dev/api/v1/blog/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();

  return data;
}

export async function updateBlog(id, title: string, editor: Editor) {
  const content = editor.getHTML();

  const token = localStorage.getItem("token");

  const res = await fetch(
    `https://backend.lokiislazy.workers.dev/api/v1/blog/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content }),
    }
  );

  const data = await res.json();
  return data;
}
