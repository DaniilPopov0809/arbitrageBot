import { promises as fs } from 'fs';

export const writeToLogs = async ({
  currency0,
  currency1,
  randomValue,
  balanceBefore,
  balanceAfter,
  isSuccsessOperation
}) => {
  try {
    fs.appendFile(
      './logs.txt',
      `\n-------------------------------------------------------------\n Currency 1: ${currency0.address} ${currency0.symbol}\n Currency 2: ${currency1.address} ${currency1.symbol}\n Amaunt: ${randomValue} ${currency0.symbol}\n Balance before: ${balanceBefore} ${currency0.symbol}\n Balance after: ${balanceAfter} ${currency0.symbol}\n ${isSuccsessOperation ? 'Success!' : 'Error!'}\n-------------------------------------------------------------\n`
    );
    console.log('Data successfully written to the logs!');
  } catch (err) {
    console.error('Error writing to the logs:', err);
  }
};
