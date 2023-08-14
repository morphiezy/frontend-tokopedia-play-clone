import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Input } from "..";

export default function Search(props) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const searchVideo = (e) => {
    e.preventDefault();

    if (!search) return;

    const encodeString = encodeURIComponent(search);
    navigate(`/search?q=${encodeString}`);
  };

  return (
    <Box
      as="form"
      width="full"
      height="fit-content"
      position="relative"
      onSubmit={searchVideo}
    >
      <Box
        as={MagnifyingGlassIcon}
        w="24px"
        h="24px"
        color="#565559"
        position="absolute"
        left="18px"
        transform="translateY(-50%)"
        top="50%"
        zIndex="30"
      ></Box>
      <Input
        placeholder="Lagi mau nonton apa ?"
        bg="deep-indigo"
        borderRadius="40px"
        pl="50px"
        onChange={(e) => setSearch(e.target.value)}
        _placeholder={{
          color: "#565559",
        }}
        {...props}
      />
    </Box>
  );
}
