import { Box, Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Header } from "..";

export default function MainLayout() {
  return (
    <Box position="relative">
      <Header />
      <Container maxW={1400}>
        <Outlet />
      </Container>
    </Box>
  );
}
