import { Box, Button, Flex, HStack, Heading, Tag, Text } from '@chakra-ui/react';

import {ArrowForwardIcon} from '@chakra-ui/icons';
import EditDocument from './EditDocument';
import { Link } from 'react-router-dom';
import ShareDocument from './ShareDocument';
import { useDisclosure } from '@chakra-ui/react';

function DocumentCard({ docId, docType, contentHash, owner, creator, createdAt, updatedAt }) {

    const {isOpen, onOpen, onClose} = useDisclosure();
    const {isOpen: isOpenShare, onOpen: onOpenShare, onClose: onCloseShare} = useDisclosure();

    return (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="lg">
            <Box p="6">
                <Heading as={Link} size="md" mb="2" to={"/api/doc/file/" + contentHash + "?token=" + localStorage.getItem('token')} _hover={{
                    textDecoration: "none",
                    color: "teal.500"
                }}>
                    {docType} - {docId}
                </Heading>
                <HStack>

                <Tag variant="solid" colorScheme="teal" mb="2">
                    {creator}
                </Tag>
                <ArrowForwardIcon/>
                <Tag variant="solid" colorScheme="teal" mb="2">
                    {owner}
                </Tag>
                </HStack>
                <Flex justify="space-between" alignItems="center">
                    <Text fontSize="sm" color="gray.500">
                        Issued on {createdAt}, last updated on {updatedAt}
                    </Text>
                </Flex>
                <Button size="sm" mb={2} onClick={onOpen}>
                    Edit
                </Button>
                <Button size="sm" mb={2} ms={2} onClick={onOpenShare}>
                    Share
                </Button>
            </Box>
            <EditDocument isOpen={isOpen} onClose={onClose} hash={contentHash} />
            <ShareDocument isOpen={isOpenShare} onClose={onCloseShare} hash={contentHash} />
        </Box>
    );
}

export default DocumentCard;