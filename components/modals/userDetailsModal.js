import React, { useState } from "react";

function UserDetailsModal({ onClose, username, password }) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboardHandler = () => {
    const textToCopy = `Username: ${username}\nPassword: ${password}`;

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 3000);
      })
      .catch((error) => {
        console.error("Unable to copy text to clipboard", error);
      });
  };

  return (
    <div className="fixed w-3/4 md:w-1/2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-[#223851] to-[#172733] shadow-2xl shadow-black rounded-3xl p-6 z-50">
      <span
        className="absolute top-1 right-5 text-[#a10707] text-4xl font-bold cursor-pointer"
        onClick={onClose}
      >
        &times;
      </span>
      <div className="flex justify-between bg-[#081620] rounded px-4 py-2 mt-6">
        <div>
          <div>
            <span className="font-semibold text-white">Username: </span>
            <span className="text-[#9ca3af]">{username}</span>
          </div>
          <div>
            <span className="font-semibold text-white">Password: </span>
            <span className="text-[#9ca3af]">{password}</span>
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-[#9ca3af] cursor-pointer"
          onClick={copyToClipboardHandler}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
          />
        </svg>
      </div>
      <div className="flex justify-around mt-4">
        <button
          onClick={onClose}
          className="bg-[#a10707]  text-white px-2 py-1 rounded-md font-bold"
        >
          Close
        </button>
        <button
          onClick={copyToClipboardHandler}
          className="bg-green-500 text-white px-2 py-1 rounded-md font-bold"
        >
          {isCopied ? "Copied!" : "Copy to Clipboard"}
        </button>
      </div>
    </div>
  );
}

export default UserDetailsModal;
