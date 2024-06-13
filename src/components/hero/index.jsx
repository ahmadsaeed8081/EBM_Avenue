import React, { useState } from "react";
import Button from "../Button";
import { FaArrowRight } from "react-icons/fa6";
import Header from "../header";
import Counter from "../Counter";
import VideoPlayer from "../videoPlayer";
const Hero = () => {
  const [selectedCurrency, setSelectedCurrency] = useState("USDT");

  const handleSelect = (currency) => {
    setSelectedCurrency(currency);
  };

  const getBorderColor = (currency) => {
    return selectedCurrency === currency
      ? "tw-border-[#00F0FF] tw-border-2"
      : "tw-border-transparent";
  };

  const [selectedButton, setSelectedButton] = useState(null);

  const handleBSelect = (button) => {
    setSelectedButton(button);
  };

  const getBBorderColor = (button) => {
    return selectedButton === button
      ? "tw-border-[#00F0FF] tw-border-2"
      : "tw-border-white";
  };

  const openPdfInNewTab = () => {
    const pdfUrl = require("../../assets/images/EBM Whitepaper.pdf");
    window.open(pdfUrl, "_blank");
  };

  const [openVideo, setOpenVideo] = useState(false);
  return (
    <div className=" tw-bg-Hero   tw-bg-cover tw-relative tw-bg-black tw-bg-center tw-w-full tw-h-auto">
      <Header />
      <div className=" tw-absolute tw-top-0  tw-left-0">
        <img src={require("../../assets/images/left_image.png")} />
      </div>

      <div className=" tw-absolute tw-top-0 tw-right-0">
        <img src={require("../../assets/images/right_image.png")} />
      </div>

      <div className="container tw-relative tw-pt-6 tw-pb-28">
        <div className="row    g-5 tw-items-center">
          <div className="col-lg-6 col-md-12">
            <h1 className=" tw-text-white  tw-font-semibold md:tw-text-6xl tw-text-4xl">
              Welcome to Eco-Friendly{" "}
              <span className="gradient-text">
                Blockchain Mining Avenue !!!
              </span>
            </h1>
            <p className=" tw-text-white sm:tw-text-start tw-text-center tw-font-poppins tw-font-normal tw-leading-7 tw-pt-4 tw-text-lg t">
              An avenue set to empower Blockchains, revolutionizing the crypto
              mining industry by combining cutting-edge technology with
              sustainable practices. Join us in transforming the crypto space
              with sustainable and fulfilling solutions.
            </p>
            <div className=" tw-flex tw-gap-7 sm:tw-justify-start tw-justify-center">
              <Button
                onClick={openPdfInNewTab}
                label={"White Paper"}
                className={"  tw-mt-7"}
                rIcons={<FaArrowRight color="white" />}
              />

              <Button
                onClick={() => setOpenVideo(openVideo?false:true)}
                label={!openVideo?"Get $EBM":" get video"}
                className={"  tw-mt-7"}
                rIcons={<FaArrowRight color="white" />}
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            {openVideo === true ? (
              <div className="row tw-relative">
                <div className="col-md-10 tw-p-0 tw-mx-auto">
                  <div className="  tw-bg-[#282E32]  tw-border-[#269FF0] tw-border-2 tw-rounded-2xl  p-4 tw-h-auto tw-bg-cover bg-hero-cut">
                    <Counter />

                    <div className="  tw-text-center tw-py-4">
                      <p className=" tw-font-poppins tw-m-0 tw-text-white">
                        $0 / $0
                      </p>
                      <div className=" tw-flex tw-justify-between tw-items-center">
                        <p className=" tw-m-0 text-xl tw-font-poppins gradient-text">
                          Stage
                        </p>
                        <p className=" tw-m-0 text-xl tw-font-poppins gradient-text">
                          Remaining
                        </p>
                      </div>

                      <div className=" tw-flex tw-justify-between tw-items-center">
                        <p className=" tw-m-0 text-xl  tw-font-poppins tw-text-white">
                          0
                        </p>
                        <p className=" tw-m-0 text-xl  tw-font-poppins tw-text-white">
                          1
                        </p>
                      </div>

                      <div className="  tw-bg-gradient tw-rounded-lg border tw-overflow-hidden tw-my-2">
                        <div className="  tw-rounded-md tw-w-[80%] tw-bg-button-gradient tw-p-2"></div>
                      </div>

                      <div className=" tw-flex tw-justify-between tw-items-center">
                        <p className=" tw-m-0   tw-font-poppins tw-text-sm tw-text-white">
                          1 $EBM = 0.00
                        </p>
                        <p className=" tw-m-0 tw-font-poppins   tw-text-sm tw-text-white">
                          Next = 0.00
                        </p>
                      </div>
                    </div>

                    <div className="  tw-text-center tw-pb-4 tw-pt-0">
                      <p className=" tw-font-poppins tw-m-0 tw-text-white">
                        Your Purchased $EBM = 0
                      </p>
                      <p className=" tw-font-poppins tw-m-0 tw-text-white">
                        Your Stakeable $EBM = 0
                      </p>
                    </div>

                    <div className="tw-flex tw-w-full tw-gap-3 tw-justify-center">
                      <div
                        className={`tw-rounded-full tw-h-[48px] tw-w-full tw-justify-between tw-px-3 tw-flex tw-items-center tw-mt-2 tw-bg-gradient ${getBorderColor(
                          "MATIC"
                        )}`}
                        onClick={() => handleSelect("MATIC")}
                      >
                        <div>
                          <img
                            src={require("../../assets/images/c2.png")}
                            alt="MATIC"
                          />
                        </div>
                        <p className="tw-m-0 tw-text-white">MATIC</p>
                      </div>
                      <div
                        className={`tw-rounded-full tw-w-full tw-h-[48px] tw-justify-between tw-pr-5 tw-flex tw-items-center tw-mt-2 tw-bg-gradient ${getBorderColor(
                          "USDT"
                        )}`}
                        onClick={() => handleSelect("USDT")}
                      >
                        <div>
                          <img
                            src={require("../../assets/images/c1.png")}
                            alt="USDT"
                          />
                        </div>
                        <p className="tw-m-0 tw-text-white">USDT</p>
                      </div>
                      <div
                        className={`tw-w-full tw-rounded-full tw-h-[48px] tw-justify-between tw-flex tw-items-center tw-px-4 tw-mt-2 tw-bg-gradient ${getBorderColor(
                          "USDC"
                        )}`}
                        onClick={() => handleSelect("USDC")}
                      >
                        <div>
                          <img
                            src={require("../../assets/images/c3.png")}
                            alt="USDC"
                          />
                        </div>
                        <p className="tw-m-0 tw-text-white">USDC</p>
                      </div>
                    </div>

                    <div className=" tw-flex tw-gap-3 tw-pt-5">
                      <div className=" tw-w-full">
                        <p className=" tw-m-0 tw-text-white tw-font-poppins sm:tw-text-base tw-text-sm">
                          $ {selectedCurrency} you pay
                        </p>

                        <div className=" tw-rounded-full border tw-relative tw-mt-2   tw-bg-gradient">
                          <input
                            className=" tw-bg-transparent  tw-w-full tw-px-3 tw-py-2 tw-text-white tw-outline-none"
                            defaultValue={0}
                          />
                          <div className=" tw-absolute tw-right-1.5  tw-top-0">
                            {selectedCurrency === "USDT" ? (
                              <img
                                src={require("../../assets/images/c1.png")}
                                className=" tw-w-10 tw-h-10"
                              />
                            ) : selectedCurrency === "MATIC" ? (
                              <img
                                src={require("../../assets/images/c2.png")}
                                className=" tw-w-8 tw-h-8"
                              />
                            ) : (
                              <img
                                src={require("../../assets/images/c3.png")}
                                className=" tw-w-8 tw-h-8"
                              />
                            )}
                          </div>
                        </div>
                      </div>

                      <div className=" tw-w-full">
                        <p className="  tw-font-poppins tw-m-0 tw-text-white sm:tw-text-base tw-text-sm">
                          $EBM you receive
                        </p>

                        <div className=" tw-rounded-full border tw-relative  tw-mt-2  tw-bg-gradient">
                          <input
                            className=" tw-bg-transparent  tw-w-full tw-px-3 tw-py-2 tw-text-white tw-outline-none"
                            defaultValue={0}
                          />
                          <div className=" tw-absolute tw-right-3  tw-top-2">
                            <img
                              src={require("../../assets/images/c5.png")}
                              className=" tw-w-6"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className=" tw-flex tw-items-center tw-justify-between tw-py-5">
                      <p className=" tw-m-0 tw-text-white  sm:tw-text-base tw-text-sm tw-font-poppins">
                        Choose After Period
                      </p>

                      <div className=" tw-flex tw-gap-3">
                        <button
                          onClick={() => handleBSelect("1 Month")}
                          className={`tw-py-0.5 tw-px-1.5 tw-border-2 tw-text-sm tw-text-white tw-rounded-md  ${getBBorderColor(
                            "1 Month"
                          )}`}
                        >
                          1 Month{" "}
                          <span className=" text-xs tw-bg-button-gradient  tw-text-[9px] tw-rounded-md tw-text-white tw-py-1 tw-px-2 ">
                            0.5%
                          </span>{" "}
                        </button>
                        <button
                          onClick={() => handleBSelect("3 Month")}
                          className={` tw-py-0.5 tw-px-1.5 tw-border-2 tw-text-sm tw-text-white tw-rounded-md ${getBBorderColor(
                            "3 Month"
                          )} `}
                        >
                          3 Month{" "}
                          <span className=" text-xs tw-bg-button-gradient  tw-text-[9px] tw-rounded-md tw-text-white tw-py-1 tw-px-2 ">
                            0.5%
                          </span>{" "}
                        </button>
                      </div>
                    </div>

                    <div className=" tw-flex tw-justify-between tw-items-center">
                      <p className=" tw-m-0 tw-font-poppins sm:tw-text-base tw-text-md tw-text-white">
                        Token After Staking:
                      </p>
                      <p className=" tw-m-0 tw-text-white tw-font-poppins">
                        0 $EBM
                      </p>
                    </div>
                    <div className=" tw-flex tw-gap-3 tw-pt-2">
                      <Button
                        label={"Buy Now"}
                        className={"  tw-py-1 tw-w-full"}
                      />
                      <Button
                        label={"Buy & Stake"}
                        className={"  tw-py-1 tw-w-full"}
                      />
                    </div>

                    <div className=" tw-text-center  tw-pt-8">
                      <h1 className=" tw-text-white  tw-font-poppins tw-font-semibold tw-text-sm">
                        Launch On
                        <span className="gradient-text">UniSwap</span>
                        And
                        <span className="gradient-text">QuickSwap</span>
                        Soon
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <VideoPlayer src={require("../../assets/images/ebm.mp4")} />
            )}
          </div>
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default Hero;
