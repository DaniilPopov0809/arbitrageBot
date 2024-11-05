import { ethers } from 'ethers';
import { RPC_URL, WALLET_KEY } from '../constants/constants.js';

export const provider = new ethers.JsonRpcProvider(RPC_URL);
export const wallet = new ethers.Wallet(WALLET_KEY, provider);