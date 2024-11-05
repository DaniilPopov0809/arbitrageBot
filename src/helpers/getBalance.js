import { ethers } from 'ethers';
import { wallet } from '../provider/provider.js';

export const getBalance = async ({ address, symbol, contract }) => {
  try {
    const balance = await contract.balanceOf(wallet);
    const formattedBalance = ethers.formatEther(balance);
    console.log(`Wallet balance ${address}: ${formattedBalance} ${symbol}`);
    return formattedBalance;
  } catch (error) {
    console.error('Fetch balance error:', error);
  }
};
