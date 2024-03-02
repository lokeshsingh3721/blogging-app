import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signinHandler from "./lib/signinHandler";

import "./index.css";
import { useRecoilState } from "recoil";
import { loadingAtom } from "./store/loadingAtom";

const Signin = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [details, setDetails] = useRecoilState(loadingAtom);
  const navigate = useNavigate();

  async function submitHandler(e: React.MouseEvent) {
    e.preventDefault();
    setDetails({ isLoading: true, error: null });
    const data = await signinHandler({ email, password });

    if (data.success) {
      localStorage.setItem("token", data.token);
      setEmail("");
      setPassword("");
      setDetails({ isLoading: false, error: null });

      navigate("/");
    } else {
      setDetails({ isLoading: false, error: null });
      alert("invalid input");

      setEmail("");
      setPassword("");
    }
  }

  if (details.isLoading) {
    return <h2 className="text-center text-2xl">Loading...</h2>;
  }

  return (
    <form className="mt-20  border-2 mx-4 *:m-0 border-gray-300 border-solid  flex flex-col gap-3  px-12 py-10">
      <h1 className="text-center text-3xl underline  font-bold ">Sign in</h1>
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
        className=" border-gray-300 border-solid outline-none p-2"
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
        className="border-2 p-2 outline-none border-gray-300 border-solid"
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
  );
};

export default Signin;
