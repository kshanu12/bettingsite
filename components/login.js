import { useRouter } from "next/router";
import Input from "./input";
import axios from "axios";
import DEPLOYED_URL from "@/constants/deploymentURL";
import { useEffect, useState } from "react";
import { useToken } from "@/hooks/tokenContext";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setTokenInfo } = useToken();
  const [credentialsInfo, setCredentialsInfo] = useState(true);
  let { token, tokenExpiry, isAdmin } = useToken();

  const loginHandler = async () => {
    try {
      const response = await axios.post(DEPLOYED_URL + "/user/login", {
        username,
        password,
      });
      const data = response.data;
      setTokenInfo(data.token, data.tokenExpiry, data.isAdmin);

      if (data.isAdmin) {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } catch (e) {
      setCredentialsInfo(false);
      console.error("Login Failed", e);
    }
  };

  useEffect(() => {
    token = localStorage.getItem("token");
    tokenExpiry = localStorage.getItem("tokenExpiry");
  }, []);

  useEffect(() => {
    const redirectToDashboard = async () => {
      console.log("inside redirectToDashboard");
      if (token && tokenExpiry && tokenExpiry > new Date().getTime()) {
        if (isAdmin) {
          router.push("/admin");
        } else {
          router.push("dashboard");
        }
      }
    };
    redirectToDashboard();
  }, [token, tokenExpiry, isAdmin]);

  const loginButtonWidth = { width: "300px" };

  return (
    <div className="flex justify-center items-center flex-col w-screen pt-12 md:pt-20">
      <div className="md:border-2 flex flex-col items-center py-8 md:px-4 rounded-lg md:shadow-xl md:shadow-black">
        <div className="h-16 w-screen md:w-full font-semibold text-lg md:text-3xl text-white flex gap-4 justify-center items-center">
          <img className="w-12" src="./images/logo.png" />
          <div className="flex flex-col items-center">
            <div className="font-bold md:font-bold ">Royal Gaming</div>
          </div>
        </div>

        <div className="text-white mt-8 font-bold text-lg border-b-[2px] border-[#00e8a3] px-4">
          Sign Up
        </div>
        <Input
          setText={setUsername}
          className="mt-4"
          type="text"
          label="Username"
          placeholder="Enter your username"
        />
        <Input
          setText={setPassword}
          type="password"
          label="Password"
          placeholder="Enter your password"
        />
        <div
          className="bg-[#00e8a3] px-2 py-2 rounded text-[#081620] text-lg font-bold cursor-pointer mt-6 text-center hover:text-white hover:bg-[#09c687]"
          onClick={loginHandler}
          style={loginButtonWidth}
        >
          Login
        </div>
        <div className="text-white text-xs mt-8">Forgot password?</div>
        <div className="font-semibold text-white underline cursor-pointer hover:text-[#00e8a3]">
          Click here to reset
        </div>
        {credentialsInfo ? (
          <></>
        ) : (
          <div className="text-red-600 mt-4">*Wrong Crenditials</div>
        )}
      </div>
    </div>
  );
}
