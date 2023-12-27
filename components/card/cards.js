import React, { useState, useEffect } from "react";
import Card from "./card";
import cardDet from "@/constants/cardDet.json";
import Modal from "../modal";
import styles from "./cards.module.css";
import { useSearchParams } from "next/navigation";

function Cards(props) {
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [highlighting, setHighlighting] = useState(false);
  const [lastHighlightedIndex, setLastHighlightedIndex] = useState(-1);
  const stopIndex = 5;
  const [randomRotations, setRandomRotaions] = useState(
    Math.floor(Math.random() * (4 - 2 + 1) + 2)
  );
  const [currentRotations, setCurrentRotations] = useState(0);
  const [cardBets, setCardBets] = useState(
    Array(cardDet.length).fill({ userBet: 0, totalBet: 0 })
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [modalIcon, setModalIcon] = useState("");

  useEffect(() => {
    if (props.timer == 0) {
      setHighlighting(true);
      setIsModalOpen(false);
    }
    const intervalId =
      highlighting &&
      setInterval(() => {
        setHighlightedIndex((prevIndex) => (prevIndex + 1) % cardDet.length);
      }, 200);

    return () => clearInterval(intervalId);
  }, [props.timer, currentRotations]);

  const customStyle = {
    height: `calc(100vh - 4rem)`,
  };

  useEffect(() => {
    if (highlightedIndex === cardDet.length - 1) {
      setCurrentRotations((prev) => prev + 1);
    }
  }, [highlightedIndex]);

  useEffect(() => {
    if (
      currentRotations === randomRotations &&
      highlightedIndex === stopIndex
    ) {
      setHighlighting(false);
      setLastHighlightedIndex(stopIndex);
      setCurrentRotations(0);
      setHighlightedIndex(0);
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

  const handleBetSubmit = (amount) => {
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
              onBet={() => {
                openModal(index);
                setModalIcon(det.icon);
              }}
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
          />
        </>
      )}
    </>
  );
}

export default Cards;
