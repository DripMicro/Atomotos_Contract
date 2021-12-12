var bvToken = artifacts.require("BVToken.sol");
const PublicSale = artifacts.require("PublicSale.sol");
const { toWei } = web3.utils;

module.exports = async function (deployer, network) {
    try {
        console.log(network);
        const bvTokenInstance = await bvToken.deployed();
        const startOfICO = 1639339200;
        const endOfICO = 1639346400;
        console.log('------------------------------------------');
        console.log(endOfICO);
        console.log(bvTokenInstance.address);
        console.log(startOfICO);
        console.log(endOfICO);
        
        console.log('------------------------------------------');
       //await deployer.deploy(PublicSale, bvTokenInstance.address, BUSDTokenAddress, startOfICO, endOfICO, publishDate);
        await deployer.deploy(PublicSale, bvTokenInstance.address, startOfICO, endOfICO);
        console.log(PublicSale.address);
        await bvTokenInstance.transfer(PublicSale.address, toWei('240000000000000000000', 'gwei'));
        // const currentBVBalance = await bvTokenInstance.balanceOf(PublicSale.address);
        // console.log(currentBVBalance);
    } catch (error) {
        console.log(error);
    }
};
