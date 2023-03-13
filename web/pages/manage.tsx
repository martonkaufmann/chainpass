import { useKeyStore } from "@/hooks/useKeyStore";
import { Box, Flex } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import ConnectWallet from "@/components/manage/connectWallet";
import HandleKeys from "@/components/manage/handleKeys";
import CredentialForm from "@/components/manage/credentialForm";
import CredentialList from "@/components/manage/credentialList";

function Manage() {
    const publicKey = useKeyStore((state) => state.publicKey);
    const privateKey = useKeyStore((state) => state.privateKey);
    const loadKeys = useKeyStore((state) => state.loadKeys);
    const { isConnected } = useAccount();

    useEffect(() => {
        loadKeys();
    }, []);

    if (!isConnected) {
        return <ConnectWallet />;
    }

    if (publicKey === undefined || privateKey === undefined) {
        return <HandleKeys />;
    }

    return (
        <Flex>
            <Box flex="6">
                {/* <Link download="chainpass.key" href={generateDownloadLink(`${publicKey}`)}>
                    Download public key
                </Link>
                <Link download="chainpass.pkey" href={generateDownloadLink(`${privateKey}`)}>
                    Download private key
                </Link> */}
                <CredentialList />
            </Box>
            <Box flex="3" minW={"200"} borderLeft="solid 1px black" p="4">
                <CredentialForm />
            </Box>
        </Flex>
    );
}

export default dynamic(() => Promise.resolve(Manage), {
    ssr: false,
});
