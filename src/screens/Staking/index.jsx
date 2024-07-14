import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/header";
import { FaArrowRight } from "react-icons/fa6";
import Button from "../../components/Button";
import Footer from "../../components/footer";
import StakingCounter from "../../components/StakingCounter";
import Tabs from "../../components/Tabs";
import Web3 from "web3";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  token_abi, 
  ebm_address,
  staking_address,
  staking_abi,       
} from "../../configs/Contracts";
// import { useNetwork, useSwitchChain } from "wagmi";
import { useWeb3Modal } from '@web3modal/wagmi/react'

import { useSwitchChain, useAccount, useDisconnect } from "wagmi";
// import {
//   useContractReads,
//   useContractRead,
//   useContractWrite,
//   usePrepareContractWrite,
//   useWaitForTransaction,
// } from "wagmi";
import { useSimulateContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { polygon, polygonAmoy } from "wagmi/chains";
import { tab } from "@testing-library/user-event/dist/tab";


const Staking = (props) => {


  const chainId = process.env.REACT_APP_ENV == "production" ? polygon.id : polygonAmoy.id;

  const { switchChainAsync } = useSwitchChain();
  const { chainId: currentChainId } = useAccount();
  const { writeContractAsync,writeContract,data:hash, ...states } = useWriteContract();

  const { address, isConnecting ,isDisconnected} = useAccount()




  const options = [{value:"0", title:"30 days", APR : "4%" }, {value:"1",title:"90 days", APR : "15%" }];


  const [activeTab, setActiveTab] = useState("Stake");


  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const dropdownRef = useRef(null);

  const [isOpen2, setIsOpen2] = useState(false);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const dropdownRef2 = useRef(null);


  const [isOpen3, setIsOpen3] = useState(false);
  const [selectedOption3, setSelectedOption3] = useState([]);
  const dropdownRef3 = useRef(null);
  const [count, set_count] = useState(0);

  const { open, close } = useWeb3Modal()
  const [option, set_option] = useState("0");


  const [isOpen4, setIsOpen4] = useState(false);
  const [selectedOption4, setSelectedOption4] = useState([null]);
  const dropdownRef4 = useRef(null);


  const notify = () => toast("Transaction Successfull!");


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
    const difference = Number(selectedOption3[1]) * 1000 - new Date();
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



  const APRList = [
    { value: "0", lbl: "120 Days" ,APR: "0.05%"},
    { value: "1", lbl: "240 Days"  ,APR: "0.08%"},
    { value: "2", lbl: "365 Days" ,APR: "0.12%"},

  ];

const [ selectedAPR,set_selectedAPR] = useState(APRList[0])
const [stakeAmount, setStakedAmount] = useState(0);


const [choosed_Unstake_inv, set_choosed_Unstake_inv] = useState();
const [allInvestments, set_investmentList] = useState([]);
const [selectedAmount, setSelectedAmount] = useState([]);
const [investmentList_reward, set_investmentList_reward] = useState([]);



useEffect(()=>{

  if(props.allInvestments)
  {
    if(  props.allInvestments.length>0)
    {
        test1()
    }

  }

},[address,props.allInvestments])



const { isLoading: isConfirming, isSuccess: isConfirmed} =
useWaitForTransactionReceipt({
  hash,
})





    function test1(){


    console.log(props.allInvestments[0]);


    set_investmentList(props.allInvestments);
    setSelectedOption3(props.allInvestments[0]);
    setSelectedOption4(props.allInvestments_reward[0]);

    console.log(props.allInvestments[0])
    set_investmentList_reward(props.allInvestments_reward)
    set_choosed_Unstake_inv(props.allInvestments[0][3])

    



  }  

  async function stake1() {

    set_option(1)

    try {
        const tx = await writeContractAsync({
          abi: staking_abi,
          address: staking_address,
          functionName: "Stake", 
          args: [
            Convert_To_Wei(stakeAmount? Number(stakeAmount) : 0), selectedOption.value
          ],

        });

        set_count(1)

    } catch (err) {
        console.error(err);
    }
}

async function unstake1() {
  set_option(2)

  try {
      const tx = await writeContractAsync({
        abi: staking_abi,
        address: staking_address,
        functionName: "unStake", 
        args: [
          Number(selectedOption3[3])
        ],

      });

      set_count(1)

  } catch (err) {
      console.error(err);
  }
}


async function claim1() {
  set_option(3)

  try {
      const tx = await writeContractAsync({
        abi: staking_abi,
        address: staking_address,
        functionName: "withdrawReward", 
        // args: [
        //   Number(selectedOption4[3])
        // ],

      });

      set_count(1)

  } catch (err) {
      console.error(err);
  }
}


useEffect(()=>{
  if(isConfirmed)
  {
    if(count==0)
    {
      // alert("ninkn")
      stake1()

    }
    if(count==1)
    {
      set_count(0)
      notify()
      setStakedAmount(0)
      props.test();
    }
  }


},[isConfirmed])

  async function EBM_approval () {
    try {
        const tx = await writeContractAsync({
          abi: token_abi,
          address: ebm_address,
          args: [staking_address,Convert_To_Wei( stakeAmount ? Number(stakeAmount) : "0")],
          functionName: "approve",

        }); 
        // stake1();
  
       } catch (err) {
        console.error(err);
    }
  }







  function Convert_To_eth(val) {
    const web3 = new Web3(
      new Web3.providers.HttpProvider("https://polygon.meowrpc.com")
    );

    val = web3.utils.fromWei(val.toString(), "ether");
    return val;
  }

  function Convert_To_Wei(val) {
    const web3 = new Web3(
      new Web3.providers.HttpProvider("https://polygon.meowrpc.com")
    );

    val = web3.utils.toWei(val.toString(), "ether");
    return val;
  }



  async function stake()
  {

    if(isDisconnected)
    {
      alert("kindly connect your wallet ");
      return;
    }

    if(stakeAmount==0 )
    {
      alert("kindly write amount to stake ");
      return;
    }
    if(Number(stakeAmount)<Number(props.min_stake)/10**18 )
    {
      alert("Minimum Stake amount is "+ Number(props.min_stake)/10**18);
      return;
    }


    if(Number(props.EBMBalance)/10**18 < Number(stakeAmount))
    {
      alert("You don't have sufficient balance");
      return;
    }
    if (chainId != currentChainId )
    {
      await switchChainAsync({ chainId });
      await EBM_approval?.();
    } 
    else 
    {
      await EBM_approval?.();
    }

  }


  async function unstake()
  {
    if(isDisconnected)
    {
      alert("kindly connect your wallet ");
      return;
    }

    if (chainId != currentChainId )
    {
      await switchChainAsync({ chainId });
      await unstake1?.();
    } 
    else 
    {
      await unstake1?.();
    }
    

  }

  async function claim()
  {
    if(isDisconnected)
    {
      alert("kindly connect your wallet ");
      return;
    }

    if (chainId != currentChainId )
    {
      await switchChainAsync({ chainId });
      await claim1?.();
    } 
    else 
    {
      await claim1?.();
    }
    

  }



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
              <p className="tw-m-0 tw-text-white tw-font-semibold">ROI:</p>
              <p className="tw-m-0 tw-text-white">{selectedOption.APR} </p>
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
                      {selectedOption.title || "Select an option"}
                    </p>
                    <p className="tw-m-0">
                      <img
                        src={require("../../assets/images/bxs_up-arrow.png")}
                      />
                    </p>
                  </button>
                  {isOpen && (
                    <ul className="tw-absolute tw-p-0 tw-z-20 tw-bg-[#141414] tw-text-black tw-shadow-md tw-rounded-md tw-mt-2 tw-w-full">
                      {options.map((item,index) => (
                        <li
                          key={item}
                          onClick={() => handleOptionClick(item)}
                          className="tw-py-2 tw-px-4 tw-cursor-pointer tw-text-white hover:tw-bg-button-gradient"
                        >
                          {item.title}
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
                    <p className="tw-text-white tw-text-sm">Balance : {props.EBMBalance>0?(Number(props.EBMBalance)/10**18).toFixed(2):0}  $EBM</p>
                  </div>
                  <div
                    className="tw-relative tw-w-full tw-inline-block"
                    ref={dropdownRef2}
                  >
                    <div
                      // onClick={handleToggle2}
                      className="tw-border-[#2596EF] tw-flex tw-items-center tw-justify-between tw-border tw-w-full tw-text-white tw-py-3 tw-px-4 tw-rounded-md tw-text-[17.15px] tw-leading-3"
                    >
                      <input  className=" tw-bg-transparent tw-w-full tw-px-3 tw-py-2 tw-text-white tw-outline-none" 
                            type="number" 
                            min={0}
                            value={stakeAmount}
                            max={props.EBMBalance>0?(Number(props.EBMBalance)/10**18):0}
                            onChange={(e)=>setStakedAmount(e.target.value)}
                        />
                      
                      
                        {/* {selectedOption2 || "Select an option"} */}
                      
                      <div className="tw-flex tw-items-center tw-gap-2">
                        <p className="tw-text-sm tw-m-0">$EBM</p>
                        <button className="tw-bg-button-gradient tw-py-1.5 tw-px-1 tw-text-sm tw-rounded-md"
                        onClick={(e)=>setStakedAmount(props.EBMBalance>0?(Number(props.EBMBalance)/10**18):0)}
                        >
                          Max
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              <div>
                {isDisconnected?

                <div>
                <Button onClick={open} label={"Connect Wallet"} className={"tw-w-full"} />
                <p className=" tw-text-white tw-text-center tw-pt-2  tw-font-semibold tw-text-sm" >For best experience use dApp browser</p>

                  </div>                :                
                <Button onClick={stake} label={ isConfirming && option=="1" ? ("Processing..."): ("Stake") }
                className={"tw-w-full"} />


              }
                {/* <Button onClick={stake} label={"Stake"} className={"tw-w-full"} /> */}
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
            <p className="tw-m-0 tw-text-white tw-font-poppins tw-font-semibold">Penalty</p>
            <p className="tw-m-0  tw-font-zen-dots tw-text-white">10%</p>
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
                      {selectedOption3 ? Number(selectedOption3[0])/10**18:"Select an option"}
                    </p>
                    <p className="tw-m-0">
                      <img
                        src={require("../../assets/images/bxs_up-arrow.png")}
                      />
                    </p>
                  </button>
                  {isOpen3 && (
                    <ul className="tw-absolute tw-p-0 tw-z-20 tw-bg-[#141414] tw-text-black tw-shadow-md tw-rounded-md tw-mt-2 tw-w-full">
                      
                      {props.allInvestments.map((item,index) => (
                        <li
                          // key={index}
                          onClick={() => {
                            handleOption3Click(item);
                            setSelectedAmount(item);
                            // set_choosed_Unstake_inv(Number(item[index][3]));
                          
                          }}
                          className="tw-py-2 tw-px-4 tw-cursor-pointer tw-text-white hover:tw-bg-button-gradient"
                        >
                          {Number(item[0])/10**18}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
           </div>
                          <StakingCounter time={selectedOption3 ? Number(selectedOption3[1]):0}
 />

             </div>
            <div>

            {isDisconnected?

<div>
<Button onClick={open} label={"Connect Wallet"} className={"tw-w-full"} />
<p className=" tw-text-white tw-text-center tw-pt-2  tw-font-semibold tw-text-sm" >For best experience use dApp browser</p>

  </div>                  :                
                  <Button onClick={unstake} label={ isConfirming && option=="2" ? ("Processing..."): ("Unstake") } className={"tw-w-full"} />


                  }
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
            <p className="tw-m-0 tw-font-poppins tw-text-sm tw-text-white">{props.totalEarning? (Number(props.totalEarning)/10**18).toFixed(2) + (Number(props.totalwithdraw)/10**18).toFixed(2):0}</p>
          </div>


          <div className="tw-flex px-4  tw-pt-1 tw-justify-between tw-items-center">
            <p className="tw-m-0 tw-font-poppins tw-text-sm tw-text-white">Total withdrawn</p>
            <p className="tw-m-0 tw-font-poppins tw-text-sm tw-text-white">{props.totalwithdraw? (Number(props.totalwithdraw)/10**18).toFixed(2):0}</p>
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
                    {selectedOption4 ? Number(selectedOption4[0])/10**18:"Select an option"}
                    </p>
                    <p className="tw-m-0">
                      <img
                        src={require("../../assets/images/bxs_up-arrow.png")}
                      />
                    </p>
                  </button>
                  {isOpen4 && (
                    <ul className="tw-absolute tw-p-0 tw-z-20 tw-bg-[#141414] tw-text-black tw-shadow-md tw-rounded-md tw-mt-2 tw-w-full">
                      {props.allInvestments_reward.map((item,index) => (
                        <li
                          key={index}
                          onClick={() => handleOption4Click(item)}
                          className="tw-py-2 tw-px-4 tw-cursor-pointer tw-text-white hover:tw-bg-button-gradient"
                        >
                          {Number(item[0])/10**18}

                        </li>
                      ))}
                    </ul>
                  )}
                </div>
           </div>
           <div className="tw-flex  tw-pt-7   tw-justify-between tw-items-center">
            <p className="tw-m-0 tw-font-poppins tw-text-sm tw-text-white">Earned Reward</p>
            <p className="tw-m-0 tw-font-poppins tw-text-sm tw-text-[#00F0FF]">{selectedOption4 ? (Number(selectedOption4[6])/10**18).toFixed(2):0}
</p>
          </div>
          <div className="tw-flex   tw-justify-between tw-items-center">
            <p className="tw-m-0 tw-font-poppins tw-text-sm tw-text-white">Pending Reward</p>
            <p className="tw-m-0 tw-font-poppins tw-text-sm tw-text-[#00F0FF]">{selectedOption4 ? (Number(selectedOption4[9])/10**18).toFixed(2):0}</p>
          </div>
           
             </div>
            <div>
            {isDisconnected?


<div>
<Button onClick={open} label={"Connect Wallet"} className={"tw-w-full"} />
<p className=" tw-text-white tw-text-center tw-pt-2  tw-font-semibold tw-text-sm" >For best experience use dApp browser</p>

  </div>
              
              :                
              <Button onClick={claim} label={ isConfirming && option=="3" ? ("Processing..."): ("Claim") }  className={"tw-w-full"} />


              }
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
        {
          activeTab=="Stake"?
          (
                  <div className=" tw-text-center">

                      <h1 className=" tw-text-white  tw-font-poppins tw-font-semibold tw-text-2xl">
                        Staking is available during presale Period only
                        
                      </h1>
                    </div>
          ):(
            activeTab=="Unstake"?
            (
                    <div className=" tw-text-center">
  
                        <h1 className=" tw-text-white  tw-font-poppins tw-font-semibold tw-text-2xl">
                          Unstake Anytime
                          
                        </h1>
                      </div>
            ):(
              activeTab=="Reward"?
              (
                      <div className=" tw-text-center">
    
                          <h1 className=" tw-text-white  tw-font-poppins tw-font-semibold tw-text-2xl">
                         Claim your rewards Anytime!
                            
                          </h1>
                        </div>
              ):(null)
            )
          )

          
        }

        <div className="row tw-items-center">
          <div className="col-lg-5 col-md-8 tw-mx-auto">
            <div className="mx-auto mt-8  mb-24">
              <Tabs tabs={tabData} defaultTab={defaultTab} setActiveTab1={setActiveTab}/>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />

    </div>
  );
};

export default Staking;
