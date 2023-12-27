import React from "react";
import styles from "./card.module.css";

function Card(props) {
  const cardClass = `relative flex flex-col gap-3 justify-center items-center rounded-md ${
    styles.card
  } ${props.highlighted ? styles.cardHighlighted : ""}`;
  return (
    <div onClick={()=>props.onBet(10)} className={cardClass}>
      {props.totalBet !== 0 ? (
        <div className={styles.bettedPointDiv}>₹{props.totalBet}</div>
      ) : (
        <></>
      )}
      <img className="w-20 md:w-24" src={props.image} alt={props.name} />
      {props.userBet !== 0 ? (
        <div className="flex items-center gap-2 bg-[#091117] py-1 px-3 rounded-md text-[#e6e9ec] md:text-xl font-semibold">
          <p>₹{props.userBet}</p>
          <img className="h-5 w-5" src="./images/rupee.png" />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Card;
