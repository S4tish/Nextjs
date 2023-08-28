"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const page = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [errors, setErrors] = useState({});
  const [confirmPinError, setConfirmPinError] = useState("");

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = {};

    if (firstName.trim() === "") {
      newErrors.firstName = "Please Enter First Name";
    }

    if (lastName.trim() === "") {
      newErrors.lastName = "Please Enter Last Name";
    }

    if (mobileNumber.length !== 10) {
      newErrors.mobileNumber = "Please Enter Registered Mobile Number";
    }

    if (pin.length !== 4) {
      newErrors.pin = "Please choose 4 digit PIN";
    }

    if (confirmPin.trim() === "") {
      newErrors.confirmPin = "Confirm PIN";
    } else if (confirmPin !== pin) {
      newErrors.confirmPin = "PINs do not match";
    }
    if (Object.keys(newErrors).length === 0) {
      try {
        await axios.post("http://localhost:5000/api/register", {
          firstName,
          lastName,
          mobileNumber,
          pin,
        });
        // alert("Registration successful!");
        toast.success("Registration successful! You can now log in.", {
            autoClose: 8000 // Set auto-close duration to 8 seconds
          });
        router.push("/Login");
      } catch (error) {
        console.error("Registration error:", error);
        alert("Registration failed. Please try again.");
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div>
      <section className="bg-gray-50 dark:bg-white">
        <div
          className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
          style={{ marginTop: "9rem" }}
        >
          <div
            className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-white dark:border-gray-700"
            style={{ marginTop: "-9rem" }}
          >
            <div
              className="p-6 space-y-4 md:space-y-6 sm:p-8"
              style={{ margin: "-16px" }}
            >
              <h1
                className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black"
                style={{ textAlign: "center" }}
              >
                registration
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    first_name
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className={`bg-gray-50 border ${
                      errors.firstName ? "border-red-500" : "border-gray-300"
                    } text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    placeholder=""
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    last_name
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className={`bg-gray-50 border ${
                      errors.lastName ? "border-red-500" : "border-gray-300"
                    } text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    placeholder=""
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm">{errors.lastName}</p>
                  )}
                </div>
                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    mobile_number
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className={`bg-gray-50 border ${
                      errors.mobileNumber ? "border-red-500" : "border-gray-300"
                    } text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    placeholder=""
                    value={mobileNumber}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      if (newValue.length <= 10) {
                        setMobileNumber(newValue);
                      }
                    }}
                    required=""
                  />
                  {errors.mobileNumber && (
                    <p className="text-red-500 text-sm">
                      {errors.mobileNumber}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Please choose 4 digit PIN
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className={`bg-gray-50 border ${
                      errors.pin ? "border-red-500" : "border-gray-300"
                    } text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    required=""
                    value={pin}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      if (newValue.length <= 4) {
                        setPin(newValue);
                      }
                    }}
                  />
                  {errors.pin && (
                    <p className="text-red-500 text-sm">{errors.pin}</p>
                  )}
                </div>
                <div>
                  <label
                    for="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    confirm_pin
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className={`bg-gray-50 border ${
                      errors.confirmPin ? "border-red-500" : "border-gray-300"
                    } text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    required
                    value={confirmPin}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      if (newValue.length <= 4) {
                        setConfirmPin(newValue);
                        setConfirmPinError("");
                      }
                    }}
                  />
                  {errors.confirmPin && (
                    <p className="text-red-500 text-sm">{errors.confirmPin}</p>
                  )}
                  {confirmPinError && (
                    <p className="text-red-500 text-sm">{confirmPinError}</p>
                  )}
                </div>
                <div>
                  <label
                    for="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    common.reference_code
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder=""
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  style={{ backgroundColor: "#32d1b4" }}
                  onClick={handleSubmit}
                >
                  register
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
                <ToastContainer position="top-center" autoClose={8000} />
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
