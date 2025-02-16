import { ethers, formatUnits } from "ethers";
import { erc20ABI } from '../config/erc20ABI.js';
import { provider } from '../config/rpcProvider.js';

async function getErc20Supply(chain, token) {

    const tokenContract = new ethers.Contract(token, erc20ABI, await provider(chain));
    const tokenSupplyRaw = await tokenContract.totalSupply();
    const tokenSupply = formatUnits(tokenSupplyRaw, 18);

    return tokenSupply;
}

export default getErc20Supply;