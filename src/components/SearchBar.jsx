import React, { useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { IoMdSearch } from "react-icons/io";
import { DateRangePicker, createStaticRanges } from "react-date-range";
const SearchBar = () => {
  const [isDatePickerShow, setDatePickerShow] = useState(false);
  const [selectedOption, setSelectedOption] = useState("option2");
  const [option, setOption] = useState("Arrival Time");

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  //responsibl when you select the date
  function handleSelect(ranges) {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
    // some condition w
    const s_date = new Date(ranges.selection.startDate);
    const e_date = new Date(ranges.selection.endDate);
    if (selectedOption === "option2" && e_date - s_date !== 0) {
      setDatePickerShow(false);
    }
    if (selectedOption === "option1") {
      setDatePickerShow(false);
    }
  }

  const handleOnClick = () => {
    setDatePickerShow((prev) => !prev);
  };
  return (
    <div className="bg-plane bg-cover h-[500px] m-7 rounded-lg  grid grid-rows-2">
      <div className="text-white flex items-center justify-center text-3xl  xl:text-4xl font-semibold">
        Best deals are waiting for you!
      </div>

      <div className=" flex flex-col mx-auto justify-center gap-3">
        <div className="flex justify-between">
          <div className=" flex gap-3 bg-white bg-opacity-50 backdrop-blur-sm w-fit p-[15px] rounded-lg ">
            <div className="flex gap-1 text-base font-semibold text-black items-center">
              <input
                type="radio"
                id="first"
                value="option1"
                checked={selectedOption === "option1"}
                onChange={handleOptionChange}
              />
              <label htmlFor="first" className="text-gray-500">
                One Way
              </label>
            </div>
            <div className="flex gap-1 text-base font-semibold text-black items-center">
              <input
                type="radio"
                id="second"
                value="option2"
                defaultChecked
                checked={selectedOption === "option2"}
                onChange={handleOptionChange}
              />
              <label htmlFor="second" className="text-gray-500">
                Return
              </label>
            </div>
          </div>
          <select
            className="bg-white bg-opacity-50 backdrop-blur-sm w-fit p-[15px] rounded-lg "
            value={option}
            onChange={(e) => setOption(e.target.value)}
          >
            <option value="Price">Price</option>
            <option value="Duration">Duration</option>
            <option value="Departure Time">Departure Time</option>
            <option value="Arrival Time">Arrival Time</option>
          </select>
        </div>
        <form className=" bg-opacity-50 flex  items-center  bg-white h-[30%] rounded-lg  p-5 w-fit relative">
          <div className="flex-col flex text-left ">
            <label className="text-xs xl:text-sm text-gray-500" htmlFor="from">
              From:
            </label>
            <input
              id="from"
              type="text"
              placeholder="From where..."
              className="outline-none placeholder:text-gray-600 placeholder:text-sm
              bg-transparent"
            />
          </div>

          <hr className="h-[100%]  border-l border-gray-500 mr-2 ml-2 rounded-lg" />
          <div className="flex-col flex text-left ">
            <label className="text-xs xl:text-sm text-gray-500" htmlFor="to">
              To:
            </label>
            <input
              id="to"
              type="text"
              placeholder="To where..."
              className="outline-none placeholder:text-gray-600 placeholder:text-sm bg-transparent"
            />
          </div>
          <hr className="h-[100%]  border-l border-gray-500 mr-2 ml-2 rounded-lg" />
          <div className="flex-col flex text-left ">
            <label className="text-xs xl:text-sm text-gray-500" htmlFor="from">
              Departure:
            </label>
            <input
              id="from"
              type="text"
              placeholder="Departure Date"
              className="outline-none placeholder:text-gray-600 placeholder:text-sm bg-transparent "
              onClick={handleOnClick}
              value={new Date(startDate).toLocaleDateString()}
            />
          </div>

          <hr className="h-[100%]  border-l border-gray-500 mr-2 ml-2 rounded-lg" />
          {selectedOption === "option2" && (
            <>
              <div className="flex-col flex text-left ">
                <label
                  className="text-xs xl:text-sm text-gray-500"
                  htmlFor="to"
                >
                  Return:
                </label>
                <input
                  id="to"
                  type="text"
                  placeholder="Return Date"
                  className="outline-none placeholder:text-gray-600 placeholder:text-sm bg-transparent"
                  onClick={handleOnClick}
                  value={new Date(endDate).toLocaleDateString()}
                />
              </div>
              <hr className="h-[100%]  border-l border-gray-500 mr-2 ml-2 rounded-lg" />
            </>
          )}

          <button className="text-[#45c4ba] font-semibold hover:scale-105 transition-transform">
            <IoMdSearch className="size-10" />
          </button>
          {isDatePickerShow && (
            <div className="flex-col flex text-left absolute top-[75px] right-0 backdrop-blur-none z-30">
              <DateRangePicker
                className="backdrop-blur-none"
                ranges={[selectionRange]}
                onChange={handleSelect}
                staticRanges={createStaticRanges([])}
                inputRanges={[]}
                months={selectedOption === "option2" ? 2 : 1}
                direction="horizontal"
                minDate={new Date()}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
