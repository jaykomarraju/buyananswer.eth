// We import axios here
// const axios = require('axios');
// const HDWalletProvider = require('@truffle/hdwallet-provider');

// Here, we read the mnemonic from .secret file
// const fs = require('fs');
// const mnemonic = fs.readFileSync(".secret").toString().trim();
// console.log("mnemonic: ", mnemonic);

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", 
      port: 8545,            
      network_id: "*",       
    },
    // ropsten: {
    //   provider: async () => {
    //     const gasPrice = await axios.get('https://ethgasstation.info/json/ethgasAPI.json')
    //       .then(response => Math.floor(response.data.average))
    //       .catch(() => 20);
    //     const infuraKey = "d24ba263c96d43258d836b114a957042";
    //     return new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/${infuraKey}`, 0, 10, false, gasPrice * 1e8);
    //   },
    //   network_id: 3,
    //   gas: 5500000,
    //   confirmations: 2,
    //   timeoutBlocks: 200,
    //   skipDryRun: true
    // },
    // mainnet: {
    //   provider: async () => {
    //     const gasPrice = await axios.get('https://ethgasstation.info/json/ethgasAPI.json')
    //       .then(response => Math.floor(response.data.average))
    //       .catch(() => 20);
    //     const infuraKey = "d24ba263c96d43258d836b114a957042";
    //     return new HDWalletProvider(mnemonic, `https://mainnet.infura.io/v3/${infuraKey}`, 0, 10, false, gasPrice * 1e8);
    //   },
    //   network_id: 1,
    //   gas: 5500000,
    //   confirmations: 2,
    //   timeoutBlocks: 200,
    //   skipDryRun: true
    // },
  },
  compilers: {
    solc: {
      version: "0.8.0",
    },
  },
};
