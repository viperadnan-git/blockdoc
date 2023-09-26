import { Box, Container, Heading, SimpleGrid, Stack } from '@chakra-ui/react';

import DocumentCard from './DocumentCard';
import FunctionCard from './FunctionCard';
import useLogin from '../hooks/useLogin';

function Dashboard() {
    return (
        <Box>
            <Box  py="8">
                <Container maxW="container.xl">
                    <Stack spacing="8">
                        <Heading as="h1" size="2xl">
                            Welcome to your dashboard
                        </Heading>
                        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing="8">
                            <FunctionCard title="Issue Document" icon="https://via.placeholder.com/50" />
                            <FunctionCard title="Upload Document" icon="https://via.placeholder.com/50" />
                            <FunctionCard title="View Documents" icon="https://via.placeholder.com/50" />
                            <FunctionCard title="Settings" icon="https://via.placeholder.com/50" />
                        </SimpleGrid>
                    </Stack>
                </Container>
            </Box>
            <Container maxW="container.xl" py="16">
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing="8">
                    <Box>
                        <Heading as="h2" size="xl" mb="8">
                            Issued Documents
                        </Heading>
                        <Stack spacing="8">
                            <DocumentCard title="Document 1" date="2022-01-01" />
                            <DocumentCard title="Document 2" date="2022-01-02" />
                            <DocumentCard title="Document 3" date="2022-01-03" />
                        </Stack>
                    </Box>
                    <Box>
                        <Heading as="h2" size="xl" mb="8">
                            Uploaded Documents
                        </Heading>
                        <Stack spacing="8">
                            <DocumentCard title="Document 4" date="2022-01-04" />
                            <DocumentCard title="Document 5" date="2022-01-05" />
                            <DocumentCard title="Document 6" date="2022-01-06" />
                        </Stack>
                    </Box>
                </SimpleGrid>
            </Container>
        </Box>
    );
}

export default Dashboard;