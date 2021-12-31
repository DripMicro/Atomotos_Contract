const BVToken = artifacts.require("BlocVaultToken");

module.exports = function (deployer, network, accounts) {
    deployer.deploy(BVToken, { from: accounts[0] });
};