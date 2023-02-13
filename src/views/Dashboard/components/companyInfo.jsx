import React, { useMemo } from 'react';
import styled from 'styled-components';
import BShare from '../../../assets/img/bshare-200x200.png';
import BBond from '../../../assets/img/bbond.png';
import { getDisplayBalance } from '../../../utils/formatBalance';
import useEarningsOnBoardroom from '../../../hooks/useEarningsOnBoardroom';
import useBombStats from '../../../hooks/useBombStats';
import useStakedBalanceOnBoardroom from '../../../hooks/useStakedBalanceOnBoardroom';
import useBombFinance from '../../../hooks/useBombFinance';
import useApprove from '../../../hooks/useApprove';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useClaimRewardCheck from '../../../hooks/boardroom/useClaimRewardCheck';
import useStakedTokenPriceInDollars from '../../../hooks/useStakedTokenPriceInDollars';
import useUnstakeTimerBoardroom from '../../../hooks/boardroom/useUnstakeTimerBoardroom';
import { Box, Card, CardContent, Button, Typography, Grid } from '@material-ui/core';

import useRedeemOnBoardroom from '../../../hooks/useRedeemOnBoardroom';
import useCurrentEpoch from '../../../hooks/useCurrentEpoch';
import useFetchBoardroomAPR from '../../../hooks/useFetchBoardroomAPR';

import useCashPriceInEstimatedTWAP from '../../../hooks/useCashPriceInEstimatedTWAP';
import useTreasuryAllocationTimes from '../../../hooks/useTreasuryAllocationTimes';
import useTotalStakedOnBoardroom from '../../../hooks/useTotalStakedOnBoardroom';
import useWithdrawCheck from '../../../hooks/boardroom/useWithdrawCheck';
import useRedeem from '../../../hooks/useRedeem';

const CompInfo = ({ bank, account, statsOnPoolBshare, totalStaked }) => {
  // Earning info
  const { onRedeem } = useRedeemOnBoardroom();
  const stakedBalance = useStakedBalanceOnBoardroom();
  const currentEpoch = useCurrentEpoch();
  const cashStat = useCashPriceInEstimatedTWAP();
  const boardroomAPR = useFetchBoardroomAPR();
  const canWithdraw = useWithdrawCheck();
  const canClaimReward = useClaimRewardCheck();
  const scalingFactor = useMemo(() => (cashStat ? Number(cashStat.priceInDollars).toFixed(4) : null), [cashStat]);
  const { to } = useTreasuryAllocationTimes();
  const bombStats = useBombStats();
  const earnings = useEarningsOnBoardroom();
  const tokenPriceInDollars = useMemo(
    () => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null),
    [bombStats],
  );
  const earnedInDollars = (Number(tokenPriceInDollars) * Number(getDisplayBalance(earnings))).toFixed(2);

  // Stake info;
  const bombFinance = useBombFinance();
  const [approveStatus, approve] = useApprove(bombFinance.BSHARE, bombFinance.contracts.Boardroom.address);
  
  const tokenBalance = useTokenBalance(bombFinance.BSHARE);
  const {from} = useUnstakeTimerBoardroom();

  const stakedTokenPriceInDollars = useStakedTokenPriceInDollars('BSHARE', bombFinance.BSHARE);
  const stakeInDollars = useMemo(
    () =>
      stakedTokenPriceInDollars
        ? (Number(stakedTokenPriceInDollars) * Number(getDisplayBalance(stakedBalance))).toFixed(2).toString()
        : null,
    [stakedTokenPriceInDollars, stakedBalance],
  );

  

  // const stakedTokenPriceInDollars = useStakedTokenPriceInDollars('BSHARE', bombFinance.BSHARE);
  // const stakedTokenPriceInDollarsWithMemo = useMemo(
  //   () =>
  //     stakedTokenPriceInDollars
  //       ? (Number(stakedTokenPriceInDollars) * Number(getDisplayBalance(stakedBalance))).toFixed(2).toString()
  //       : null,
  //   [stakedTokenPriceInDollars, stakedBalance],
  // );

  return (
    <>
      <InvestmentDiv>
        <div style={{ display: 'flex', width: '100%' }}>
          <div className='investNowDiv'>
            <div style={{ textAlign: 'right', marginRight: '2rem', paddingBottom: '7px' }}><a href='#'>Read Investment Strategy </a></div>
            <div className='investNowBtn'>Invest Now</div>
            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around' }}>
              <div className='discordBtn'>Chat on Discord</div>
              <div className='discordBtn'>Read Docs</div>
            </div>
            <div className='compPortf'>
              <div className='topRow'>
                <div className='compLogo'>
                  <img alt="bbont" style={{ width: '60px' }} src={BShare} />
                </div>
                <div className='compInfo'>
                  <div className='compName'>
                    Boardroom
                  </div>
                  <div className='compDetails'>
                    <div className='compDesc'>Stake BSHARE and earn BOMB every epoch</div>
                    <div className='tvl'>TVL: ${statsOnPoolBshare?.TVL}</div>
                  </div>
                </div>
              </div>
              <div className='totStake'>
                Total Staked: <img alt="bbont" style={{ width: '20px' }} src={BShare} />{getDisplayBalance(totalStaked)}
              </div>
              <div className='stockInfo'>
                <div className='returns'>
                  <div className='stockHeading'>Daily Returns:</div>
                  <div style={{}}>{account && bank ? (bank.closedForStaking) ? '0.00' : statsOnPoolBshare?.dailyAPR : '0.00'}%</div>
                </div>
                <div className='stake'>
                  <div className='stockHeading'>Your Stake:</div>
                  <div style={{}}><img alt="bbont" style={{ width: '20px' }} src={BShare} />
                    {getDisplayBalance(stakedBalance)} {`≈ $${stakeInDollars}`}
                  </div>
                </div>
                <div className='earnings'>
                  <div className='stockHeading'><img alt="bbont" style={{ width: '20px' }} src={BBond} />Earned:</div>
                  <div style={{}}>
                    {getDisplayBalance(earnings)} {`≈ $${earnedInDollars}`}
                  </div>
                </div>
                <div className='stockActions'>
                  <div className='basicActions'>
                    {/* <div className='actionBtn'>Deposit</div> */}
                    {/* <div className='actionBtn'>Withdraw</div> */}
                  </div>
                  {!!account && (
          <Box mt={5}>
            <Grid container justify="center" spacing={3} mt={10}>
              <Button
                disabled={stakedBalance.eq(0) || (!canWithdraw && !canClaimReward)}
                onClick={onRedeem}
                className={
                  stakedBalance.eq(0) || (!canWithdraw && !canClaimReward)
                    ? 'shinyButtonDisabledSecondary'
                    : 'shinyButtonSecondary'
                }
              >
                Claim &amp; Withdraw
              </Button>
            </Grid>
          </Box>
        )}
                </div>
              </div>
            </div>
          </div>
          <div className='latestNews'>
            <div className='latestHeading'>Latest News</div>
          </div>
        </div>
      </InvestmentDiv>
    </>
  );
};



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

export default CompInfo;
