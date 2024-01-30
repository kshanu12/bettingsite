import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TransactionModal from "@/components/modals/transactionModal";
import DEPLOYED_URL from "@/constants/deploymentURL";
import axios from "axios";
import Navbar from "@/components/navbar/navbar";
import TransactionTable from "@/components/table/transactionTable";

function UserDetails() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addCoins, setAddCoins] = useState(0);
  const [email, setEmail] = useState("");
  const [coins, setCoins] = useState("");
  const [toggleState, setToggleState] = useState(false);
  const [userTransactions, setUserTrasactions] = useState([]);

  const router = useRouter();
  const username = router.query.username;
  useEffect(() => {
    const getUserDetails = async () => {
      const { data } = await axios.get(DEPLOYED_URL + "/user/" + username);
      setEmail(data.data.email);
      setCoins(data.data.coins);
      const res = await axios.get(DEPLOYED_URL + "/transaction/" + username, {
        params: {
          username: username,
        },
      });
      console.log(res.data.userTransactions);
      setUserTrasactions(res.data.userTransactions);
    };
    if (username) getUserDetails();
    console.log(username);
  }, [username, toggleState]);

  const handleTransactionModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleTransactionSubmit = async () => {
    console.log(DEPLOYED_URL + "/transaction");
    const res = await axios.post(DEPLOYED_URL + "/transaction", {
      coins: addCoins,
      transactionType: "Deposit",
      username: username,
      totalCoins: coins + addCoins,
    });
    console.log(res);
    setIsModalOpen(false);
    setToggleState(!toggleState);
  };

  return (
    <>
      <div className="min-h-screen bg-[#1f2a37] flex flex-col">
        <Navbar />
        <div className="mt-24 md:px-12 md:flex">
          <div className="w-full md:w-1/3">
            <div className="flex justify-center px-4 pb-4">
              <div className=" bg-gradient-to-br from-[#223851] to-[#172733] rounded-md flex items-center flex-col p-4 text-center shadow-xl w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-24 h-24"
                >
                  <path
                    fillRule="evenodd"
                    d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <span className="font-semibold text-white">Username: </span>
                  <span className="text-[#9ca3af]">{username}</span>
                </div>
                <div className="w-full">
                  <span className="font-semibold text-white">Email: </span>
                  <span className="text-[#9ca3af] break-words whitespace-pre-wrap overflow-auto">
                    {email ? email : "NA"}
                  </span>
                </div>
                <div className="mt-4 flex items-center gap-2 bg-[#091117] py-1 px-3 rounded-md text-[#e6e9ec] md:text-xl font-semibold">
                  <p>₹{coins ? coins : 0}</p>
                  <img className="h-5 w-5" src="/images/rupee.png" />
                </div>
                <div
                  className="bg-green-500 cursor-pointer rounded p-1 px-4 font-semibold mt-2"
                  onClick={handleTransactionModal}
                >
                  Add Coins
                </div>
              </div>
            </div>
          </div>
          <TransactionTable
            className="flex justify-center w-screen"
            tableHeading={["Time", "Coins", "Status"]}
            data={userTransactions}
            username={username}
            coins={coins}
            toggleState={toggleState}
            setToggleState={setToggleState}
            isAdmin={true}
          />
        </div>
      </div>
      {isModalOpen && (
        <>
          <TransactionModal
            onClose={closeModal}
            transactionType="Add Coins"
            setTransactionCoins={setAddCoins}
            handleTransactionSubmit={handleTransactionSubmit}
          />
        </>
      )}
    </>
  );
}

export default UserDetails;
