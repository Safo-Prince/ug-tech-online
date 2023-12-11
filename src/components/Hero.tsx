import React from "react";
import "../styles/hero.css";
import { QuestionMarkCircleIcon } from "@heroicons/react/20/solid";
import { SearchNormal1 } from "iconsax-react";

const Hero: React.FC = () => {
  return (
    <>
      <div className=" hero-image bg-no-repeat bg-cover    w-full sm:h-80  h-32 flex flex-col items-center justify-end pb-10  space-y-4">
        <h1 className=" font-extrabold sm:font-semibold  text-xl sm:text-2xl lg:text-6xl font-poppins  text-white">
          UG Online Technologies Portal
        </h1>
        <p className="font-lato italic text-white text-lg ">
          Impacting businesses and lives through innovation...
        </p>

        <div className="relative mt-2 rounded-full shadow-sm ">
          <input
            type="text"
            name="account-number"
            id="account-number"
            className="block w-96 rounded-full border-0 py-1.5 pr-10 pl-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-[rgba(255,255,255,0.85)]  "
            placeholder="search..."
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <SearchNormal1
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
