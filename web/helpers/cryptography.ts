import { createMessage, decrypt, encrypt, enums, readKey, readMessage, readPrivateKey } from "openpgp";

const encryptText = async (text: string, publicKey: string, privateKey: string) => {
    const message = await createMessage({ text });
    const encryptionKey = await readKey({ armoredKey: `${publicKey}` });
    const signingKey = await readPrivateKey({ armoredKey: `${privateKey}` });

    return await encrypt({
        message,
        encryptionKeys: encryptionKey,
        signingKeys: signingKey,
        config: {
            preferredCompressionAlgorithm: enums.compression.zlib,
        },
    });
};

const decryptText = async (text: string, publicKey: string, privateKey: string) => {
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

const validatePublicKey = async (key: string) => {
    let isValid = true;

    try {
        // Either readKey throws an error or we throw one if the key is not a private key
        if ((await readKey({ armoredKey: `${key}` })).isPrivate()) {
            throw new Error("Private key provided");
        }
    } catch (error) {
        isValid = false;
    }

    return isValid;
};

const validatePrivateKey = async (key: string) => {
    let isValid = true;

    try {
        await readPrivateKey({ armoredKey: `${key}` });
    } catch (error) {
        isValid = false;
    }

    return isValid;
};

export { encryptText, decryptText, validatePublicKey, validatePrivateKey };
