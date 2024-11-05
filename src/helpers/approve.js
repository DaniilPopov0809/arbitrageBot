import { ethers } from 'ethers';

export const approve = async ({value, spender, contract}) => {
  console.log('Amount tokens for approve:', value);
  try {
    const tx = await contract.approve(spender, ethers.parseEther(value));
    await tx.wait();
    console.log('Approve succsess');
  } catch (error) {
    console.error('Approving error:', error);
  }
};
