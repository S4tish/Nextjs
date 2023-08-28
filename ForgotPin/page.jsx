"use client";
import React, { useState } from "react";
import axios from 'axios';
import Popup from "../ForgotPopup/Popup";


const page = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = {};


    if (mobileNumber.length !== 10) {
      newErrors.mobileNumber = "Please Enter Registered Mobile Number";
    }

    if (newPin !== confirmPin) {
      newErrors.confirmPin = "PIN do not match";
    }
    if (newPin.length !== 4) {
      newErrors.newPin = "PIN must be 4 digits";
    }
    if (confirmPin.length !== 4) {
      newErrors.confirmPin = "PIN must be 4 digits";
    }
    if (newPin.trim() === "") {
      newErrors.newPin = "Please choose 4 digit PIN";
    }
    if (confirmPin.trim() === "") {
      newErrors.confirmPin = "Confirm PIN";
    }

    if (Object.keys(newErrors).length === 0) {
      try{
        const response=await axios.post("http://localhost:5000/verify-otp",{
          mobileNumber,
          otp:newPin,
        });
        console.log(response.data.message);
        alert("Verification successful");
      }catch(error){
        console.log("Error verifying OTP:",error.message);

      }
     
    } else {
      setErrors(newErrors);
    }
  };

  const handleSendOTP = async () => {
    try{
      const response= await axios.post("http://localhost:5000/send-otp",{mobileNumber});
      console.log(response.data.message);
      setShowPopup(true);
    }catch(error){
      console.log("Error sending OTP:",error.message);
    }
   
  };


  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const handleMobileNumberChange = (event) => {
    const newValue = event.target.value.slice(0, 10);
    setMobileNumber(newValue);
  };
  const isMobileNumberValid = mobileNumber.trim().length === 10;

  return (
    <div>
      <section className="bg-gray-50 bg-white">
        <div
          className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
          style={{ marginTop: "5rem" }}
        >
          <div
            className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-white dark:border-gray-700"
            style={{ marginTop: "-4rem" }}
          >
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1
                className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black"
                style={{ textAlign: "center" }}
              >
                Forgot_PIN
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div className="relative">
                  <label
                    htmlFor="mobileNumber"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    enter_mobile_number
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      name="mobileNumber"
                      id="mobileNumber"
                      value={mobileNumber}
                      onChange={handleMobileNumberChange}
                      className={`bg-gray-50 border ${
                        errors.mobileNumber
                          ? "border-red-500"
                          : "border-gray-300"
                      } text-gray-900 sm:text-sm rounded-l-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-12 md:pr-16 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                      placeholder=""
                      required=""
                    />
                    <button
                      type="button"
                      onClick={handleSendOTP}
                      disabled={!isMobileNumberValid}
                      className="absolute right-0 top-0 h-full px-4 py-2 text-white bg-blue hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-r-lg text-sm md:text-base"
                      style={{
                        backgroundColor: "#32d1b4",
                        height: "2.2rem",
                        marginTop: "31.5px",
                        borderRadius: "31px",
                        color: "black",
                        marginRight: "2px",
                      }}
                    >
                      Send OTP
                    </button>
                  </div>
                  {errors.mobileNumber && (
                    <p className="text-red-500 text-sm">
                      {errors.mobileNumber}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="otp"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    enter_otp_number
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder=""
                    className={`bg-gray-50 border ${
                      errors.newPin ? "border-red-500" : "border-gray-300"
                    } text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="newPin"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    enter_new_pin
                  </label>
                  <input
                    type="password"
                    name="newPin"
                    id="newPin"
                    className={`bg-gray-50 border ${
                      errors.newPin ? "border-red-500" : "border-gray-300"
                    } text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    required=""
                    value={newPin}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      if (newValue.length <= 4) {
                        setNewPin(newValue);
                      }
                    }}
                  />
                  {errors.newPin && (
                    <p className="text-red-500 text-sm">{errors.newPin}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="confirmPin"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    confirm_pin
                  </label>
                  <input
                    type="password"
                    name="confirmPin"
                    id="confirmPin"
                    placeholder=""
                    className={`bg-gray-50 border ${
                      errors.confirmPin ? "border-red-500" : "border-gray-300"
                    } text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    required=""
                    value={confirmPin}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      if (newValue.length <= 4) {
                        setConfirmPin(newValue);
                      }
                    }}
                  />
                  {errors.confirmPin && (
                    <p className="text-red-500 text-sm">{errors.confirmPin}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center md:text-base dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  style={{ backgroundColor: "#32d1b4" }}
                  onClick={handleSubmit}
                >
                  submit
                </button>

                <p
                  className="text-sm font-light text-gray-500 dark:text-black"
                  style={{ textAlign: "center" }}
                >
                  already_registered?{" "}
                  <a
                    href="/Login"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    login
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      {showPopup && <Popup onClose={handleClosePopup} />}
    </div>
  );
};

export default page;
