import { SigninType } from "@lokiislazy/common-package";

async function signinHandler({ email, password }: SigninType) {
  const res = await fetch(
    "https://backend.lokiislazy.workers.dev/api/v1/signin",
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: email.toLowerCase(),
        password,
      }),
    }
  );

  const data = await res.json();
  localStorage.setItem("name", data.name);
  localStorage.setItem("userId", data.userId);
  return data;
}

export default signinHandler;
