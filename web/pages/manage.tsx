import { useChainPass, useChainPassAddCredential, useChainPassGetCredentialBlocks } from "@/hooks/useChainPass";
// import { useProxy, useProxyAddCredential, useProxyGetCredentialBlocks } from "@/hooks/useChainPass";
import { useKeys } from "@/hooks/useKeys";
import { ethers } from "ethers";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect, useProvider } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

function Manage() {
    const [encryptedCredential, setEncryptedCredential] = useState("");
    const [credential, setCredential] = useState("");
    const [isGeneratingKeys, setIsGeneratingKeys] = useState(false);

    const provider = useProvider();
    const contract = useChainPass({
        signerOrProvider: provider,
    });
    const { address, isConnected } = useAccount();
    const { connect } = useConnect({ connector: new MetaMaskConnector() });
    const { disconnect } = useDisconnect();

    console.log(contract);

    const { publicKey, privateKey, generateKeys, encrypt, decrypt } = useKeys();
    const { write: emitAddCredentialEvent, isLoading } = useChainPassAddCredential({
        args: [`${encryptedCredential}`],
        overrides: {
            value: ethers.utils.parseEther("0.001"), // TODO: Get usageFee from contract
        },
    });
    // const {
    //     config
    // } = usePrepareChainPassAddCredential({
    //     args: [`${encryptedCredential}, 0.001`]
    // });

    // const { write:emitAddCredentialEvent, isLoading } = useContractWrite(config)

    console.log(address);
    // console.log(provider._getAddress)
    console.log(contract.address);
    console.log(`${address}`);

    const {
        data,
        error: errr1,

        // write: getCredentialBlockRange,
        // isLoading,
        // isSuccess,
        // isError,
        // error,
    } = useChainPassGetCredentialBlocks({
        args: [`${address}`],
    });

    // useChainPassAddCredentialEvent({

    // })

    console.log(data);
    console.log(errr1);

    useEffect(() => {
        if (encryptedCredential === "") {
            return;
        }

        console.log("Emit event");
        console.log(encryptedCredential);

        emitAddCredentialEvent?.();
        setEncryptedCredential("");
    }, [encryptedCredential]);

    useEffect(() => {
        if (publicKey === undefined || privateKey === undefined) {
            return;
        }

        setIsGeneratingKeys(false);
    }, [publicKey, privateKey]);

    if (!isConnected) {
        return <button onClick={() => connect()}>Connect Wallet</button>;
    }

    if (publicKey === undefined || privateKey === undefined) {
        // TODO: Add option to upload keys
        if (isGeneratingKeys) {
            return <>Generating keys</>;
        } else {
            setIsGeneratingKeys(true);
            generateKeys(`${address}`);
        }
    }

    if (isLoading) {
        return <>Storing credential</>;
    }

    const onC = async () => {
        const encryptedCredential = await encrypt(`${credential}`);
        setEncryptedCredential(`${encryptedCredential}`);
    };

    const getevents = async () => {
        if (contract === null) {
            console.log("Contract is null");
            return;
        }

        // getCredentialBlockRange.?()

        console.log(provider);
        console.log(contract);
        console.log(address);
        console.log(contract.address);

        // console.log(data?.[0])
        // console.log(data?.[1])
        // console.log(data?.[0]._hex)
        // console.log(data?.[1]._hex)
        // console.log(data?.[0].toString())
        // console.log(data?.[1].toString())

        // // contract.filters.AddCredential

        // const addr1 = ethers.utils.hexZeroPad(data?.[0]._hex, 32);
        // const addr2 = ethers.utils.hexZeroPad(data?.[1]._hex, 32);

        // console.log(addr1)
        // console.log(addr2)

        // const a = await contract.queryFilter('*', address?.replace('0x', ''), contract.address.replace('0x', ''))
        // const a = await contract.queryFilter("AddCredential");
        // console.log(a);

        // const f = contract.filters.AddCredential(address)
        const f = contract.filters.AddCredential(address);
        // const f = contract.filters.AddCredential
        // console.log(f)
        //  const ev = await contract.queryFilter(f, 27492380,  27492927)
        const ev = await contract.queryFilter(f, 27519906, 27519994);
        //  const ev = await contract.queryFilter('0xa5a96719e0e4fa93c8345ae856f7aa2be855f0b600c8c0f2f73465e2093e470e',  27519906  ,   27519994  )
        // TODO: Check if events can be fetched from the contract so that ankr calls can be reduced
        // TODO: Check if gas price increases if a lot of transaction hashes are already stored
        //  const ev2 = await contract.queryFilter(f, -100)

        console.log(ev);
        //  console.log(ev2)

        // const b = provider.getLogs({
        //     address: address,
        //     fromBlock:addr1,
        //     toBlock: addr2,

        //     // topics: ["0xa5a96719e0e4fa93c8345ae856f7aa2be855f0b600c8c0f2f73465e2093e470e"],
        //     // topics: [
        //     //     "0xa5a96719e0e4fa93c8345ae856f7aa2be855f0b600c8c0f2f73465e2093e470e",
        //     //     "0x0000000000000000000000007788175605244f71813e8ba255d3dabb442f9159"
        //     // ],
        // }).then((logs) => {
        //     console.log(logs)
        // })

        // console.log(b);
    };

    return (
        <>
            <button onClick={onC}>Store credentials</button>
            <input type="text" onChange={(e) => setCredential(e.target.value)} />
            <button onClick={() => getevents()}>get events</button>
            <button onClick={() => disconnect()}>Disconnect</button>
        </>
    );
}

export default dynamic(() => Promise.resolve(Manage), {
    ssr: false,
});
