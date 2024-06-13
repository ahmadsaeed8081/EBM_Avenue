import React from 'react';
import Hero from '../../components/hero';
import Vision from '../../components/vision';
import Brands from '../../components/Brands';
import Footer from '../../components/footer';
import Team from '../../components/Team';
import FAQ from '../../components/FAQ';
import Tokenomics from '../../components/tokenomics';
import RoadMap from '../../components/RoadMap';
const Home = () => {
  return (
    <div className=' tw-overflow-x-hidden'>
      <Hero />
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