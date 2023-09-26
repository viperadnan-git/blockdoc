import {
    Box,
    Button,
    Container,
    Heading,
    Image,
    SimpleGrid,
    Stack,
    Text,
} from '@chakra-ui/react';

function Home() {
    return (
        <Box>
            <Box
                bgImage="url('https://via.placeholder.com/1200x600')"
                bgPosition="center"
                bgSize="cover"
                h="400px"
            >
                <Container maxW="container.xl" h="100%">
                    <Stack
                        direction="column"
                        justify="center"
                        alignItems="center"
                        h="100%"
                        color="white"
                    >
                        <Heading as="h1" size="4xl" textAlign="center">
                            Your secure eVault on the blockchain
                        </Heading>
                        <Text fontSize="xl" textAlign="center">
                            Store your important documents and data securely on the blockchain
                        </Text>
                        <Button colorScheme="blue" size="lg" mt="8">
                            Get started
                        </Button>
                    </Stack>
                </Container>
            </Box>
            <Container maxW="container.xl" py="16">
                <Stack spacing="16">
                    <Box>
                        <Heading as="h2" size="2xl" mb="8">
                            Features
                        </Heading>
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing="8">
                            <Box>
                                <Image src="https://via.placeholder.com/400x300" alt="Feature 1" mb="4" />
                                <Heading as="h3" size="lg" mb="4">
                                    Secure storage
                                </Heading>
                                <Text>
                                    Your data is encrypted and stored securely on the blockchain, ensuring that only
                                    you can access it.
                                </Text>
                            </Box>
                            <Box>
                                <Image src="https://via.placeholder.com/400x300" alt="Feature 2" mb="4" />
                                <Heading as="h3" size="lg" mb="4">
                                    Easy sharing
                                </Heading>
                                <Text>
                                    Share your data with others easily and securely, without worrying about
                                    compromising your privacy.
                                </Text>
                            </Box>
                        </SimpleGrid>
                    </Box>
                    <Box>
                        <Heading as="h2" size="2xl" mb="8">
                            Roadmap
                        </Heading>
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing="8">
                            <Box>
                                <Heading as="h3" size="lg" mb="4">
                                    Q1 2022
                                </Heading>
                                <Text>
                                    Launch of the eVault platform with basic features, including secure storage and
                                    easy sharing.
                                </Text>
                            </Box>
                            <Box>
                                <Heading as="h3" size="lg" mb="4">
                                    Q2 2022
                                </Heading>
                                <Text>
                                    Integration with popular blockchain networks and support for more file types.
                                </Text>
                            </Box>
                            <Box>
                                <Heading as="h3" size="lg" mb="4">
                                    Q3 2022
                                </Heading>
                                <Text>
                                    Advanced features, including smart contracts and decentralized access control.
                                </Text>
                            </Box>
                            <Box>
                                <Heading as="h3" size="lg" mb="4">
                                    Q4 2022
                                </Heading>
                                <Text>
                                    Mobile app release and integration with popular cloud storage providers.
                                </Text>
                            </Box>
                        </SimpleGrid>
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
}

export default Home;