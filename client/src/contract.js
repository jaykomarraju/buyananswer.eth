import web3 from './web3'; // import if you've created a separate web3.js file
import BuyAnAnswerContract from './contracts/BuyAnAnswerContract.json'; // import contract JSON

const instance = new web3.eth.Contract(
    BuyAnAnswerContract.abi, // ABI from JSON
    '0x8586FAa8588c589B804EC4724E69455B9e6564fB' // address of deployed contract
    // '0x2f465d927e88F588b724Bfe444F938A1c304232B'
);

export default instance;