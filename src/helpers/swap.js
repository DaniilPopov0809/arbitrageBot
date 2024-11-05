import { ethers } from 'ethers';
import { getNativBalance } from './getNativBalance.js';
import { arbitration } from './arbitration.js';
import { getBalance } from './getBalance.js';
import { approve } from './approve.js';
import { allowance } from './allowance.js';
import { deposit } from './deposit.js';
import { withdraw } from './withdraw.js';
import { getRandomDepositValue } from '../utils/getRandomDepositValue.js';
import { writeToLogs } from '../utils/writeToLogs.js';
import { NATIVE_TOKEN, WRAP_TOKEN, market } from '../constants/constants.js';
import { wallet } from '../provider/provider.js';

export const swap = async ({ currency0, currency1, contract, contractForApprove }) => {
  let countSuccsessOperations = 0;
  if (currency0.address !== NATIVE_TOKEN) {
    console.log('Arbitrage');
    const randomValue = getRandomDepositValue();
    const allowanceValue = await allowance({ owner: wallet.address, spender: market, contract: contractForApprove });
    console.log('Allowance', allowanceValue);
    const balance = await getBalance({
      address: currency0.address,
      symbol: currency0.symbol,
      contract: contractForApprove
    });

    let balanceAfter = 0;
    let isSuccsessOperation = false;
    if (balance < randomValue) {
      console.log('\x1b[31m', 'Insufficient balance.');
    } else {
      if (allowanceValue < randomValue) {
        await approve({ value: ethers.parseEther(randomValue), spender: market, contract: contractForApprove });
      }
      const { isSuccess } = await arbitration({ value: randomValue, currency0, currency1, contract });
      isSuccsessOperation = isSuccess;
      if (isSuccess) countSuccsessOperations++;
      balanceAfter = await getBalance({
        address: currency0.address,
        symbol: currency0.symbol,
        contract: contractForApprove
      });
    }
    writeToLogs({ currency0, currency1, randomValue, balanceBefore: balance, balanceAfter, isSuccsessOperation });
  }

  if (currency0.address === NATIVE_TOKEN && currency1.address !== WRAP_TOKEN) {
    console.log('Arbitrage from native token');
    const balance = await getNativBalance();
    const randomValue = getRandomDepositValue();
    let balanceAfter = 0;
    let isSuccsessOperation = false;
    if (balance < randomValue) {
      console.log('\x1b[31m', 'Insufficient balance.');
    } else {
      const { isSuccess } = await arbitration({ value: randomValue, currency0, currency1, contract });
      balanceAfter = await getNativBalance();
      isSuccsessOperation = isSuccess;
      if (isSuccess) countSuccsessOperations++;
    }
    writeToLogs({ currency0, currency1, randomValue, balanceBefore: balance, balanceAfter, isSuccsessOperation });
  }

  if (currency0.address === WRAP_TOKEN && currency1.address === NATIVE_TOKEN) {
    console.log('Witdrawn');
    const allowanceValue = await allowance({ owner: wallet.address, spender: market, contract: contractForApprove });
    console.log('Allowance', allowanceValue);
    const balance = await getBalance({
      address: currency0.address,
      symbol: currency0.symbol,
      contract: contractForApprove
    });
    const randomValue = getRandomDepositValue();
    let balanceAfter = 0;
    let isSuccessOperation = false;
    if (balance < randomValue) {
      console.log('\x1b[31m', 'Insufficient balance.');
    } else {
      if (allowanceValue < randomValue) {
        await approve({ value: ethers.parseEther(randomValue), spender: market, contract: contractForApprove });
      }
      const { isSuccess } = await withdraw({ value: randomValue, contract, currency0, currency1 });
      if (isSuccess) countSuccsessOperations++;
      isSuccessOperation = isSuccess;
      balanceAfter = await getBalance({
        address: currency0.address,
        symbol: currency0.symbol,
        contract: contractForApprove
      });
    }
    writeToLogs({
      currency0,
      currency1,
      randomValue,
      balanceBefore: balance,
      balanceAfter,
      isSuccessOperation
    });
  }

  if (currency0.address === NATIVE_TOKEN && currency1.address === WRAP_TOKEN) {
    console.log('Depositing...');
    const balance = await getNativBalance();
    const randomValue = getRandomDepositValue();
    let balanceAfter = 0;
    let isSuccsessOperation = false;
    if (balance < randomValue) {
      console.log('\x1b[31m', 'Insufficient balance.');
    } else {
      const { isSuccess } = await deposit({ value: randomValue, contract, currency0, currency1 });
      if (isSuccess) countSuccsessOperations++;
      balanceAfter = await getNativBalance();
      isSuccsessOperation = isSuccess;
    }
    writeToLogs({
      currency0,
      currency1,
      randomValue,
      balanceBefore: balance,
      balanceAfter,
      isSuccsessOperation
    });
  }
  return countSuccsessOperations;
};
