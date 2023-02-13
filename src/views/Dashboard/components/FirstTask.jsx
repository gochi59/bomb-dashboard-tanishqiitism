import React, { useMemo } from 'react';
import styled from 'styled-components';
import MetamaskFox from '../../../assets/img/metamask-fox.svg';
import BBomb from '../../../assets/img/bomb-200x200.png';
import BShare from '../../../assets/img/bshare-200x200.png';
import BBond from '../../../assets/img/bbond.png';
import { roundAndFormatNumber } from '../../../0x';
import useBombStats from '../../../hooks/useBombStats';
import useShareStats from '../../../hooks/usebShareStats';
import useBondStats from '../../../hooks/useBondStats';
import useCurrentEpoch from '../../../hooks/useCurrentEpoch';
import ProgressCountdown from '../../Boardroom/components/ProgressCountdown';
import moment from 'moment';
import useCashPriceInEstimatedTWAP from '../../../hooks/useCashPriceInEstimatedTWAP';
import useTreasuryAllocationTimes from '../../../hooks/useTreasuryAllocationTimes';

const FirstTask = () => {
  const bombStats=useBombStats();
  const bShareStats= useShareStats();
  const tBondStats= useBondStats();
  const bombCirculatingSupply = useMemo(() => (bombStats ? String(bombStats.circulatingSupply) : null), [bombStats]);
  const bombTotalSupply = useMemo(() => (bombStats ? String(bombStats.totalSupply) : null), [bombStats]);
  const bombPriceInDollars = useMemo(
    () => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null),
    [bombStats],
  );
  const bShareTotalSupply = useMemo(() => (bShareStats ? String(bShareStats.totalSupply) : null), [bShareStats]);

  const tBondPriceInDollars = useMemo(
    () => (tBondStats ? Number(tBondStats.priceInDollars).toFixed(2) : null),
    [tBondStats],
  );
  const bShareCirculatingSupply = useMemo(
    () => (bShareStats ? String(bShareStats.circulatingSupply) : null),
    [bShareStats],
  );
  const tBondCirculatingSupply = useMemo(
    () => (tBondStats ? String(tBondStats.circulatingSupply) : null),
    [tBondStats],
  );
  const bSharePriceInDollars = useMemo(
    () => (bShareStats ? Number(bShareStats.priceInDollars).toFixed(2) : null),
    [bShareStats],
  );
  const tBondTotalSupply = useMemo(() => (tBondStats ? String(tBondStats.totalSupply) : null), [tBondStats]);
  const currentEpoch= useCurrentEpoch();
  const { to } = useTreasuryAllocationTimes();
  const cashStat = useCashPriceInEstimatedTWAP();
  const scalingFactor = useMemo(() => (cashStat ? Number(cashStat.priceInDollars).toFixed(4) : null), [cashStat]);

  return (
    <>
    <SummaryParentDiv>
      <h3>Bomb Finance Summary</h3>
      <div className="line"></div>
      <div className='contentDiv'>
        <div className="leftDiv">
          <div className="rowDiv">  
            <span>Current Supply</span>
            <span>Total Supply</span>
            <span>Price</span>
          </div>
          <div className="line" style={{ width: '80%', marginLeft: 'auto' }}></div>
          <div className="rowDiv">
            <span className="row-img">
              <img alt="bbont" style={{ width: '20px' }} src={BBomb} />
            </span>
            <span>$BOMB</span>
            <span>{roundAndFormatNumber(bombCirculatingSupply,2)}</span>
            <span>{roundAndFormatNumber(bombTotalSupply,2)}</span>
            <span>${roundAndFormatNumber(bombCirculatingSupply * bombPriceInDollars, 2)}</span>
            <span>
              <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
            </span>
          </div>
          <div className="line"></div>
          <div className="rowDiv">
            <span className="row-img">
              <img alt="bbont" style={{ width: '20px' }} src={BShare} />
            </span>
            <span>$BSHARE</span>
            <span>{roundAndFormatNumber(bShareCirculatingSupply,2)}</span>
            <span>{roundAndFormatNumber(bShareTotalSupply,2)}</span>
            <span>${roundAndFormatNumber(bShareCirculatingSupply * bSharePriceInDollars, 2)}</span>
            <span>
              <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
            </span>
          </div>
          <div className="line"></div>
          <div className="rowDiv">
            <span className="row-img">
              <img alt="bbont" style={{ width: '20px' }} src={BBond} />
            </span>
            <span>$BBOND</span>
            <span>{roundAndFormatNumber(tBondCirculatingSupply,2)}</span>
            <span>{roundAndFormatNumber(tBondTotalSupply,2)}</span>
            <span>${roundAndFormatNumber(tBondCirculatingSupply * tBondPriceInDollars, 2)}</span>
            <span>
              <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
            </span>
          </div>
          <div className="line" style={{ width: '80%', marginLeft: 'auto' }}></div>
        </div>
        <div className="rightDiv" style={{ width: '50%' }}>
          <div>
            <h2>Current Epoch</h2>
            <h1>{Number(currentEpoch)}</h1>
          </div>
          <div className="line"></div>
          <div>
          {/* <ProgressCountdown base={moment().toDate()} hideBar={true} deadline={to} description="Next Epoch" /> */}
            <h2>Next Epoch in</h2>
            <ProgressCountdown base={moment().toDate()} hideBar={true} deadline={to} description="Next Epoch" />
          </div>
          <div className="line"></div>
          <div>
            <div>Live TWAP: <span className='greenClr'>{scalingFactor}</span></div>
            <div>TVL: <span className='greenClr'>$5002412</span></div>
            <div>Last Epoch TWAP: <span className='greenClr'>1.22</span></div>
          </div>
        </div>
      </div>
    </SummaryParentDiv>

    
    </>
  );
};

const SummaryParentDiv = styled.div`
  /* border: 1px solid red; */
  background: rgba(32, 37, 67, 0.5);
  backdrop-filter: blur(5px);
  border-radius: 10px;
  backdrop-filter: blur(5px);
  width: 90%;
  text-align: center;
  padding: 1rem 2rem;

  .contentDiv{
    display: flex;
    justify-content: space-between;
  }
  .leftDiv {
    display: flex;
    /* justify-content: center; */
    /* align-items: center; */
    font-size: 2rem;
    color: white;
    font-weight: bold;
    width: 55%;
    flex-direction: column;

    .rowDiv {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;

      span {
        display: inline-block;
        width: 15%;
        margin: 1rem 2px;
        font-size: 14px;
      }

      .row-img {
        position: absolute;
        width: max-content;
        display: flex;
        align-items: center;
        left: 5%;
      }
    }
  }
  .rightDiv {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    flex-direction: column;

    &>div:not(.line){
      margin: 0.75rem 0;
      margin-right: 2rem;
    }
    &>div>div{
      color: white;
      font-weight: bold;
      margin: 0.75rem 0;
    }

    .line{
      width: 50%;
    }
  }
  .greenClr{
    color: rgba(0, 232, 162, 1);
  }
`;

const InvestmentDiv = styled.div`
  /* border: 1px solid red; */
  margin-top : 2rem;
  border-radius: 10px;
  backdrop-filter: blur(5px);
  width: 90%;
  padding: 1rem 2rem;
  display:flex;

  .investNowDiv{
    width: 80rem;
  }
  .latestNews{
    width:50%;
    background-color: #e5e5e514;
    border-radius:10px;
    padding:1rem;
    color:white;
  }
  .investNowBtn{
    padding-top:0.5rem;
    padding-bottom:0.5rem;
    text-align:center;
    background-color: #00ADE8;
    margin-left:2rem;
    margin-right:2rem;
    margin-bottom:0.5rem;
    color:white;
    font-weight: bold;
  }
  .discordBtn{
    background-color:rgba(255, 255, 255, 0.5);
    width:50%;
    margin-left:2rem;
    margin-right:2rem;
    padding-top:0.5rem;
    padding-bottom:0.5rem;
    text-align:center;
  }

  .compPortf{
    background-color: #e5e5e514;
    margin-right:2rem;
    margin-left:2rem;
    margin-top:0.5rem;
    padding:1rem;
    border-radius:10px;
    color:white;
  }
  .topRow{
    display:flex;
  }
  .compInfo{
    border-bottom: 1px solid;
    width:100%;
  }
  .compName{
    font-size:1.5rem;
    font-weight:bold;
    padding-left:1rem;
    padding-bottom:0.5rem;
  }
  .compDetails{
    display:flex;
    padding-left:1rem;
  }
  .tvl{
    text-align:right;
    padding-left:6rem;
  }
  .totStake{
    text-align:right;
    padding-right:1rem;
    font-size:14px;
  }
  .stockInfo{
    display:flex;
    width:100%;
  }
  .returns{
    width:25%;
    padding:1rem;
  }
  .stake{
    width:25%;
    padding:1rem;
  }
  .earnings{
    width:25%;
    padding:1rem;
  }
  .stockActions{
    width:25%;
    padding:1rem;
  }
  .basicActions{
    display:flex;
    width:100%;
  }
  .actionBtn{
    padding-left:10px;
    padding-right:10px;
    margin:0.5rem;
    border: 1px solid;
    border-radius:100px;
    width:50%;
    font-size:12px;
    text-align:center;
  }
  .rewards{
    padding-left:10px;
    padding-right:10px;
    border: 1px solid;
    border-radius:100px;
    width:80%;
    font-size:12px;
    text-align:center;
    justify-content:center;
    align-items:center;
  }
`;

export default FirstTask;
