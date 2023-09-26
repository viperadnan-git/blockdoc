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

function ShareDocument({ isOpen, onClose, hash }) {
    const [username, setUsername] = useState("");
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const form = new FormData();
        form.append("username", username);

        setIsLoading(true);

        fetch("http://localhost:3001/api/doc/share/" + hash, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: form,
        }).then((response) => {
            toast({
                title: "Document shared",
                description: "Your document has been shared successfully.",
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
                            Share Document
                        </Heading>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={handleSubmit}>
                            <Stack spacing={{ base: "4", md: "6", lg: "8" }}>
                                <FormControl isRequired>
                                    <FormLabel>Username of receiver</FormLabel>
                                    <Input type="text" value={username} onChange={handleUsernameChange} />
                                </FormControl>
                            </Stack>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="teal" mr={3} onClick={handleSubmit} isLoading={isLoading}>
                            Share
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

export default ShareDocument;