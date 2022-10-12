//imports

// Since hardhat has ethers as its dependencies
// It'll be easy for hardhat to grab contractFactory
const {ethers, run} = require("hardhat")

// async main
async function main() {

    // get contractFacroty for it to be further deployed
    const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")

    // deploy contract
    console.log("Deploying contract...")
    const simpleStorage = await SimpleStorageFactory.deploy();
    await simpleStorage.deployed();

    // deployed contract address
    console.log(`Deployed contract to: ${simpleStorage.address}`)

    // 4 == 4 true
    // 4 == "4" true
    // 4 === "4" false

    // To not verify our contract when we are using hardhat network 
    // We use chain ID's to differentiate the network 
    // Here we only verify when chainId is 5 that is goerli and also check if the etherscan api key exist
    // if api key exist then returns true
    if(network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY){
        await simpleStorage.deployTransaction.wait(6); // await 6 block confirmation after deployment
        await verify(simpleStorage.address, []); //  verify is an await function
    }

    // Interacting with the contract
    const currentValue = await simpleStorage.retrieve();
    console.log(`Current value is: ${currentValue}`);

    // Update the current value and since its a transaction we have to wait a few block confirmation
    // this store function doesnt return anything
    const transactionResponse = await simpleStorage.store(7);
    await transactionResponse.wait(1);
    const updatedValue = await simpleStorage.retrieve();
    console.log(`Updated value is: ${updatedValue}`);
}

// Automatically verifies the contract once deployed using this function
// We dont have to this manually now

// another way to define this function
// const verify = async (contractAddress,args) => {}
async function verify(contractAddress,args) {
    console.log("verifying contract....");

    // we add try catch block to handle an error
    try {
        //  run package allows us to run hardhat task
        // Here we'll verify the contract and we can pass arguments
        // we pass args with objects, contractAddress and constructorArguments
        await run("verify:verify",{
            address: contractAddress,
            constructorArguments: args,
        });
    }
    catch(e) {
            if(e.message.toLowerCase().includes("already verified")) {
                console.log("Already Verified!")
            } else {
                console.log(e)
            }
        }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
