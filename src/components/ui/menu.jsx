import {
  Menu as ChakraMenu,
  MenuList,
  MenuButton,
  Box,
} from "@chakra-ui/react";

export default function Menu({ label, list }) {
  return (
    <ChakraMenu>
      <MenuButton as={Box}>{label}</MenuButton>
      <MenuList>{list}</MenuList>
    </ChakraMenu>
  );
}
