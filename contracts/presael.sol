//SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

interface TOKEN
{
    function transfer(address to, uint tokens) external returns (bool success);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool) ;
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);

    }

interface Staking
{
    function BuyAndStake(address _add,uint _investedamount,uint choose_val) external  returns(bool );
    
    }
    

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract EBM_Avenue_Presale
    {


        struct Presale_stages{

            uint price;
            uint endTime;
            uint supply;
            // uint min_purchase;
            uint total_sold;
            uint amount_raised;

        }

        mapping(uint=>Presale_stages) public presale;

        address payable public owner=payable(0x4e28A7871B33C8358A5A116f62696d073BEc4670);
        uint public total_soldSupply;
        uint public total_stages=3;
        uint public total_raised;



        uint public min_amount=1;

        address public USDT_token=0x341343568948459e5b7017eDDb05110cfA3EF699;
        address public USDC_token=0x341343568948459e5b7017eDDb05110cfA3EF699;

        address public EBM_token=0x9092962cfdbF63147e0DBe03CA3e39c4BFC8324E;
        address public staking_add =0x929B31945C857f7faBE950a336bA078E99Dc6df6;

        uint[3] price_arr=[0.062 ether, 0.072 ether, 0.1 ether];
        uint[3] supply_arr=[16000000 ether, 14000000 ether, 10000000 ether];

        AggregatorV3Interface internal priceFeed = AggregatorV3Interface(0xAB594600376Ec9fD91F8e885dADF0CE036862dE0);

        constructor()
        {
            // owner=payable(msg.sender);
            // priceFeed =  //Mainnet
            
            for(uint i=0;i<3;i++)
            {
                presale[i].price = price_arr[i];
                presale[i].supply = supply_arr[i];
                presale[i].endTime = block.timestamp + ( 7 days * (i+1));

            }
            
        }
        


        function getLatestPrice() public view returns (int) {
            // prettier-ignore
            (
                /* uint80 roundID */,
                int price,
                /*uint startedAt*/,
                /*uint timeStamp*/,
                /*uint80 answeredInRound*/
            ) = priceFeed.latestRoundData();
            return price*10**10;
            }



        function getConversionRate(int dollar_amount) public view returns (int) {

            int MaticPrice = getLatestPrice();
            int UsdToMatic = (( dollar_amount *10**18 ) / (MaticPrice));

            return UsdToMatic;

        }


        function get_curr_Stage()  public view returns(uint ){
            uint curr_stage=2;

            for(uint i=0;i<total_stages;i++)
            {
               if( block.timestamp <= presale[i].endTime )
               {
                    curr_stage=i;
                    i=total_stages;
               }
            }
            return curr_stage;
        }


        function get_curr_StageTime()  public view returns(uint ){
            uint curr_stageTime=2;

            for(uint i=0;i<total_stages;i++)
            {
               if( block.timestamp <= presale[i].endTime )
               {
                    curr_stageTime = presale[i].endTime;
                    i=total_stages;
               }
            }
            return curr_stageTime;
        }


        function get_MaticPrice()  public view returns(uint ){
            uint price;
            uint curr_stage = get_curr_Stage();
            price = uint256(getConversionRate( int256(presale[curr_stage].price)));

            return price;

        }



        function buy_token(uint amount , uint choosed_token, uint choosed_option , uint staking_option)  public payable returns(bool){
            
            require(choosed_token >=0 && choosed_token <=2);
            require(choosed_option ==0 || choosed_option ==1);   //0 mean buy and 1 mean buy and stake
            require(staking_option ==0 || staking_option ==1);   //0 mean 1. month satking and 1 mean 3 month stake

            uint curr_stage = get_curr_Stage();
            // require(amount >= presale[curr_stage].min_purchase);
            uint bought_token;

            if(choosed_token==0)             // MATIC
            {
                 bought_token = (msg.value *10**18) / get_MaticPrice();
                require(TOKEN(EBM_token).balanceOf(address(this)) >= bought_token);
                
                presale[curr_stage].total_sold+=bought_token;
                total_soldSupply+=bought_token;
                owner.transfer(msg.value);  
                   
                if(choosed_option==0)
                {
                    TOKEN(EBM_token).transfer(msg.sender,bought_token);
                }
                else{
                    
                    TOKEN(EBM_token).transfer(staking_add,bought_token);
                    Staking(staking_add).BuyAndStake(msg.sender,bought_token,staking_option);

                }




            }
            else if(choosed_token==1)        // USDT
            {
                 bought_token = (amount*10**18) / presale[curr_stage].price;

                require(TOKEN(USDT_token).balanceOf(msg.sender) >= amount/10**12 ,"not enough usdt");
                require(TOKEN(USDT_token).allowance(msg.sender,address(this))>= amount/10**12 ,"less allowance");    //uncomment

                require(TOKEN(EBM_token).balanceOf(address(this)) >= bought_token,"contract have less tokens");
                
                presale[curr_stage].total_sold+=amount;
                total_soldSupply+=amount;


                TOKEN(USDT_token).transferFrom(msg.sender,owner,amount/10**12);

                if(choosed_option==0)
                {
                    TOKEN(EBM_token).transfer(msg.sender,bought_token);
                }
                else{
                    
                    TOKEN(EBM_token).transfer(staking_add,bought_token);
                    Staking(staking_add).BuyAndStake(msg.sender,bought_token,staking_option);

                }

            }
            else if(choosed_token==2)        // USDC
            {

                bought_token = (amount*10**18) / presale[curr_stage].price;

                require(TOKEN(USDC_token).balanceOf(msg.sender) >= amount/10**12 ,"not enough usdt");
                require(TOKEN(USDC_token).allowance(msg.sender,address(this))>= amount/10**12 ,"less allowance");    //uncomment

                require(TOKEN(EBM_token).balanceOf(address(this)) >= bought_token,"contract have less tokens");
                
                presale[curr_stage].total_sold+=amount;
                total_soldSupply+=amount;


                TOKEN(USDC_token).transferFrom(msg.sender,owner,amount/10**12);

                if(choosed_option==0)
                {
                    TOKEN(EBM_token).transfer(msg.sender,bought_token);
                }
                else{
                    
                    TOKEN(EBM_token).transfer(staking_add,bought_token);
                    Staking(staking_add).BuyAndStake(msg.sender,bought_token,staking_option);

                }

            }
            total_raised += (((presale[curr_stage].price * bought_token)/10**18)/10**12);
            presale[curr_stage].amount_raised += (((presale[curr_stage].price * bought_token)/10**18)/10**12);

            return true;
        }

        function transferOwnership(address _owner)  public
        {
            require(msg.sender==owner);
            owner = payable(_owner);
        }


        function update_currPhase_price(uint _price)  public
        {
            require(msg.sender==owner);
            uint curr_stage=get_curr_Stage();
            presale[curr_stage].price=_price;
        }

        function increase_currPhase_time(uint _days)  public
        {
            require(msg.sender==owner);
            uint curr_stage=get_curr_Stage();
            for(uint i=curr_stage;i<total_stages;i++)
            {
                presale[i].endTime += ( _days * 1 days);
            }
        }

        function curr_time() public view returns(uint){

            return block.timestamp;

        }

        function update_staking_Address(address _add)  public
        {
            require(msg.sender==owner,"only Owner can call this function");
            staking_add = _add;
        }

       function withdraw_EBM(uint _amount)  public
        {
            require(msg.sender==owner);
            uint bal = TOKEN(EBM_token).balanceOf(address(this));
            require(bal>=_amount);
            TOKEN(EBM_token).transfer(owner,_amount); 
        }


    }