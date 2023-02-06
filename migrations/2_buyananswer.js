const BuyAnAnswer = artifacts.require("BuyAnAnswer");

module.exports = function (deployer) {
    // deployer.deploy(Migrations);
    deployer.deploy(BuyAnAnswer);
  };