import React, { useState } from "react";
import axios from "axios";
import { GiCommercialAirplane } from "react-icons/gi";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { IoMdSearch } from "react-icons/io";
import { DateRangePicker, createStaticRanges } from "react-date-range";
import { getOAuthToken } from "../helper";
import ListedItem from "./ListedItem";
import { setOfferFlight, setLoading } from "../redux/flightSlice";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import bgVideo from "../video.mp4";

const SearchBar = () => {
  //IATA CODES of the selected "from" and "to" city airports.
  const [selectedFromAirport, setselectedFromAirport] = useState("");
  const [selectedToAirport, setselectedToAirport] = useState("");

  //array of the results returned for "from" and "to" airports
  const [fromAirport, setfromAirport] = useState([]);
  const [toAirport, settoAirport] = useState([]);

  const [fromSuggestionsLoading, setFromSuggestionsLoading] = useState(false);
  const [toSuggestionsLoading, setToSuggestionLoading] = useState(false);

  //getting the name of airports:
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");

  //this is for radio button. using for selecting one-way or return trip.
  const [selectedOption, setSelectedOption] = useState("option2");

  //departure and end dates which gets data when you select them in Datepicker.
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  //showing or hiding Datepicker
  const [isDatePickerShow, setDatePickerShow] = useState(false);

  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.flightOffer.loading);

  const callAPI = async (resource) => {
    const BASE_URL = "https://test.api.amadeus.com/v1/";
    const token = await getOAuthToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/vnd.amadeus+json",
      },
    };

    const { data } = await axios.get(`${BASE_URL}/${resource}`, config);

    return data;
  };

  const listedItemApi = async (resource) => {
    const BASE_URL = "https://test.api.amadeus.com/v2/";
    const token = await getOAuthToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/vnd.amadeus+json",
      },
    };

    const { data } = await axios.get(`${BASE_URL}/${resource}`, config);

    return data;
  };

  //get the data for origin airport. it checks if trip is oneway or return. according to the result, calls the api and bring the data needed:
  const getOriginAirport = async (startDate, endDate = "") => {
    const url =
      selectedOption === "option1"
        ? `shopping/flight-offers?originLocationCode=${selectedFromAirport}&destinationLocationCode=${selectedToAirport}&departureDate=${startDate}&adults=1&nonStop=false&max=10`
        : `shopping/flight-offers?originLocationCode=${selectedFromAirport}&destinationLocationCode=${selectedToAirport}&departureDate=${startDate}&returnDate=${endDate}&adults=1&nonStop=false&max=10`;

    try {
      const response = await listedItemApi(url);
      console.log(response.data);

      dispatch(setOfferFlight(response.data));
    } catch (error) {
      console.log("error", error);
    }
  };

  //after clicking on search button this will work. untill data receive, there will be loading animation for the button  and loading animation on the screen below search bar.
  const handleOnSearch = async (e) => {
    e.preventDefault();

    dispatch(setLoading(true));

    //getting start date and end date. later converting them to necessary format:

    const start_date = new Date(startDate);
    const formatted_Date = start_date.toLocaleDateString("en-GB");
    const newStartDate = formatted_Date.split("/").reverse().join("-");

    const end_date = new Date(endDate);
    const formattedDate = end_date.toLocaleDateString("en-GB");
    const newEndDate = formattedDate.split("/").reverse().join("-");

    try {
      if (selectedOption === "option1") await getOriginAirport(newStartDate);
      else await getOriginAirport(newStartDate, newEndDate); //send arguments which getOriginAirport can take. so that it will call the function with the dates you choose.

      dispatch(setLoading(false));
    } catch (error) {
      console.log("error", error);
      dispatch(setLoading(false));
    }
  };

  //data "from" airport:
  const getFromAirport = (query) => {
    // if query is empty, set from airport as empty array.
    if (query.trim() === "") {
      setfromAirport([]);
      return;
    }
    //here, make make the loading true. untill api fetch the data.
    setFromSuggestionsLoading(true);
    callAPI(
      `reference-data/locations?subType=AIRPORT&keyword=${query}&page%5Blimit%5D=10&page%5Boffset%5D=0&sort=analytics.travelers.score&view=FULL`
    )
      .then((response) => {
        setFromSuggestionsLoading(false); //loading is false. api call is done.
        setfromAirport(response.data);
      })
      .catch((err) => {
        setFromSuggestionsLoading(false); //in case getting any error,  stop loading.
        console.log("error");
      });
  };

  //data "to" airport:
  const getToAirport = (query) => {
    if (query.trim() === "") {
      settoAirport([]); //check if the query is empty or not.
      return;
    }
    setToSuggestionLoading(true); //if query is not empty, load the page. untill api brings the data.
    callAPI(`reference-data/locations?subType=AIRPORT&keyword=${query}&page%5Blimit%5D=10&page%5Boffset%5D=0&sort=analytics.travelers.score&view=FULL
`)
      .then((response) => {
        setToSuggestionLoading(false); //set loading false when you get the data.
        settoAirport(response.data);
      })
      .catch((err) => {
        setToSuggestionLoading(false); //set loading false if there is an error.
        console.log("error");
      });
  };

  /** Autocomplete for from city input it will trigger whenever we type in from city input */
  const handleOnFromCity = (e) => {
    setFromCity(e.target.value);
    getFromAirport(e.target.value);
  };

  /** Autocomplete for 'to city' input it will trigger whenever we type in 'to city' input */
  const handleOnToCity = (e) => {
    setToCity(e.target.value);
    getToAirport(e.target.value);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setEndDate(startDate);
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  //responsibl when you select the date.
  function handleSelect(ranges) {
    setStartDate(ranges.selection.startDate);

    setEndDate(ranges.selection.endDate);

    const s_date = new Date(ranges.selection.startDate);
    const e_date = new Date(ranges.selection.endDate);
    if (selectedOption === "option2" && e_date - s_date !== 0) {
      setDatePickerShow(false);
    }
    if (selectedOption === "option1") {
      setDatePickerShow(false);
    }
  }

  //getting selected departure option:
  const handleOnOptionSelectFrom = (airport) => {
    setfromAirport([]); //when you select the airport you need from the suggestions, then make fromairport empty array. so that it will disappear from the screen.
    setselectedFromAirport(airport.iataCode); //assign the iatacode value to the selectedFromAirport.
    setFromCity(airport.name);
  };

  //getting selected arrival option:
  const handleOnOptionSelectTo = (airport) => {
    settoAirport([]);
    setselectedToAirport(airport.iataCode);
    setToCity(airport.name);
  };

  const handleOnClick = () => {
    setDatePickerShow((prev) => !prev);
  };

  return (
    <div className="">
      <div className="relative bg-transparent bg-cover h-[500px] sm:h-fit sm:p-3 m-7 rounded-lg  grid grid-rows-2 ">
        <video
          muted
          autoPlay
          loop
          className="w-full h-full absolute object-cover z-[0] rounded-xl"
          src={bgVideo}
        ></video>
        <div className="text-white flex items-center justify-center text-3xl  xl:text-4xl font-semibold xl:items-center xl:justify-center xl:text-center text-center sm:text-center  z-50">
          Best deals are waiting for you!
        </div>

        <div className=" flex flex-col mx-auto   justify-center gap-3 sm:w-full ">
          <div className="flex justify-between">
            <div className=" flex gap-3 p-3 bg-white bg-opacity-50 backdrop-blur-sm w-fit xl:p-[15px]   rounded-lg ">
              <div className="flex gap-1 text-base font-semibold text-black items-center ">
                <input
                  className="cursor-pointer"
                  type="radio"
                  id="first"
                  value="option1"
                  checked={selectedOption === "option1"}
                  onChange={handleOptionChange}
                />
                <label htmlFor="first" className="text-gray-500 cursor-pointer">
                  One Way
                </label>
              </div>
              <div className="flex gap-1 text-base font-semibold text-black items-center">
                <input
                  className="cursor-pointer"
                  type="radio"
                  id="second"
                  value="option2"
                  defaultChecked
                  checked={selectedOption === "option2"}
                  onChange={handleOptionChange}
                />
                <label
                  htmlFor="second"
                  className="text-gray-500 cursor-pointer"
                >
                  Return
                </label>
              </div>
            </div>
          </div>
          <form
            autoComplete="off"
            className="  bg-opacity-50 flex  items-center   bg-white h-[30%]  sm:flex-col sm:items-start sm:gap-3 rounded-lg  p-5   relative sm:h-fit"
          >
            <div className="flex-col    flex text-left   ">
              <label
                className="text-xs xl:text-sm text-gray-500"
                htmlFor="from"
              >
                From:
              </label>
              <input
                id="from"
                type="text"
                value={fromCity}
                placeholder="From where..."
                className="outline-none placeholder:text-gray-600 placeholder:text-sm
              bg-transparent cursor-pointer"
                onChange={handleOnFromCity}
                onClick={() => {
                  settoAirport([]);
                  setfromAirport([]);
                }}
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
                value={toCity}
                placeholder="To where..."
                className="outline-none placeholder:text-gray-600 placeholder:text-sm bg-transparent"
                onChange={handleOnToCity}
                onClick={() => {
                  settoAirport([]);
                  setfromAirport([]);
                }}
              />
            </div>
            <hr className="h-[100%]  border-l border-gray-500 mr-2 ml-2 rounded-lg" />
            <div className="flex-col flex text-left ">
              <label
                className="text-xs xl:text-sm text-gray-500"
                htmlFor="from"
              >
                Departure:
              </label>
              <input
                id="from"
                type="text"
                placeholder="Departure Date"
                className="outline-none placeholder:text-gray-600 placeholder:text-sm bg-transparent "
                onClick={handleOnClick}
                readOnly={true}
                value={new Date(startDate).toLocaleDateString()}
              />
            </div>

            <hr className="h-[100%]  border-l border-gray-500 mr-2 ml-2 rounded-lg" />
            {selectedOption === "option2" && (
              <>
                <div className="flex-col flex text-left  ">
                  <label
                    className="text-xs xl:text-sm text-gray-500 "
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
                    readOnly={true}
                    value={new Date(endDate).toLocaleDateString()}
                  />
                </div>
                <hr className="h-[100%]  border-l border-gray-500 mr-2 ml-2 rounded-lg" />
              </>
            )}

            {isLoading ? (
              <button
                disabled={true}
                className="text-[#45c4ba] font-semibold sm:text-white sm:bg-[#45c4ba] sm:w-full sm:rounded-lg flex sm:justify-center sm:py-2"
              >
                <ClipLoader color="white" size={35} />
              </button>
            ) : (
              <button
                onClick={handleOnSearch}
                className="text-[#45c4ba] font-semibold hover:scale-105 transition-transform sm:text-white sm:bg-[#45c4ba] sm:w-full sm:rounded-lg flex sm:justify-center sm:py-1"
              >
                <IoMdSearch className="size-10" />
              </button>
            )}

            {isDatePickerShow && (
              <div className="flex-col flex text-left absolute top-[75px] sm:top-[290px] sm:left-0 right-0 backdrop-blur-none z-30">
                <DateRangePicker
                  className="backdrop-blur-none cursor-pointer"
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

            {!fromSuggestionsLoading ? (
              <>
                {fromAirport.length !== 0 && (
                  <>
                    <div className="absolute top-[75px] z-40 left-1 rounded-lg bg-white bg-opacity-50 backdrop-blur-sm flex flex-col   w-[400px] pt-3 pb-3  pl-3 shadow-xl gap-3 ">
                      {fromAirport.map((airport) => (
                        <div
                          key={airport.id}
                          onClick={() => handleOnOptionSelectFrom(airport)}
                          className="flex items-center gap-4 ml-2 cursor-pointer"
                        >
                          <GiCommercialAirplane />
                          <div className="flex flex-col text-left">
                            <div className="font-semibold ">
                              {airport.name} ( {airport.address.cityCode} )
                            </div>
                            <div>{airport.address.countryName}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="absolute top-[75px] z-40 left-1 rounded-lg bg-white bg-opacity-50 backdrop-blur-sm flex flex-col items-center  w-[400px] pt-3 pb-3  pl-3 shadow-xl gap-3 ">
                <ClipLoader color="#45c4ba" size={35} />
              </div>
            )}

            {!toSuggestionsLoading ? (
              <>
                {toAirport.length !== 0 && (
                  <>
                    <div className="absolute top-[75px] z-40 left-[200px] sm:left-1 sm:top-[150px] rounded-lg bg-white bg-opacity-50 backdrop-blur-sm flex flex-col   w-[400px] pt-3 pb-3  pl-3 shadow-xl gap-3  cursor-pointer">
                      {toAirport.map((airport) => (
                        <div
                          onClick={() => handleOnOptionSelectTo(airport)}
                          className="flex items-center gap-4 ml-2 "
                        >
                          <GiCommercialAirplane />
                          <div className="flex flex-col text-left ">
                            <div className="font-semibold ">
                              {airport.name} ( {airport.address.cityCode} )
                            </div>
                            <div className="">
                              {airport.address.countryName}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="absolute top-[75px] z-40 left-[200px] sm:left-1 sm:top-[150px] rounded-lg bg-white bg-opacity-50 backdrop-blur-sm flex flex-col items-center  w-[400px] pt-3 pb-3  pl-3 shadow-xl gap-3  cursor-pointer">
                <ClipLoader color="#45c4ba" size={35} />
              </div>
            )}
          </form>
        </div>
      </div>
      <ListedItem className="m-auto" />
    </div>
  );
};

export default SearchBar;
