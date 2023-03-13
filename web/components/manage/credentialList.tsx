import {
    useChainPass,
    useChainPassAddCredential,
    useChainPassAddCredentialEvent,
    useChainPassGetCredentialBlocks,
    useChainPassUsageFee,
    usePrepareChainPassAddCredential,
} from "@/hooks/useChainPass";
// import { useCryptography } from "@/hooks/useCryptography";
import { useKeyStore } from "@/hooks/useKeyStore";
// import { usePasswordGenerator } from "@/hooks/usePasswordGenerator";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    FormControl,
    FormLabel,
    Heading,
    Icon,
    Image,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Text,
    Textarea,
    VStack,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import { useEffect, useState } from "react";
import { FaGlobe, FaKey, FaStickyNote, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { useAccount, useProvider } from "wagmi";
// import { useCredentialStore } from "@/hooks/useCredentialStore";
import { Credential } from "@/models/Credential";
import { decryptText } from "@/helpers/cryptography";
import { ethers } from "ethers";
// import { ICON_CACHE, useCache } from "@/hooks/useCache";

export default function CredentialList() {
    const [credentials, setCredentials] = useState<Credential[]>([]);
    // const { credentials } = useCredentialStore();
    const publicKey = useKeyStore((state) => state.publicKey);
    const privateKey = useKeyStore((state) => state.privateKey);
    const { address } = useAccount();
    const provider = useProvider();
    // const iconCache = useCache(ICON_CACHE);
    const credentialBlocks = useChainPassGetCredentialBlocks({
        args: [address as `0x${string}`],
    });
    const contract = useChainPass({
        signerOrProvider: provider,
    });

    // console.log("RENDER");
    // console.log(credentialBlocks.data);
    // console.log(publicKey);
    // console.log(privateKey);

    useChainPassAddCredentialEvent({
        // listener: (sender, data) => {
        listener: async (sender, data) => {
            if (sender === address) {
                const credentialJSON = await decryptText(data, publicKey as string, privateKey as string);
                const credential: Credential = JSON.parse(credentialJSON as string);

                credential.icon = await getIconURL(credential.url);

                setCredentials((credentials) => [credential, ...credentials]);
            }
        },
    });

    const getIconURL = async (url: string) => {
        const response = await fetch(`http://localhost:3000/api/favicon?domain=${url}`);

        if (response.status === 200) {
            const json = await response.json();
            return json.url;
            // } else {
        }

        // TODO: Create logo from first letter
        return "/bscscan.webp";
    };

    const getevents = async () => {
        if (contract === null) {
            return;
        }

        const blocks = credentialBlocks.data;

        if (blocks === undefined) {
            return;
        }

        const filter = contract.filters.AddCredential(address as `0x${string}`, null);

        for (const block of blocks) {
            const blockNumber = block.toNumber();
            const events = await contract.queryFilter(filter, blockNumber, blockNumber);
            const event = events[0];
            const encryptedCredential = event.args?.[1] as string;
            // console.log(encryptedCredential)
            try {
                const credentialJSON = await decryptText(encryptedCredential, publicKey as string, privateKey as string);
                const credential: Credential = JSON.parse(credentialJSON as string);

                credential.icon = await getIconURL(credential.url);

                setCredentials((credentials) => [credential, ...credentials]);
            } catch (error) {
                console.log(error);
            }
        }
    };

    console.log(credentials);

    return (
        <>
            <Button onClick={() => getevents()}>Get events</Button>
            {credentials.map((credential) => (
                <Card direction={{ base: "column", sm: "row" }}>
                    <Image width={"10"} height={"10"} mt="5" src={credential.icon} alt='Green double couch with wooden legs' borderRadius='lg' />
                    <Stack>
                        <CardBody>
                            <Heading size='md'>{credential.name}</Heading>
                            {/* <Image src={credential.icon.url} /> */}

                            <Text py='2'>Caffè latte is a coffee beverage of Italian origin made with espresso and steamed milk.</Text>
                        </CardBody>
                    </Stack>
                </Card>
            ))}
        </>
    );
}
