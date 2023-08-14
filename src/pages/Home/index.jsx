import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Grid, GridItem, Box, Text, Stack } from "@chakra-ui/react";
import { ThumbnailCard, FallbackFetch, Button } from "@/components";
import { useFetching } from "@/hooks";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, fetchVideos, videos] = useFetching("get", "/videos", false);

  const activeCategory = searchParams.get("category") || "";
  const categories = ["", "populars", "latest"];

  const updateSearchParams = (category) => {
    if (category === "") {
      const currentUrl = window.location.href;
      const url = new URL(currentUrl);

      url.searchParams.delete("category");
      window.history.replaceState({}, "", url.toString());
      return setSearchParams({});
    }

    return setSearchParams({ category });
  };

  useEffect(() => {
    fetchVideos({
      data: null,
      params: { category: activeCategory },
    });
  }, [activeCategory]);

  return (
    <>
      {loading || !videos?.length ? (
        <Box height={450}>
          <FallbackFetch isLoading={loading}>
            <Text color="light-gray" fontSize="14px" fontWeight="normal">
              Ops! There's no video to display.
            </Text>
          </FallbackFetch>
        </Box>
      ) : (
        <>
          <Stack direction="row" my="40px" spacing="15px">
            {categories.map((category) => (
              <Button
                key={category}
                textTransform="capitalize"
                w="fit-content"
                h={46}
                padding="14px 30px"
                borderRadius="40px"
                onClick={() => updateSearchParams(category)}
                bg={
                  category === activeCategory ? "tokped-green" : "deep-indigo"
                }
                border={`1px solid ${
                  category === activeCategory
                    ? "tokped-green"
                    : "rgba(255,255,255,.1)"
                }`}
              >
                {category === "" ? "all" : category}
              </Button>
            ))}
          </Stack>
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
        </>
      )}
    </>
  );
}
