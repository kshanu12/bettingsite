import { useState } from "react";
import TransactionModal from "./modals/transactionModal";
import DEPLOYED_URL from "@/constants/deploymentURL";
import axios from "axios";
import { useToken } from "@/hooks/tokenContext.js";
import { useRouter } from "next/router";

function ProfileUserDetails(props) {
  const router=useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState("");
  const [addCoins, setAddCoins] = useState(0);
  const { token, tokenExpiry, isAdmin } = useToken();

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const handleTransactionSubmit = async () => {
    console.log(DEPLOYED_URL + "/transaction/user/addTransaction");
    let totalCoins = transactionType === "Withdraw" ? props.coins - addCoins:props.coins;
    const res = await axios.post(
      DEPLOYED_URL + "/transaction/user/addTransaction",
      {
        coins: addCoins,
        transactionType,
        totalCoins: totalCoins,
      },
      { headers }
    );
    console.log(res);
    props.setToggleState(!props.toggleState);
    setIsModalOpen(false);
  };

  const handleTransactionModal = (transactionType) => {
    setIsModalOpen(true);
    setTransactionType(transactionType);
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiry");
    router.push("/")
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex justify-center px-4 pb-4">
        <div className="bg-gradient-to-br from-[#223851] to-[#172733] rounded-md flex items-center flex-col p-4 text-center shadow-xl w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-24 h-24"
          >
            <path
              fill-rule="evenodd"
              d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              clip-rule="evenodd"
            />
          </svg>
          <div>
            <span className="font-semibold text-white">Username: </span>
            <span className="text-[#9ca3af]">{props.username}</span>
          </div>
          <div className="w-full">
            <span className="font-semibold text-white">Email: </span>
            <span className="text-[#9ca3af] break-words whitespace-pre-wrap overflow-auto">
              {props.email ? props.email : "NA"}
            </span>
          </div>
          <div className="mt-4 flex items-center gap-2 bg-[#091117] py-1 px-3 rounded-md text-[#e6e9ec] md:text-xl font-semibold">
            <p>₹{props.coins ? props.coins : 0}</p>
            <img className="h-5 w-5" src="./images/rupee.png" />
          </div>
          <div className="flex gap-4 mt-4">
            <div
              className="bg-yellow-600 cursor-pointer rounded p-1 px-4 font-semibold"
              onClick={() => {
                handleTransactionModal("Withdraw");
              }}
            >
              Withdraw
            </div>
            {/* <div
              className="bg-green-500 cursor-pointer rounded p-1 px-4 font-semibold"
              onClick={() => {
                handleTransactionModal("Deposit");
              }}
            >
              Deposit
            </div> */}
          </div>
          <div
            className="md:w-full bg-red-700 px-8 py-2 rounded text-black text-lg font-bold cursor-pointer mt-6 text-center hover:text-white hover:bg-[#09c687]"
            onClick={logoutHandler}
          >
            Logout
          </div>
        </div>
      </div>

      {isModalOpen && (
        <>
          <TransactionModal
            onClose={closeModal}
            transactionType={transactionType}
            setTransactionCoins={setAddCoins}
            handleTransactionSubmit={handleTransactionSubmit}
            userCoins={props.coins}
          />
        </>
      )}
    </>
  );
}

export default ProfileUserDetails;
