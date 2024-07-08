import React,{useState,useEffect} from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Home from './components/Home'
import Home from './screens/home';
import Buy4less from './screens/buy4less';
import Stake4pie from './screens/Stake4pie';
import Staking from './screens/Staking';


import Web3 from "web3";

import {useNetwork,  useSwitchNetwork } from 'wagmi'
import { useAccount, useDisconnect } from 'wagmi'


function RouteConfig() {





  return <>
    <BrowserRouter>
    <div className=''>
     <Routes>
      <Route path='/'  element={<Home/>} />
      <Route path='/swap4less'  element={<Buy4less/>} />
      <Route path='/stake4More'  element={<Stake4pie/>} />
      <Route path='/staking'  element={<Staking/>} />
     </Routes>
    </div>
    </BrowserRouter>
  </>
}
  
  export default RouteConfig;
