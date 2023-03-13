import { create } from "zustand";
import { generateKey } from "openpgp";

interface KeyStore {
    publicKey: string | undefined;
    privateKey: string | undefined;
    setKeys: (publicKey: string, privateKey: string) => void;
    generateKeys: (address: string) => Promise<void>;
    loadKeys: () => void;
}

const publicKeyStorageKey = "public-key";
const privateKeyStorageKey = "private-key";

const useKeyStore = create<KeyStore>((set) => ({
    publicKey: undefined,
    privateKey: undefined,
    setKeys: (publicKey: string, privateKey: string) => {
        window.localStorage.setItem(publicKeyStorageKey, publicKey);
        window.localStorage.setItem(privateKeyStorageKey, privateKey);

        set(() => ({ publicKey, privateKey }));
    },
    generateKeys: async (address: string) => {
        const { publicKey, privateKey } = await generateKey({
            curve: "p521",
            userIDs: { name: address },
        });

        window.localStorage.setItem(publicKeyStorageKey, publicKey);
        window.localStorage.setItem(privateKeyStorageKey, privateKey);

        set(() => ({ publicKey, privateKey }));
    },
    loadKeys: () => {
        const publicKey = window.localStorage.getItem(publicKeyStorageKey) || undefined;
        const privateKey = window.localStorage.getItem(privateKeyStorageKey) || undefined;

        set({ publicKey, privateKey });
    },
}));

export { useKeyStore };
