
import { Route, Routes } from 'react-router-dom';
// import Routes from "./Route.js";

import './App.css';
import Home from './screens/home';
import Buy4less from './screens/buy4less';
import Stake4pie from './screens/Stake4pie';
import Staking from './screens/Staking';
import React, { useEffect, useState } from "react";
import OurVission from './screens/overVission';





import {
  staking_address,
  usdt_address,
  usdc_address,
  ebm_address,
  staking_abi,
  token_abi,
  presale_address,
  presale_abi,
} from "../src/configs/Contracts";
import { useAccount, useDisconnect } from "wagmi";
import Web3 from "web3";
import { IoAlertCircle } from 'react-icons/io5';

function App() {

  const [openSidebar, setOpenSidebar] = useState(false);
  var activeUser = localStorage.getItem("_user");
  const [user, setUser] = useState(false);







  const [totalReward, set_totalReward] = useState(0);
  const [totalwithdraw, set_totalwithdraw] = useState(0);

  const [totalusers, set_totalusers] = useState(0);
  const [totalbusiness, set_totalbusiness] = useState(0);
  const [totalInvestment, set_totalInvestment] = useState(0);
  const [totalEarning, set_totalEarning] = useState(0);
  const [USDTBalance, set_TokenBalance] = useState(0);
  const [USDCBalance, set_USDCBalance] = useState(0);

  const [EBMBalance, set_EBMBalance] = useState(0);
  const [MATICBalance, set_MATICBalance] = useState(0);


  const [choosed_Unstake_inv, set_choosed_Unstake_inv] = useState();
  const [allInvestments, set_investmentList] = useState([]);
  const [allInvestments_reward, set_allInvestments_reward] = useState([]);

  const [launch, set_launch] = useState(false);
  const [total_raised, set_totalRaised] = useState([]);
  const [curr_time, set_curr_time] = useState();
  const [min_stake, set_min_stake] = useState(0);

  const [curr_stage, set_curr_stage] = useState();
  const [curr_StageTime, set_curr_StageTime] = useState(0);
  const [curr_presale, set_curr_presale] = useState([]);
  const [perTokenIn_Matic, set_perTokenIn_Matic] = useState(0);
  const [NextStagePrice, set_NextStagePrice] = useState();


  const { address, isConnecting ,isDisconnected,isConnected} = useAccount()
  let count=0


 
useEffect(()=>{
  if((count==0))
  {
    count++;

      test();
  }

},[address])





  async function test(){
    const web3= new Web3(new Web3.providers.HttpProvider("https://polygon-bor-rpc.publicnode.com"));
  
              
    const staking_contract=new web3.eth.Contract(staking_abi,staking_address);
    const presale_contract=new web3.eth.Contract(presale_abi,presale_address);
    const USDT_contract=new web3.eth.Contract(token_abi,usdt_address);
    const USDC_contract=new web3.eth.Contract(token_abi,usdc_address);

    const EBM_contract=new web3.eth.Contract(token_abi,ebm_address);
    let USDTBalance;
    let USDCBalance;

    let EBMBalance;
    let totalReward;
    let totalEarning;
    let user;
    let allInvestments;
    let allInvestments_reward;

    let balance;
    
    if(isConnected)
    {
       balance  =await  web3.eth.getBalance(address)

       USDTBalance = await USDT_contract.methods.balanceOf(address).call(); 
       USDCBalance = await USDC_contract.methods.balanceOf(address).call();    
   
       EBMBalance = await EBM_contract.methods.balanceOf(address).call();    
  
       totalReward = await staking_contract.methods.get_TotalReward().call({ from: address });   
       totalEarning = await staking_contract.methods.get_TotalReward().call({ from: address }); 
       user = await staking_contract.methods.user(address).call();      
       allInvestments = await staking_contract.methods.getAll_investments().call({from: address});
       allInvestments_reward = await staking_contract.methods.getAll_investments_forReward().call({from: address});

    }

    //presale

    let curr_stage = await presale_contract.methods.get_curr_Stage().call();    
    let launch = await presale_contract.methods.launch_start().call();    

    let curr_StageTime = await presale_contract.methods.get_curr_StageTime().call();    
    let perTokenIn_Matic = await presale_contract.methods.get_MaticPrice().call();    

    // let curr_timePresale = await presale_contract.methods.curr_time().call();  
    let totalraised = await presale_contract.methods.total_raised().call();    
    // let totalraised;
    let curr_presale = await presale_contract.methods.presale(Number(curr_stage)).call(); 

    let NextStage;

    if(curr_stage < 2)
    {       
      NextStage = await presale_contract.methods.presale(Number(curr_stage)+1).call();    
      set_NextStagePrice(NextStage.price)

    }   


    //staking 

    let currTime = await staking_contract.methods.get_currTime().call();    
    let totalusers = await staking_contract.methods.totalusers().call();    

    let totalbusiness = await staking_contract.methods.getTotalInvestment().call();
    
    
    set_MATICBalance(balance)
    set_curr_stage(curr_stage)
    set_curr_StageTime(curr_StageTime)
    set_curr_presale(curr_presale)
    set_perTokenIn_Matic(perTokenIn_Matic)
    set_totalRaised(totalraised)
    set_launch(launch)
    set_totalEarning(totalEarning);
    set_curr_time(currTime)
    set_TokenBalance(USDTBalance);
    set_USDCBalance(USDCBalance);

    set_EBMBalance(EBMBalance);
    set_totalInvestment(user?user[1]:0)
    set_totalwithdraw(user?user[2]:0)

    set_totalbusiness(totalbusiness)
    set_min_stake(0)
    set_totalusers(totalusers)
    set_investmentList(allInvestments);
    set_allInvestments_reward(allInvestments_reward)
    // setSelectedAmount(allInvestments[0]);
    if(allInvestments!=null)
    {
      if(allInvestments[0])
      {
        set_choosed_Unstake_inv(allInvestments[0][3])
  
      }   
    }
 
    set_totalReward(totalReward);


  }  


  return (

    <div className=''>
     <Routes>
      <Route path='/'  element={<Home launch={launch} totalInvestment={totalInvestment} total_raised={total_raised} USDCBalance={USDCBalance}  NextStagePrice={NextStagePrice} test={test} MATICBalance={MATICBalance} EBMBalance={EBMBalance} USDTBalance={USDTBalance} curr_time={curr_time} curr_stage={curr_stage} curr_StageTime={curr_StageTime}  curr_presale={curr_presale} perTokenIn_Matic={perTokenIn_Matic} />}/>
      <Route path='/swap4less'  element={<Buy4less/>} />
      <Route path='/stake4More'  element={<Stake4pie/>} />
      <Route path='/stake4More'  element={<Stake4pie/>} />
      <Route path='/vision'  element={<OurVission/>} />
      <Route path='/staking'  element={<Staking totalwithdraw={totalwithdraw} totalEarning={totalEarning} allInvestments_reward = {allInvestments_reward} totalInvestment={totalInvestment} EBMBalance={EBMBalance} curr_time={curr_time} min_stake={min_stake}  allInvestments={allInvestments}  test={test} />} />
     </Routes>
    </div>
  );
}

export default App;
