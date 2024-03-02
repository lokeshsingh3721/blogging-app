import { Hono } from "hono";
import { cors } from "hono/cors";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";

import {
  signinInput,
  updatePostInput,
  signupInput,
  createPostInput,
} from "@lokiislazy/common-package";

type Variables = {
  userId: string;
};

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    SECRET: string;
  };
  Variables: Variables;
}>();

app.use("/api/*", cors());

// middleware

app.use("/api/v1/blog/*", async (c, next) => {
  //get the user id and pass over the blog route

  const jwt = c.req.header("Authorization");
  if (!jwt) {
    return c.json({
      success: false,
      message: "unauthorized access",
    });
  }

  const token = jwt.split(" ")[1];

  const payload = await verify(token, c.env.SECRET);

  if (!payload.userId) {
    return c.json({
      success: false,
      message: "unauthorized access",
    });
  }

  c.set("userId", payload.userId);
  await next();
});

app.post("/api/v1/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();

    const { success } = signupInput.safeParse(body);

    if (!success) {
      return c.json({
        success: false,
        message: "invalid input",
      });
    }
    const { email, name, password } = body;

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    const token = await sign({ userId: user.id }, c.env.SECRET);

    return c.json({
      success: true,
      token,
      name: user.name,
      userId: user.id,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error);

      return c.json({
        success: false,
        message: error.message,
      });
    }
  }
});
app.post("/api/v1/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();

    const { success } = signinInput.safeParse(body);

    if (!success) {
      return c.json({
        success: false,
        message: "invalid input",
      });
    }

    const { email, password } = body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // check
    if (!user) {
      return c.json({
        success: false,
        message: "no user found",
      });
    }

    // valid password or not
    if (user.password != password) {
      return c.json({
        success: false,
        message: "invalid details",
      });
    }

    const token = await sign({ userId: user.id }, c.env.SECRET);

    return c.json({
      success: true,
      message: "login successfull",
      token,
      name: user.name,
      userId: user.id,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return c.json({
        success: false,
        message: error.message,
      });
    }
  }
});

//! create the blog

app.post("/api/v1/blog", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const userId = c.get("userId");
    const body = await c.req.json();

    const { success } = createPostInput.safeParse(body);

    if (!success) {
      return c.json({
        success: false,
        message: "invalid input",
      });
    }

    // check input

    const { title, content } = body;

    const blog = await prisma.post.create({
      data: {
        title,
        content,
        authorId: userId,
      },
    });

    return c.json({
      success: true,
      message: "post created successfully",
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return c.json({
        success: false,
        message: error.message,
      });
    }
  }
});
app.put("/api/v1/blog/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const userId = c.get("userId");
    const body = await c.req.json();
    const id = c.req.param("id");

    const { success } = updatePostInput.safeParse(body);

    if (!success) {
      return c.json({
        success: false,
        message: "invalid input",
      });
    }

    const { title, content } = body;

    // check if post exist

    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    });

    if (!post) {
      return c.json({
        sucess: false,
        message: "post doesnt exist",
      });
    }

    const updatedPost = await prisma.post.updateMany({
      where: {
        authorId: userId,
        id,
      },
      data: {
        title,
        content,
      },
    });

    return c.json({
      success: true,
      message: "blog updated successfully",
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return c.json({
        success: false,
        message: error.message,
      });
    }
  }
});
app.delete("/api/v1/blog/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const userId = c.get("userId");
    const id = c.req.param("id");

    console.log(userId);

    // if post exist
    const post = await prisma.post.findUnique({
      where: {
        authorId: userId,
        id,
      },
    });

    if (!post) {
      return c.json({
        success: false,
        message: "post not found",
      });
    }

    await prisma.post.delete({
      where: {
        id,
        authorId: userId,
      },
    });

    return c.json({
      success: true,
      message: "post deleted successfully",
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return c.json({
        success: false,
        message: error.message,
      });
    }
  }
});

app.get("/api/v1/blog/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const userId = c.get("userId");
    const id = c.req.param("id");

    // if post exist
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    });

    if (!post) {
      return c.json({
        success: false,
        message: "post not found",
      });
    }

    return c.json({
      success: true,
      message: "post fetched successfully",
      post,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return c.json({
        success: false,
        message: error.message,
      });
    }
  }
});

app.get("/api/v1/blog", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        published: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return c.json({
      success: true,
      message: "posts fetched successfully",
      posts,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return c.json({
        success: false,
        message: error.message,
      });
    }
  }
});

export default app;
