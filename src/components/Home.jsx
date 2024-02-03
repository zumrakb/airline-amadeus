import React from "react";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import ListedItem from "./ListedItem";

const Home = () => {
  return (
    <div className="bg-[#fffcfa] ">
      <Navbar />
      <SearchBar />
      <ListedItem />
    </div>
  );
};

export default Home;
