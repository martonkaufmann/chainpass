import { createMessage, decrypt, encrypt, enums, generateKey, readKey, readMessage, readPrivateKey } from "openpgp";
import { useLocalStorage } from "react-use";

export function useKeys() {
    const [publicKey, setPublicKey, removePublicKey] = useLocalStorage<string>("public-key");
    const [privateKey, setPrivateKey, removePrivateKey] = useLocalStorage<string>("private-key");

    const generateKeys = async (address: string) => {
        const keys = await generateKey({ curve: "p521", userIDs: { name: address } });

        setPublicKey(keys.publicKey);
        setPrivateKey(keys.privateKey);

        return keys;
    };

    const encryptText = async (text: string) => {
        if (publicKey === undefined || privateKey === undefined) {
            throw new Error("Missing keys");
        }

        const message = await createMessage({ text });
        const encryptionKey = await readKey({ armoredKey: `${publicKey}` });
        const signingKey = await readPrivateKey({ armoredKey: `${privateKey}` });

        return await encrypt({
            message,
            encryptionKeys: encryptionKey,
            signingKeys: signingKey,
            // passwords: addr // TODO: Add password?
            config: {
                preferredCompressionAlgorithm: enums.compression.zlib,
            },
        });
    };

    const decryptText = async (text: string) => {
        const verificationKey = await readKey({ armoredKey: `${publicKey}` });
        const decryptionKey = await readPrivateKey({ armoredKey: `${privateKey}` });
        const message = await readMessage({ armoredMessage: text });
        const decryptionResult = await decrypt({
            message,
            verificationKeys: verificationKey,
            decryptionKeys: decryptionKey,
        });

        return decryptionResult.data;
    };

    return {
        publicKey,
        setPublicKey,
        removePublicKey,
        privateKey,
        setPrivateKey,
        removePrivateKey,

        generateKeys,
        encrypt: encryptText,
        decrypt: decryptText,
    };
}
