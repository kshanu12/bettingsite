import DEPLOYED_URL from "@/constants/deploymentURL";
import axios from "axios";
import useAuth from "@/hooks/userAuth";
import UserDetailsModal from "@/components/modals/userDetailsModal";
import { useEffect, useState } from "react";
import Navbar from "@/components/navbar/navbar";
import Table from "@/components/table/table";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [generatedUsername, setGeneratedUsername] = useState("");
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [userData, setUserData] = useState([]);
  const [toggleState, setToggleState] = useState(false);

  const handlerGenerateUser = async () => {
    setIsModalOpen(true);
    var { data } = await axios.post(DEPLOYED_URL + "/user");
    setGeneratedUsername(data.username);
    setGeneratedPassword(data.password);
    setToggleState(!toggleState);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    try {
      async function getUserData() {
        var { data } = await axios.get(DEPLOYED_URL + "/user");
        console.log(data.users);
        setUserData(data.users);
      }
      getUserData();
    } catch (e) {
      console.log(e);
    }
  }, [toggleState]);

  return isAuthenticated ? (
    <div className="min-h-screen bg-[#1f2a37]">
      <Navbar />
      <div className="absolute top-16">
          <Table
            className="mt-16 lg:mt-8 flex justify-center w-screen"
            tableHeading={["Sl. No.", "Username", "Coins"]}
            data={userData}
          />
        <div className="absolute top-4 right-4">
          <div
            className={`border border-black rounded-md w-32 ${
              isModalOpen ? "bg-gray-500" : "bg-green-500"
            } text-white px-2 py-1 font-bold cursor-pointer`}
            onClick={isModalOpen ? null : handlerGenerateUser}
          >
            Generate User
          </div>

          {isModalOpen && (
            <>
              <UserDetailsModal
                onClose={closeModal}
                username={generatedUsername}
                password={generatedPassword}
              />
            </>
          )}
        </div>
      </div>
    </div>
  ) : null;
  // );
}
