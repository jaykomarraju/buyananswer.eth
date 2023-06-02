import web3 from './web3'; // import if you've created a separate web3.js file
import BuyAnAnswerContract from './contracts/BuyAnAnswerContract.json'; // import contract JSON

const instance = new web3.eth.Contract(
    BuyAnAnswerContract.abi, // ABI from JSON
    '0x98F4d8813dB15576a06a87fe0460C2BfA3a29C18' // address of deployed contract
);

export default instance;