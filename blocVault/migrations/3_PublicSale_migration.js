var bvToken = artifacts.require("BVToken.sol");
var BUSDToken = artifacts.require("BUSDToken.sol");
const PublicSale = artifacts.require("PublicSale.sol");
const { toWei } = web3.utils;

module.exports = async function (deployer, network) {
    try {
        // let BUSDTokenAddress;
        console.log(network);
        if (network == 'develop' || network == 'ganache_local') {
            await deployer.deploy(BUSDToken);
            BUSDTokenAddress = BUSDToken.address;
        } if (network == 'mainnet' || network == 'bscTestnet')
            BUSDTokenAddress = 0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee;
        console.log(BUSDTokenAddress);
        const bvTokenInstance = await bvToken.deployed();
        const startOfICO = 1638801600;
        const endOfICO = 1638802800;
        console.log('------------------------------------------');
        console.log(endOfICO);
        console.log(bvTokenInstance.address);
        console.log(BUSDTokenAddress);
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
