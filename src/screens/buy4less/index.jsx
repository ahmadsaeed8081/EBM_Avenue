import React from "react";
import Header from "../../components/header";
import { FaArrowRight } from "react-icons/fa6";
import Button from "../../components/Button";
import Footer from "../../components/footer";

const Buy4less = () => {
  return (
    <div className=" tw-bg-center tw-relative  tw-overflow-x-hidden tw-bg-black tw-bg-cover tw-w-full lg:tw-h-screen tw-h-auto">
      <Header />
      <div className=" tw-absolute tw-top-0 tw-left-0">
        <img src={require("../../assets/images/left_image.png")} />
      </div>
      <div className="container  tw-py-28">
        <div className="row  g-5  tw-items-center">
          <div className="col-md-6">
            <h1 className=" sm:tw-text-start tw-text-center tw-text-white  gradient-text tw-font-semibold tw-text-[45px]">
            Swap 4 less            </h1>
            <p className=" sm:tw-text-start tw-text-center tw-text-white  tw-leading-7 tw-pt-4 tw-text-xl">
            You can purchase cryptocurrencies at discounted rates ranging from 0.1% to 10% based on monthly average $EBM holdings. Connect your wallet to know your eligibility and discount levels.
            </p>
            <div className=" tw-flex sm:tw-justify-start tw-justify-center">
            <Button
              label={"Coming Soon"}
              rIcons={<FaArrowRight color="white" />}
            />
            </div>
           
          </div>
          <div className="col-md-6  ">
           <div className=" tw-relative sm:tw-block tw-hidden">
           <img src={require("../../assets/images/bg-banner.png")} />
            <div className="row sm:tw-absolute tw-relative -tw-top-12">
              <div className="col-md-8 tw-mx-auto">
                <img
                  src={require("../../assets/images/4less.png")}
                  className=" tw-w-full"
                />
              </div>
            </div>
            <div className=" tw-absolute -tw-top-12 tw-left-24 tw-bg-button-gradient tw-w-12 tw-h-12  tw-rounded-full"></div>
            <div className=" tw-absolute tw-bottom-10 tw-right-10 tw-bg-button-gradient tw-w-8 tw-h-8  tw-rounded-full"></div>
            <div className=" tw-absolute tw-bottom-10 tw-left-10 tw-bg-button-gradient tw-w-8 tw-h-8  tw-rounded-full"></div>
           </div>
           <img src={require('../../assets/images/pikaso_texttoimag.png')} className=" sm:tw-hidden tw-w-full tw-block" />
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Buy4less;
