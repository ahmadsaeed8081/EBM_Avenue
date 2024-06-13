import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className=" tw-overflow-x-hidden tw-bg-[#141414]">
        <div className="container tw-py-10">
          <div className="row tw-items-center">
            <div className="col-md-6  md:tw-text-start  tw-text-center">
              <img src={require("../../assets/images/footer_logo.png")} className="tw-mx-auto md:tw-mx-0" />
              <p className=" tw-text-xl tw-text-white tw-pt-6">
                0x33E4d3163e66B46bAb  C0faF8B30C6c36DD4Ab9E9
              </p>
            </div>
            <div className="col-md-6">
              <ul className=" tw-p-0 tw-flex md:tw-justify-end tw-justify-center tw-gap-5 tw-items-center">
                <li>
                  <Link to={'https://x.com/EBMAvenue'}>
                    <img src={require("../../assets/images/twitter.png")} />
                  </Link>
                </li>
                <li>
                  <Link to={'https://discord.com/invite/yuaA8rDJ'}>
                    <img src={require("../../assets/images/bbb.png")} />
                  </Link>
                </li>
                <li>
                  <Link to={'https://t.me/+9FfF7v_hUbNmZWQ8'} >
                    <img src={require("../../assets/images/email.png")} />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="tw-bg-button-gradient tw-w-full tw-py-2  tw-text-center">
        <p className=" tw-m-0 tw-text-white">
          Copyright © 2024. All rights reserved by  $EBM Avenue.{" "}
        </p>
      </div>
    </div>
  );
};

export default Footer;
