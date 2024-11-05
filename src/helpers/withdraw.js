export const withdraw = async ({value, contract, currency0, currency1}) => {
  console.log('Amount tokens for withdraw:', value);
  let isSuccess = false;
  try {
    const tx = await contract.withdraw(ethers.parseEther(value));
    await tx.wait();
    console.log('Transaction confirmed');
    isSuccess = true;
  } catch (error) {
    console.error('Error writing to contract:', error);
    writeToLogs({
      currency0,
      currency1,
      randomValue: 0,
      balanceBefore: 0,
      balanceAfter: 0,
      isSuccsessOperation: false
    });
  }
  return { isSuccess };
}