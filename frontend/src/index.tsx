import React, { useEffect, useState } from "react";

import Navbar from "./components/navbar";
import Card from "./components/card";
import { Link } from "react-router-dom";
import { getBlogs } from "./lib/postHandler";

type Blog = {
  id: string;
  name: string;
  title: string;
};

type Post = {
  id: string;
  title: string;
  published: boolean;
  author: {
    name: string;
  };
};

type ApiResponse = {
  success: boolean;
  message: string;
  posts: Post[];
};

const Index = () => {
  const [data, setData] = useState<ApiResponse>();

  let blogs: Blog[] | undefined = [];

  useEffect(() => {
    const init = async () => {
      setData(await getBlogs());
    };
    init();
  }, []);

  blogs = data?.posts.map((post) => ({
    id: post.id,
    title: post.title,
    name: post.author.name,
  }));

  if (!data) {
    return <h2 className="text-center text-2xl">Loading...</h2>;
  }

  return (
    <div>
      <div className="flex flex-col gap-2">
        {blogs?.map((blog: Blog) => {
          return (
            <Link
              className="link"
              key={blog.id}
              to={`/blog/${blog.id}?name=${blog.name}`}
            >
              <Card blog={blog} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Index;
