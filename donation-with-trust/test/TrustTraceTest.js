import { expect } from "chai";
import pkg from "hardhat";
const { ethers } = pkg;


describe("TrustUSD", function () {

    let Token;
    let trustUSD;
    let owner;
    let addr1;
    let addr2;
    let addr3;

    let Trust;
    let trustTrace;

    beforeEach(async function () {
        Token = await ethers.getContractFactory("TrustUSD");
        [owner, addr1, addr2, addr3] = await ethers.getSigners();
        trustUSD = await Token.deploy(owner);
        Trust = await ethers.getContractFactory("TrustTrace");
        trustTrace = await Trust.deploy(trustUSD.target, "10000000000000000000000000", addr1, [10, 20, 20, 40, 10]);

    });

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await trustUSD.owner()).to.equal(owner.address);
        });
    })

    describe("Initial Balance", function () {
        it("Should return the correct balance", async function () {
            expect((await trustUSD.balanceOf(owner.address)).toString()).to.equal("100000000000000000000000000");
        });
    });

    describe("Transfers", function () {
        it("Should transfer tokens between accounts", async function () {
            await trustUSD.transfer(addr1.address, 100000);
            expect((await trustUSD.balanceOf(addr1.address)).toString()).to.equal("100000");
            expect((await trustUSD.balanceOf(owner.address)).toString()).to.equal("99999999999999999999900000");

        });
    })

    describe("Donate", function () {
        it("Should donate tokens to the TrustTrace contract", async function () {
            await trustUSD.connect(owner).approve(trustTrace.target, 100000);
            await trustTrace.donate(100000);
            expect((await trustUSD.balanceOf(trustTrace.target)).toString()).to.equal("100000");
            expect((await trustUSD.balanceOf(owner.address)).toString()).to.equal("99999999999999999999900000");
        })

        it("Should reject donation past the total amount", async function () {
            await trustUSD.connect(owner).approve(trustTrace.target, "100000000000000000000000000");
            await trustTrace.donate("10000000000000000000000000");
            expect((await trustUSD.balanceOf(trustTrace.target)).toString()).to.equal("10000000000000000000000000");
            await expect(trustTrace.donate("1")).to.be.revertedWith("Exceeds maximum donations");
        })
    })

    describe("Allow regulator to add addresses to segments", function () {
        it("Should allow regulator to add addresses to segments", async function () {
            await trustUSD.connect(owner).approve(trustTrace.target, 100000);
            await trustTrace.donate(100000);
            expect((await trustUSD.balanceOf(trustTrace.target)).toString()).to.equal("100000");
            await expect(trustTrace.distributeFunds(0, 0, 100000)).to.be.revertedWith("No recipients in this group");
            await trustTrace.connect(addr1).addAllowedRecipient(0, addr2.address);
            await trustTrace.distributeFunds(0, 0, 100000);
            expect((await trustUSD.balanceOf(addr2.address)).toString()).to.equal("100000");
        })

        it("Should prevent distribution of funds past the allocated amount", async function () {
            await trustUSD.connect(owner).approve(trustTrace.target, "100000000000000000000000000");
            await trustTrace.donate("10000000000000000000000000");
            expect((await trustUSD.balanceOf(trustTrace.target)).toString()).to.equal("10000000000000000000000000");
            await trustTrace.connect(addr1).addAllowedRecipient(0, addr2.address);
            await trustTrace.connect(addr1).addAllowedRecipient(2, addr3.address);
            await trustTrace.distributeFunds(0, 0, "1000000000000000000000000");
            await trustTrace.distributeFunds(2, 0, "2000000000000000000000000");
            await expect(trustTrace.distributeFunds(2, 0, "1")).to.be.revertedWith("Exceeds maximum distribution");
            await expect(trustTrace.distributeFunds(0, 0, "1")).to.be.revertedWith("Exceeds maximum distribution");

        })
    });
});