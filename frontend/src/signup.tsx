import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signupHandler from "./lib/signupHandler";

import "./index.css";

const Signup = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  async function submitHandler(e: React.MouseEvent) {
    e.preventDefault();
    const data = await signupHandler({ name, email, password });

    if (data.success) {
      localStorage.setItem("token", data.token);
      setName("");
      setEmail("");
      setPassword("");
      navigate("/");
    } else {
      alert("invalid input");
      setName("");
      setEmail("");
      setPassword("");
    }
  }
  return (
    <div>
      <form className="mt-40 mx-auto  border-2  flex flex-col gap-2 w-2/6 px-12 py-10">
        <h1 className="text-center text-3xl font-bold ">Sign Up</h1>
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
          className="border-2 p-2"
          value={name}
          placeholder="John Doe"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <label htmlFor="Email">Email</label>
        <input
          type="text"
          className="border-2 p-2"
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
          className="border-2 p-2"
          placeholder="*********"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          onClick={(e) => {
            submitHandler(e);
          }}
          className="p-2 bg-blue-500 rounded-md text-white text-xl "
        >
          submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
