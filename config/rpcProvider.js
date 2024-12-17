import { JsonRpcProvider } from 'ethers';

const ethProvider = new JsonRpcProvider("https://mainnet.infura.io/v3/a224edfc0ac9474b9358368e28241e29");
const baseProvider = new JsonRpcProvider("https://base-mainnet.infura.io/v3/a224edfc0ac9474b9358368e28241e29");

export async function provider(chain) {
    if (chain == "ETH") {
        return ethProvider;
    } else if (chain == "BASE") {
        return baseProvider;
    }
    return ethProvider;
} 
