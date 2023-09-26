"use client";

import { Flex, Circle, Box, Image, Badge, useColorModeValue, Icon, chakra, Tooltip } from "@chakra-ui/react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";

const data = {
  isNew: true,
  imageURL:
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80",
  name: "Wayfarer Classic",
  price: 4.5,
  rating: 4.2,
  numReviews: 34,
};

function Rating({ rating, numReviews }) {
  return (
    <Box display='flex' alignItems='center'>
      {Array(5)
        .fill("")
        .map((_, i) => {
          const roundedRating = Math.round(rating * 2) / 2;
          if (roundedRating - i >= 1) {
            return <BsStarFill key={i} style={{ marginLeft: "1" }} color={i < rating ? "teal.500" : "gray.300"} />;
          }
          if (roundedRating - i === 0.5) {
            return <BsStarHalf key={i} style={{ marginLeft: "1" }} />;
          }
          return <BsStar key={i} style={{ marginLeft: "1" }} />;
        })}
      <Box as='span' ml='2' color='gray.600' fontSize='sm'>
        {numReviews} review{numReviews > 1 && "s"}
      </Box>
    </Box>
  );
}

function Cards() {
  return (
    <Box bg={useColorModeValue("white", "gray.800")} maxW='sm' borderWidth='1px' rounded='lg' shadow='lg' position='relative'>
      <Image src={data.imageURL} alt={`Picture of ${data.name}`} roundedTop='lg'/>
      <Box p='6'>
        <Flex mt='1' justifyContent='space-between' alignContent='center'>
          <Box fontSize='2xl' fontWeight='semibold' as='h4' lineHeight='tight' isTruncated>
            {data.name}
          </Box>
        </Flex>

        <Flex justifyContent='space-between' alignContent='center'>
          <Rating rating={data.rating} numReviews={data.numReviews} />
        </Flex>
      </Box>
    </Box>
  );
}

export default Cards;
