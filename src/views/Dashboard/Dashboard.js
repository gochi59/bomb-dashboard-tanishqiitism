import React, {useMemo} from 'react';
import Page from '../../components/Page';
import styled, { createGlobalStyle } from 'styled-components';
// COMPONENTS
import SummaryCard from './components/FirstTask';
import HomeImage from '../../assets/img/background.jpg';
import CompInfo from './components/companyInfo'
import InvestDivLarge from './components/investmentDivLarge';
import InvestDivSmall from './components/investmentDivSmall';
import { Container } from '@material-ui/core';
import useBank from '../../hooks/useBank';
import useWallet from 'use-wallet';
import useStatsForPool from '../../hooks/useStatsForPool';
import useCurrentEpoch from '../../hooks/useCurrentEpoch';
import useCashPriceInEstimatedTWAP from '../../hooks/useCashPriceInEstimatedTWAP';
import useTotalStakedOnBoardroom from '../../hooks/useTotalStakedOnBoardroom';
import useFetchBoardroomAPR from '../../hooks/useFetchBoardroomAPR';
import useClaimRewardCheck from '../../hooks/boardroom/useClaimRewardCheck';
import useWithdrawCheck from '../../hooks/boardroom/useWithdrawCheck';
import useTreasuryAllocationTimes from '../../hooks/useTreasuryAllocationTimes';
import useRedeemOnBoardroom from '../../hooks/useRedeemOnBoardroom';
import useStakedBalanceOnBoardroom from '../../hooks/useStakedBalanceOnBoardroom';
import UnlockWallet from '../../components/UnlockWallet';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) repeat !important;
    background-size: cover !important;
    background-color: #171923;
  }
`;

const Dashboard = () => {
  const bankBshare = useBank('BombBShareRewardPool');
  const bankBtcb = useBank('BombBtcbLPBShareRewardPool');
  const bankBnb = useBank('BshareBnbLPBShareRewardPool');
  const { account } = useWallet();
  const bank = useBank()
  // const farmwithdraw = useRedeem(bank);
  let statsOnPoolBshare = useStatsForPool(bankBshare);
  let statsOnPoolBtcb = useStatsForPool(bankBnb);
  let statsOnPoolBnb = useStatsForPool(bankBtcb);
  const { onRedeem } = useRedeemOnBoardroom();
  const stakedBalance = useStakedBalanceOnBoardroom();
  const currentEpoch = useCurrentEpoch();
  const cashStat = useCashPriceInEstimatedTWAP();
  const totalStaked = useTotalStakedOnBoardroom();
  const boardroomAPR = useFetchBoardroomAPR();
  const canClaimReward = useClaimRewardCheck();
  const canWithdraw = useWithdrawCheck();
  const scalingFactor = useMemo(() => (cashStat ? Number(cashStat.priceInDollars).toFixed(4) : null), [cashStat]);
  const { to } = useTreasuryAllocationTimes();

  return (
    <Page>
      {account && <Container className="flex-center">
        <BackgroundImage />
        
        <SummaryCard />
      <CompInfo totalStaked={totalStaked} bank={bankBshare} account={account} statsOnPoolBshare={statsOnPoolBshare} statsOnPoolBtcb={statsOnPoolBtcb} statsOnPoolBnb={statsOnPoolBnb} />
        <InvestDivLarge bankBtcb={bankBtcb} bankBnb={bankBnb} account={account} statsOnPoolBshare={statsOnPoolBshare} statsOnPoolBtcb={statsOnPoolBtcb} statsOnPoolBnb={statsOnPoolBnb} />
        <InvestDivSmall />
      </Container>}
      {!account && <UnlockWallet />}
    </Page>
  );
};

export default Dashboard;
