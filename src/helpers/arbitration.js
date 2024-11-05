import { ethers } from 'ethers';
import { NATIVE_TOKEN } from '../constants/constants.js';
import { writeToLogs } from '../utils/writeToLogs.js';
const SLIPPAGE = 500;
export const arbitration = async ({ value, currency0, currency1, contract }) => {
  console.log('Tokens for arbitration:', value);
  let isSuccess = false;
  try {
    const tx = await contract.arbitration(currency0.address, currency1.address, ethers.parseEther(value), SLIPPAGE, {
      value: currency0.address === NATIVE_TOKEN ? ethers.parseEther(value) : undefined
    });
    await tx.wait();
    console.log('Transaction confirmed');
    isSuccess = true;
  } catch (error) {
    console.error('Error writing to contract:', error);
    writeToLogs({
      currency0,
      currency1,
      balanceAfter: 0,
      balanceBefore: 0,
      randomValue: 0,
      isSuccsessOperation: false
    });
  }
  return { isSuccess };
};
