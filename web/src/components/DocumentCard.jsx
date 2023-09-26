import { Box, Flex, Heading, Text } from '@chakra-ui/react';

function DocumentCard({ title, date }) {
    return (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="lg">
            <Box p="6">
                <Heading as="h3" size="md" mb="2">
                    {title}
                </Heading>
                <Flex justify="space-between" alignItems="center">
                    <Text fontSize="sm" color="gray.500">
                        Issued on {date}
                    </Text>
                </Flex>
            </Box>
        </Box>
    );
}

export default DocumentCard;