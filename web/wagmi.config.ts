import { chainPassABI } from "@/abi";
import { defineConfig } from "@wagmi/cli";
import { react } from "@wagmi/cli/plugins";

export default defineConfig({
    out: "hooks/useChainPass.ts",
    contracts: [
        {
            name: "ChainPass",
            address: "0x0b273A383cCF2c8174d4E39F3536Cf492B6e5Ae9", // TODO: Read from env, NOTE: Proxy contract address
            abi: chainPassABI,
        },
    ],
    plugins: [react()],
});
