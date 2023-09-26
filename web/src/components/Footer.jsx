import { Box, Flex, Link, Stack, Text } from "@chakra-ui/react";

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <Box as="footer" py="6" px={{ base: "4", md: "8" }}>
            <Flex justify={{ base: "center", md: "space-between" }} alignItems="center" direction={{ base: "column", md: "row" }}>
                <Text fontSize="sm" color="gray.500" mb={{ base: "2", md: "0" }}>
                    © {currentYear} BlockVault. All rights reserved.
                </Text>
                <Stack direction={'row'}>
                    <Link fontSize="sm" color="blue.500" href="#">
                        Privacy Policy
                    </Link>
                    <Text fontSize="sm" color="gray.500" mx={{ base: "0", md: "2" }}>
                        |
                    </Text>
                    <Link fontSize="sm" color="blue.500" href="#">
                        Terms of Service
                    </Link>
                    <Text fontSize="sm" color="gray.500" mx={{ base: "0", md: "2" }}>
                        |
                    </Text>
                    <Link fontSize="sm" color="blue.500" href="#">
                        Contact Us
                    </Link>
                </Stack>
            </Flex>
        </Box>
    );
}

export default Footer;
