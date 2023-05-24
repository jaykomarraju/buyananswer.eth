const BuyAnAnswerContract = artifacts.require("BuyAnAnswerContract");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(BuyAnAnswerContract, accounts[0]);  // If accounts[0] is the fee receiver.
};
