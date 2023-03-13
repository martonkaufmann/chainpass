import { Button, Stack } from "@chakra-ui/react";
import { useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

export default function ConnectWallet() {
    const { connect } = useConnect({ connector: new InjectedConnector() });

    return <Button onClick={() => connect()}>Connect Wallet</Button>;
}
