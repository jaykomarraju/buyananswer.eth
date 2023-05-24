import web3 from './web3'; // import if you've created a separate web3.js file
import BuyAnAnswerContract from './contracts/BuyAnAnswerContract.json'; // import contract JSON

const instance = new web3.eth.Contract(
    BuyAnAnswerContract.abi, // ABI from JSON
    '0xCAF024Bd7fe69354AD50316cC9e84e5c1461063f' // address of deployed contract
);

export default instance;