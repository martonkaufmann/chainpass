import { chainPassABI } from "@/abi";
import { defineConfig } from "@wagmi/cli";
import { react } from "@wagmi/cli/plugins";

export default defineConfig({
    out: "hooks/useChainPass.ts",
    contracts: [
        {
            // name: "erc20",
            // abi: erc20ABI,
            name: "ChainPass",
            address: "0xd6e09efa358f464Aa5d74c03e876AEED16ae17D9",
            abi: chainPassABI,
        },
    ],
    plugins: [
        // etherscan({
        //     //   apiKey: process.env.ETHERSCAN_API_KEY!,
        //     apiKey: "X7CMHWUZFXT5HQDWCNSFEXVTV2CYTKC5CE", // TODO: Read from env
        //     chainId: bscTestnet.id,
        //     contracts: [
        //         {
        //             name: "Proxy",
        //             // abi: '',
        //             // abi: erc20ABI,
        //             address: {
        //                 [bscTestnet.id]: "0xd6e09efa358f464Aa5d74c03e876AEED16ae17D9", // TODO: Read from env
        //                 [bscTestnet.id]: "0x989128b929Abf468CbF2D885ea8De7AC83e46AE2", // TODO: Read from env
        //             },
        //         },
        //     ],
        // }),
        react(),
    ],
});
