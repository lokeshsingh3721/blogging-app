import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signinHandler from "./lib/signinHandler";

import "./index.css";

const Signin = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  async function submitHandler(e: React.MouseEvent) {
    e.preventDefault();
    const data = await signinHandler({ email, password });

    if (data.success) {
      localStorage.setItem("token", data.token);
      setEmail("");
      setPassword("");
      navigate("/");
    } else {
      alert("invalid input");

      setEmail("");
      setPassword("");
    }
  }

  return (
    <div>
      <form className="mt-40 mx-auto border-2 border-gray-300 border-solid  flex flex-col gap-2 w-2/6 px-12 py-10">
        <h1 className="text-center text-3xl font-bold ">Sign in</h1>
        <p className="text-center text-xl">
          Dont have an account?{" "}
          <Link to="/signup">
            {" "}
            <span className="text-blue-500 font-medium "> Sign up</span>{" "}
          </Link>{" "}
        </p>
        <label htmlFor="Email">Email</label>
        <input
          type="text"
          className="border-2 border-2 border-gray-300 border-solid p-2"
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
          className="border-2 p-2 border-gray-300 border-solid"
          placeholder="*********"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          onClick={(e) => {
            submitHandler(e);
          }}
          className="p-2 bg-blue-500 rounded-md outline-none  text-white text-xl "
        >
          submit
        </button>
      </form>{" "}
    </div>
  );
};

export default Signin;
