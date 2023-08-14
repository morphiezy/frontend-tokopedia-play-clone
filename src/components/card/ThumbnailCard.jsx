import { Box, Image, Flex, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { EyeIcon } from "@heroicons/react/24/outline";
import { Avatar, VideoViews } from "..";

export default function ThumbnailCard({ data }) {
  return (
    <Box
      position="relative"
      height="0"
      paddingBottom="75%"
      bg="#22252d"
      borderRadius="9px"
      overflow="hidden"
      transition="0.3s"
      _hover={{
        opacity: "0.9",
      }}
    >
      <Image
        src={data.thumbnail}
        alt="women"
        position="absolute"
        width="100%"
        height="100%"
        objectFit="cover"
      />
      <Flex
        as={Link}
        to={`/watch/${data._id}`}
        position="absolute"
        width="100%"
        height="100%"
        background="linear-gradient(180deg, rgba(14, 18, 23, 0.00) 0%, rgba(14, 18, 23, 0.77) 100%)"
        flexDirection="column"
        justifyContent="flex-end"
      >
        <Box
          position="absolute"
          top="20px"
          right="20px"
        >
          <VideoViews views={data.views}/>
        </Box>
        <Flex p="20px" gap="12px" alignItems="center" w="full">
          <Avatar
            alt="profile"
            w="42px"
            h="42px"
            boxShadow="1px 4px 11px 0px rgba(0, 0, 0, 0.20)"
            src={data.user.picture}
          />
          <Box>
            <Heading
              as="h3"
              fontSize="16px"
              color="light-gray"
              mb="0.5"
              fontWeight="semibold"
              noOfLines={1}
            >
              {data.title}
            </Heading>
            <Text
              fontWeight="normal"
              fontSize="12px"
              color="light-gray"
              noOfLines={1}
            >
              {data.user.username}
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
