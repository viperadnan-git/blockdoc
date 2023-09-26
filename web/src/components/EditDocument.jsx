import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";

import { useState } from "react";

function EditDocument({ isOpen, onClose, hash }) {
    const [file, setFile] = useState(null);
    const [docType, setDocType] = useState("");
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleDocTypeChange = (event) => {
        setDocType(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const form = new FormData();
        form.append("file", file);
        form.append("doc_type", docType);

        setIsLoading(true);

        fetch("http://localhost:3001/api/doc/edit/" + hash, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: form,
        }).then((response) => {
            toast({
                title: "Document uploaded",
                description: "Your document has been uploaded successfully.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });

            onClose();
        }).catch((error) => {
            toast({
                title: "An error occurred.",
                description: error.message,
                status: "error",
                duration: 9000,
                isClosable: true,
            })
        })
        .finally(() => {
            setIsLoading(false);
        });
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Heading as="h1" size="lg">
                            Edit Document
                        </Heading>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={handleSubmit}>
                            <Stack spacing={{ base: "4", md: "6", lg: "8" }}>
                                <FormControl isRequired>
                                    <FormLabel>File</FormLabel>
                                    <Input type="file" onChange={handleFileChange} />
                                    <Text fontSize="sm" color="gray.500">
                                        Note: Maximum file size is 10MB.
                                    </Text>
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Document Type</FormLabel>
                                    <Input type="text" value={docType} onChange={handleDocTypeChange} />
                                </FormControl>
                            </Stack>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="teal" mr={3} onClick={handleSubmit} isLoading={isLoading}>
                            Edit
                        </Button>
                        <Button variant="ghost" onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default EditDocument;
