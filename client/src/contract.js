import web3 from './web3'; // import if you've created a separate web3.js file
import BuyAnAnswerContract from './contracts/BuyAnAnswerContract.json'; // import contract JSON

const instance = new web3.eth.Contract(
    BuyAnAnswerContract.abi, // ABI from JSON
    // '0x9f3c174A460C2f55a94ac537D252B0E6d0b2b18E' // address of deployed contract
    '0x1c569dB59C823E9C7Bff8395BA4cdb3182903461'
    // '0x2f465d927e88F588b724Bfe444F938A1c304232B'
);

export default instance;