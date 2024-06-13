import React from "react";
import { Link } from "react-router-dom";

const Team = () => {
  return (
    <div
      id="teamSection"
      className="tw-overflow-x-hidden tw-bg-Team_bg tw-bg-cover tw-bg-center tw-bg-black"
    >
      <div className="container tw-py-16 tw-text-center">
        <div className="tw-flex tw-justify-center tw-items-center tw-gap-3">
          <p className="m-0 tw-bg-[#2CBEF6] tw-w-4 tw-h-4 tw-rounded-full"></p>
          <span className="tw-font-extrabold tw-text-white">OUR TEAM</span>
          <p className="m-0 tw-bg-[#2CBEF6] tw-w-4 tw-h-4 tw-rounded-full"></p>
        </div>
        <h1 className="tw-text-white tw-pt-4 tw-font-semibold md:tw-text-[45px] tw-text-[35px]">
          The Leadership <span className="gradient-text">Team</span>
        </h1>
        <div className="row g-4 tw-pt-12">
          {teamMembers.map((member, index) => (
            <div key={index} className="col-lg-3 col-md-6">
              <div className="tw-bg-[#151515] tw-text-center tw-rounded-lg">
                <div className="tw-relative">
                  <img
                    src={require("../../assets/images/Polygon.png")}
                    className="tw-w-full tw-h-56"
                    alt="Background"
                  />
                  <div className="tw-absolute   tw-top-1/2 tw-left-1/2 tw-transform tw--translate-x-1/2 tw--translate-y-1/4  tw-w-[170px]  tw-h-[170px]">
                    <img
                      src={member.image}
                      className="tw-w-full tw-h-full tw-p-1  tw-bg-white  tw-rounded-full"
                      alt={member.name}
                    />
                  </div>
                </div>
                <div className="tw-pb-8 tw-pt-12">
                  <h3 className="gradient-text tw-text-xl tw-font-poppins tw-font-bold tw-uppercase">
                    {member.name}
                  </h3>
                  <p className="tw-text-[#A4B4C3] m-0">{member.role}</p>
                  {/* {member.links && (
                    <ul className="tw-flex tw-gap-3 tw-pt-2 tw-justify-center tw-items-center">
                      {member.links.map((link, i) => (
                        <li key={i}>
                          <Link to={link.url}>
                            <img
                              src={require(`../../assets/images/${link.icon}`)}
                              alt={link.alt}
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )} */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const teamMembers = [
  {
    name: "Rayman, C., M.Sc",
    role: "Founder & CO",
    image: require("../../assets/images/profile.jpg"),
    links: [
      { url: "", icon: "ic_sharp-discord.png", alt: "Discord" },
      { url: "", icon: "Symbol.png", alt: "Symbol" },
      { url: "", icon: "iconoir_telegram.png", alt: "Telegram" },
    ],
  },
  {
    name: "Aaron, H.",
    role: "Head of Technology",
    image: require("../../assets/images/profile.jpg"),
    links: [
      { url: "", icon: "ic_sharp-discord.png", alt: "Discord" },
      { url: "", icon: "Symbol.png", alt: "Symbol" },
      { url: "", icon: "iconoir_telegram.png", alt: "Telegram" },
    ],
  },
  {
    name: "Blade, A., Ph.D.",
    role: "Legal Affairs",
    image: require("../../assets/images/profile.jpg"),
    links: [
      { url: "", icon: "ic_sharp-discord.png", alt: "Discord" },
      { url: "", icon: "Symbol.png", alt: "Symbol" },
      { url: "", icon: "iconoir_telegram.png", alt: "Telegram" },
    ],
  },
  {
    name: "Buzz Master",
    role: "Marketing",
    image: require("../../assets/images/profile.jpg"),
    links: [
      { url: "", icon: "ic_sharp-discord.png", alt: "Discord" },
      { url: "", icon: "Symbol.png", alt: "Symbol" },
      { url: "", icon: "iconoir_telegram.png", alt: "Telegram" },
    ],
  },
];

export default Team;
