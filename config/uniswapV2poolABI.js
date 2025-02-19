// uniswapV2poolABI.js
const uniswapV2poolABI = [
    {
      "constant": true,
      "inputs": [],
      "name": "getReserves",
      "outputs": [
        { "internalType": "uint112", "name": "reserve0", "type": "uint112" },
        { "internalType": "uint112", "name": "reserve1", "type": "uint112" },
        { "internalType": "uint32", "name": "blockTimestampLast", "type": "uint32" }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "token0",
      "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "token1",
      "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant":true,
      "inputs":[],
      "name":"totalSupply",
      "outputs":[{"internalType":"uint256","name":"","type":"uint256"}],
      "payable":false,
      "stateMutability":"view",
      "type":"function"
    },
];

export default uniswapV2poolABI;