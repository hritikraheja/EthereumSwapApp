require('babel-register');
require('babel-polyfill');

module.exports = {

  //Connection to the blockchain
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id (This network connects to ganache).
    },

  },

  // smart contract destinations
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',

  //The compilers that we use to compile the smart contracts.
  compilers: {
    solc: {
      version : "^0.8.0",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
