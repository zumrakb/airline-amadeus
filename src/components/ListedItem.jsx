import React from "react";
import { FaPlaneUp } from "react-icons/fa6";

const ListedItem = () => {
  /*  const { today } = new Date(); */
  return (
    <div>
      <div className="flex items-center justify-center bg-white shadow-xl  bg-opacity-50 backdrop-blur-sm w-fit  rounded-lg  m-auto gap-3 mb-10">
        <div className="p-7 flex flex-col gap-12">
          <div>
            <div className="text-left mb-7 text-lg text-gray-800 font-semibold">
              <span>2/4/2025</span> - Departure
            </div>

            <div className="flex gap-[50px]   ">
              <div className="flex flex-col gap-2">
                <span className="text-4xl">10.45</span>
                <span className="text-gray-400">London Stansted STN</span>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex gap-4 items-center justify-center">
                  <hr className="bg-gray-200 h-[1px] w-[200px]" />
                  <div className="">
                    <span className="text-[#f3f870] text-2xl">
                      <FaPlaneUp />
                    </span>
                  </div>
                  <hr className="bg-gray-200 h-[1px] w-[200px]" />
                </div>
                <div className="flex flex-col text-sm text-gray-400">
                  2 h 10 m Direct
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-4xl">13.00</span>
                <span className="text-gray-400">Stocholm HLM</span>
              </div>
            </div>
          </div>
          {/* return */}
          <div>
            <div className="text-left mb-7 text-lg text-gray-800 font-semibold">
              <span>2/8/2025</span> - Return
            </div>

            <div className="flex gap-[50px]   ">
              <div className="flex flex-col gap-2">
                <span className="text-4xl">10.45</span>
                <span className="text-gray-400">India Stansted STN</span>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex gap-4 items-center justify-center">
                  <hr className="bg-gray-200 h-[1px] w-[200px]" />
                  <div className="">
                    <span className="text-[#f3f870] text-2xl">
                      <FaPlaneUp />
                    </span>
                  </div>
                  <hr className="bg-gray-200 h-[1px] w-[200px]" />
                </div>
                <div className="flex flex-col text-sm text-gray-400">
                  2 h 10 m Direct
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-4xl">00.30</span>
                <span className="text-gray-400">Konya KYA</span>
              </div>
            </div>
          </div>
        </div>
        <hr className="h-[300px] border-l border-gray-200 rounded-lg " />
        <div className="flex flex-col w-fit items-center justify-center gap-4 p-7">
          <div className="text-3xl font-semibold">$50</div>
          <button className="border p-3 rounded-lg border-none outline-none bg-[#1dd3c4] text-white hover:bg-[#54e3d7]">
            Select this flight
          </button>
        </div>
      </div>
      <div
        className="flex items-center justify-center bg-white shadow-xl  bg-opacity-50 backdrop-blur-sm w-fit  rounded-lg  m-auto gap-3"
        mb-12
      >
        <div className="p-7 flex flex-col gap-12">
          <div>
            <div className="text-left mb-7 text-lg text-gray-800 font-semibold">
              <span>2/4/2025</span> - Departure
            </div>

            <div className="flex gap-[50px]   ">
              <div className="flex flex-col gap-2">
                <span className="text-4xl">10.45</span>
                <span className="text-gray-400">London Stansted STN</span>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex gap-4 items-center justify-center">
                  <hr className="bg-gray-200 h-[1px] w-[200px]" />
                  <div className="">
                    <span className="text-[#f3f870] text-2xl">
                      <FaPlaneUp />
                    </span>
                  </div>
                  <hr className="bg-gray-200 h-[1px] w-[200px]" />
                </div>
                <div className="flex flex-col text-sm text-gray-400">
                  2 h 10 m Direct
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-4xl">13.00</span>
                <span className="text-gray-400">Stocholm HLM</span>
              </div>
            </div>
          </div>
          {/* return */}
          <div>
            <div className="text-left mb-7 text-lg text-gray-800 font-semibold">
              <span>2/8/2025</span> - Return
            </div>

            <div className="flex gap-[50px]   ">
              <div className="flex flex-col gap-2">
                <span className="text-4xl">10.45</span>
                <span className="text-gray-400">India Stansted STN</span>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex gap-4 items-center justify-center">
                  <hr className="bg-gray-200 h-[1px] w-[200px]" />
                  <div className="">
                    <span className="text-[#f3f870] text-2xl">
                      <FaPlaneUp />
                    </span>
                  </div>
                  <hr className="bg-gray-200 h-[1px] w-[200px]" />
                </div>
                <div className="flex flex-col text-sm text-gray-400">
                  2 h 10 m Direct
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-4xl">00.30</span>
                <span className="text-gray-400">Konya KYA</span>
              </div>
            </div>
          </div>
        </div>
        <hr className="h-[300px] border-l border-gray-200 rounded-lg " />
        <div className="flex flex-col w-fit items-center justify-center gap-4 p-7">
          <div className="text-3xl font-semibold">$50</div>
          <button className="border p-3 rounded-lg border-none outline-none bg-[#1dd3c4] text-white hover:bg-[#54e3d7]">
            Select this flight
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListedItem;
