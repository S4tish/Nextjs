import React from "react";

const Popup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
        <p
          className="text-center font-medium text-gray-900 mb-4"
          style={{ fontWeight: "bold" }}
        >
          OTP sent successfully!
        </p>
        <button
          onClick={onClose}
          style={{ color: "red", marginLeft: "4rem", fontWeight: "bold" }}
        >
          CLOSE
        </button>
      </div>
    </div>
  );
};

export default Popup;
