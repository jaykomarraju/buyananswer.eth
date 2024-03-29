const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

// web3.eth
//   .getAccounts()
//   .then((accounts) => {
//     console.log(accounts);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

const contractAddress = "0x8e5f4D1b2C3fdAB0979a2Fb1489f0Ec07017Ab3C";

const contractArtifact = require("../contracts/BuyAnAnswerContract.json");
const abi = contractArtifact.abi;

const contract = new web3.eth.Contract(abi, contractAddress);

export default contract;

// contract.methods
//   .createUser("test", "Test Ta", "test@gmail.com", "admin", "hi", "hey", 5)
//   .send({ from: "0x64D2cB8B84658C5E2D9379BFd4A6Ed0d8B51F0ea", gas: 1000000 });

// contract.methods
//   .getUser("0xA5a062Cc7aA1F44161153E8A1Deb4edB916fbE55")
//   .call()
//   .then((value) => {
//     console.log(value);
//   })
//   .catch((error) => {
//     console.error(error);
//   });
