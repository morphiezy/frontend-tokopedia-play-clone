import { Button as ChakraButton } from "@chakra-ui/react";

export default function Button(props) {
  return (
    <ChakraButton
      w="full"
      height="52px"
      borderRadius="10px"
      bg="tokped-green"
      color="light-gray"
      fontSize="1rem"
      fontWeight="semibold"
      _hover={{
        opacity: "0.6",
      }}
      _active={{}}
      {...props}
    >
      {props.children}
    </ChakraButton>
  );
}
