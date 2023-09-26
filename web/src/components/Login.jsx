import { Box, Button, FormControl, FormLabel, Heading, Input, Link, Stack, Text } from "@chakra-ui/react";

import { useState } from "react";
import { useToast } from "@chakra-ui/react";

function Login() {
    const toast = useToast({
        position: "top",
    });
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle login logic here
        fetch("http://localhost:3001/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
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
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("tokenExpiration", Date.now() + 3600000);  // 1 hour
                    toast({
                        title: "Logged in.",
                        description: "You have been successfully logged in.",
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                    });
                    console.log(localStorage);
                }
            })
            .catch((error) => {
                toast({
                    title: "An error occurred.",
                    description: error.message,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                });
            });
    };

    return (
        <Box minH="100vh" py="12" px={{ base: "4", lg: "8" }}>
            <Box maxW="md" mx="auto" w={{ base: "full", md: "md" }} p="8" borderWidth="1px" borderRadius="lg" boxShadow="lg">
                <Heading textAlign="center" mb="8">
                    Log in to your account
                </Heading>
                <form onSubmit={handleSubmit}>
                    <Stack spacing="6">
                        <FormControl id="email" isRequired>
                            <FormLabel>Username or Email address</FormLabel>
                            <Input type="text" value={email} onChange={(event) => setEmail(event.target.value)} />
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                        </FormControl>
                        <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
                            Log in
                        </Button>
                    </Stack>
                </form>
                <Text mt="4" textAlign="center">
                    Don't have an account?{" "}
                    <Link color="blue.500" href="/signup">
                        Sign up
                    </Link>
                </Text>
            </Box>
        </Box>
    );
}

export default Login;
