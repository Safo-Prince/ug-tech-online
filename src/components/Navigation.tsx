import { useNavigate, useLocation } from "react-router-dom";
import { Add, LogoutCurve } from "iconsax-react";
import { headerNavigation } from "../constants/constants";

interface Props {
  setOpen: (arg: boolean) => void;
}

const Navigation: React.FC<Props> = ({ setOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      {location.pathname === "/" && (
        <ul className=" flex sm:flex-row flex-col sm:items-center  sm:gap-x-3 font-lato font-medium sm:text-lg text-sm space-y-3 sm:space-y-0  text-[#f2f2f2 ] border-red-200  ">
          {headerNavigation.map((item, index) => (
            <li key={index}>
              <a
                href={item.href}
                className="text-gray-600 hover:text-gray-400 cursor-pointer "
              >
                {item.name}
              </a>
            </li>
          ))}

          <li>
            <button
              onClick={() => setOpen(true)}
              className="rounded-full py-1.5 px-2 sm:px-3.5 sm:py-2 bg-[#324c6d] hover:bg-[#536c8e] text-white flex items-center justify-center space-x-1 "
            >
              <p>Add your Innovation</p>
              <Add size="20" color="white " className="self-center" />
            </button>
          </li>
        </ul>
      )}

      {location.pathname === "/admin" && (
        <div className="  sm:flex items-center justify-center sm:space-x-3 space-y-3">
          <h1 className="font-lato font-medium text-lg  sm:mt-2 ">
            Administrator
          </h1>
          <button
            onClick={() => navigate("/login")}
            className="rounded-full px-3.5 py-2 bg-[#324c6d] hover:bg-[#536c8e] text-white text-sm flex items-center space-x-2 self-center"
          >
            <span>Log Out</span>
            <LogoutCurve size="12" color="white" />
          </button>
        </div>
      )}
    </>
  );
};

export default Navigation;
