import React, { useMemo } from 'react';
import styled from 'styled-components';
import MetamaskFox from '../../../assets/img/metamask-fox.svg';
import BBomb from '../../../assets/img/bomb-200x200.png';
import BShare from '../../../assets/img/bshare-200x200.png';
import BBond from '../../../assets/img/bbond.png';
import BBitcoin from '../../../assets/img/bomb-bitcoin-LP.png'
import useBombFinance from '../../../hooks/useBombFinance';
import useTokenBalance from '../../../hooks/useTokenBalance';
import { getDisplayBalance } from '../../../utils/formatBalance';
import useBondsPurchasable from '../../../hooks/useBondsPurchasable';
import useBondStats from '../../../hooks/useBondStats';

const InvestDivSmall = () => {
  const bombFinance = useBombFinance();
  const bbondBalance = useTokenBalance(bombFinance.BBOND);
  const displayBbondBalance = useMemo(() => getDisplayBalance(bbondBalance, 18, 2), [bbondBalance]);

  const bondsPurchasable = useBondsPurchasable();
  const bondStat = useBondStats();

  const isBondPurchasable = useMemo(() => Number(bondStat?.tokenInFtm) < 1.01, [bondStat]);

  return (
    <>
    <InvestmentDivSmall>
      <div style={{display:'flex',}}>
        <img alt="bbont" style={{ width: '50px', height:'50px' }} src={BBond} />
        <div className='topHead'>
          <div className='topHeading'>Bonds</div>
          <div className='topDesc'>BBOND can be purchased only on contraction periods, when TWAP of BOMB is below 1</div>
        </div>
      </div>
      <div className='stockInfo'>
        <div className='info'>
          <div className='infoTitle'>Current Price: (Bomb)^2</div>
          <div className='infoValue'>BBond = {Number(bondStat?.tokenInFtm).toFixed(4) || '-'}</div>
        </div>
        <div className='info'>
          <div className='infoTitle'>Available to redeem: </div>
          <div className='infoValue'><img alt="bbont" style={{ width: '40px', height:'40px' }} src={BBond} />{getDisplayBalance(bondsPurchasable, 18, 4)}</div>
        </div>
        <div className='options'>
          <div className='purchase'>
            <div>
              <div className='optionTitle'>Purchase BBond</div>
              <div className='optionDesc'>{
                    !isBondPurchasable
                      ? 'BOMB is over peg'
                      : getDisplayBalance(bondsPurchasable, 18, 4) + ' BBOND available for purchase'
                  }</div>
            </div>
            <div className='optionBtn'>Purchase</div>
          </div>
          <div className='redeem'>
            
          <div className='optionTitle'>Redeem Bomb</div>
          <div className='optionBtn'>Redeem</div>
          </div>
        </div>
      </div>
      
    </InvestmentDivSmall>
    </>
  );
};



const InvestmentDivSmall = styled.div`
  /* border: 1px solid red; */
  margin-top : 2rem;
  border-radius: 10px;
  backdrop-filter: blur(5px);
  width: 90%;
  padding: 1rem 2rem;
  background-color: #e5e5e514;
  color:white;

  .topHeading{
    font-weight: bold;
    font-size:20px;
    padding-left:1rem;
  }
  .topDesc{
    font-size:14px;
    padding-left:1rem;
  }
  .stockInfo{
    display:flex;
    width:100%;
    margin-top:1rem;
  }
  .info{
    width:25%;
  }
  .infoTitle{
    font-weight:200;
    padding-bottom:1rem;
  }
  .infoValue{
    font-size:20px;
    padding-bottom:1rem;
  }
  .options{
    width:50%;
    padding-left:10rem;
  }
  .purchase{
    display:flex;
    justify-content: space-between;
    border-bottom:1px solid;
  }
  .optionTitle{
    font-size:15px;
  }
  .optionDesc{
    font-size:10px;
    padding-bottom:1rem;
  }
  .optionBtn{
    padding-left:1rem;
    padding-right:1rem;
    padding-top:0.5rem;
    margin:0.5rem;
    border: 1px solid;
    border-radius:100px;
    font-size:12px;
    text-align:center;
    cursor: pointer;
  }
  .optionBtn:hover{
    background: white;
    color: black;
  }
  .redeem{
    display:flex;
    justify-content: space-between;
    margin-top:1rem;
  }
`;

export default InvestDivSmall;
