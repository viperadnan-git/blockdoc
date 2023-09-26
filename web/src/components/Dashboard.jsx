import { Box, Container, Heading, SimpleGrid, Stack } from "@chakra-ui/react";

import Documents from "./Documents";
import FunctionCard from "./FunctionCard";
import UploadDocument from "./UploadDocument";
import checkLogin from "../lib/checkLogin";

function Dashboard() {
    const isLoggedIn = checkLogin();

    if (!isLoggedIn) {
        window.location.href = "/login";
    }

    return (
        <Box>
            <Box py="8">
                <Container maxW="container.xl">
                    <Stack spacing="8">
                        <Heading as="h1" size="2xl">
                            Welcome to your dashboard
                        </Heading>
                        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing="8">
                            <FunctionCard title="Upload Document" icon="https://via.placeholder.com/50" />
                            <FunctionCard title="View Documents" icon="https://via.placeholder.com/50" />
                            <FunctionCard title="Settings" icon="https://via.placeholder.com/50" />
                        </SimpleGrid>
                    </Stack>
                </Container>
            </Box>
            <Documents />
        </Box>
    );
}

export default Dashboard;
