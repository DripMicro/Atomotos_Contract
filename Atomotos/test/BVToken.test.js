const { expectRevert } = require("@openzeppelin/test-helpers");
const BVToken = artifacts.require('BVToken');
const { toWei, toBN } = web3.utils;
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

contract("BVToken", function ([alice, bob, carol, eve]) {
    before(async function () {
        this.bvToken = await BVToken.new({ from: alice });
        const currentBalance = await this.bvToken.balanceOf(alice);
        const expectedBalance = toBN(toWei("300000000", "gwei"));
        assert.equal(currentBalance.toString(), expectedBalance.toString());
    });

    context("Test transfer function", () => {
        it("should transfer success", async function () {
            const amount = toWei("10", "gwei");
            const previousBalance = await this.bvToken.balanceOf(bob);
            await this.bvToken.transfer(bob, amount, { from: alice });
            const currentBalance = await this.bvToken.balanceOf(bob);
            assert.equal(previousBalance.add(toBN(amount)).toString(), currentBalance.toString());
        });
        it("should fail if recipient is zero address", async function () {
            const amount = toWei("10", "gwei");
            await expectRevert(
                this.bvToken.transfer(ZERO_ADDRESS, amount, { from: alice }),
                "HYT: transfer to the zero address"
            );
        });
    });

    context("Test approve function", () => {
        it("should approve success", async function () {
            const amount = toWei("10", "gwei");
            const previousBalance = await this.bvToken.allowance(bob, carol);
            await this.bvToken.approve(carol, amount, { from: bob });
            const currentBalance = await this.bvToken.allowance(bob, carol);
            assert.equal(previousBalance.add(toBN(amount)).toString(), currentBalance.toString());
        });
        it("should fail if recipient is zero address", async function () {
            const amount = toWei("10", "gwei");
            await expectRevert(
                this.bvToken.approve(ZERO_ADDRESS, amount, { from: bob }),
                "HYT: approve to the zero address"
            );
        });
    });

    context("Test transferFrom function", () => {
        it("should transferFrom success", async function () {
            const amount = toWei("10", "gwei");
            const previousBalance = await this.bvToken.balanceOf(eve);
            await this.bvToken.transferFrom(bob, eve, amount, { from: carol });
            const currentBalance = await this.bvToken.balanceOf(eve);
            assert.equal(previousBalance.add(toBN(amount)).toString(), currentBalance.toString());
        });
        it("should fail if sender is zero address", async function () {
            const amount = toWei("10", "gwei");
            await expectRevert(
                this.bvToken.transferFrom(ZERO_ADDRESS, eve, amount, { from: carol }),
                "HYT: transfer from the zero address"
            );
        });
        it("should fail if recipient is zero address", async function () {
            const amount = toWei("10", "gwei");
            await expectRevert(
                this.bvToken.transferFrom(bob, ZERO_ADDRESS, amount, { from: carol }),
                "HYT: transfer to the zero address"
            );
        });
    });
});