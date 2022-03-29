const EthSwap = artifacts.require("EthSwap");
const Token = artifacts.require("Token");

module.exports = async function(deployer) {

  //Deploy EthSwap.sol
  await deployer.deploy(EthSwap);
  const ethSwap = await EthSwap.deployed();

  await deployer.deploy(Token);
  const token = await Token.deployed();

  //Transfer balancd from Token to EthSwap
  await token.transfer(ethSwap.address, '1000000000000000000000000')
};
 