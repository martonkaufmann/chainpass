import { bscTestnet } from "@/chains";
import { ChakraProvider } from "@chakra-ui/react";
import { Roboto } from "@next/font/google";
import { AppProps } from "next/app";
import { configureChains, createClient, WagmiConfig } from "wagmi";
// import { WagmiConfig, createClient, configureChains, mainnet } from 'wagmi'
// import { bsc, bscTestnet } from "wagmi/chains";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { publicProvider } from "wagmi/providers/public";

const roboto = Roboto({
    weight: "400",
    subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
    // const { chains, provider, webSocketProvider } = configureChains([bsc], [publicProvider()]);

    // https://rpc.ankr.com/bsc_testnet_chapel
    // const network = bscTestnet
    // network.rpcUrls.default = 'https://rpc.ankr.com/bsc_testnet_chapel'

    // TODO: Set network based on env
    const { chains, provider, webSocketProvider } = configureChains([bscTestnet], [publicProvider()]);

    const client = createClient({
        autoConnect: true,
        connectors: [new MetaMaskConnector({ chains })],
        provider,
        webSocketProvider,
    });

    return (
        <ChakraProvider>
            <WagmiConfig client={client}>
                <main className={roboto.className}>
                    <Component {...pageProps} />
                </main>
            </WagmiConfig>
        </ChakraProvider>
    );
}
