import { useState } from "react";
import UseAuth from "../context/AuthContext";
import axios from "../api/axios";
import { Button, Checkbox, Input, Link } from "@nextui-org/react";
import { IconContext } from "react-icons";
import { IoLogoFacebook, IoLogoLinkedin, IoLogoTwitter } from "react-icons/io5";

const LoginForm = ({ setModalLogin, onClose }) => {
  const { setUser, csrfToken } = UseAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    
    await csrfToken();
    try {
      const response = await axios.post("/login", { email, password });
      if (response.status === 200) {
        setUser(response.data.data.user);
        onClose();
      }
    } catch (error) {
      if (error.response.status === 422) {
        setErrors(error.response.data.errors);
        console.log(errors);
      } 
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex w-full items-center justify-center gap-x-8">
        <form
          onSubmit={handleLogin}
          className="w-full md:w-1/2 lg:w-[45%] xl:w-[60%] py-6 sm:py-10 px-4 sm:px-8 md:px-6 lg:px-8 xl:px-12 rounded-md flex flex-col items-center justify-center"
        >
          <div className="text-center">
            <h1 className="text-xl font-semibold sm:text-2xl sm:pt-3 mb-3">
              Welcome Back!
            </h1>
            <p className="text-gray-500 mb-6">
              Don&apos;t have an account?{" "}
              <span
                onClick={() => setModalLogin(false)}
                className="cursor-pointer font-semibold text-primary"
              >
                Create Account
              </span>
            </p>
          </div>
          <div className="flex w-full flex-col flex-wrap md:flex-nowrap gap-4 mb-6">
            <Input
              isInvalid={errors.email !== undefined}
              errorMessage={errors.email ? errors.email[0] : ""}
              type="email"
              label="Email"
              radius="sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              isInvalid={errors.password !== undefined}
              errorMessage={errors.password ? errors.password[0] : ""}
              type="password"
              label="Password"
              radius="sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-between w-full mb-6">
            <Checkbox
              classNames={{
                label: "text-small text-gray-500",
              }}
            >
              Remember me
            </Checkbox>
            <Link color="primary" href="#" size="sm">
              Forgot password?
            </Link>
          </div>
          <Button
            isLoading={isLoading}
            type="submit"
            className="w-full bg-primary text-white rounded"
          >
            Sign In
          </Button>
          <div>
            <p className="text-sm text-gray-500 mt-6 text-center mb-4">
              or continue with
            </p>
            <div className="flex gap-2">
              <Link className="cursor-pointer border border-gray-100 rounded-full p-2.5">
                <IconContext.Provider
                  value={{ color: "#7f7f7f", size: "1.25rem" }}
                >
                  <div>
                    <IoLogoFacebook />
                  </div>
                </IconContext.Provider>
              </Link>
              <Link className="cursor-pointer border border-gray-100 rounded-full p-2.5">
                <IconContext.Provider
                  value={{ color: "#7f7f7f", size: "1.25rem" }}
                >
                  <div>
                    <IoLogoTwitter />
                  </div>
                </IconContext.Provider>
              </Link>
              <Link className="cursor-pointer border border-gray-100 rounded-full p-2.5">
                <IconContext.Provider
                  value={{ color: "#7f7f7f", size: "1.25rem" }}
                >
                  <div>
                    <IoLogoLinkedin />
                  </div>
                </IconContext.Provider>
              </Link>
            </div>
          </div>
        </form>
        <img className="w-64" src="../../public/log-in.svg" />
      </div>
    </>
  );
};

export default LoginForm;
