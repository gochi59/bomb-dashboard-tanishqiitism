import React, { useMemo } from 'react';
import styled from 'styled-components';
import BShare from '../../../assets/img/bshare-200x200.png';
import BBitcoin from '../../../assets/img/bomb-bitcoin-LP.png'
import useEarnings from '../../../hooks/useEarnings';
import useHarvest from '../../../hooks/useHarvest';
import useBombStats from '../../../hooks/useBombStats';
import useShareStats from '../../../hooks/usebShareStats';
import { getDisplayBalance } from '../../../utils/formatBalance';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useStakedBalance from '../../../hooks/useStakedBalance';
import useStakedTokenPriceInDollars from '../../../hooks/useStakedTokenPriceInDollars';
import useRedeem from './../../../hooks/useRedeem';
import useBank from '../../../hooks/useBank';

const InvestDivLarge = ({ bankBtcb, bankBnb, account, statsOnPoolBtcb, statsOnPoolBnb }) => {
  // Earnings
  const bank = useBank()
  const {onRedeem} = useRedeem(bank)
  const earningsBtcb = useEarnings(bankBtcb.contract, bankBtcb.earnTokenName, bankBtcb.poolId);
  const {onReward:onRewardBtcb} = useHarvest(bankBtcb);
  const bombStatsBtcb = useBombStats();
  const tShareStatsBtcb = useShareStats();

  const tokenNameBtcb = bankBtcb.earnTokenName === 'BSHARE' ? 'BSHARE' : 'BOMB';
  const tokenStatsBtcb = bankBtcb.earnTokenName === 'BSHARE' ? tShareStatsBtcb : bombStatsBtcb;
  const tokenPriceInDollarsBtcb = useMemo(
    () => (tokenStatsBtcb ? Number(tokenStatsBtcb.priceInDollars).toFixed(2) : null),
    [tokenStatsBtcb],
  );
  const earnedInDollarsBtcb = (Number(tokenPriceInDollarsBtcb) * Number(getDisplayBalance(earningsBtcb))).toFixed(2);

  const earningsBnb = useEarnings(bankBnb.contract, bankBnb.earnTokenName, bankBnb.poolId);
  const {onReward:onRewardBnb} = useHarvest(bankBnb);
  const bombStatsBnb = useBombStats();
  const tShareStatsBnb = useShareStats();

  const tokenNameBnb = bankBnb.earnTokenName === 'BSHARE' ? 'BSHARE' : 'BOMB';
  const tokenStatsBnb = bankBnb.earnTokenName === 'BSHARE' ? tShareStatsBnb : bombStatsBnb;
  const tokenPriceInDollarsBnb = useMemo(
    () => (tokenStatsBnb ? Number(tokenStatsBnb.priceInDollars).toFixed(2) : null),
    [tokenStatsBnb],
  );
  const earnedInDollarsBnb = (Number(tokenPriceInDollarsBnb) * Number(getDisplayBalance(earningsBnb))).toFixed(2);

  // Staked
  const stakedBalanceBtcb = useStakedBalance(bankBtcb.contract, bankBtcb.poolId);
  const stakedTokenPriceInDollarsBtcb = useStakedTokenPriceInDollars(bankBtcb.depositTokenName, bankBtcb.depositToken);
  const tokenPriceInDollarsBtcbStaked = useMemo(
    () => (stakedTokenPriceInDollarsBtcb ? stakedTokenPriceInDollarsBtcb : null),
    [stakedTokenPriceInDollarsBtcb],
  );
  const stakedInDollarsBtcb = (
    Number(tokenPriceInDollarsBtcbStaked) * Number(getDisplayBalance(stakedBalanceBtcb, bankBtcb.depositToken.decimal))
  ).toFixed(2);

  const stakedBalanceBnb = useStakedBalance(bankBnb.contract, bankBnb.poolId);
  const stakedTokenPriceInDollarsBnb = useStakedTokenPriceInDollars(bankBnb.depositTokenName, bankBnb.depositToken);
  const tokenPriceInDollarsBnbStaked = useMemo(
    () => (stakedTokenPriceInDollarsBnb ? stakedTokenPriceInDollarsBnb : null),
    [stakedTokenPriceInDollarsBnb],
  );
  const stakedInDollarsBnb = (
    Number(tokenPriceInDollarsBnbStaked) * Number(getDisplayBalance(stakedBalanceBnb, bankBnb.depositToken.decimal))
  ).toFixed(2);

  return (
    <>
    <InvestmentDivLarge>
        <div style={{ width:'100%'}}>
          <div className='topHead'>
              <div className='topHeading'>
                <div className='topTitle'>Bomb Farms</div>
                <div className='topDesc'>Stake your LP tokens in our farms to start earning $BSHARE</div>
              </div>
            <div className='rewardBtn'>Claim Rewards</div>
          </div>
          <div className='portfolio'>
            <div className='compHead'>
              <div style={{display:'flex'}}>
                <img alt="bbont" style={{ width: '40px' }} src={BBitcoin} />
                <div className='compName'>BOMB_BTCB</div>
              </div>
                <div className='tvl'>TVL: ${statsOnPoolBtcb?.TVL}</div>
              
            </div>
            <div className='stockInfo'>
              <div className='returns'>Daily Returns: {account && bankBtcb ? (bankBtcb.closedForStaking) ? '0.00' : statsOnPoolBtcb?.dailyAPR : '0.00'}%</div>
              <div className='stake'>Your Stake: <img alt="bbont" style={{ width: '20px' }} src={BBitcoin} />
                {getDisplayBalance(stakedBalanceBtcb, bankBtcb.depositToken.decimal)}{`≈ $${stakedInDollarsBtcb}`}
              </div>
              <div className='earnings'>Earned: <img alt="bbont" style={{ width: '20px' }} src={BShare} />
                {getDisplayBalance(earningsBtcb)} {`≈ $${stakedInDollarsBtcb}`}</div>
              <div className='stockActions'>
                  {/* <div className='actionBtn'>Deposit</div> */}
                  {/* <div className='actionBtn'>Withdraw</div> */}
                <div className='actionBtn' onClick={onRedeem}>Claim Rewards</div>
              </div>
            </div>
          </div>
          <div style={{border:'1px solid gray'}}></div>
          <div className='portfolio'>
          <div className='compHead'>
              <div style={{display:'flex'}}>
                <img alt="bbont" style={{ width: '40px' }} src={BBitcoin} />
                <div className='compName'>BSHARE-BNB</div>
              </div>
                <div className='tvl'>TVL: ${statsOnPoolBnb?.TVL}</div>
              
            </div>
            <div className='stockInfo'>
              <div className='returns'>Daily Returns:  {account && bankBnb ? (bankBnb.closedForStaking) ? '0.00' : statsOnPoolBnb?.dailyAPR : '0.00'}%</div>
              <div className='stake'>Your Stake: <img alt="bbont" style={{ width: '20px' }} src={BBitcoin} />
                {getDisplayBalance(stakedBalanceBnb, bankBnb.depositToken.decimal)}{`≈ $${stakedInDollarsBnb}`}
              </div>
              <div className='earnings'>Earned: <img alt="bbont" style={{ width: '20px' }} src={BShare} />
               {getDisplayBalance(earningsBnb)} {`≈ $${earnedInDollarsBnb}`}
              </div>
              <div className='stockActions'>
                  {/* <div className='actionBtn'>Deposit</div> */}
                  {/* <div className='actionBtn'>Withdraw</div> */}
                <div className='actionBtn' onClick={onRedeem}>Claim Rewards</div>
              </div>
            </div>
          </div>
        </div>
    </InvestmentDivLarge>

    
    </>
  );
};






const InvestmentDivLarge = styled.div`
  /* border: 1px solid red; */
  margin-top : 2rem;
  border-radius: 10px;
  backdrop-filter: blur(5px);
  width: 90%;
  padding: 1rem 2rem;
  background-color: #e5e5e514;
  color:white;

  .topHead{
    display:flex;
    justify-content: space-between;
  }
  .rewardBtn{
    padding-left:1rem;
    padding-right:1rem;
    padding-top:0.5rem;
    padding-bottom:0.5rem;
    height:100%;
    margin:0.5rem;
    border: 1px solid;
    border-radius:100px;
    font-size:12px;
    text-align:center;
  }
  
  .topTitle{
    font-size:1.5rem;
    font-weight:bold;
    padding-left:1rem;
    padding-bottom:0.5rem;
  }
  .topDesc{
    display:flex;
    padding-left:1rem;
  }
  .portfolio{
    margin-top:1rem;
  }
  .compHead{
    display:flex;
    justify-content: space-between;
    
  }
  .compName{
    font-size:18px;
    font-weight: bold;
    margin-left:1rem;
    padding-top:0.5rem;
    border-bottom:1px solid;
  }
  .stockInfo{
    display:flex;
    width:100%;
  }
  .returns{
    width:20%;
    padding:1rem;
  }
  .stake{
    width:20%;
    padding:1rem;
  }
  .earnings{
    width:20%;
    padding:1rem;
  }
  .stockActions{
    width:40%;
    text-align:right;
    display:flex;
    height:3rem;
  }
  .actionBtn{
    padding-left:1rem;
    padding-right:1rem;
    padding-top:0.5rem;
    margin:0.5rem;
    border: 1px solid;
    border-radius:100px;
    font-size:12px;
    cursor: pointer;
    text-align:center;
  }
  .actionBtn:hover{
    background: white;
    color: black;
  }
`;


export default InvestDivLarge;
