// if chain is X use address Y
const networkConfig = {
    // Sepolia
    11155111: {
        name: "sepolia",
        ethUSDPriceFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
    },
    // Polygin chain (chainId: 137)
    137: {
        name: "polygon",
        ethUSDPriceFeed: "0xF9680D99D6C9589e2a93a78A04A279e509205945",
    },
    // Hardhat network (chainId: 31337)
}

const developmentChains = ["hardhat", "localhost"]
const DECIMALS = 8
const INITIAL_ANSWER = 200000000000

module.exports = {
    networkConfig,
    developmentChains,
    DECIMALS,
    INITIAL_ANSWER,
}
