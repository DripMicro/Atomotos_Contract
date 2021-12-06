const BVToken = artifacts.require("BVToken");

module.exports = function (deployer, network, accounts) {
    deployer.deploy(BVToken, { from: accounts[0] });
};
