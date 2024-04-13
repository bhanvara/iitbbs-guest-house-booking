import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface PopupProps {
  isOpen: boolean;
}

const Popup: React.FC<PopupProps> = ({ isOpen }) => {
  return (
    <div
      className={`fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-white rounded-lg p-8 shadow-lg flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-green-500 mr-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <div>
          <p className="text-lg font-semibold mb-2">Success!</p>
          <p className="text-gray-600">Your action was successful.</p>
        </div>
      </div>
    </div>
  );
};

export default Popup;