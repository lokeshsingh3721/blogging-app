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
        name,
        email,
        password,
      }),
    }
  );
  const data = await res.json();
  return data;
}

export default signupHandler;
