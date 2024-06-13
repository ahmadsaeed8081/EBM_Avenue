import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/header";
import { FaArrowRight } from "react-icons/fa6";
import Button from "../../components/Button";
import Footer from "../../components/footer";
import Tabs from "../../components/Tabs";

const Staking = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const dropdownRef = useRef(null);

  const [isOpen2, setIsOpen2] = useState(false);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const dropdownRef2 = useRef(null);


  const [isOpen3, setIsOpen3] = useState(false);
  const [selectedOption3, setSelectedOption3] = useState(null);
  const dropdownRef3 = useRef(null);



  const [isOpen4, setIsOpen4] = useState(false);
  const [selectedOption4, setSelectedOption4] = useState(null);
  const dropdownRef4 = useRef(null);


  const options = ["150 days", "Option 2", "Option 3"];
  const options2 = ["0", "60", "2323"];
  const options3 = ["7.78", "44.23", "3.54"];
  const options4 = ["7.78", "44.23", "3.54"];

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleToggle2 = () => {
    setIsOpen2(!isOpen2);
  };

  const handleToggle3= () => {
    setIsOpen3(!isOpen3);
  };

  const handleToggle4= () => {
    setIsOpen4(!isOpen4);
  };


  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleOption2Click = (option) => {
    setSelectedOption2(option);
    setIsOpen2(false);
  };


  const handleOption3Click = (option) => {
    setSelectedOption3(option);
    setIsOpen3(false);
  };


  const handleOption4Click = (option) => {
    setSelectedOption4(option);
    setIsOpen4(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      if (
        dropdownRef2.current &&
        !dropdownRef2.current.contains(event.target)
      ) {
        setIsOpen2(false);
      }
      if (
        dropdownRef3.current &&
        !dropdownRef3.current.contains(event.target)
      ) {
        setIsOpen3(false);
      }

      if (
        dropdownRef4.current &&
        !dropdownRef4.current.contains(event.target)
      ) {
        setIsOpen4(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);




  const calculateTimeLeft = () => {
    const difference = +new Date('2024-12-31T00:00:00') - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const defaultTab = "Stake";

  const tabData = [
    {
      title: "Stake",
      content: (
        <>
          <div className="tw-border tw-border-[#00F0FF] tw-rounded-md">
            <div className="tw-flex px-4 tw-py-2 tw-border-b tw-justify-between tw-items-center">
              <img src={require("../../assets/images/c5.png")} />
              <p className="tw-m-0 tw-text-white tw-text-2xl tw-font-bold">
                $EBM
              </p>
            </div>

            <div className="tw-flex p-4 tw-border-b tw-justify-between tw-items-center">
              <p className="tw-m-0 tw-text-white tw-font-semibold">APR:</p>
              <p className="tw-m-0 tw-text-white">780% </p>
            </div>

            <div className="tw-flex-col tw-flex tw-justify-between tw-h-96 tw-p-6 tw-py-10">
              <div className="tw-flex tw-flex-col tw-gap-4">
                <div
                  className="tw-relative tw-w-full tw-inline-block"
                  ref={dropdownRef}
                >
                  <button
                    onClick={handleToggle}
                    className="tw-border-[#2596EF] tw-flex tw-justify-between tw-border tw-w-full tw-text-white tw-py-5 tw-items-center tw-px-4 tw-rounded-md tw-text-[17.15px] tw-leading-3"
                  >
                    <p className="tw-m-0">
                      {selectedOption || "Select an option"}
                    </p>
                    <p className="tw-m-0">
                      <img
                        src={require("../../assets/images/bxs_up-arrow.png")}
                      />
                    </p>
                  </button>
                  {isOpen && (
                    <ul className="tw-absolute tw-p-0 tw-z-20 tw-bg-[#141414] tw-text-black tw-shadow-md tw-rounded-md tw-mt-2 tw-w-full">
                      {options.map((option) => (
                        <li
                          key={option}
                          onClick={() => handleOptionClick(option)}
                          className="tw-py-2 tw-px-4 tw-cursor-pointer tw-text-white hover:tw-bg-button-gradient"
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div>
                  <div className="tw-flex tw-justify-between tw-items-center">
                    <p className="tw-font-medium tw-text-white">
                      Select Amount:
                    </p>
                    <p className="tw-text-white tw-text-sm">Balance: NaN PLP</p>
                  </div>
                  <div
                    className="tw-relative tw-w-full tw-inline-block"
                    ref={dropdownRef2}
                  >
                    <button
                      onClick={handleToggle2}
                      className="tw-border-[#2596EF] tw-flex tw-items-center tw-justify-between tw-border tw-w-full tw-text-white tw-py-3 tw-px-4 tw-rounded-md tw-text-[17.15px] tw-leading-3"
                    >
                      <p className="tw-m-0">
                        {selectedOption2 || "Select an option"}
                      </p>
                      <div className="tw-flex tw-items-center tw-gap-2">
                        <p className="tw-text-sm tw-m-0">PLP</p>
                        <button className="tw-bg-button-gradient tw-py-1.5 tw-px-1 tw-text-sm tw-rounded-md">
                          Max
                        </button>
                      </div>
                    </button>
                    {isOpen2 && (
                      <ul className="tw-absolute tw-p-0 tw-bg-[#141414] tw-text-black tw-shadow-md tw-rounded-md tw-mt-2 tw-w-full">
                        {options2.map((option) => (
                          <li
                            key={option}
                            onClick={() => handleOption2Click(option)}
                            className="tw-py-2 tw-px-4 tw-cursor-pointer tw-text-white hover:tw-bg-button-gradient"
                          >
                            {option}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <Button label={"Stake"} className={"tw-w-full"} />
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      title: "Unstake",
      content:(
        <>
        <div className="tw-border tw-border-[#00F0FF] tw-rounded-md">
          <div className="tw-flex px-4 tw-py-2 tw-border-b tw-justify-between tw-items-center">
            <img src={require("../../assets/images/c5.png")} />
            <p className="tw-m-0 tw-text-white tw-text-2xl tw-font-bold">
              $EBM
            </p>
          </div>

          <div className="tw-flex p-4  tw-justify-between tw-items-center">
            <p className="tw-m-0 tw-text-white tw-font-poppins tw-font-semibold">Total Stake</p>
            <p className="tw-m-0  tw-font-zen-dots tw-text-white">$EBM 10000</p>
          </div>

          <div className="tw-flex-col tw-flex tw-justify-between tw-h-96 tw-p-6 tw-py-10">
             <div>
              <label className=" tw-text-white">Previous Investment</label>
           <div className=" tw-mt-2">
           <div
                  className="tw-relative tw-w-full tw-inline-block"
                  ref={dropdownRef3}
                >
                  <button
                    onClick={handleToggle3}
                    className="tw-border-[#2596EF] tw-flex tw-justify-between tw-border tw-w-full tw-text-white tw-py-5 tw-items-center tw-px-4 tw-rounded-md tw-text-[17.15px] tw-leading-3"
                  >
                    <p className="tw-m-0">
                      {selectedOption3 || "Select an option"}
                    </p>
                    <p className="tw-m-0">
                      <img
                        src={require("../../assets/images/bxs_up-arrow.png")}
                      />
                    </p>
                  </button>
                  {isOpen3 && (
                    <ul className="tw-absolute tw-p-0 tw-z-20 tw-bg-[#141414] tw-text-black tw-shadow-md tw-rounded-md tw-mt-2 tw-w-full">
                      {options3.map((option) => (
                        <li
                          key={option}
                          onClick={() => handleOption3Click(option)}
                          className="tw-py-2 tw-px-4 tw-cursor-pointer tw-text-white hover:tw-bg-button-gradient"
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
           </div>

           <div className=" tw-pt-2.5 tw-flex  tw-gap-2  tw-justify-end">
            <div className=" tw-flex tw-gap-1">
              <div className="  tw-gap-1   tw-w-7 tw-justify-center  tw-rounded-sm tw-flex tw-items-center tw-bg-button-gradient">
                <p className=" tw-m-0 tw-text-sm">{String(timeLeft.days).padStart(2, '0')}</p>
              </div>

              <p className=" tw-m-0 tw-text-sm tw-text-white">Days</p>

            </div>
            <div className=" tw-flex tw-gap-1">
              <div className="  tw-gap-1   tw-w-6  tw-justify-center  tw-rounded-sm tw-flex tw-items-center tw-bg-button-gradient">
                <p className=" tw-m-0">{String(timeLeft.hours).padStart(2, '0')}</p>
              </div>

              <p className=" tw-m-0 tw-text-sm tw-text-white">Hours</p>

            </div>
            <div className=" tw-flex tw-gap-1">
              <div className="  tw-gap-1   tw-w-6  tw-justify-center  tw-rounded-sm tw-flex tw-items-center tw-bg-button-gradient">
                <p className=" tw-m-0">{String(timeLeft.minutes).padStart(2, '0')}</p>
              </div>

              <p className=" tw-m-0 tw-text-sm tw-text-white">Minutes</p>

            </div>
            <div className=" tw-flex tw-gap-1">
              <div className="  tw-gap-1   tw-w-6  tw-justify-center  tw-rounded-sm tw-flex tw-items-center tw-bg-button-gradient">
                <p className=" tw-m-0">   {String(timeLeft.seconds).padStart(2, '0')}</p>
              </div>

              <p className=" tw-m-0 tw-text-sm tw-text-white">Second</p>

            </div>
           </div>
             </div>
            <div>
              <Button label={"Unstake"} className={"tw-w-full"} />
            </div>
          </div>
        </div>
      </>
      ),
    },
    {
      title: "Reward",
      content:(
        <>
        <div className="tw-border tw-border-[#00F0FF] tw-rounded-md">
          <div className="tw-flex tw-mb-4 px-4 tw-py-2 tw-border-b tw-justify-between tw-items-center">
            <img src={require("../../assets/images/c5.png")} />
            <p className="tw-m-0 tw-text-white tw-text-2xl tw-font-bold">
              $EBM
            </p>
          </div>

          <div className="tw-flex px-4   tw-justify-between tw-items-center">
            <p className="tw-m-0 tw-font-poppins tw-text-sm tw-text-white">Total Earning</p>
            <p className="tw-m-0 tw-font-poppins tw-text-sm tw-text-white">128.455454</p>
          </div>


          <div className="tw-flex px-4  tw-pt-1 tw-justify-between tw-items-center">
            <p className="tw-m-0 tw-font-poppins tw-text-sm tw-text-white">Total Earning</p>
            <p className="tw-m-0 tw-font-poppins tw-text-sm tw-text-white">128.455454</p>
          </div>

          <div className="tw-flex-col  tw-flex tw-justify-between tw-h-96 tw-p-6 tw-py-10">
             <div>
              <label className=" tw-text-white">Investment History</label>
           <div className=" tw-mt-2">
           <div
                  className="tw-relative tw-w-full tw-inline-block"
                  ref={dropdownRef4}
                >
                  <button
                    onClick={handleToggle4}
                    className="tw-border-[#2596EF] tw-flex tw-justify-between tw-border tw-w-full tw-text-white tw-py-5 tw-items-center tw-px-4 tw-rounded-md tw-text-[17.15px] tw-leading-3"
                  >
                    <p className="tw-m-0">
                      {selectedOption4 || "Select an option"}
                    </p>
                    <p className="tw-m-0">
                      <img
                        src={require("../../assets/images/bxs_up-arrow.png")}
                      />
                    </p>
                  </button>
                  {isOpen4 && (
                    <ul className="tw-absolute tw-p-0 tw-z-20 tw-bg-[#141414] tw-text-black tw-shadow-md tw-rounded-md tw-mt-2 tw-w-full">
                      {options4.map((option) => (
                        <li
                          key={option}
                          onClick={() => handleOption4Click(option)}
                          className="tw-py-2 tw-px-4 tw-cursor-pointer tw-text-white hover:tw-bg-button-gradient"
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
           </div>
           <div className="tw-flex  tw-pt-7   tw-justify-between tw-items-center">
            <p className="tw-m-0 tw-font-poppins tw-text-sm tw-text-white">Total Earn Reward</p>
            <p className="tw-m-0 tw-font-poppins tw-text-sm tw-text-[#00F0FF]">128.455454</p>
          </div>
          <div className="tw-flex   tw-justify-between tw-items-center">
            <p className="tw-m-0 tw-font-poppins tw-text-sm tw-text-white">Earning Reward</p>
            <p className="tw-m-0 tw-font-poppins tw-text-sm tw-text-[#00F0FF]">128.455454</p>
          </div>
           
             </div>
            <div>
              <Button label={"Claim"} className={"tw-w-full"} />
            </div>
          </div>
        </div>
      </>
      ),
    },
  ];

  return (
    <div className="tw-bg-center tw-bg-Token tw-relative tw-bg-black tw-bg-cover tw-w-full tw-h-auto">
      <Header />

      <div className="container tw-py-24">
        <div className="row tw-items-center">
          <div className="col-lg-5 col-md-8 tw-mx-auto">
            <div className="mx-auto mt-8  mb-24">
              <Tabs tabs={tabData} defaultTab={defaultTab} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Staking;
