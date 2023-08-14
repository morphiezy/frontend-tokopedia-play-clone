import { useState } from "react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { Input as ChakraInput, Box } from "@chakra-ui/react";

export default function Input(props) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Box width="full" height="fit-content" position="relative">
      <ChakraInput
        height="52px"
        borderRadius="10px"
        px="20px"
        backgroundColor="deep-indigo"
        transition="0.3s ease-out"
        borderColor="transparent"
        fontSize="1rem"
        fontWeight="medium"
        outline="0px"
        color="stone-gray"
        _placeholder={{
          color: "stone-gray",
        }}
        _focus={{
          borderColor: "tokped-green",
          color: "light-gray",
          backgroundColor: "rgba(65,181,73,0.1)",
        }}
        _hover={{}}
        _focusVisible={{}}
        {...props}
        type={props.type === "password" && isVisible ? "text" : props.type}
      />
      {props.type === "password" && (
        <Box
          w="21px"
          position="absolute"
          transform="translateY(-50%)"
          top="50%"
          right="20px"
          as={isVisible ? EyeIcon : EyeSlashIcon}
          cursor="pointer"
          color={isVisible ? "tokped-green" : "stone-gray"}
          transition="0.3s"
          _hover={{
            color: "tokped-green",
          }}
          onClick={() => setIsVisible(() => !isVisible)}
        ></Box>
      )}
    </Box>
  );
}
