import React from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'
const OurVission = () => {
  return (
    <>




    <div className=' tw-bg-center   tw-relative  tw-bg-black tw-bg-cover tw-w-full  tw-h-auto'>
    <Header/>
      <div className=' container tw-py-16 tw-mx-auto '>


        <div  className=' row'>
            <div className='col-md-7'>
            <h1 className=" tw-flex  tw-gap-2 tw-items-center tw-text-white  gradient-text tw-font-semibold md:tw-text-[45px] tw-text-[35px]">
            
             Vision  <p className=' m-0  tw-bg-[#2596EF] tw-h-[1px]  tw-w-80'></p>
          
            </h1>
            <ul  className=' tw-leading-8 p-0'>
            <li>
              <p className=' tw-text-white sm:tw-text-left tw-text-center'>In the area of cryptocurrency mining, we’d like to revolutionize the industry, combine cutting-edge technology, sustainable practices, and community-driven initiatives to create a more efficient, profitable, and inclusive mining ecosystem.</p>
            </li>
            <li>
              <p className=' tw-text-white sm:tw-text-left tw-text-center'> At present, beside the poor reputation for crypto mining activities due to environmental impacts, some of the challenges faced by the crypto mining sector include energy consumption, internet bandwidth, hardware limitations and market volatility on top of none to limited profits through use of cloud mining platforms.</p>
            </li>
            <li>
              <p className=' tw-text-white sm:tw-text-left tw-text-center'>We envision our mining activities setting new benchmarks for efficiency and sustainability; using renewable sources of energy, modern hardware, profit switching mechanisms, thereby minimizing on our carbon footprint while maximizing our mining output.</p>
            </li>
            <li>
              <p className=' tw-text-white sm:tw-text-left tw-text-center'>we are optimistic about a future of crypto where mining will be seen as not only being profitable but also conscious of the environment around it, with better technology in place and socially responsible as well.</p>
            </li>
        </ul>
            </div>
            <div className='col-md-5'>
                <img src={require('../../assets/images/Union.png')} className=' tw-w-full ' style={{ height:"560px" }} />
            </div>
        </div>

        <div className=' tw-gap-4 tw-items-center tw-my-6 tw-flex tw-border-2 tw-rounded-2xl tw-p-5  tw-w-full tw-border-[#2596EF]'>
          <div className=' tw-border-r-2 tw-border-[#2596EF]'>
          <div className=' tw-px-8'>
          <img src={require('../../assets/images/third_logo.png')} className=' tw-w-80' />
          </div>
          </div>
          <div className=' px-2'>
            <p className=' tw-text-white tw-pt-2 tw-text-lg	sm:tw-text-left tw-text-center'>Our vision goes beyond classical approaches to mining; instead, we intend to enable individuals to take part in this green mining initiative and benefit through holding and staking tokens for crypto discounts and rewards. And to promote 100x crypto adoption and widen utilities we are open for business partnerships to promote crypto utility and $EBM value as the all time best crypto currency to buy.</p>
          </div>
        </div>
        <ul  className=' tw-leading-8 p-0'>
            <li>
              <p className=' tw-text-white sm:tw-text-left tw-text-center'>Through partnering with other decentralized exchanges, working closely with key players in the industry and embracing regulatory clarity, we want ourselves established as one of the thought leaders in Web3 business innovation growth among others for positive changes within the world of cryptocurrencies to make EBM as the best crypto token to buy with multiple utilities.</p>
            </li>
            <li>
              <p className=' tw-text-white sm:tw-text-left tw-text-center'> It is a well-known fact that the true decentralized blockchains i.e. blockchains based on Proof of Work (PoW) consensus algorithms like Bitcoin has taught us how to be decentralized. What we see is not just about cryptocurrency miners but shaping future decentralized finance empowering communities creating a sustainable rich ecosystem offering crypto discounts that benefits everyone involved through this best crypto investment.</p>
            </li>
            <li>
              <p className=' tw-text-white sm:tw-text-left tw-text-center'>Join us now on this transformative journey through exploiting possibilities found within Cryptocurrency with sustainable practices to support crypto reputation and wider adoption while lighting up brighter connections leading towards a more connected world for crypto mining plus Blockchain tech tomorrow for sustainable journey.</p>
            </li>
        </ul>
      </div>
    </div>

    <Footer/>
    </>
  )
}

export default OurVission
