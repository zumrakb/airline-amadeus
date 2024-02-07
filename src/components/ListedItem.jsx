import React, { useState } from "react";
import { FaPlaneUp } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { HashLoader } from "react-spinners";
import { sortOfferFlight } from "../redux/flightSlice";
import { MdOutlineTravelExplore } from "react-icons/md";
import { GiDesert } from "react-icons/gi";

const ListedItem = () => {
  //bringing desired data from flightSlice by using useSelector:
  const flightOffers = useSelector((state) => state.flightOffer.flightOffers);
  const isDataSearched = useSelector(
    (state) => state.flightOffer.isDataSearched
  );
  const isLoading = useSelector((state) => state.flightOffer.loading);
  const dispatch = useDispatch();

  const [option, setOption] = useState("Price");

  //sorting data according to the value which is getting from select tag onChange function.
  const handleOnSortSelect = (e) => {
    setOption(e.target.value);
    dispatch(sortOfferFlight(e.target.value));
    console.log(e.target.value);
  };
  return !isLoading ? (
    <>
      {flightOffers.length !== 0 ? (
        <div className="flex flex-col max-w-[1000px] mx-auto sm:px-8   gap-8">
          <select
            className="bg-white bg-opacity-50 backdrop-blur-sm w-fit p-[15px] rounded-lg cursor-pointer shadow-xl"
            value={option}
            onChange={(e) => handleOnSortSelect(e)}
          >
            <option className="cursor-pointer" value="Price">
              Price
            </option>
            <option className="cursor-pointer" value="Duration">
              Duration
            </option>
            <option className="cursor-pointer" value="Departure Time">
              Departure Time
            </option>
            <option className="cursor-pointer" value="Arrival Time">
              Arrival Time
            </option>
          </select>
          {flightOffers.map((item) => (
            <div className="w-[100%] mb-10 " key={item.id}>
              <div className="flex  bg-white backdrop-blur-md shadow-xl rounded-lg items-center sm:items-start justify-between sm:flex-col">
                <div className="p-12 flex flex-col gap-12 w-3/4 sm:w-full">
                  {item.itineraries.map((it, index) => (
                    <div key={index} className="w-[100%] ">
                      <div className="text-left mb-7 text-lg text-gray-800 font-semibold flex justify-between">
                        <span>{it.mainDepartureDate} - Departure</span>
                        <span>{it.mainArrivalDate} - Arrival</span>
                      </div>

                      <div className="flex gap-[50px] justify-between  mb-10 ">
                        <div className="flex flex-col gap-2">
                          <span className="text-4xl">
                            {it.mainDepartureTime}
                          </span>
                          <div className="text-gray-400">
                            {it.mainDepartureAirportCode}
                          </div>
                        </div>

                        <div className="flex flex-col w-full gap-2">
                          <div className="flex gap-4 items-center justify-center">
                            <hr className="bg-gray-200 h-[1px] w-[100%]" />
                            <div className="">
                              <span className="text-[#f3f870] text-2xl">
                                <FaPlaneUp />
                              </span>
                            </div>
                            <hr className="bg-gray-200 h-[1px] w-[100%]" />
                          </div>
                          <div className="flex flex-col text-sm text-gray-400">
                            <div>Duration: {it.formattedDuration}</div>
                            <div>Stops: {it.numberOfStops}</div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <span className="text-4xl">{it.mainArrivalTime}</span>
                          <div className="text-gray-400">
                            {it.mainArrivalAirportCode}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex p-7 items-center justify-center w-1/4 sm:w-full sm:justify-start">
                  <hr className="h-[300px] sm:h-0 border-l border-gray-200 rounded-lg mr-7" />
                  <div className="flex flex-col  w-fit sm:w-full gap-4 items-center justify-center sm:justify-between sm:flex-row">
                    <div className="text-3xl font-semibold">
                      € {item.price.total}
                    </div>
                    <button className="border p-3 rounded-lg border-none outline-none bg-[#1dd3c4] text-white hover:bg-[#54e3d7]">
                      Select this flight
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : isDataSearched ? (
        //If the data is empty, return here:
        <div className="flex justify-center gap-5 text-4xl font-semibold">
          <GiDesert /> NO DATA FOUND <GiDesert />
        </div>
      ) : (
        //show this, when the page refresfh, before clicking the search button.
        <div className="flex justify-center text-5xl gap-5 text-[#45c4ba] m-10">
          <MdOutlineTravelExplore />
          <div className="animate-pulse bg-gradient-to-r from-pink-400 via-[#45c4ba] to-violet-500 bg-clip-text text-transparent ">
            Take a step for a journey !
          </div>
          <MdOutlineTravelExplore />
        </div>
      )}
    </>
  ) : (
    // show loader untill data is trying to fetch.
    <div className="flex items-center justify-center h-[45vh]">
      <HashLoader color="#45c4ba" size={50} />
    </div>
  );
};
export default ListedItem;
