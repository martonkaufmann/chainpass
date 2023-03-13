import { bscTestnet } from "@/chains";
import { ChakraProvider } from "@chakra-ui/react";
import { Roboto } from "@next/font/google";
import { AppProps } from "next/app";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { bsc } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { InjectedConnector } from "wagmi/connectors/injected";

const roboto = Roboto({
    weight: "400",
    subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
    const { chains, provider, webSocketProvider } = configureChains(process.env.NODE_ENV === "development" ? [bscTestnet] : [bsc], [publicProvider()]);

    const client = createClient({
        autoConnect: true,
        connectors: [new InjectedConnector({ chains })],
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
