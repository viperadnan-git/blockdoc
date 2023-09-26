import { Box, Button, Flex, Heading, Icon, useDisclosure } from "@chakra-ui/react";

import { AddIcon } from "@chakra-ui/icons";
import UploadDocument from "./UploadDocument";

function FunctionCard({ title, icon }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="lg">
            <Flex justify="center" alignItems="center" bg="gray.100" p="6">
                <Icon as={AddIcon} boxSize="10" color="gray.500" mr="4" />
                <Heading as="h3" size="md" color="gray.500">
                    {title}
                </Heading>
            </Flex>
            <Box p="6">
                <Button colorScheme="teal" size={{ base: "md", md: "lg" }} onClick={onOpen}>
                    Upload Document
                </Button>
                <UploadDocument isOpen={isOpen} onClose={onClose} />
            </Box>
        </Box>
    );
}

export default FunctionCard;
