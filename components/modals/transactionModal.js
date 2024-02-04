import React, { useState } from "react";

function TransactionModal({
  onClose,
  transactionType,
  setTransactionCoins,
  handleTransactionSubmit,
  userCoins
}) {
  const [errorMessage, setErrorMessage] = useState("");

  const handleAmountChange = (e) => {
    const amount = parseInt(e.target.value);
    if (amount < 100) {
      setErrorMessage(`*Minimum withdrawal amount is 100`);
    } else if (amount > userCoins) {
        setErrorMessage(`*Withdrawal amount must not exceed available coins`);
    }
    else{
      setErrorMessage("");
    }
    setTransactionCoins(amount);
  };

  return (
    <div className="fixed w-3/4 md:w-1/2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-[#223851] to-[#172733] shadow-2xl shadow-black rounded-3xl p-6 z-50">
      <span
        className="absolute top-1 right-5 text-[#a10707] text-4xl font-bold cursor-pointer"
        onClick={onClose}
      >
        &times;
      </span>
      <div className="flex items-center mt-8 gap-4">
        <p className="text-white text-lg text-center w-3/5">
          Enter the amount:
        </p>
        <input
          className="h-10 w-2/5 rounded-lg p-2"
          type="number"
          onChange={handleAmountChange}
        />
      </div>
      {errorMessage && (
        <p className="flex justify-center text-red-700 mt-2 font-semibold">
          {errorMessage}
        </p>
      )}
      <div className="flex justify-around mt-4">
        <button
          onClick={onClose}
          className="bg-[#a10707]  text-white px-2 py-1 rounded-md font-bold"
        >
          Cancel
        </button>
        <button
          onClick={handleTransactionSubmit}
          className="bg-green-500 text-white px-2 py-1 rounded-md font-bold"
          disabled={!!errorMessage}
        >
          {transactionType}
        </button>
      </div>
    </div>
  );
}

export default TransactionModal;
