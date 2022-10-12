// Test our contract locally

const {ethers} = require("hardhat")
const {expect, assert} = require("chai")

// describe is keyword recognised by js and mocha
// take string and an anonymous function as parameters
describe("SimpleStorage", function () {

    // So that it can be used by it() and can be globally accessible outside the scope of beforeEach
    let simpleStorageFactory,simpleStorage;

    // tells us what to do before "it()"
    beforeEach(async function () {
        // In here we have to deploy our simplestorage contract
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await simpleStorageFactory.deploy();
    })

    // tells what the test should do as first parameter and a function as second parameter
    it("Should start with a favourite number of 0", async function () {
        const currentValue = await simpleStorage.retrieve();
        const expectedValue = "0"
        // Now to check the expected value we use assert or expect and import these from chai
        // checks if this what is to be expected or equal and use toString since it'll be a big number
        assert.equal(currentValue.toString(),expectedValue)
        // we can also use expect
        // expect(currentValue.toString()).to.equal(expectedValue)
    })
    
    // 2nd test
    // it.only() is used to run only this test when called in terminal
    it("Should update when we call store", async function () {
        const expectedValue = "7"
        const transactionResponse = await simpleStorage.store(expectedValue)

        await transactionResponse.wait(1)

        const currentValue = await simpleStorage.retrieve();
        assert.equal(currentValue.toString(),expectedValue)
    })
});
