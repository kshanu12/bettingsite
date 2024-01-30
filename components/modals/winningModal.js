import React, { useState } from "react";

function WinningModal({ onWinningModalClose, coinsWon }) {
  return (
    <div className="fixed w-3/4 md:w-1/2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-[#223851] to-[#172733] shadow-2xl shadow-black rounded-3xl p-6 z-50">
      <span
        className="absolute top-1 right-4 text-[#a10707] text-4xl font-bold cursor-pointer"
        onClick={onWinningModalClose}
      >
        &times;
      </span>
      <div className="flex text-center flex-col mt-4">
        <div className="text-2xl md:text-3xl font-bold font-serif text-white">
          🎉Congratulations!
        </div>
        <div className="mt-4 text-lg font-semibold text-green-500">
          You're a Winner!🤑 You've won Rs {coinsWon}!
        </div>
      </div>
      <div className="flex justify-around mt-4">
        <button
          onClick={onWinningModalClose}
          className="bg-[#a10707]  text-white px-2 py-1 rounded-md font-bold"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default WinningModal;
