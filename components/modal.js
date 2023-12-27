import React, { useState, useEffect } from "react";

function Modal({ onClose, onBetSubmit, modalIcon }) {
  const [betAmount, setBetAmount] = useState("");

  const handleSubmit = () => {
    if (betAmount && !isNaN(betAmount) && parseInt(betAmount) > 0) {
      onBetSubmit(parseInt(betAmount));
    }
  };

  return (
    <div className="fixed w-3/4 md:w-1/2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-[#223851] to-[#172733] shadow-2xl shadow-black rounded-3xl p-6 z-50">
      <span
        className="absolute top-1 right-5 text-[#a10707] text-4xl font-bold"
        onClick={onClose}
      >
        &times;
      </span>
      <div className="w-full flex justify-center">
        <img src={modalIcon} />
      </div>
      <div className="flex items-center mt-4 gap-4">
        <p className="text-white text-lg text-center w-3/5">
          Enter the number of coins to bet
        </p>
        <input
          className="h-10 w-2/5 rounded-lg p-2"
          type="number"
          value={betAmount}
          onChange={(e) => setBetAmount(e.target.value)}
        />
      </div>
      <div className="flex justify-around mt-4">
        <button
          onClick={onClose}
          className="bg-[#a10707]  text-white px-2 py-1 rounded-md font-bold"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="bg-[#6ae5a8] text-white px-2 py-1 rounded-md font-bold"
        >
          Submit Bet
        </button>
      </div>
    </div>
  );
}

export default Modal;
