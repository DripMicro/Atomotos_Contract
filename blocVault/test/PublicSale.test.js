const PublicSale = artifacts.require('PublicSale');
var BVToken = artifacts.require("BVToken.sol");
var BUSDToken = artifacts.require("BUSDToken.sol");
const { toWei, toBN } = web3.utils;

contract("PublicSale", function ([alice, bob]) {
    before(async function () {
        this.bvToken = await BVToken.new({ from: alice });
        this.BUSDToken = await BUSDToken.new({ from: alice });
        //1631862000
        const startOfICO = Math.floor(Date.UTC(2021, 9, 17, 0, 0, 0) / 1000);
        //1637827200
        const endOfICO = Math.floor(Date.UTC(2021, 11, 25, 0, 0, 0) / 1000);
        //1637654400
        const publishDate = Math.floor(Date.UTC(2021, 11, 23, 0, 0, 0) / 1000);
        this.publicsale = await PublicSale.new(this.bvToken.address, this.BUSDToken.address, startOfICO, endOfICO, publishDate, { from: alice });
        //await this.bvToken.transfer(this.publicsale.address, toWei("75000000", "gwei"), { from: alice });
        await this.BUSDToken.transfer(bob, toWei("50000", "mwei"), { from: alice });
        const currentBalance = await this.BUSDToken.balanceOf(bob);
        const expectedBalance = toBN(toWei("50000", "mwei"));
        
        assert.equal(currentBalance.toString(), expectedBalance.toString());
    });

    context("Test updateDeadline function", () => {
        it("should updateDeadline success", async function () {
            const endOfICO = Math.floor(Date.UTC(2021, 11, 22, 0, 0, 0) / 1000);
            const publishDate = Math.floor(Date.UTC(2021, 11, 23, 0, 0, 0) / 1000);
            await this.publicsale.updateDeadline(endOfICO, publishDate);

            const deadline = await this.publicsale.deadline();
            const publish = await this.publicsale.publishDate();

            assert.equal(deadline.toString(), endOfICO.toString());
            assert.equal(publish.toString(), publishDate.toString());
        });
    });

    context("Test invest function", () => {
        it("should first invest success", async function () {
            const currentStartDate = await this.publicsale.start();
            await this.BUSDToken.approve(this.publicsale.address, toWei("50000", "mwei"), { from: bob });
            await this.publicsale.investBUSD(toWei("50000", "mwei"), { from: bob });
            const currentBalance = await this.BUSDToken.balanceOf(this.publicsale.address);
            const expectedBalance = toBN(toWei("50000", "mwei"));
            assert.equal(currentBalance.toString(), expectedBalance.toString());
        });

        it("check getFunds", async function () {
            await this.publicsale.getFunds({ from: bob });
            const currentBalance = await this.bvToken.balanceOf(bob);
            const expectedBalance = toBN(toWei("5000000", "gwei"));
            assert.equal(currentBalance.toString(), expectedBalance.toString());
        });

        it("should second invest success", async function () {
            await this.BUSDToken.approve(this.publicsale.address, toWei("150000", "mwei"), { from: alice });
            await this.publicsale.investBUSD(toWei("150000", "mwei"), { from: alice });
            const currentBalance = await this.BUSDToken.balanceOf(this.publicsale.address);
            const expectedBalance = toBN(toWei("200000", "mwei"));
            assert.equal(currentBalance.toString(), expectedBalance.toString());

            const price = await this.publicsale.price();
            let expectedPrice = toBN('200').mul(toBN('50')).div(toBN(750));
            expectedPrice = toBN('100').sub(expectedPrice);
            assert.equal(price.toString(), expectedPrice.toString());
        });
    });
});