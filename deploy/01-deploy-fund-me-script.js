// import
// main function
// calling of main function

// const helperConfig = require("../helper-hardhat-config")
// const networkConfig = helperConfig.networkConfig
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { network } = require("hardhat")
const { verify } = require("../utils/verify")

// function deployFunc() {
//     console.log("Hi!")
// }
// module.exports.default = deployFunc
module.exports = async ({ getNamedAccounts, deployments }) => {
    // const { getNameAccounts, deployments } = hre
    // hre.getNameAccounts
    // hre.deployments
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    /// if chain is X use address Y
    // const ethUSDPriceFeedAddress = networkConfig[chainId]["ethUSDPriceFeed"]
    let ethUSDPriceFeedAddress
    if (developmentChains.includes(network.name)) {
        const ethUSDAggregator = await deployments.get("MockV3Aggregator")
        ethUSDPriceFeedAddress = ethUSDAggregator.address
    } else {
        ethUSDPriceFeedAddress = networkConfig[chainId]["ethUSDPriceFeed"]
    }

    log("----------------------------------------------------")
    log("Deploying FundMe and waiting for confirmations...")

    // well what happens when we want to change chains?
    // when going for localhost or hardhat network we want to use mock
    const args = [ethUSDPriceFeedAddress]
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [ethUSDPriceFeedAddress], // put price feed address
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(fundMe.address, [ethUSDPriceFeedAddress])
    }

    log("------------------------------------------------")
}

module.exports.tags = ["all", "fundme"]
