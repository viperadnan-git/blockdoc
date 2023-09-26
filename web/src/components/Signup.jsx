import { Box, Button, FormControl, FormLabel, Heading, Input, Link, Stack, Text } from "@chakra-ui/react";

import { useState } from "react";
import { useToast } from "@chakra-ui/react";

function Signup() {
    const toast = useToast({
        position: "top",
    });
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!password === confirmPassword) {
            toast({
                title: "Passwords do not match.",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
            return;
        }

        // Handle signup logic here
        setIsLoading(true);
        fetch("http://localhost:3001/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, username, email, password, confirmPassword }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.code !== 200) {
                    toast({
                        title: "An error occurred.",
                        description: data.message,
                        status: "error",
                        duration: 9000,
                        isClosable: true,
                    });
                } else {
                    toast({
                        title: "Account created.",
                        description: "Your account has been successfully created.",
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                    });
                    window.location.href = "/login";
                }
            })
            .catch((error) => {
                toast({
                    title: "An error occurred.",
                    description: "Unable to create your account.",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                });
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <Box minH="100vh" py="12" px={{ base: "4", lg: "8" }}>
            <Box maxW="md" mx="auto" w={{ base: "full", md: "md" }} p="8" borderWidth="1px" borderRadius="lg" boxShadow="lg">
                <Heading textAlign="center" mb="8">
                    Create an account
                </Heading>
                <form onSubmit={handleSubmit}>
                    <Stack spacing="6">
                        <FormControl id="name" isRequired>
                            <FormLabel>Name</FormLabel>
                            <Input type="text" value={name} onChange={(event) => setName(event.target.value)} />
                        </FormControl>
                        <FormControl id="username" isRequired>
                            <FormLabel>Username</FormLabel>
                            <Input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
                        </FormControl>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                        </FormControl>
                        <FormControl id="confirmPassword" isRequired>
                            <FormLabel>Confirm password</FormLabel>
                            <Input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
                        </FormControl>
                        <Button type="submit" colorScheme="blue" size="lg" fontSize="md" isLoading={isLoading}>
                            Sign up
                        </Button>
                    </Stack>
                </form>
                <Text mt="4" textAlign="center">
                    Already have an account?{" "}
                    <Link color="blue.500" href="/login">
                        Log in
                    </Link>
                </Text>
            </Box>
        </Box>
    );
}

export default Signup;
