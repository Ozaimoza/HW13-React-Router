import { Box, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Books from "../components/Books";
import { getAllBooks } from "../modules/fetch";

export default function Homepage() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const fetchBooks = async () => {
      const books = await getAllBooks();
      setBooks(books);
    };
    fetchBooks();
  }, []);

  return (
    <Box align="center" p="20px">
      <SimpleGrid
        pt={10}
        spacing={0}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      >
        {books?.books?.map((book) => (
          <Books key={`${book.id} ${book.title}`} {...book} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
