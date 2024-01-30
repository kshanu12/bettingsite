import React, { useState, useEffect } from "react";
import Card from "./card";
import cardDet from "@/constants/cardDet.json";
import Modal from "../modals/bettingModal";
import styles from "./cards.module.css";
import { io } from "socket.io-client";
import DEPLOYED_URL from "@/constants/deploymentURL";
import { useToken } from "@/hooks/tokenContext";
import { useRouter } from "next/router";
import axios from "axios";
import WinningModal from "../modals/winningModal";

function Cards(props) {
  const [userOnline, setUserOnline] = useState(0);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [highlighting, setHighlighting] = useState(false);
  const [lastHighlightedIndex, setLastHighlightedIndex] = useState(-1);
  const [stopIndex, setStopIndex] = useState(6);
  const [randomRotations, setRandomRotaions] = useState(
    Math.floor(Math.random() * (3 - 2 + 1) + 2)
  );
  const [currentRotations, setCurrentRotations] = useState(0);
  const [cardBets, setCardBets] = useState(
    Array(cardDet.length).fill({ userBet: 0, totalBet: 0 })
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWinningModalOpen, setIsWinningModalOpen] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [modalIcon, setModalIcon] = useState("");
  const [socket, setSocket] = useState(undefined);
  let { token, tokenExpiry } = useToken();
  const router = useRouter();
  const [coins, setCoins] = useState();
  const [coinsWon, setCoinsWon] = useState(0);

  useEffect(() => {
    token = localStorage.getItem("token");
    tokenExpiry = localStorage.getItem("tokenExpiry");
  }, []);

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const [intervalId, setIntervalId] = useState(0);
  useEffect(() => {
    const getResults = async () => {
      // if (props.timer === 60) {
      try {
        let res;
        socket.emit("generate_result");

        const cardWonPromise = new Promise((resolve) => {
          socket.on("card_won", (cardWon) => {
            resolve(cardWon);
          });
        });

        const cardWon = await cardWonPromise;

        res = await axios.post(DEPLOYED_URL + "/betting", {
          cardWon: 6,
          cardCoinsDetails: cardBets,
        });

        // setStopIndex(cardWon);
        setStopIndex(6);

        setCoinsWon(res.data);
        const updatedUser = await axios.put(
          DEPLOYED_URL + "/user/profile/updateDetails",
          {
            coins: coins + res.data,
          },
          { headers }
        );
        setHighlighting(true);
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error during async operations:", error);
      }
      // }
      setIntervalId(
        highlighting
          ? setInterval(() => {
              setHighlightedIndex(
                (prevIndex) => (prevIndex + 1) % cardDet.length
              );
            }, 200)
          : 0
      );
    };

    if (props.timer === 60) {
      getResults();
    }
  }, [props.timer, currentRotations, highlighting, cardBets, cardDet]);

  const customStyle = {
    height: `calc(100vh - 4rem)`,
  };

  useEffect(() => {
    if (highlightedIndex === cardDet.length - 1) {
      setCurrentRotations((prev) => prev + 1);
    }
  }, [highlightedIndex]);

  useEffect(() => {
    if (currentRotations >= randomRotations && highlightedIndex === stopIndex) {
      clearInterval(intervalId);
      if (coinsWon) setIsWinningModalOpen(true);
      setCardBets((prevBets) => {
        return prevBets.map((card, index) => ({
          ...card,
          totalBet: 0,
          userBet: 0,
        }));
      });
      setHighlighting(false);
      setLastHighlightedIndex(stopIndex);
      setCurrentRotations(0);
      setHighlightedIndex(0);
      socket.emit("new_game");
    }
  }, [currentRotations, highlightedIndex]);

  const openModal = (index) => {
    if (!highlighting) setIsModalOpen(true);
    setSelectedCardIndex(index);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCardIndex(null);
  };

  const closeWinningModal = () => {
    setIsWinningModalOpen(false);
  };

  const handleBetSubmit = async (amount) => {
    socket.emit("new_bet", selectedCardIndex, amount);
    setCardBets((prevBets) => {
      const newBets = [...prevBets];
      newBets[selectedCardIndex] = {
        userBet: prevBets[selectedCardIndex].userBet + amount,
        totalBet: prevBets[selectedCardIndex].totalBet + amount,
      };
      return newBets;
    });

    closeModal();
  };

  useEffect(() => {
    const socket = io.connect(DEPLOYED_URL);

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    socket.on("refresh_changes", (total) => {
      setCardBets((prevBets) => {
        return prevBets.map((card, index) => ({
          ...card,
          totalBet: total[index],
        }));
      });
    });

    socket.on("user_online", (count) => {
      setUserOnline(count);
    });

    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  const onBetHandler = (det, index) => {
    if (token && tokenExpiry && tokenExpiry > new Date().getTime()) {
      openModal(index);
      setModalIcon(det.icon);
    } else {
      router.push("/");
    }
  };

  useEffect(() => {
    const getUserDetails = async () => {
      const { data } = await axios.get(
        DEPLOYED_URL + "/user/profile/getDetails",
        {
          headers,
        }
      );
      // if (data === "logged out")
      //   {

      //   }
      // console.log(
      //   "inside useEffect when the API is called ",
      //   data.coins,
      //   " data",
      //   data
      // );
      setCoins(data.coins);
    };
    getUserDetails();
  }, [token, highlighting]);

  return (
    <>
      <div
        className={`absolute top-16 w-screen flex justify-evenly content-evenly flex-wrap ${
          isModalOpen ? "pointer-events-none" : ""
        }`}
        style={customStyle}
      >
        {!highlighting && (
          <div
            className={`absolute p-3 md:top-8 flex justify-center ${styles.effect} font-normal`}
          >
            Add a Bet!!!
          </div>
        )}
        <div className={styles.userOnlineDiv}>Online: {userOnline}</div>
        {cardDet.map((det, index) => {
          return (
            <Card
              key={det.id}
              name={det.name}
              image={det.icon}
              highlighted={
                highlighting
                  ? index === highlightedIndex
                  : index === lastHighlightedIndex
              }
              userBet={cardBets[index].userBet}
              totalBet={cardBets[index].totalBet}
              onBet={() => onBetHandler(det, index)}
              modalIcon={modalIcon}
              setModalIcon={setModalIcon}
            />
          );
        })}
      </div>
      {isModalOpen && (
        <>
          <Modal
            onClose={closeModal}
            onBetSubmit={handleBetSubmit}
            modalIcon={modalIcon}
            coins={coins}
            setCoins={setCoins}
          />
        </>
      )}
      {isWinningModalOpen && (
        <WinningModal
          onWinningModalClose={closeWinningModal}
          coinsWon={coinsWon}
        />
      )}
    </>
  );
}

export default Cards;
