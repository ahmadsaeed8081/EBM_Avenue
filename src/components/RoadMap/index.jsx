import React from "react";
import Button from "../Button";

const RoadMap = () => {
  return (
    <div id="roadSection" className="     tw-bg-Road  tw-overflow-x-hidden  tw-py-12 tw-bg-[#0a0a0b]">
      <div className="container sm:tw-py-16 sm:tw-pb-0 tw-pb-72">
        <div className="lg:tw-hidden tw-block tw-text-center">
          <h1 className="gradient-text tw-text-3xl">$EBM ROADMAP</h1>
          <p className="tw-text-white tw-leading-8">
            Our roadmap reflects our commitment to boost blockchains, innovation, DeFi growth, and sustainability, guiding us towards our vision of becoming a leader in the crypto mining industry and beyond.
          </p>
        </div>
        <div className="tw-relative ">
          <img
            src={require("../../assets/images/card_bg_t.png")}
            className="tw-mx-auto"
          />
          <div className="tw-hidden sm:tw-block tw-absolute tw-top-1/4 tw-left-[48%] tw-transform tw--translate-y-1/2">
            <img src={require("../../assets/images/left_arrow.png")} alt="Left Arrow" />
          </div>
          <div className="tw-hidden sm:tw-block tw-absolute tw-top-44 tw-right-[48%] tw-transform tw--translate-y-1/2">
            <img src={require("../../assets/images/right_arrow.png")} alt="Right Arrow" />
          </div>
          <div className="tw-hidden sm:tw-block tw-absolute tw-top-[35%] tw-right-[48%] tw-transform tw--translate-y-1/2">
            <img src={require("../../assets/images/right_arrow.png")} alt="Right Arrow" />
          </div>
          <div className="tw-hidden sm:tw-block tw-absolute tw-top-[50%] tw-left-[48%] tw-transform tw--translate-y-1/2">
            <img src={require("../../assets/images/left_arrow.png")} alt="Left Arrow" />
          </div>
          <div className="tw-hidden sm:tw-block tw-absolute tw-top-[65%] tw-right-[48%] tw-transform tw--translate-y-1/2">
            <img src={require("../../assets/images/right_arrow.png")} alt="Right Arrow" />
          </div>
          <div className="tw-hidden sm:tw-block tw-absolute tw-top-[80%] tw-left-[48%] tw-transform tw--translate-y-1/2">
            <img src={require("../../assets/images/left_arrow.png")} alt="Left Arrow" />
          </div>
          <div className="tw-absolute tw-top-0 tw-left-0 tw-right-0 tw-overflow-x-hidden">
            <div className="g-5 row tw-items-center">
              <div className="col-md-6 lg:tw-block tw-hidden">
                <div>
                  <h1 className="gradient-text tw-text-3xl">$EBM ROADMAP</h1>
                  <p className="tw-text-white tw-leading-8">
                    Our roadmap reflects our commitment to boost blockchains, innovation, DeFi growth, and sustainability, guiding us towards our vision of becoming a leader in the crypto mining industry and beyond.
                  </p>
                </div>
              </div>
              <RoadMapPhase
                phase="Phase 1"
                title="Foundation (2024 Q1 – Q3)"
                items={[
                  "Establishing the core team and advisory board.",
                  "Conducting market research and feasibility studies.",
                  "Community benefiting business model and tokenomics.",
                  "Smart contract Audits & KYC",
                  "Launching the presale phase to secure early investments and community support and participation.",
                ]}
              />
              <RoadMapPhase
                phase="Phase 2"
                title="Infrastructure Development (2024 Q3 - Q1)"
                items={[
                  "Marketing, DEX, CEX listings.",
                  "Building first state-of-the-art mining facility.",
                  "Start Mining Operations.",
                  "Swap4Less - Swap at discounted rates (Users can buy coins we mine)",
                  "Stake4More - Offers Higher discount levels and rewards.",
                ]}
              />
              <div className="col-md-6 sm:tw-block tw-hidden"></div>
              <div className="col-md-6 sm:tw-block tw-hidden"></div>
              <RoadMapPhase
                phase="Phase 3"
                title="Decentralized Exchange (DEX) Launch (2025 Q1 – Q2)"
                items={[
                  "Developing and launching our own DEX platform for decentralized trading.",
                  "Offering discounted value swaps for our token holders on the DEX.",
                  "Partnering with other DEX platforms to provide discounted transaction fees for our community.",
                ]}
              />
              <RoadMapPhase
                phase="Phase 4"
                title="BlockDAG Integration (2025 Q1 - Q2)"
                items={[
                  "Mining BlockDAG coins and leveraging its innovative technology.",
                  "Expanding mining operations to include a diverse range of cryptocurrencies.",
                  "Partnering with BlockDAG and other key players in the crypto industry.",
                ]}
              />
              <div className="col-md-6 sm:tw-block tw-hidden"></div>
              <div className="col-md-6 sm:tw-block tw-hidden"></div>
              <RoadMapPhase
                phase="Phase 5"
                title="Expansion and Growth (Q2 – Q3)"
                items={[
                  "Scaling up mining operations in multiple countries and regions.",
                  "Enhancing ecosystem development through strategic partnerships and collaborations.",
                  "Implementing community-driven initiatives and governance structures for token holders.",
                ]}
              />
              <RoadMapPhase
                phase="Phase 6"
                title="Sustainability and Innovation (Ongoing)"
                items={[
                  "Continuously optimizing mining operations for efficiency and profitability.",
                  "Exploring new technologies, trends, and opportunities in the crypto space.",
                  "Engaging with the community, investors, and stakeholders to drive long-term value creation and sustainability.",
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RoadMapPhase = ({ phase, title, items }) => (
  <div className="col-lg-6 col-md-12">
    <div className="row">
      <div className="col-md-11 tw-mx-auto">
        <div className="tw-bg-[#171717] tw-p-7 tw-rounded-md">
          <Button label={phase} className="tw-py-1" />
          <h1 className="tw-text-white tw-text-xl tw-pt-4">{title}</h1>
          <ul className="tw-p-0 tw-leading-8 tw-pt-3">
            {items.map((item, index) => (
              <li key={index} className="tw-flex tw-gap-3 tw-items-center">
                <div>
                  <img
                    src={require("../../assets/images/arrow_p.png")}
                    alt="Arrow"
                  />
                </div>
                <p className="m-0 tw-text-white">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default RoadMap;
