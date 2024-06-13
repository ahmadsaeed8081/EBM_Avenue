import React, { useState } from 'react'
import Accordion from '../Accordion/Accordion';

const FAQ = () => {
    const [accordions, setAccordion] = useState([
        {
          key: 1,
          title:
            "1. How many $EBM I need to be eligible in Swap4Less?",
          data: "Through Swap4Less, $EBM holders can purchase various cryptocurrencies at discounted rates ranging from 0.1% to 10% basing on monthly average $EBM holdings.",
          isOpen: false,
        },
        {
          key: 2,
          title:
            "2. What is Staking during Presale?",
            data: "This staking opportunity is exclusive to the presale buyers to grow their investment with native $EBM token rewards during the presale before listing $EBM for trade for limited period.",
            isOpen: false,
        },
        {
          key: 3,
          title:
            "3. What is Stake4More?",
            data: "By staking $EBM tokens at Stake4More, like staking in native token rewards this will reward with higher discounts when using Swap4Less.",
            isOpen: false,
        },
        {
          key: 4,
          title: "4. How to participate in Stake4More?",
          data: "Upon starting of operations, the program start will be announced once its smart contract is deployed, tested and audited.",
          isOpen: false,
        },
        {
          key: 5,
          title:
            "5. What are benefits of $EBM to the Community?",
            data: "Other than Swap4Less and Stake4More, we aim to boost growth of True DeFi blockchains like Bitcoin, Litecoin, Zilliqa, Ethereum Classic, Raven, Kaspa, Dodge, BlockDAG etc.",
            isOpen: false,
        },
        {
          key: 6,
          title: "6. What are $EBM presale security measures? ",
          data: "Tokens bought through presale are not transferable and tradable until listed for trading officially. Tokens allocated for our operations, marketing, teams and advisors are locked with linear vesting for periods from 2- 5 years.",
          isOpen: false,
        },
        {
            key: 7,
            title: "7. Maintaining $EBM value?",
            data: "We strongly advise Stake, HODL $EBM from day one for native token rewards and to reap benefits from Swap4Less and Stake4More programs.",
            isOpen: false,
          },
          {
            key: 8,
            title: "8. Has the project undergone any audits or security assessments?",
            data: "Yes, our smart contract audits can be verified here.",
            isOpen: false,
          },
      ]);
    
      const toggleAccordion = (accordionkey) => {
        const updatedAccordions = accordions.map((accord) => {
          if (accord.key === accordionkey) {
            return { ...accord, isOpen: !accord.isOpen };
          } else {
            return { ...accord, isOpen: false };
          }
        });
    
        setAccordion(updatedAccordions);
      };
  return (
    <div className=" tw-bg-black  tw-overflow-x-hidden   tw-bg-no-repeat tw-w-full tw-bg-cover   tw-h-auto tw-py-20">
       
      <div className=" container">
      <div className='row'>
        <div className='col-lg-6 col-md-12'>
        <h1 className=" tw-font-medium tw-text-4xl sm:tw-text-start tw-text-center  tw-text-white">Frenquently Questions</h1>
        <div className="  tw-mt-12">
          {accordions.map((accordion) => (
            <Accordion
              key={accordion.key}
              title={accordion.title}
              data={accordion.data}
              isOpen={accordion.isOpen}
              toggleAccordion={() => toggleAccordion(accordion.key)}
            />
          ))}
        </div>
        </div>
        <div className="col-lg-6 col-md-12  md:tw-pt-44 tw-pt-0 tw-relative">
            <img src={require("../../assets/images/bg-banner.png")}  className='  md:tw-block tw-hidden' />
            <div className="row md:tw-absolute tw-relative -tw-top-12">
              <div className="col-md-12 tw-pt-36 tw-mx-auto">
               <div className='row'>
                <div className='col-md-10 tw-mx-auto'>
                <img
                  src={require("../../assets/images/faq.png")}
                  className=" tw-w-full"
                />
                </div>
               </div>
              </div>
            </div>
           
          </div>
      </div>
      </div>
    </div>
  )
}

export default FAQ
