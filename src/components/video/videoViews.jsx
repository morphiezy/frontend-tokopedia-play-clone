import { Flex, Text } from "@chakra-ui/react";
import { EyeIcon } from "@heroicons/react/24/outline";

export default function VideoViews({ views }) {
  return (
    <Flex
      bg="rgba(16, 16, 17, 0.6)"
      color="white"
      borderRadius="3px"
      p="3px 6px"
      w="fit-content"
      gap="4px"
    >
      <Text as={EyeIcon} color="white" w={18} />
      <Text as="span" fontSize="12px" fontWeight="normal">
        {views}
      </Text>
    </Flex>
  );
}
