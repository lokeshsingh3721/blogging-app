import React from "react";

import Navbar from "./components/navbar";
import Card from "./components/card";
import { Link } from "react-router-dom";

type Blog = {
  id: string;
  name: string;
  title: string;
  content: string;
};

const data: Blog[] = [
  {
    id: "324ldfkdsfj34lk",
    name: "Max doe",
    title: "coding is Worst",
    content:
      "fjadslkfjskjfals dfjklsdjflsjdlfjlksadjfkjdsfkasdlkfjslkdjfaklsdfjklf",
  },
  {
    id: "324ldfkdsfj34lk",
    name: "John doe",
    title: "coding is good",
    content:
      "fjadslkfjskjfals dfjklsdjflsjdlfjlksadjfkjdsfkasdlkfjslkdjfaklsdfjklf",
  },
  {
    id: "324ldfkdsfj34lk",
    name: "Jay doe",
    title: "coding is Fine",
    content:
      "fjadslkfjskjfals dfjklsdjflsjdlfjlksadjfkjdsfkasdlkfjslkdjfaklsdfjklf",
  },
];

const Index = () => {
  return (
    <div>
      <div className="flex flex-col gap-2">
        {data.map((blog: Blog) => {
          return (
            <Link className="link" key={blog.id} to={`/blog/${blog.id}`}>
              <Card blog={blog} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Index;
