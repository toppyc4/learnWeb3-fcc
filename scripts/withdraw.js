const { ethers } = require("hardhat")
const { getNamedAccounts } = require("hardhat")

async function main() {
    const { deployer } = await getNamedAccounts()
    const fundMe = await ethers.getContract("FundMe", deployer)
    console.log("Funding . . .")
    const transasctionResponse = await fundMe.withdraw()
    await transasctionResponse.wait(1)
    console.log("Got it back!")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exitCode = 1
    })
