import * as React from "react";
import { useState } from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import MobileMenu from "./MobileMenu";
import { HambergerMenu } from "iconsax-react";

interface Props {
  setOpen: (arg: boolean) => void;
}

const Header: React.FC<Props> = ({ setOpen }) => {
  const [mobOIsPen, setMobIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className=" w-full bg-[#153D6D] flex items-center sm:p-3 p-1 pl-2  font-lato ">
        <h1 className="text-[#E0E0E0] left-10 text-xs">
          Innovation & Technology Portal
        </h1>
      </div>
      <div className="border-b py-5 sm:py-10">
        <div className="w-full  mx-auto max-w-7xl  px-6 lg:px-8 flex  items-center  justify-between  ">
          <img
            src={logo}
            className=" cursor-pointer sm:w-44 w-28 self-center"
            onClick={() => navigate("/")}
          />

          <div className="hidden sm:block">
            <Navigation setMobIsOpen={setMobIsOpen} setOpen={setOpen} />
          </div>

          <HambergerMenu
            className="cursor-pointer sm:hidden"
            onClick={() => setMobIsOpen(true)}
            size="25"
            color="black"
          />
          <MobileMenu
            onOpen={setMobIsOpen}
            open={mobOIsPen}
            setOpen={setOpen}
          />
        </div>
      </div>
    </>
  );
};

export default Header;
