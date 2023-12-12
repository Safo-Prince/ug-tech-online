import React from "react";
import "../styles/hero.css";
import { QuestionMarkCircleIcon } from "@heroicons/react/20/solid";
import { SearchNormal1 } from "iconsax-react";

const Hero: React.FC = () => {
  return (
    <>
      <div className=" hero-image bg-no-repeat bg-cover    w-full sm:h-80  h-32 flex flex-col items-center justify-end sm:pb-10  pb-3 sm:space-y-4 space-y-1">
        <h1 className=" font-extrabold sm:font-semibold  text-base sm:text-2xl lg:text-6xl font-poppins  text-white">
          UG Online Technologies Portal
        </h1>
        <p className="font-lato italic text-white sm:text-lg  text-xs">
          Impacting businesses and lives through innovation...
        </p>

        <div className="relative sm:mt-2  mt-1 rounded-full shadow-sm ">
          <input
            type="text"
            name="account-number"
            id="account-number"
            className="block sm:w-96 w-44 rounded-full border-0 sm:py-1.5 py-1 pr-10 pl-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-[rgba(255,255,255,0.85)] text-xs  "
            placeholder="search..."
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <SearchNormal1
              className="sm:h-5 sm:w-5 h-3 w-3  text-gray-400"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
