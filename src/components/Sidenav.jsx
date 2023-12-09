import { Button } from "@nextui-org/react";
import { IconContext } from "react-icons";
import { Link, useLocation } from "react-router-dom";

const Sidenav = ({ children }) => {
  return (
    <aside className="bg-white shadow-md -translate-x-80 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh - 32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-md border-blue-gray-200">
      <div>
        <a href="/" className="py-6 px-8 text-center">
          <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900">
            ReadScape
          </h6>
        </a>
      </div>
      <div className="m-4 grid row-auto gap-4">{children}</div>
    </aside>
  );
};

const SidenavItem = ({ icon, text, to }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to} className="">
      <Button
        className={`${
          isActive
            ? "bg-gradient-to-tr from-sky-950 to-blue-950 text-white"
            : "bg-white text-black"
        } align-middle select-none font-sans font-bold text-center transition-all duration-300	 disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-7 rounded-lg  shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] w-full flex items-center justify-start gap-4 px-4 capitalize`}
        type="button"
      >
        <IconContext.Provider
          value={{ color: `${isActive ? "white" : "black"}`, size: "1.75rem" }}
        >
          <p className={`${isActive ? "text-white" : "text-black"}`}>{icon}</p>
        </IconContext.Provider>
        <p
          className={`${
            isActive ? "text-white" : "text-black"
          } block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize`}
        >
          {text}
        </p>
      </Button>
    </Link>
  );
};

export default Sidenav;
export { SidenavItem };
