import Sidenav, { SidenavItem } from "../components/Sidenav";
import { HiHome, HiMiniUserCircle } from "react-icons/hi2";
import { IoIosListBox } from "react-icons/io";
import { RiBook2Fill } from "react-icons/ri";
import { IoLogOut } from "react-icons/io5";
import { Navigate, Outlet } from "react-router-dom";
import UseAuth from "../context/AuthContext";

const AdminLayout = () => {
  const { user } = UseAuth();

  if (!(user && user.role === 2)) {
    return <Navigate to="/" />;
  }

  return (
    <div className="">
      <Sidenav className="grid row-auto gap-2">
        <SidenavItem icon={<HiHome />} text="Home" to="/admin/dashboard" />
        <SidenavItem icon={<HiMiniUserCircle />} text="Profile" to="/admin/profile" />
        <SidenavItem icon={<IoIosListBox />} text="Peminjaman" to="/admin/transactions" />
        <SidenavItem icon={<RiBook2Fill />} text="Buku" to="/admin/book" />
        <SidenavItem icon={<IoLogOut />} text="Logout" to="/" />
      </Sidenav>

      <Outlet />
    </div>
  );
};

export default AdminLayout;


