import { Box, Image, Text } from "@chakra-ui/react";

export default function ProductCard({ product }) {
  return (
    <Box as="a" href={product.url} target="_blank" display="block">
      <Image
        src={product.picture}
        alt={product.title}
        w="full"
        h="180px"
        objectFit="cover"
        borderRadius="10px"
      />
      <Box mt="12px">
        <Text as="h2" fontSize="16px" fontWeight="semibold" color="light-gray">
          {product.title}
        </Text>
        <Text
          as="p"
          fontSize="14px"
          fontWeight="semibold"
          color="#A1A1A1"
          mt="5px"
        >
          Rp. {product.price}
        </Text>
      </Box>
    </Box>
  );
}
