import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Box, Text, Grid, GridItem } from "@chakra-ui/react";
import { FallbackFetch, ThumbnailCard } from "@/components";
import { useFetching } from "@/hooks";

export default function Search() {
  const [params] = useSearchParams();
  const q = params.get("q");

  const [loading, searchVideo, videos] = useFetching(
    "get",
    "/videos/search",
    false,
  );

  useEffect(() => {
    searchVideo({
      params: {
        title: q,
      },
    });
  }, [q]);

  if (loading || !videos.length) {
    return (
      <Box height={450}>
        <FallbackFetch isLoading={loading}>
          <Text color="light-gray" fontSize="14px" fontWeight="normal">
            Ops! we can't find {q} videos.
          </Text>
        </FallbackFetch>
      </Box>
    );
  }

  return (
    <Grid
      gridTemplateColumns="repeat(auto-fill,minmax(320px, 1fr))"
      gap="30px"
      my="40px"
    >
      {videos.map((video) => (
        <GridItem key={video._id}>
          <ThumbnailCard data={video} />
        </GridItem>
      ))}
    </Grid>
  );
}
