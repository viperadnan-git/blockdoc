import { Flex, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";

export const Def = () => {
  return (
    <Flex justify={"center"} minH={"80vh"}>
      <Stack m={'5%'}>
        <Heading fontSize={'7xl'}>Blockchain-Powered <span style={{color:'lightblue'}}>eVault.</span></Heading>
        <Text textAlign={'center'} fontSize={'3xl'} fontWeight={'bold'} letterSpacing={"wider"}>Your <span style={{color:'lightblue'}}> Digital Safe Haven. </span></Text>
      </Stack>
    </Flex>
  );
};
