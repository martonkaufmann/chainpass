import { useKeyStore } from "@/hooks/useKeyStore";
import { generatePassword } from "@/helpers/password";
import { Button, FormControl, FormLabel, Icon, Input, InputGroup, InputRightElement, Textarea, VStack } from "@chakra-ui/react";
import { Field, Formik } from "formik";
import { useEffect, useState } from "react";
import { FaGlobe, FaKey, FaStickyNote, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { useChainPassAddCredential, useChainPassAddCredentialEvent, useChainPassUsageFee } from "@/hooks/useChainPass";
import { encryptText } from "@/helpers/cryptography";
import { useAccount } from "wagmi";

export default function CredentialForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [encryptedCredential, setEncryptedCredential] = useState<string | undefined>(undefined);
    const [isSaving, setIsSaving] = useState(false);
    const publicKey = useKeyStore((state) => state.publicKey);
    const privateKey = useKeyStore((state) => state.privateKey);
    const { address } = useAccount();
    const usageFeeContractReader = useChainPassUsageFee();
    // TODO: Figure out why TS does not like this
    // https://wagmi.sh/react/hooks/useContractWrite
    // https://wagmi.sh/react/prepare-hooks/usePrepareContractWrite
    const addCredentialContractWriter = useChainPassAddCredential({
        args: [encryptedCredential],
        overrides: {
            value: usageFeeContractReader.data,
        },
    });

    useChainPassAddCredentialEvent({
        listener: (sender, data) => {
            if (sender === address && data === encryptedCredential) {
                setEncryptedCredential(undefined);
                setIsSaving(false);
            }
        },
    });

    useEffect(() => {
        if (encryptedCredential === undefined) {
            return;
        }

        addCredentialContractWriter.write?.();
    }, [encryptedCredential]);

    useEffect(() => {
        if (addCredentialContractWriter.status === "error") {
            setIsSaving(false);
        }

        if (addCredentialContractWriter.status === "loading") {
            setIsSaving(true);
        }
    }, [addCredentialContractWriter.status]);

    return (
        <Formik
            initialValues={{
                name: "",
                url: "",
                username: "",
                password: "",
                note: "",
            }}
            onSubmit={async (values) => {
                if (isSaving === true) {
                    return;
                }

                const credentialJSON = JSON.stringify(values);

                setEncryptedCredential((await encryptText(credentialJSON, publicKey as string, privateKey as string)) as string);
            }}
        >
            {({ handleSubmit, setFieldValue }) => (
                <form onSubmit={handleSubmit}>
                    <VStack spacing={4} align="flex-start">
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Field as={Input} id="name" name="name" type="text" />
                        </FormControl>
                        <FormControl>
                            <FormLabel display="flex" alignItems="center">
                                <Icon as={FaGlobe} mr="1" /> URL
                            </FormLabel>
                            <Field as={Input} id="url" name="url" type="text" />
                        </FormControl>
                        <FormControl>
                            <FormLabel display="flex" alignItems="center">
                                <Icon as={FaUser} mr="1" /> Username
                            </FormLabel>
                            <Field as={Input} id="username" name="username" type="text" />
                        </FormControl>
                        <FormControl>
                            <FormLabel display="flex" alignItems="center">
                                <Icon as={FaKey} mr="1" /> Password
                            </FormLabel>
                            <InputGroup size="md">
                                <Field as={Input} paddingRight="3rem" id="password" name="password" type={showPassword ? "text" : "password"} />
                                <InputRightElement width="3rem">
                                    <Button h="1.8rem" size="sm" variant="ghost" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <Icon as={FaEyeSlash} /> : <Icon as={FaEye} />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            <Button h="1.5rem" width="full" size="sm" variant="ghost" onClick={() => setFieldValue("password", generatePassword())}>
                                Generate password
                            </Button>
                        </FormControl>
                        <FormControl>
                            <FormLabel display="flex" alignItems="center">
                                <Icon as={FaStickyNote} mr="1" /> Note
                            </FormLabel>
                            <Field as={Textarea} id="note" name="note" />
                        </FormControl>
                        <Button type="submit" colorScheme="purple" width="full">
                            {isSaving ? "Saving credentials" : "Save credential"}
                        </Button>
                    </VStack>
                </form>
            )}
        </Formik>
    );
}
