import React, { ReactNode } from "react";
import { useRecoilValue } from "recoil";

import { Link } from "react-router-dom";
import { loadingAtom } from "../store/loadingAtom";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const userDetails = useRecoilValue(loadingAtom);

  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <div>
        <h1 className="text-center text-2xl">Unauthorized access...</h1>
        <Link to="/signin">
          {" "}
          <h2 className="text-blue-500 font-medium underline text-center ">
            {" "}
            Sign in....
          </h2>{" "}
        </Link>{" "}
      </div>
    );
  }

  if (userDetails.isLoading) {
    return <h1 className="text-center text-2xl">Loading...</h1>;
  }

  return <div>{children}</div>;
};

export default ProtectedRoute;
