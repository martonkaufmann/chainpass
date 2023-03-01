import { Chain } from "wagmi";

const bscTestnet: Chain = {
    id: 97,
    name: "Binance Smart Chain Testnet",
    network: "bsc-testnet",
    nativeCurrency: {
        decimals: 18,
        name: "BNB",
        symbol: "tBNB",
    },
    rpcUrls: {
        default: {
            http: ["https://rpc.ankr.com/bsc_testnet_chapel"],
        },
        public: {
            http: ["https://rpc.ankr.com/bsc_testnet_chapel"],
        },
    },
    blockExplorers: {
        etherscan: {
            name: "BscScan",
            url: "https://testnet.bscscan.com",
        },
        default: {
            name: "BscScan",
            url: "https://testnet.bscscan.com",
        },
    },
    contracts: {
        multicall3: {
            address: "0xca11bde05977b3631167028862be2a173976ca11",
            blockCreated: 17422483,
        },
    },
    testnet: true,
};

export { bscTestnet };
