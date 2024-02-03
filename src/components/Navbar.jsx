import React from "react";
import { FaPlaneDeparture } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="grid grid-cols-2 justify-between px-8 pt-8">
      <h1 className=" text-[#45c4ba] text-left text-3xl xl:text-4xl font-semibold flex gap-5">
        SkyPlane <FaPlaneDeparture />
      </h1>
      <h3 className=" text-right text-lg xl:text-xl text-[#45c4ba]">? Help</h3>
    </div>
  );
};

export default Navbar;
