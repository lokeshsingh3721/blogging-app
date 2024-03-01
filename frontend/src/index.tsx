import React from "react";

import Navbar from "./components/navbar";
import Card from "./components/card";

const Index = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col gap-2">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default Index;
