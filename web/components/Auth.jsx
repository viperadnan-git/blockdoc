import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  RadioGroup,
  Radio,
  Checkbox,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [activeTabIndex, setactiveTabIndex] = useState(0);

  // const [date, setDate] = useState(new Date());
  return (
    <Tabs align='center' index={activeTabIndex} onChange={(index) => setactiveTabIndex(index)}>
      <TabList>
        <Tab>Sign Up</Tab>
        <Tab>Sign In</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Flex justify={"center"} bg={useColorModeValue("gray.50", "gray.800")}>
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
              <Stack align={"center"}>
                <Heading fontSize={"4xl"} textAlign={"center"}>
                  Sign up
                </Heading>
              </Stack>
              <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
                <Stack spacing={4}>
                  <HStack>
                    <Box>
                      <FormControl id='firstName' isRequired>
                        <FormLabel>First Name</FormLabel>
                        <Input type='text' />
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl id='lastName'>
                        <FormLabel>Last Name</FormLabel>
                        <Input type='text' />
                      </FormControl>
                    </Box>
                  </HStack>
                  {/* <RadioGroup defaultValue='2'>
                    <Stack spacing={5} direction='row'>
                      <Radio colorScheme='blue' value='1'>
                        Male
                      </Radio>
                      <Radio colorScheme='pink' value='2'>
                        Female
                      </Radio>
                    </Stack>
                  </RadioGroup> */}
                  <FormControl id='email' isRequired>
                    <FormLabel>Email address</FormLabel>
                    <Input type='email' />
                  </FormControl>
                  {/* <FormControl id='dob' isRequired>
                    <FormLabel>Date of birth</FormLabel>
                    <SingleDatepicker name='date-input' date={date} onDateChange={setDate} />
                  </FormControl> */}
                  <FormControl id='Password' isRequired>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                      <Input type={showPassword ? "text" : "password"} />
                      <InputRightElement h={"full"}>
                        <Button variant={"ghost"} onClick={() => setShowPassword((showPassword) => !showPassword)}>
                          {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  <Stack spacing={10} pt={2}>
                    <Button
                      loadingText='Submitting'
                      size='lg'
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}>
                      Sign up
                    </Button>
                  </Stack>
                  <Stack pt={6} align={"center"}>
                    <Checkbox colorScheme='green' defaultChecked>
                      I agree to the <Link color={"blue.400"}>Terms of Service</Link>
                    </Checkbox>
                    <HStack>
                      <Text>Already a user? </Text>
                      <Text onClick={() => setactiveTabIndex(1)} _hover={{ cursor: "pointer" }} color={"blue.400"}>
                        Login
                      </Text>
                    </HStack>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </Flex>
        </TabPanel>
        <TabPanel>
          <Flex justify={"center"} bg={useColorModeValue("gray.50", "gray.800")}>
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
              <Stack align={"center"}>
                <Heading fontSize={"4xl"}>Sign in to your account</Heading>
                {/* <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Text color={'blue.400'}>features</Text> ✌️
          </Text> */}
              </Stack>
              <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
                <Tabs>
                  <TabList>
                    <Tab>Email / Username</Tab>
                    <Tab>Mobile No.</Tab>
                  </TabList>

                  <TabPanels>
                    <TabPanel>
                      <FormControl id='username'>
                        <FormLabel>Username</FormLabel>
                        <Input type='text' />
                      </FormControl>
                      <FormControl id='email'>
                        <FormLabel>Email address</FormLabel>
                        <Input type='email' />
                      </FormControl>
                      <FormControl id='password'>
                        <FormLabel>Password</FormLabel>
                        <Input type='password' />
                      </FormControl>
                    </TabPanel>
                    <TabPanel>
                      <FormControl id='email'>
                        <FormLabel>Mobile Number</FormLabel>
                        <Input type='number' />
                      </FormControl>
                      <FormControl id='password'>
                        <FormLabel>Password</FormLabel>
                        <Input type='password' />
                      </FormControl>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
                <Stack spacing={10}>
                  <Stack direction={{ base: "column", sm: "row" }} align={"start"} justify={"space-between"}>
                    <Checkbox>Remember me</Checkbox>
                    <Text color={"blue.400"}>Forgot password?</Text>
                  </Stack>
                  <Button
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}>
                    Sign in
                  </Button>
                </Stack>
              </Box>
            </Stack>
          </Flex>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
