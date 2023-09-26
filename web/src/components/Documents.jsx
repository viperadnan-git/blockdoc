import { Box, Container, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";

import DocumentCard from "./DocumentCard";
import ErrorBanner from "./ErrorBanner";
import Loading from "./Loading";
import fetcher from "../lib/fetcher";
import useSwrImmutable from "swr/immutable";

function Document() {
    const { data, error } = useSwrImmutable("http://localhost:3001/api/doc/list", fetcher);

    if (error) return <ErrorBanner error={error} />;
    if (!data) return <Loading />;

    return (
        <Container maxW="container.xl" py="16">
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing="8">
                <Box>
                    <Heading as="h2" size="xl" mb="8">
                        Issued Documents
                    </Heading>
                    <Stack spacing="8">
                       {
                            data.issued_docs.map((doc) => (
                                 <DocumentCard key={doc.hash} {...doc}/>
                            ))
                       }
                    </Stack>
                </Box>
                <Box>
                    <Heading as="h2" size="xl" mb="8">
                        Uploaded Documents
                    </Heading>
                    <Stack spacing="8">
                          {
                             data.uploaded_docs.map((doc) => (
                                    <DocumentCard key={doc.hash} {...doc}/>
                             ))
                          }
                    </Stack>
                </Box>
            </SimpleGrid>
        </Container>
    );
}

export default Document;
