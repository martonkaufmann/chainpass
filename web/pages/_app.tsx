import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";

import { Roboto } from "@next/font/google";

const roboto = Roboto({
    weight: "400",
    subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider>
            <main className={roboto.className}>
                <Component {...pageProps} />
            </main>
        </ChakraProvider>
    );
}
