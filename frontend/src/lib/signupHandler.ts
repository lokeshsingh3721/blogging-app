import { SignupType } from "@lokiislazy/common-package";

async function signupHandler({ name, email, password }: SignupType) {
  const res = await fetch(
    "https://backend.lokiislazy.workers.dev/api/v1/signup",
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: name?.toLowerCase(),
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

export default signupHandler;
