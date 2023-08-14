import { Flex, Spinner } from "@chakra-ui/react";

export default function FallbackFetch({ isLoading, children, spinnerProps }) {
  return (
    <Flex w="full" minH="full" justifyContent="center" alignItems="center">
      {isLoading ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.900"
          color="tokped-green"
          size="xl"
          {...spinnerProps}
        />
      ) : (
        children
      )}
    </Flex>
  );
}
