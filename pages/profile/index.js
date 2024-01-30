import ProfileUserDetails from "@/components/profileUserDetails";
import Navbar from "@/components/navbar/navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import DEPLOYED_URL from "@/constants/deploymentURL";
import useAuth from "@/hooks/userAuth";
import { useToken } from "@/hooks/tokenContext.js";
import TransactionTable from "@/components/table/transactionTable";

function Profile() {
  const [timer, setTimer] = useState(0);
  const { isAuthenticated } = useAuth();
  const { token, tokenExpiry, isAdmin } = useToken();
  const [email, setEmail] = useState("");
  const [coins, setCoins] = useState("");
  const [username, setUsername] = useState("");
  const [userTransactions, setUserTrasactions] = useState([]);
  const [toggleState, setToggleState] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      setTimer(60 - date.getSeconds());
    }, 1000);
    return () => clearInterval(interval);
  }, [setTimer]);

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    try {
      const getUserDetails = async () => {
        const { data } = await axios.get(
          DEPLOYED_URL + "/user/profile/getDetails",
          { headers }
        );
        console.log(data);
        setEmail(data.email);
        setCoins(data.coins);
        setUsername(data.username);
        const res = await axios.get(
          DEPLOYED_URL + "/transaction/user/getTransaction",
          { headers }
        );
        console.log(res.data.userTransactions);
        setUserTrasactions(res.data.userTransactions);
      };
      getUserDetails();
    } catch (e) {
      console.log("ERROR", e);
    }
  }, [toggleState]);

  return isAuthenticated ? (
    <div className="min-h-screen bg-[#1f2a37] flex flex-col">
      <Navbar timer={timer} setTimer={setTimer} />
      <div className="mt-24 md:px-12 md:flex">
        <div className="w-full md:w-1/3">
          <ProfileUserDetails username={username} email={email} coins={coins} setToggleState={setToggleState} toggleState={toggleState} />
        </div>

        <TransactionTable
          className="flex justify-center w-screen"
          tableHeading={["Time", "Coins", "Status"]}
          data={userTransactions}
          isAdmin={false}
        />
      </div>
    </div>
  ) : null;
}

export default Profile;
