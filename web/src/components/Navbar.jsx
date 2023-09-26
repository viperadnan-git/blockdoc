import { Box, Button, Collapse, Flex, HStack, Heading, Highlight, IconButton, Image, Stack, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";

import { Link } from "react-router-dom";
import checkLogin from "../lib/checkLogin";

function Navbar() {
    const { isOpen, onToggle } = useDisclosure();
    const isLoggedIn = checkLogin();

    const LogOut = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    return (
        <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
            <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
                <IconButton variant='ghost' size={"md"} icon={isOpen ? <CloseIcon fontSize={12}/> : <HamburgerIcon fontSize={24}/>} aria-label={"Open Menu"} display={isLoggedIn? { md: "none" } : "none"} onClick={onToggle} />
                <HStack spacing={8} alignItems={"center"}>
                    <Heading as={Link} to="/">
                            BlockVault
                    </Heading>
                    <HStack as={"nav"} spacing={4} display={isLoggedIn ? { base: "none", md: "flex" } : "none"}>
                        <Link to="/">Home</Link>
                        <Link to="/dash">Dashboard</Link>
                    </HStack>
                </HStack>
                <Flex alignItems={"center"} display={isLoggedIn ? "none": "flex"}>
                    <Button as={Link} to={"/login"} variant={"solid"} colorScheme={"teal"} size={"sm"} mr={4}>
                        Log in
                    </Button>
                    <Button as={Link} to={"/signup"} variant={"ghost"} size={"sm"}>
                        Sign up
                    </Button>
                </Flex>
                <Flex alignItems={"center"} display={isLoggedIn ? "flex": "none"}>
                    <Button onClick={LogOut} variant={"ghost"} colorScheme={"teal"} size={"sm"} mr={4}>
                        Log out
                    </Button>
                </Flex>
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <Box pb={4} display={{ md: "none" }}>
                    <Stack as={"nav"} spacing={4}>
                        <Link to="/">Home</Link>
                        <Link to="/dash">Dashboard</Link>
                    </Stack>
                </Box>
            </Collapse>
        </Box>
    );
}

export default Navbar;
