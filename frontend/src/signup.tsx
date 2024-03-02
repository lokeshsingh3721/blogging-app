import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signupHandler from "./lib/signupHandler";

import "./index.css";
import { useRecoilState } from "recoil";
import { loadingAtom } from "./store/loadingAtom";

const Signup = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [details, setDetails] = useRecoilState(loadingAtom);

  const navigate = useNavigate();

  async function submitHandler(e: React.MouseEvent) {
    e.preventDefault();
    setDetails({ error: null, isLoading: true });
    const data = await signupHandler({ name, email, password });

    if (data.success) {
      localStorage.setItem("token", data.token);
      setName("");
      setEmail("");
      setPassword("");
      setDetails({ isLoading: false, error: null });
      navigate("/");
    } else {
      setDetails({ error: data.error, isLoading: false });
      alert("invalid input");
      setName("");
      setEmail("");
      setPassword("");
    }
  }

  if (details.isLoading) {
    return <h2 className="text-center text-2xl">Loading...</h2>;
  }

  return (
    <div>
      <form className="mt-20 *:m-0 mx-3 shadow-lg  flex flex-col gap-3  px-12 py-10">
        <h1 className="text-center text-3xl font-bold underline">Sign Up</h1>
        <p className="text-center text-xl">
          Already registered?{" "}
          <Link to="/signin">
            <span className="text-blue-500 font-medium "> Sign In</span>
          </Link>{" "}
        </p>

        <label htmlFor="Name">Name</label>
        <input
          type="text"
          name="Name"
          className="border-2 p-3 outline-none border-gray-300 border-solid"
          value={name}
          placeholder="John Doe"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <label htmlFor="Email">Email</label>
        <input
          type="text"
          className="border-2 p-3 outline-none border-gray-300 border-solid"
          value={email}
          name="Email"
          placeholder="johndoe@example.com"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label htmlFor="Password">Password</label>
        <input
          type="password"
          name="Password"
          value={password}
          className="border-2 p-3 outline-none border-gray-300 border-solid"
          placeholder="*********"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          onClick={(e) => {
            submitHandler(e);
          }}
          className="p-2 bg-blue-500 rounded-md border-none  text-white text-xl cursor-pointer "
        >
          submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
