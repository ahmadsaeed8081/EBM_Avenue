import React from "react";
import Header from "../../components/header";
import { FaArrowRight } from "react-icons/fa6";
import Button from "../../components/Button";
import Footer from "../../components/footer";

const Stake4pie = () => {
  return (
    <div className=" tw-bg-center tw-overflow-x-hidden  tw-relative  tw-bg-black tw-bg-cover tw-w-full lg:tw-h-screen tw-h-auto">
      <Header />
      <div className=" tw-absolute tw-top-0 tw-left-0">
        <img src={require("../../assets/images/left_image.png")} />
      </div>
      <div className="container  tw-py-24">
        <div className="row   g-5 tw-items-center">
          <div className="col-md-6">
            <h1 className=" sm:tw-text-start tw-text-center tw-text-white  gradient-text tw-font-semibold tw-text-[45px]">
              Stake 4 More
            </h1>
            <p className=" tw-text-white sm:tw-text-start tw-text-center  tw-leading-7 tw-pt-4 tw-text-xl">
              By staking $EBM tokens, you can earn passive income through daily
              automated distribution of 40-60% of the company's revenue. Just
              connect your wallet to stake, review, or claim your rewards.
            </p>
            <div className=" tw-flex sm:tw-justify-start tw-justify-center">
            <Button
              label={"Coming Soon"}
              rIcons={<FaArrowRight color="white" />}
            />
            </div>
           
          </div>
          <div className="col-md-6  tw-relative">
            <img src={require("../../assets/images/bg-banner.png")} />
            <div className="row tw-absolute -tw-top-12">
              <div className="col-md-9 tw-mx-auto">
                <img
                  src={require("../../assets/images/stake4pie.png")}
                  className=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Stake4pie;
