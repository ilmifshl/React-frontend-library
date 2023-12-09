import { IconContext } from "react-icons";

const DashboardCard = ({ icon, title, value }) => {
  return (
    <div className="bg-white border shadow-md px-6 pt-4 pb-2 rounded-md">
      <div className="flex justify-between items-center text-center">
        <IconContext.Provider value={{ size: "2rem" }}>
          {icon}
        </IconContext.Provider>
        <div className="ml-2 flex flex-col justify-end text-end">
          <div className="font-bold">{title}</div>
          <div className="text-xl">{value}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
