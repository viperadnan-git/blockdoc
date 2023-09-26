import { Flex, Heading, Stack } from "@chakra-ui/react";
import React from "react";
import Cards from "../DynamicComponents/IssuedCard";


const IssueDocuments = [
  {
    name: "Adhaar Card",
    verified_at: "18/02/23"
  }
]


export const MainS = () => {
  return (
    <Flex justify={'center'}>
      <Stack>
        <Heading>User Documents</Heading>
        <Cards />
      </Stack>
    </Flex>
  );
};
