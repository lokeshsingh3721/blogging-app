import { SigninType } from "@lokiislazy/common-package";

async function signinHandler({ email, password }: SigninType) {
  console.log(email, password);
  const res = await fetch(
    "https://backend.lokiislazy.workers.dev/api/v1/signin",
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );
  const data = await res.json();
  return data;
}

export default signinHandler;
