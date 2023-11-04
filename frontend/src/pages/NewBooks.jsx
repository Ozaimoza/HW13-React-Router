import { Box, Center } from "@chakra-ui/react";
import BookForm from "../components/BookForm";

export default function NewBookPage() {
  return (
    <Center>
      <Box w={"90%"} align="center" p="20px">
        <BookForm />
      </Box>
    </Center>
  );
}
