import dotenv from 'dotenv';
dotenv.config();

export const market = '0x343406E830EfFEA73FFE13F22BAA96089d9C1B82';
export const RPC_URL = 'https://rpc.testnet.soniclabs.com';
export const NATIVE_TOKEN = '0x0000000000000000000000000000000000000000';
export const WRAP_TOKEN = '0x591E027153ED4e536275984e1b7573367e11dac4';

export const currencyData = [
  { symbol: 'Sonic', address: NATIVE_TOKEN },
  { symbol: 'WSonic', address: WRAP_TOKEN },
  { symbol: 'lSonic', address: '0x71F7140E717B3AB89B82123246D3D569eb83dB79' },
  { symbol: 'USDT', address: '0xc85425cd2C3439adbcF8698b78c6eEF53A757475' },
];

export const WALLET_KEY = process.env.WALLET_KEY;
export const API_KEY_PROVIDER = process.env.API_KEY_PROVIDER;