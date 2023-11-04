import {
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  useToast,
  Grid,
  GridItem,
  Center,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { createBook, editBook } from "../modules/fetch";

export default function BookForm({ bookData }) {
  const toast = useToast();
  const [selectedImage, setSelectedImage] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!selectedImage) {
      toast({
        title: "Error",
        description: "Please select image",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    const formData = new FormData(event.target);
    if (bookData) {
      try {
        await editBook(
          bookData.id,
          formData.get("title"),
          formData.get("author"),
          formData.get("publisher"),
          parseInt(formData.get("year")),
          parseInt(formData.get("pages"))
        );
        toast({
          title: "Success",
          description: "Book edited successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: error.response.data.message || "Something went wrong",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
      return;
    }
    try {
      await createBook(formData);
      event.target.reset();
      toast({
        title: "Success",
        description: "Book created successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setSelectedImage("");
    } catch (error) {
      toast({
        title: "Error",
        description: error.response.data.message || "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  useEffect(() => {
    if (bookData?.image) {
      setSelectedImage(`http://localhost:8000/${bookData?.image}`);
    }
  }, [bookData]);

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        boxShadow={"lg"}
        bg={"gray.100"}
        p={5}
        border={"2px"}
        borderColor={"gray.200"}
        rounded={"lg"}
        templateRows="repeat(4, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={4}
      >
        <GridItem rowSpan={3} colSpan={1}>
          {selectedImage && (
            <Image w={64} src={selectedImage} alt="Selected Image" />
          )}
        </GridItem>

        <GridItem rowSpan={4} colSpan={4}>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              border={"2px"}
              name="title"
              required
              defaultValue={bookData?.title}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Author</FormLabel>
            <Input
              border={"2px"}
              name="author"
              required
              defaultValue={bookData?.author}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Publisher</FormLabel>
            <Input
              border={"2px"}
              name="publisher"
              required
              defaultValue={bookData?.publisher}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Year</FormLabel>
            <Input
              border={"2px"}
              name="year"
              type="number"
              required
              defaultValue={bookData?.year}
            />
          </FormControl>
          <FormControl pb={30}>
            <FormLabel>Pages</FormLabel>
            <Input
              border={"2px"}
              name="pages"
              type="number"
              required
              defaultValue={bookData?.pages}
            />
          </FormControl>
          <Button colorScheme="green" type="submit" w={"full"}>
            {bookData ? "Edit Book" : "Create Book"}
          </Button>
        </GridItem>
        <GridItem rowSpan={1} colSpan={1}>
          {!bookData?.image && (
            <FormControl>
              <FormLabel>Image</FormLabel>
              <Input
                border={0}
                name="image"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setSelectedImage(URL.createObjectURL(file));
                }}
              />
            </FormControl>
          )}
        </GridItem>
      </Grid>
    </form>
  );
}
