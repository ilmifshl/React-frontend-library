import { Navbar, Input } from "@nextui-org/react";
import { IoNotifications } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";



const DashboardNavbar = () => {
  return (
    <Navbar>
      <p className="text-2xl font-bold">Home</p>
      <div className="flex justify-center text-center gap-4 items-center">
        <div className="flex flex-col gap-2">
          <div className="flex w-64 flex-wrap  md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Input
              type="email"
              label="Search"
              className="focus:border-2 focus:border-slate-500"
            />
          </div>
        </div>
        <IoNotifications size= "1.5rem"/>
        <IoMdSettings size= "1.5rem"/>
      </div>
    </Navbar>
  );
};

export default DashboardNavbar;
