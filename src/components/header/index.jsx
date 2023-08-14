import Cookies from "js-cookie";
import {
  Flex,
  Container,
  Box,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text
} from "@chakra-ui/react";
import { Logo, Button, Search, Avatar } from "..";
import { Link } from "react-router-dom";
import { signOut } from "@/utils/auth";

function Header() {
  const buttonStyle = {
    borderRadius: "40px",
    height: "52px",
    minWidth: "120px",
    w: "fit-content",
  };

  const isAuth = Cookies.get("token");

  return (
    <Box
      w="full"
      borderBottom="1px"
      py="22px"
      borderColor="gray.800"
      position="sticky"
      top="0"
      bg="rgba(14,18,23,0.9)"
      backdropFilter="blur(10px)"
      zIndex="20"
    >
      <Container maxW={1400}>
        <Flex
          w="full"
          gap="20px"
          alignItems="center"
          justifyContent="space-between"
        >
          <Logo minW={146} flexShrink={0} />
          <Flex gap="30px" alignItems="center">
            <Box w={340} minW={300}>
              <Search />
            </Box>
            {isAuth ? (
              <Menu>
                <MenuButton>
                  <Avatar
                    w="52px"
                    h="52px"
                    border="4px"
                    borderColor="deep-indigo"
                  />
                </MenuButton>
                <MenuList minW="180px" bg="deep-indigo" color="light-gray" border="transparent">
                  <MenuItem px="20px" bg="transparent" cursor="not-allowed">
                    <Text fontSize="14px">Profile</Text>
                  </MenuItem>
                  <MenuItem px="20px" bg="transparent" onClick={signOut}>
                    <Text fontSize="14px">Sign out</Text>
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <HStack spacing="15px">
                <Button
                  sx={buttonStyle}
                  border="1px"
                  bg="rgba(65,181,73,0.2)"
                  color="tokped-green"
                  as={Link}
                  to="/auth/login"
                >
                  Sign in
                </Button>
                <Button sx={buttonStyle} as={Link} to="/auth/register">
                  Sign up
                </Button>
              </HStack>
            )}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}

export default Header;
