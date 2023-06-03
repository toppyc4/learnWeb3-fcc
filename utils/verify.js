const { run } = require("hardhat")
const verify = async (contractAddress, args) => {
    console.log("Verifying contract . . . ")

    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (err) {
        if (err.massge.toLowerCase().includes("already verified")) {
            console.log("Already Verified!")
        } else {
            console.log(`verify() error: ${err}`)
        }
    }
}

module.exports = { verify }
