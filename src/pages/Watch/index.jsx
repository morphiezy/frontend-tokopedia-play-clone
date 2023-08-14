import { useState } from "react";
import ReactPlayer from "react-player/youtube";
import { useParams } from "react-router-dom";
import { Grid, GridItem, Box, Text, Flex, VStack } from "@chakra-ui/react";
import {
  FallbackFetch,
  VideoViews,
  Avatar,
  Input,
  VideoComment,
  ProductCard,
} from "@/components";
import { useFetching } from "@/hooks";
import { watchVideo } from "@/services/video";
import { createComment } from "@/services/comment";
import { timeFromNow } from "@/utils/date";

export default function Watch() {
  const [comment, setComment] = useState("");
  const { video_id } = useParams();

  const [loading, , video, videoError] = useFetching(
    "get",
    `/videos/${video_id}`,
    true,
  );

  const [commentsLoading, getComments, comments] = useFetching(
    "get",
    `/videos/${video_id}/comments`,
    true,
  );

  const [productLoading, , products] = useFetching(
    "get",
    `/videos/${video_id}/products`,
    true,
  );

  const submitComment = async (e) => {
    e.preventDefault();
    if (!comment.trim().length) return;

    const isSuccess = await createComment({ video: video_id, text: comment });

    if (isSuccess) {
      getComments();
      setComment("");
    }
  };

  if (loading || !video || videoError) {
    return (
      <Box h="430px">
        <FallbackFetch isLoading={loading}>
          <Text color="light-gray" fontSize="14px" fontWeight="normal">
            Ops! {videoError || "The video is not found"}
          </Text>
        </FallbackFetch>
      </Box>
    );
  }

  return (
    <Box my="40px">
      <Grid templateColumns="minmax(600px,980px) minmax(280px,1fr)" gap="20px">
        <GridItem w="100%" position="relative">
          <Box
            position="relative"
            boxShadow="0px 15px 90px 0px rgba(255, 255, 255, 0.15)"
          >
            <ReactPlayer
              url={video.youtube_url}
              width="100%"
              height="550px"
              onStart={() => watchVideo(video_id)}
            />
            <Box position="absolute" top="20px" right="20px">
              <VideoViews views={video.views} />
            </Box>
          </Box>
          <Text
            fontWeight="semibold"
            color="light-gray"
            fontSize="22px"
            my="20px"
          >
            {video.title}
          </Text>
          <Flex gap="15px" alignItems="center">
            <Avatar
              url={video.user.picture}
              alt={video.user.username}
              w="50px"
              h="50px"
            />
            <VStack alignItems="start" spacing="2px">
              <Text fontSize="16px" color="light-gray" fontWeight="semibold">
                {video.user.username}
              </Text>
              <Text fontSize="12px" color="#B5B4B9">
                {timeFromNow(video.createdAt)}
              </Text>
            </VStack>
          </Flex>
          <Box
            bg="rgba(34,37,45,.4)"
            my="50px"
            p="30px 40px"
            borderRadius="16px"
          >
            <Box as="form" onSubmit={submitComment}>
              <Input
                p="0"
                placeholder="Insert comment..."
                bg="transparent"
                borderColor="transparent"
                borderRadius="0"
                height="40px"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                _focus={{
                  borderBottom: "2px solid #43B647",
                }}
                disabled={commentsLoading}
              />
            </Box>
            {commentsLoading || !comments.length ? (
              <Box h="100px">
                <FallbackFetch
                  isLoading={commentsLoading}
                  spinnerProps={{ size: "md" }}
                >
                  <Text color="light-gray" fontSize="14px" fontWeight="normal">
                    There's no comments here. Be the first!
                  </Text>
                </FallbackFetch>
              </Box>
            ) : (
              <VStack spacing="25px" align="start" mt="40px">
                {comments.map((comment) => (
                  <VideoComment
                    comment={comment}
                    key={comment._id}
                    video_id={video_id}
                    refetchComment={getComments}
                  />
                ))}
              </VStack>
            )}
          </Box>
        </GridItem>
        <GridItem w="100%">
          {productLoading || !products.length ? (
            <Box h="500px">
              <FallbackFetch
                isLoading={commentsLoading}
                spinnerProps={{ size: "md" }}
              >
                <Text color="light-gray" fontSize="14px" fontWeight="normal">
                  There's no product to display.
                </Text>
              </FallbackFetch>
            </Box>
          ) : (
            <Flex
              w="full"
              h="550px"
              direction="column"
              gap="30px"
              overflowY="auto"
              px="10px"
              className="overlay-shadow"
            >
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </Flex>
          )}
        </GridItem>
      </Grid>
    </Box>
  );
}
