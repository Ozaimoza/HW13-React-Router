import { Box, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Books({ id, title, author, image, publisher, year }) {
  return (
    <Link to={`/books/${id}`}>
      <Box
        maxW={"300px"}
        minW={"200px"}
        maxH={"500px"}
        minH={"400px"}
        w={"full"}
        h={"full"}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="lg"
        bgImage={`url(http://localhost:8000/${image})`}
        bgSize="cover"
        bgPos="center"
        objectFit="cover"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        _hover={{
          transform: "scale(1.1)",
          transitionDuration: "0.4s",
          transitionTimingFunction: "ease-in-out",
          boxShadow: "dark-lg",
          border: "4px",
          borderColor: "blue.400",
        }}
      >
        {/* Box for title */}
        <Box p="6">
          <Heading size="md" color="white">
            {title} ({year})
          </Heading>
        </Box>

        {/* Box for author */}
        <Box p="6" textAlign="left">
          <Text fontSize="2xl" fontWeight={"bold"} pb={3} color="white">
            {author}
          </Text>
          <Text fontSize="xs" color="white">
            {publisher}
          </Text>
        </Box>
      </Box>
    </Link>
  );
}
