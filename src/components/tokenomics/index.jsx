import React from "react";

const Tokenomics = () => {
  return (
    <div id="tokenSection" className=" tw-bg-Token   tw-py-14">
      <h1 className=" tw-text-white  tw-text-center gradient-text tw-font-semibold tw-text-4xl">
        TOKENOMICS
      </h1>

      <div className="container ">
        <div className="row">
          <div className="col-md-11 tw-mx-auto">
          <img src={require("../../assets/images/tokens.png")} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tokenomics;
