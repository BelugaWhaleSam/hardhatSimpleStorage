// import the task
const {task} = require("hardhat/config")

// Make the current task
task("block-number","print the current block number").setAction(
    // another way to define function and since it doesnt have a name it's known as an anoynymous function
    async (taskArgs, hre) => {
        // hre can access a lot of hardhat function
        const blockNumber = await hre.ethers.provider.getBlockNumber();
        console.log(`Current block Number: ${blockNumber}`)
    }
)

// just add it
module.exports = {}