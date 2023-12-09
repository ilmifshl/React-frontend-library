import { Button } from "@nextui-org/react";
import Header from "../components/Header";
import { IoIosArrowForward } from "react-icons/io";
import UseAuth from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const Home = () => {
  const { user } = UseAuth();

  if (!user) {
    // If there is no user, show the content of the home page.
    return (
      <>
        <Header />
        <div className="flex px-4 pt-10 space-x-7 items-center ml-12">
          <div className="w-4/6">
            <p className="text-xl font-bold leading-snug tracking-tight text-gray-800 lg:text-3xl lg:leading-tight xl:text-5xl xl:leading-tight dark:text-white">
              Selamat datang di ReadScape!
            </p>
            <p className="py-5 text-sm leading-normal text-gray-500 lg:text-xl xl:text-xl dark:text-gray-300">
              Temukan ribuan buku, pinjam dengan mudah, dan jadilah bagian dari
              komunitas kami. Daftar sekarang untuk akses cepat ke dunia literasi.
              Mari bersama-sama mengejar petualangan membaca!
            </p>
            <Button
              radius="lg"
              color="primary"
              className="font-semibold text-white text-md flex items-center justify-center"
            >
              Lihat Buku <IoIosArrowForward className="pt-0.5" size="1.25rem" />
            </Button>
          </div>
          <div>
            <img
              className="w-11/12 h-11/12 pb-4"
              src="../public/illustration.svg"
              alt=""
            />
          </div>
        </div>
      </>
    );
  }

  // If there is a user, redirect based on the user's role.
  if (user.role === 1) {
    return <Navigate to="/user/dashboard" />;
  } else if (user.role === 2) {
    return <Navigate to="/admin/dashboard" />;
  }

  // For any other case, you might want to handle it accordingly.
  // For example, redirect to a default page or show an error message.

  return <Navigate to="/" />; // You can modify this based on your requirements.
};

export default Home;

