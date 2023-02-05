const { deployProxy } = require('@openzeppelin/truffle-upgrades');

const ChainPass = artifacts.require("ChainPass");

module.exports = async function (deployer) {
    const instance = await deployProxy(ChainPass, { deployer });
    console.log('Deployed', instance.address);
  };
