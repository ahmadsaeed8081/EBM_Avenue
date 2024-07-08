import React from 'react';
import Hero from '../../components/hero';
import Vision from '../../components/vision';
import Brands from '../../components/Brands';
import Footer from '../../components/footer';
import Team from '../../components/Team';
import FAQ from '../../components/FAQ';
import Tokenomics from '../../components/tokenomics';
import RoadMap from '../../components/RoadMap';
const Home = (props) => {
  return (
    <div className=' tw-overflow-x-hidden'>
      <Hero totalInvestment={props.totalInvestment} total_raised={props.total_raised} USDCBalance={props.USDCBalance}  NextStagePrice={props.NextStagePrice} test={props.test} MATICBalance={props.MATICBalance} EBMBalance={props.EBMBalance} USDTBalance={props.USDTBalance} curr_time={props.curr_time} curr_stage={props.curr_stage} curr_StageTime={props.curr_StageTime}  curr_presale={props.curr_presale} perTokenIn_Matic={props.perTokenIn_Matic}  />
    <div className=' tw-overflow-x-hidden'>
    <Brands/>
    </div>
      <Vision />
      <Tokenomics/>
      <RoadMap/>
      <Team/>
      <FAQ/>
      <Footer/>
    </div>
  );
};

export default Home;