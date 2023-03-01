import { Box, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import Image from "next/image";
// import Link from "next/link";
import horn from "./../public/bubble-gum-horn.png";
import lockapassword from "./../public/bubble-gum-lock-and-password.gif";
import question from "./../public/bubble-gum-man-looks-at-the-gears-and-decides-the-question.png";
import owner from "./../public/bubble-gum-paper-resume-card-with-stars-and-photo.png";
import shield from "./../public/bubble-gum-shield-with-check-mark.png";

export default function Index() {
    return (
        <>
            <Flex backgroundColor="gray.700" mb="40" justifyContent={"center"}>
                <Flex width="50%" justify={"center"} alignItems="center" flexFlow={"column"}>
                    <Heading as="h2" size={["md", "lg", "lg", "xl"]} px={[5, 10, 10, 30]} fontWeight={400} color="whiteAlpha.900" textAlign={"center"} mb="10">
                        A revolutionary new blockchain-based solution that offers a secure and seamless alternative to traditional password managers.
                    </Heading>
                    <Heading as="h4" size="md" px={[5, 10, 20, 30]} fontWeight={400} color="whiteAlpha.900" textAlign={"center"} mb="4">
                        Presale starts in
                    </Heading>
                    <SimpleGrid columns={4} spacing="6">
                        <Box>
                            <Text backgroundColor="#FFA9DC" color="whiteAlpha.900" fontSize={"4xl"} px="3" py="2" borderRadius={"16"} mb="2">
                                10
                            </Text>
                            <Text color="gray.400" textAlign={"center"}>
                                Days
                            </Text>
                        </Box>
                        <Box>
                            <Text backgroundColor="#FFA9DC" color="whiteAlpha.900" fontSize={"4xl"} px="3" py="2" borderRadius={"16"} mb="2">
                                10
                            </Text>
                            <Text color="gray.400" textAlign={"center"}>
                                Hours
                            </Text>
                        </Box>
                        <Box>
                            <Text backgroundColor="#FFA9DC" color="whiteAlpha.900" fontSize={"4xl"} px="3" py="2" borderRadius={"16"} mb="2">
                                10
                            </Text>
                            <Text color="gray.400" textAlign={"center"}>
                                Minutes
                            </Text>
                        </Box>
                        <Box>
                            <Text backgroundColor="#FFA9DC" color="whiteAlpha.900" fontSize={"4xl"} px="3" py="2" borderRadius={"16"} mb="2">
                                10
                            </Text>
                            <Text color="gray.400" textAlign={"center"}>
                                Seconds
                            </Text>
                        </Box>
                    </SimpleGrid>
                </Flex>
                <Image width={551} height={564} src="/bubble-gum-phone-with-password-and-lock.gif" alt="phone-with-password-and-lock" />
            </Flex>
            <SimpleGrid spacing={16} columns={[1, 1, 3]} px={[5, 10, 20, 40]} mb="40">
                <Box>
                    <Image src={shield} height={120} alt="shield-with-check-mark" style={{ margin: "0 auto" }} />
                    <Heading as="h3" size="lg" mt="5" mb="8" textAlign="center">
                        Stay secure
                    </Heading>
                    <Text fontSize={"lg"} textAlign="center">
                        No sensitive information will leave your device unencrypted, we'll use your wallet's public key to encrypt any and all data before it
                        leaves your device.
                    </Text>
                </Box>
                <Box>
                    <Image src={owner} height={120} alt="key" style={{ margin: "0 auto" }} />
                    <Heading as="h3" size="lg" mt="5" mb="8" textAlign="center">
                        Retain ownership
                    </Heading>
                    <Text fontSize={"lg"} textAlign="center">
                        All your credentails will be stored on chain, always accessible to you, no central servers owned by a third party entity which you have
                        no oversight or ownership of.
                    </Text>
                </Box>
                <Box>
                    <Image src={horn} height={120} alt="key" style={{ margin: "0 auto" }} />
                    <Heading as="h3" size="lg" mt="5" mb="8" textAlign="center">
                        Be always up to date
                    </Heading>
                    <Text fontSize={"lg"} textAlign="center">
                        Frequent updates on current and planned features, expected release dates, so you never feel left in the dark.
                    </Text>
                </Box>
            </SimpleGrid>
            <Flex alignItems={"center"} mb="20">
                <Heading as="h4" textShadow="4px 4px 0px #FFA9DC" fontWeight={900} textAlign="center">
                    STORE YOUR CREDENTIALS SECURELY
                </Heading>
                <Image src={lockapassword} alt="lockapassword"></Image>
            </Flex>
            <Flex>
                <Box width="50%">
                    <Image src={question} alt="question" width={600} />
                </Box>
                <Box width="50%" pr="20">
                    <Heading as="h4" fontSize="3xl" mb="8" mt="20">
                        How exactly will you keep my credentials safe?
                    </Heading>

                    <Text mb="4" fontSize={"lg"}>
                        We use something called public-key cryptography.
                    </Text>
                    <Text mb="4" fontSize={"lg"}>
                        Public-key cryptography — or asymmetric cryptography — is a cryptographic system in which keys come in pairs. The transformation
                        performed by one of the keys can only be undone with the other key. One key (the private key) is kept secret while the other is made
                        public.
                    </Text>

                    <Text mb="4" fontSize={"lg"}>
                        When used for encryption, the public key is used to encrypt and the private key is used to decrypt. This gives public-key encryption
                        systems an advantage over symmetric encryption systems in that the encryption key can be made public. Anyone could encrypt a message to
                        the owner of the private key, but only the owner of the private key could decrypt it.
                    </Text>
                    {/* </VStack> */}
                    {/* </Text> */}

                    {/* <Heading>Where will you store my credentials?</Heading>
                    <Text>
                        Technically we won't store any of your credentials, only read them from and write them to the blockchain, which we'll provide a web and mobile based interface for.
                    </Text> */}

                    {/* <Text>So can anyone get my credentials from the chain?</Text>
            <Text>
                Technically we won't store any of your credentials, only read them from and write them to the blockchain, which we'll provide a web and mobile based interface for.
            </Text> */}

                    {/* <Text>Where will you store my credentials?</Text>
            <Text>
                Technically we won't store any of your credentials, only read them from and write them to the blockchain, which we provide a web and mobile based interface for.
                That means there are no systems inbetween you and the smart contract you interact with to store and share credentials.
            </Text> */}

                    {/* <Text>How do I create an account?</Text>
            <Text>You don't need to, the only thing you need is a crypto wallet and you're ready to go.</Text> */}

                    {/* <Text>What if you get hacked, will my credentials be safe then?</Text>
                    <Text>
                        In the event that we get hacked all your credentials will be safe, as we do not store any information that could help the
                        attackers gain access to your credentials.
                    </Text> */}

                    {/* <Text>If you still have some questions left feel free to reach out to us on Telegram</Text> */}
                </Box>
            </Flex>
            {/* <Box>
                <Heading as="h4" textShadow="4px 4px 0px #FFE993" fontWeight={900} textAlign="center">
                    SHARE AND COLLABORATE ON DOCUMENTS IN A SECURE ENVIRONMENT
                </Heading>
                <Image src={collab} alt="collab" style={{ margin: "0 auto" }}></Image>
            </Box> */}
            <Heading>Roadmap</Heading>
            2023 Q1 Create social media accounts Presale on Pinksale Webinterface for storing credentials Preparing advertising material 2023 Q2 Browser plugin
            Autocomplete login forms on websites Sharing credentials Start advertising 2023 Q3 Mobile app for iOS and Android 2023 Q4 Document handling and
            sharing Allow users without a wallet to register
        </>
    );
}
