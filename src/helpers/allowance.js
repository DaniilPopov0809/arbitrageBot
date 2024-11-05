import { ethers } from 'ethers';

export const allowance = async ({owner, spender, contract}) => {
  try {
    const allowance = await contract.allowance(owner, spender);
    return ethers.formatEther(allowance);
  } catch (error) {
    console.error('Error getting allowance:', error);
  }
}
