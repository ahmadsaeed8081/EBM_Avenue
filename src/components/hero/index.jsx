import React, { useEffect,useState } from "react";
import Button from "../Button";
import { FaArrowRight } from "react-icons/fa6";
import Header from "../header";
import Counter from "../Counter";
import Counter1 from "../Temp_Counter";

import VideoPlayer from "../videoPlayer";
import Decimal from "decimal.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Web3 from "web3";
import {
  usdt_address,
  usdc_address,

  token_abi,
  presale_address,
  presale_abi,
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
import { useSimulateContract, useWriteContract,useWaitForTransactionReceipt } from 'wagmi'
import { polygon, polygonAmoy } from "wagmi/chains";


const Hero = (props) => {

  const chainId = process.env.REACT_APP_ENV == "production" ? polygon.id : polygonAmoy.id;
  const [selectedCurrency, setSelectedCurrency] = useState("USDT");

  const [payAmount, set_payAmount] = useState(0);
  const [receiveAmount, set_receiveAmount] = useState(0);
  const [rewardAmount, set_rewardAmount] = useState(0);

  const [option, set_option] = useState("0");
  const { open, close } = useWeb3Modal()
  const [selectedButton, setSelectedButton] = useState(null);

  const [count, set_count] = useState(0);

  // const { chain } = useNetwork()

const { address, isConnecting ,isDisconnected} = useAccount()

  const handleSelect = (currency) => {
    setSelectedCurrency(currency);


  };

  useEffect(()=>{
    if(payAmount!="")
    {
      onPay(payAmount)
    }
  },[selectedCurrency,selectedButton])

  const getBorderColor = (currency) => {
    return selectedCurrency === currency
      ? "tw-border-[#00F0FF] tw-border-2"
      : "tw-border-transparent";
  };


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

  const [prog_percentage, set_prog_percentage] = useState(0);
  
  const { switchChainAsync } = useSwitchChain();
  const { chainId: currentChainId } = useAccount();
  const { writeContractAsync,writeContract, data:hash, ...states } = useWriteContract();

  useEffect(() => {
    setpercantage();
    handleBSelect("3 Month")
    onPay(0);
  }, [props.curr_presale.endTime]);

  const notify = () => toast("Token Purchased Successfully!");


  function setpercantage() {
    set_prog_percentage(
      (Number(props.curr_presale.total_sold) /
        10 ** 18 /
        (Number(props.curr_presale.supply) / 10 ** 18)) *
        100
    );
  }

   async function buytoken1() {
    try {
        const tx = await writeContractAsync({
          abi: presale_abi,
          address: presale_address,
          functionName: "buy_token", 
          args: [
            Convert_To_Wei(payAmount? Number(payAmount) : 0),
            selectedCurrency=="MATIC" ? "0" : selectedCurrency=="USDT" ? "1" :selectedCurrency=="USDC" ? "2":null,option, selectedButton=="1 Month" ? "0":"1"
          ],
          value: selectedCurrency=="MATIC"? Convert_To_Wei(payAmount ? Number(payAmount) : "0") : 0,

        });

        set_count(1)

    } catch (err) {
        console.error(err);
    }
}

  async function usdt_approval () {
    try {
        const tx = await writeContractAsync({
          abi: token_abi,
          address: usdt_address,
          args: [presale_address, payAmount ? Number(payAmount) * 10 ** 6 : "0"],
          functionName: "approve",

        }); 

       } catch (err) {
        console.error(err);
    }
  }

  async function usdc_approval () {
    try {
        const tx = await writeContractAsync({
          abi: token_abi,
          address: usdc_address,
          args: [presale_address, payAmount ? Number(payAmount) * 10 ** 6 : "0"],
          functionName: "approve",

        }); 
  
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

  function onPay(value) {
    if (value == "" || value == 0) {
      set_receiveAmount(0);
      // set_payAmount(0)

      return;
    }

    let price;
    if (selectedCurrency=="USDT" || selectedCurrency=="USDC") {
      price = Number(props.curr_presale.price) / 10 ** 18;
    } else {
      price = Number(props.perTokenIn_Matic) / 10 ** 18;
    }

    let dec_price = new Decimal(price);
    value = new Decimal(value);
    let temp = value.div(dec_price);

    set_receiveAmount(Number(temp).toFixed(2));
    if(selectedButton == "1 Month")
    {
      set_rewardAmount((Number(temp)+ (Number(temp)*4/100)).toFixed(2))

    }
    else{
      set_rewardAmount((Number(temp)+ (Number(temp)*15/100)).toFixed(2))

    }
  }

  function onRecieve(value) {
    if (value == "" || value == 0) {
      set_payAmount(0);

      return;
    }
    let price;
    if (selectedCurrency=="USDT" || selectedCurrency=="USDC") {
      price = Number(props.curr_presale.price) / 10 ** 18;
    } else {    
      price = Number(props.perTokenIn_Matic) / 10 ** 18;
    }

    let dec_price = new Decimal(price);
    value = new Decimal(value);
    let temp = dec_price.times(value);

    set_payAmount(Number(temp).toFixed(2));
    if(selectedButton == "1 Month")
    {
      set_rewardAmount((Number(value)+ (Number(value)*4/100)).toFixed(2))

    }
    else{
      set_rewardAmount((Number(value)+ (Number(value)*15/100)).toFixed(2))

    }
  }

  async function buy_token(choosed_option) {
    
    set_option(choosed_option);
    // alert(choosed_option)
    // selectedButton=="1 Month" ? alert("0"):alert("1")

    if (isDisconnected) {
      alert("Kindly connect your wallet");
      return;
    }
    if (payAmount == "" || payAmount == "0") {
      alert("Kidly write the amount");
      return;
    }

    if (selectedCurrency=="MATIC" ) 
    {

      if (Number(props.MATICBalance) < Number(Convert_To_Wei(payAmount))) {
        alert("You don't have enough Matic");
        return;
      }

      if (chainId != currentChainId )
      {
        await switchChainAsync({ chainId });
        await buytoken1?.();
      } 
      else 
      {
        await buytoken1?.();
      }
    } 
    else if(selectedCurrency=="USDT" )
    {
      if (Number(props.USDTBalance) < Number(payAmount) * 10 ** 6) {
        alert("You don't have enough USDT");
        return;
      }

      if (chainId != currentChainId) {
        await switchChainAsync({ chainId });
        await usdt_approval?.();

      } else {
        await usdt_approval?.();
      }
    }
    else if(selectedCurrency=="USDC" ){
      if (Number(props.USDCBalance) < Number(payAmount) * 10 ** 6) {
        alert("You don't have enough USDC");
        return;
      }

      if (chainId != currentChainId) {
        await switchChainAsync({ chainId });
        await usdc_approval?.();

      } else {
        await usdc_approval?.();
      }
    }

  }
  const { isLoading: isConfirming, isSuccess: isConfirmed} =
  useWaitForTransactionReceipt({
    hash,
    
    
  })

  useEffect(()=>{
    if(isConfirmed)
    {
      // alert(count)
      if(count==0)
      {
        // set_count(1)
        buytoken1()

      }
      if(count==1)
      {
        set_count(0)
        notify();
        set_payAmount(0)
        set_receiveAmount(0)
        set_rewardAmount(0)
        props.test();



      }
    }


  },[isConfirmed])


  async function buy_stake_token() {
    if (isDisconnected) {
      alert("Kindly connect your wallet");
      return;
    }
    if (payAmount == "" || payAmount == "0") {
      alert("Kidly write the amount");
      return;
    }

    if (selectedCurrency=="MATIC" ) {
      if (Number(props.MATICBalance) < Number(Convert_To_Wei(payAmount))) {
        alert("You don't have enough Matic");
        return;
      }

      if (chainId != currentChainId )
      {
        await switchChainAsync({ chainId });
        await buytoken1?.();
      } 
      else 
      {
        await buytoken1?.();
      }
    } else if(selectedCurrency=="USDT" ){
      if (Number(props.USDTBalance) < Number(payAmount) * 10 ** 6) {
        alert("You don't have enough USDT");
        return;
      }

      if (chainId != currentChainId) {
        await switchChainAsync({ chainId });
        await usdt_approval?.();

      } else {
        await usdt_approval?.();
      }
    }
    else if(selectedCurrency=="USDC" ){
      if (Number(props.USDCBalance) < Number(payAmount) * 10 ** 6) {
        alert("You don't have enough USDT");
        return;
      }

      if (chainId != currentChainId) {
        await switchChainAsync({ chainId });
        await usdc_approval?.();

      } else {
        await usdc_approval?.();
      }
    }

  }

  // <div className="tw-bg-center tw-bg-Token tw-relative tw-bg-black tw-bg-cover tw-w-full tw-h-auto">


  return (
    <div className=" tw-bg-Hero tw-bg-cover tw-relative tw-bg-black tw-bg-center tw-w-full tw-h-auto">
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
                label={!openVideo?"Get $EBM":" Get Video"}
                className={"  tw-mt-7"}
                rIcons={<FaArrowRight color="white" />}
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            {openVideo === true ? (
              <div className="row tw-relative">
                <div className="col-md-10 tw-p-0 tw-mx-auto">
                  {!props.launch?(
                  <div className="  tw-bg-[#282E32]  tw-border-[#269FF0] tw-border-2 tw-rounded-2xl  p-5 tw-h-auto tw-bg-cover bg-hero-cut">
                  <p className=" tw-m-0  tw-pb-2 tw-font-poppins tw-text-xl tw-text-white" style={{  fontWeight:"500" }}>
                         Presale will start in
                        </p>
                    <Counter1/>

                    {/* <div className="  tw-text-center tw-py-4">
                      <p className=" tw-font-poppins tw-m-0 tw-text-white">
                      Total Raised : ${props.total_raised ? (Number(props.total_raised)/10**6).toFixed(2):0}
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
                        {Number(props.curr_stage) + 1}

                        </p>
                        <p className=" tw-m-0 text-xl  tw-font-poppins tw-text-white">
                        {props.curr_presale.supply? ((Number(props.curr_presale.supply) / 10 ** 18) - (Number(props.curr_presale.total_sold) / 10 ** 18)).toFixed(2): 0}

                        </p>
                      </div>

                      <div className="  tw-bg-gradient tw-rounded-lg border tw-overflow-hidden tw-my-2">
                        <div className="  tw-rounded-md  tw-bg-button-gradient tw-p-2" style={{ width: `${Number(prog_percentage)}%` }} ></div>
                      </div>

                      <div className=" tw-flex tw-justify-between tw-items-center">
                        <p className=" tw-m-0   tw-font-poppins tw-text-sm tw-text-white">
                          1 $EBM = {props.curr_presale.price
                        ? Number(props.curr_presale.price) / 10 ** 18
                        : ""}
                        </p>
                        <p className=" tw-m-0 tw-font-poppins   tw-text-sm tw-text-white">
                          Next = {Number(props.NextStagePrice)
                          ? Number(props.NextStagePrice) / 10 ** 18
                          : ""}
                        </p>
                      </div>
                    </div>

                    <div className="  tw-text-center tw-pb-4 tw-pt-0">
                      <p className=" tw-font-poppins tw-m-0 tw-text-white">
                        Your Purchased $EBM = {Number(props.EBMBalance)
                          ? (Number(props.EBMBalance) / 10 ** 18).toFixed(2)
                          : ""}  
                      </p>
                      <p className=" tw-font-poppins tw-m-0 tw-text-white">
                        Your Staked $EBM = {Number(props.totalInvestment)
                          ?(Number(props.totalInvestment) / 10 ** 18).toFixed(2)
                          : ""}  
                      </p>
                        </div> */}


                  </div>
                  ):
                  (  <div className="  tw-bg-[#282E32]  tw-border-[#269FF0] tw-border-2 tw-rounded-2xl  p-4 tw-h-auto tw-bg-cover bg-hero-cut">
                  <p className=" tw-m-0  tw-pb-2 tw-font-poppins tw-text-sm tw-text-white" style={{ color:"#0FE5FD" }}>
                         Presale Stage Ends In
                        </p>
                    <Counter time={props.curr_presale.endTime ? Number(props.curr_presale.endTime) :  0}/>

                    <div className="  tw-text-center tw-py-4">
                      <p className=" tw-font-poppins tw-m-0 tw-text-white">
                      Total Raised : ${props.total_raised ? (Number(props.total_raised)/10**6).toFixed(2):0}
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
                        {Number(props.curr_stage) + 1}

                        </p>
                        <p className=" tw-m-0 text-xl  tw-font-poppins tw-text-white">
                        {props.curr_presale.supply? ((Number(props.curr_presale.supply) / 10 ** 18) - (Number(props.curr_presale.total_sold) / 10 ** 18)).toFixed(2): 0}

                        </p>
                      </div>

                      <div className="  tw-bg-gradient tw-rounded-lg border tw-overflow-hidden tw-my-2">
                        <div className="  tw-rounded-md  tw-bg-button-gradient tw-p-2" style={{ width: `${Number(prog_percentage)}%` }} ></div>
                      </div>

                      <div className=" tw-flex tw-justify-between tw-items-center">
                        <p className=" tw-m-0   tw-font-poppins tw-text-sm tw-text-white">
                          1 $EBM = {props.curr_presale.price
                        ? Number(props.curr_presale.price) / 10 ** 18
                        : ""}
                        </p>
                        <p className=" tw-m-0 tw-font-poppins   tw-text-sm tw-text-white">
                          Next = {Number(props.NextStagePrice)
                          ? Number(props.NextStagePrice) / 10 ** 18
                          : ""}
                        </p>
                      </div>
                    </div>

                    <div className="  tw-text-center tw-pb-4 tw-pt-0">
                      <p className=" tw-font-poppins tw-m-0 tw-text-white">
                        Your Purchased $EBM = {Number(props.EBMBalance)
                          ? (Number(props.EBMBalance) / 10 ** 18).toFixed(2)
                          : ""}  
                      </p>
                      <p className=" tw-font-poppins tw-m-0 tw-text-white">
                        Your Staked $EBM = {Number(props.totalInvestment)
                          ?(Number(props.totalInvestment) / 10 ** 18).toFixed(2)
                          : ""}  
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
                            // defaultValue={0}

                            type="Number"
                            disabled={props.perTokenIn_Matic > 0 ? false : true}
                            min={0}
                            value={payAmount}
                            onChange={(e) => {
                              set_payAmount(e.target.value);
                              onPay(e.target.value);
                            }}

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
                            // defaultValue={0}
                            type="number"
                            disabled={props.perTokenIn_Matic > 0 ? false : true}
                            value={receiveAmount}
                            min={0}
                            onChange={(e) => {
                              set_receiveAmount(e.target.value);
                              onRecieve(e.target.value);
                            }}
                          />
                          <div className=" tw-absolute tw-right-3  tw-top-2">
                            <img
                              src={require("../../assets/images/ebm_token_logo.png")}
                              className=" tw-w-6"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className=" tw-flex tw-items-center tw-justify-between tw-py-5">
                      <p className=" tw-m-0 tw-text-white  sm:tw-text-base tw-text-sm tw-font-poppins" style={{ fontSize:"13px" }}>
                        Choose Staking Period (ROI):
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
                            4%
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
                            15%
                          </span>{" "}
                        </button>
                      </div>
                    </div>

                    <div className=" tw-flex tw-justify-between tw-items-center">
                      <p className=" tw-m-0 tw-font-poppins sm:tw-text-base tw-text-md tw-text-white" style={{ fontSize:"13px" }} >
                        Tokens after staking period:
                      </p>
                      <p className=" tw-m-0 tw-text-white tw-font-poppins">
                      {Number(rewardAmount)} $EBM
                      </p>
                    </div>
                    {isDisconnected?
                    (
                      <div className="tw-gap-1 tw-pt-3">
                      <Button
                      onClick={() => open()}
                        label={"Connect Wallet"}
                        className={"  tw-py-1 tw-w-full"}
                      />
                    <p className=" tw-text-white tw-text-center tw-pt-2 tw-font-poppins tw-font-semibold tw-text-sm" >For best experience use dApp browser</p>

                    </div>

                    ):(

                      <div className=" sm:tw-flex tw-gap-3 tw-pt-2" >
                      <Button
                      onClick={()=>buy_token("0")}
                        label={ isConfirming&& option=="0"? ("Processing..."): ("Buy & Claim") }
                        className={"tw-my-3  tw-py-1 tw-w-full"  } 
                      />
                      <Button
                        onClick={()=>buy_token("1")}
                        label={ isConfirming && option=="1" ? ("Processing..."): ("Buy & Stake") }
                        className={" tw-my-3 tw-py-1 tw-w-full"} 
                      />
                      <Button
                      onClick={() => open()}
                        label={"Disconnnect"}
                        className={" tw-my-3 tw-py-1 tw-w-full"}
                      />
                    </div>


                    )
                    
                  }
                    {/* <div className=" tw-flex tw-gap-3 tw-pt-2">
                      <Button
                      onClick={()=>buy_token("0")}
                        label={"Buy Now"}
                        className={"  tw-py-1 tw-w-full"}
                      />
                      <Button
                        onClick={()=>buy_token("1")}
                        label={"Buy & Stake"}
                        className={"  tw-py-1 tw-w-full"}
                      />
                    </div> */}

                    <div className=" tw-text-center  tw-pt-8">
                    {/* <p className=" tw-text-white  tw-font-poppins tw-font-semibold tw-text-sm" >For best experience use dApp browser</p> */}

                      <h1 className=" tw-text-white  tw-font-poppins tw-font-semibold tw-text-sm">
                        Launch On
                        <span className="gradient-text"> UniSwap </span>
                        And
                        <span className="gradient-text"> QuickSwap </span>
                        Soon
                      </h1>
                    </div>
                  </div>
                  )}

                </div>
              </div>
            ) : (
              <VideoPlayer src={require("../../assets/images/ebm.mp4")} />
            )}
          </div>
        </div>
      </div>

      <div></div>
      <ToastContainer />

    </div>
  );
};

export default Hero;
