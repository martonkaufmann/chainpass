import { validatePublicKey, validatePrivateKey } from "@/helpers/cryptography";
import { useChainPassGetCredentialBlocks } from "@/hooks/useChainPass";
import { useKeyStore } from "@/hooks/useKeyStore";
import { Button, Divider, FormControl, FormErrorMessage, FormLabel, Input, Stack, Text } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";

function HandleKeys() {
    const { address } = useAccount();
    const [isPublicKeyValid, setIsPublicKeyValid] = useState<boolean | undefined>(undefined);
    const [isPrivateKeyValid, setIsPrivateKeyValid] = useState<boolean | undefined>(undefined);
    const [publicKey, setPublicKey] = useState<string | undefined>(undefined);
    const [privateKey, setPrivateKey] = useState<string | undefined>(undefined);
    const setKeys = useKeyStore((state) => state.setKeys);
    const generateKeys = useKeyStore((state) => state.generateKeys);
    const credentialBlocks = useChainPassGetCredentialBlocks({
        args: [address as `0x${string}`],
    });

    if (credentialBlocks.data?.length === 0) {
        generateKeys(address as string);
        return <></>;
    }

    const onPublicKeyChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.currentTarget.files?.[0];
        const key = await file?.text();
        const isValid = await validatePublicKey(key as string);

        setIsPublicKeyValid(isValid);

        if (isValid) {
            setPublicKey(key);
        }
    };

    const onPrivateKeyChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.currentTarget.files?.[0];
        const key = await file?.text();
        const isValid = await validatePrivateKey(key as string);

        setIsPrivateKeyValid(isValid);

        if (isValid) {
            setPrivateKey(key);
        }
    };

    const onSubmit = () => {
        if (true === isPrivateKeyValid || true === isPublicKeyValid) {
            setKeys(publicKey as string, privateKey as string);
        }
    };

    const onGenerateKeysClick = () => {
        generateKeys(address as string);
    };

    return (
        <>
            <form onSubmit={onSubmit}>
                <FormControl isInvalid={isPublicKeyValid === false}>
                    <FormLabel>Public key</FormLabel>
                    <Input type="file" onChange={onPublicKeyChange} />
                    <FormErrorMessage>Provided public key is invalid</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={isPrivateKeyValid === false}>
                    <FormLabel>Private key</FormLabel>
                    <Input type="file" onChange={onPrivateKeyChange} />
                    <FormErrorMessage>Provided private key is invalid</FormErrorMessage>
                </FormControl>
                <Button type="submit" colorScheme={isPrivateKeyValid && isPrivateKeyValid ? "teal" : "gray"}>
                    Provide keys
                </Button>
            </form>
            <Stack direction="row" alignItems="center">
                <Divider orientation="horizontal" />
                <Text>OR</Text>
                <Divider orientation="horizontal" />
            </Stack>
            <Button onClick={onGenerateKeysClick} colorScheme="teal">
                Generate new keys
            </Button>
        </>
    );
}

export default dynamic(() => Promise.resolve(HandleKeys), {
    ssr: false,
});
