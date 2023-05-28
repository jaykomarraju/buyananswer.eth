import web3 from './web3'; // import if you've created a separate web3.js file
import BuyAnAnswerContract from './contracts/BuyAnAnswerContract.json'; // import contract JSON

const instance = new web3.eth.Contract(
    BuyAnAnswerContract.abi, // ABI from JSON
    '0x8e5f4D1b2C3fdAB0979a2Fb1489f0Ec07017Ab3C' // address of deployed contract
);

export default instance;