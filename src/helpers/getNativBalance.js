import { provider, wallet } from '../provider/provider.js';
import { ethers } from 'ethers';

export const getNativBalance = async () => {
  try {
    const balance = await provider.getBalance(wallet);
    const formattedBalance = ethers.formatEther(balance);
    console.log(`Wallet balance ${wallet.address}: ${formattedBalance} Sonic`);
    return formattedBalance;
  } catch (error) {
    console.error('Fetch balance error:', error);
  }
};
