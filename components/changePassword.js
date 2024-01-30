import { useRouter } from "next/router";
import Input from "./input";

export default function ChangePassword() {
  const router = useRouter();
  const loginHandler = () => {
    router.push("/dashboard");
  };

  const loginButtonWidth = { width: "300px" };

  return (
    <div className="flex justify-center items-center flex-col w-screen pt-12 md:pt-8">
      <div className="md:border-2 flex flex-col items-center py-8 md:px-4 rounded-lg md:shadow-xl md:shadow-black">
        <div className="h-16 w-screen md:w-full font-semibold text-lg md:text-3xl text-white flex gap-4 justify-center items-center">
          <img className="w-12" src="./images/logo.png" />
          <div className="flex flex-col items-center">
            <div className="font-bold md:font-bold ">Royal Gaming</div>
          </div>
        </div>

        <div className="text-white mt-8 font-bold text-lg border-b-[2px] border-[#00e8a3] px-4">
          Change Password
        </div>
        <Input
          className="mt-4"
          type="password"
          label="Old Password"
          placeholder="Enter your old password"
        />
        <Input
          className="mt-4"
          type="password"
          label="New Password"
          placeholder="Enter your new password"
        />
        <Input
          type="password"
          label="Confirm Password"
          placeholder="Re-enter your new password"
        />
        <Input
          type="email"
          label="Enter your email"
          placeholder="Enter your email"
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
      </div>
    </div>
  );
}
