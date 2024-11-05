import { ethers } from 'ethers';
import marketABI from './abi/market.json' assert { type: 'json' };
import wrapABI from './abi/wrap.json' assert { type: 'json' };
import erc20ABI from './abi/erc20.json' assert { type: 'json' };
import { wallet } from './provider/provider.js';

import { market, currencyData, NATIVE_TOKEN, WRAP_TOKEN } from './constants/constants.js';
import { getRandomCurrency } from './utils/getRandomCurrency.js';
import { removeIntoLogs } from './utils/removeIntoLogs.js';

import { swap } from './helpers/swap.js';

const DELAY = 6000; //between operations
const ITERATIONS = 600; // amount operations

async function runArbitrationBot() {
  await removeIntoLogs();
  for (let i = 0; i < ITERATIONS; i++) {
    try {
      console.log(`Itrration ${i + 1} из ${ITERATIONS}`);

      const currency0 = currencyData[getRandomCurrency()];
      console.log('Currency0:', currency0);
      const currency1Index = getRandomCurrency();
      const currency1 = currencyData[currency1Index === 0 ? 1 : currency1Index];
      console.log('Currency1:', currency1);

      //select abi for swap
      const ABI =
        (currency0.address === NATIVE_TOKEN && currency1.address === WRAP_TOKEN) ||
        (currency0.address === WRAP_TOKEN && currency1.address === NATIVE_TOKEN)
          ? wrapABI
          : marketABI;

      //select address for swap
      let address = '';
      if (currency0.address === NATIVE_TOKEN && currency1.address === WRAP_TOKEN) {
        address = WRAP_TOKEN;
      } else if (currency0.address === WRAP_TOKEN && currency1.address === NATIVE_TOKEN) {
        address = NATIVE_TOKEN;
      } else {
        address = market;
      }

      const contract = new ethers.Contract(address, ABI, wallet);
      const contractForApprove = new ethers.Contract(currency0.address, erc20ABI, wallet);

      if (currency0.address !== currency1.address) {
        await swap({ currency0, currency1, contract, contractForApprove });
      } else {
        console.log('\x1b[31m', 'Currency addresses match!');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    if (i < ITERATIONS - 1) {
      await new Promise((resolve) => setTimeout(resolve, DELAY));
    }
  }

  console.log('The loop is complete!');
}


await runArbitrationBot();
console.log('\x1b[35m', `Successfully completed: ${countSuccessOperations} operations`);
