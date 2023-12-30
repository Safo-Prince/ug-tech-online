import * as React from "react";
import { SearchNormal1 } from "iconsax-react";
import { useLocation } from "react-router-dom";
import "../styles/hero.css";

interface Props {
  title: string;
  techId?: string;
}

const Hero: React.FC<Props> = ({ title, techId }) => {
  const { pathname } = useLocation();
  return (
    <>
      <div
        className={` hero-image bg-no-repeat bg-cover  w-full sm:h-80  h-32 flex flex-col items-center justify-end  sm:space-y-3 space-y-1
        ${pathname !== "/" ? "justify-center " : " sm:pb-10  pb-3"}
        `}
      >
        <h1 className=" font-extrabold sm:font-semibold  text-base sm:text-2xl md:text-3xl lg:text-5xl font-poppins  text-white">
          {title}
        </h1>

        {pathname === "/project-details" && (
          <p className=" text-white">
            <span>Tech ID:</span>
            <span className="font-extralight">{techId}</span>
          </p>
        )}
        {pathname === "/" && (
          <div className="space-y-3 flex flex-col justify-center">
            <p className="font-lato italic text-white sm:text-lg  text-xs">
              Impacting businesses and lives through innovation...
            </p>
            <div className="relative sm:mt-2  mt-1 rounded-full shadow-sm  sm:w-96 w-44  self-center">
              <input
                type="text"
                name="account-number"
                id="account-number"
                className="block  w-full rounded-full border-0 sm:py-1.5 py-1 pr-10 pl-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-[rgba(255,255,255,0.85)] text-xs  "
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
        )}
      </div>
    </>
  );
};

export default Hero;
