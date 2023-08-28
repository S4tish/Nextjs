"use client";
import React, { useEffect, useState } from "react";
import "./page.css";
import { Button, IconButton } from "@mui/material";
import { Facebook, Google, WhatsApp } from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import Script from "next/script";

const page = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [pin, setPin] = useState("");
  const [mobileNumberError, setMobileNumberError] = useState("");
  const [pinError, setPinError] = useState("");
  const [loginError, setLoginError] = useState('');

  const handleMobileNumberChange = (event) => {
    const newValue = event.target.value.slice(0, 10);
    setMobileNumber(newValue);
    setMobileNumberError("");
  };

  const handlePinChange = (event) => {
    const { value } = event.target;
    setPin(value);
    setPinError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (mobileNumber.length !== 10) {
      setMobileNumberError("Please Enter Registered Mobile Number");
    }

    if (pin.length !== 4) {
      setPinError("Please choose 4 digit PIN");
    }
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        mobileNumber,
        pin,
      });

      if (response.data.success) {
        toast.success('Login successful!', {
          autoClose: 5000,
        });
      } else {
        toast.error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
    }
  
  };
  useEffect(() => {
    window.otpless = (otplessUser) => {
      alert(JSON.stringify(otplessUser));
    };
  }, []);

  return (
    <div>
      <Script src="https://otpless.com/auth.js"></Script>
      <section className="bg-gray-50 bg-white">
        <div
          className=" flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
          style={{ paddingTop: "15.7rem", marginBottom: "8rem" }}
        >
          <div
            className="div-body w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-white dark:border-gray-700"
            style={{ marginTop: "-8rem" }}
          >
            <div
              className="p-6 space-y-4 md:space-y-6 sm:p-8"
              style={{ margin: "-13px" }}
            >
              <h1
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "blue",
                }}
              >
                Login with
              </h1>
              <div className="flex items-center justify-center">
                <div className="flex items-center space-x-4 mb-4">
                  {/* whatsapp login */}

                  <div className="whatsapp" id="otpless" custom="true">
                    <IconButton
                      aria-label="Login with WhatsApp"
                      style={{ backgroundColor: "#25d366", color: "#ffffff" }}
                    >
                      <WhatsApp />
                    </IconButton>
                    <p className="icons_text">WhatsApp</p>
                  </div>
                  {/* google login */}
                  <div className="google">
                    <IconButton
                      aria-label="Login with Google"
                      style={{ backgroundColor: "#4285f4", color: "#ffffff" }}
                    >
                      <Google />
                    </IconButton>
                    <p className="icons_text">Google</p>
                  </div>

                  {/* facebook login */}
                  <div className="facebook">
                    <IconButton
                      aria-label="Login with Facebook"
                      style={{ backgroundColor: "#3b5998", color: "#ffffff" }}
                    >
                      <Facebook />
                    </IconButton>
                    <p className="icons_text">Facebook</p>
                  </div>
                </div>
              </div>
              <div className="icons_line">
                <hr className="hr_tag_login" />
                <p className="or_text">or</p>
              </div>

              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black login_page_h1">
                login_here
              </h1>
              <form className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    mobile_number
                  </label>
                  <input
                    type="number"
                    name="number"
                    id="number"
                    value={mobileNumber}
                    onChange={handleMobileNumberChange}
                    className={`bg-gray-50 border ${
                      mobileNumberError ? "border-red-500" : "border-black"
                    } text-gray-900 sm:text-sm rounded-lg  block w-full  height_loginpage`}
                    placeholder=""
                    required=""
                  />
                  {mobileNumberError && (
                    <p className="text-red-500 text-sm">{mobileNumberError}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black "
                  >
                    enter_PIN
                  </label>
                  <input
                    type="password"
                    name="pin"
                    id="pin"
                    value={pin}
                    onChange={handlePinChange}
                    className={`height_loginpage bg-gray-50 border ${
                      pinError ? "border-red-500" : "border-black"
                    } text-gray-900 sm:text-sm rounded-lg  block w-full `}
                    placeholder=""
                    required=""
                    maxLength="4"
                  />
                  {pinError && (
                    <p className="text-red-500 text-sm">{pinError}</p>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-black"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="/ForgotPin"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-black"
                  >
                    Forgot_PIN?
                  </a>
                </div>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ backgroundColor: "#32d1b4", width: "100%" }}
                  onClick={handleSubmit}
                >
                  login
                </Button>
                <p
                  className="text-sm font-light text-gray-500 dark:text-black"
                  style={{ textAlign: "center" }}
                >
                  not_yet_registered?{" "}
                  <a
                    href="/Register"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    register_here
                  </a>
                </p>
              </form>
              <ToastContainer position="top-center" autoClose={5000} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
