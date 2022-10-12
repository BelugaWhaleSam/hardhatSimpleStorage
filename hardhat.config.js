require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();
require("./tasks/block-number");
require("hardhat-gas-reporter")
require('solidity-coverage')

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

// We add another value so that hardhat if unable to reach these ones it can go to the alternate ones
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || "https://eth-goerli"
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xkey"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "key"
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "key"

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
      goerli: {
        url: GOERLI_RPC_URL,
        accounts: [PRIVATE_KEY],
        chainId: 5,
      },
      localhost: {
        url: "http://127.0.0.1:8545/",
        chainId: 31337,
        // no need to give account, hardhat already placed accounts
      }
    },
    solidity: "0.8.17",
    etherscan: {
      apiKey: ETHERSCAN_API_KEY,
    },
    gasReporter: {
      enabled: true, // enables to show the gas usage when we run test
      outputFile: "gas-report.txt", // outputs the usage to this file, also add it to gitignore
      noColors: true, // no colors to the file
      currency: "INR", // get cost of function in INR or USD
      coinmarketcap: COINMARKETCAP_API_KEY, // to get usd we need to get an API key from coinMarket  cap
      token: "MATIC", // If we wanna know how much will it cost to deploy on some other blockchain, lets say polygon
    },
};