import { useState, useContext } from "react";
import { Avatar, Input, Button } from "..";
import { AuthContext } from "@/context/auth";
import { timeFromNow } from "@/utils/date";
import { useFetching } from "@/hooks";
import {
  Text,
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
} from "@chakra-ui/react";

import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";
import { deleteComment } from "@/services/comment";

export default function VideoComment({ comment, video_id, refetchComment }) {
  const [text, setText] = useState(comment.text);
  const [isUpdate, setUpdate] = useState(false);
  const { username } = useContext(AuthContext);
  const toast = useToast("");

  const [, updateComment] = useFetching(
    "patch",
    `/comments/${comment._id}`,
    false,
  );

  const resetState = () => {
    setUpdate(false);
    setText(comment.text);
  };

  const updating = async (e) => {
    e.preventDefault();

    if (!text.trim().length) return;

    const response = await updateComment({ data: { video: video_id, text } });

    if (!response) {
      return toast({
        status: "error",
        title: "Failed to update comment",
      });
    }

    resetState();
    refetchComment();
  };

  const deleting = async () => {
    await deleteComment(comment._id);
    await refetchComment();
  };

  return (
    <Flex w="full" direction="column" gap="20px" flexWrap="wrap">
      <Flex alignItems="center" w="full">
        <Flex alignItems="center" gap="15px">
          <Avatar
            w="50px"
            h="50px"
            url={comment.user.picture}
            alt={comment.user.username}
          />
          <Box>
            <Text
              as="h3"
              fontWeight="semibold"
              fontSize="16px"
              color="light-gray"
            >
              {comment.user.username}
            </Text>
            <Text fontWeight="normal" fontSize="12" color="#B5B4B9" mt="2px">
              {timeFromNow(comment.createdAt)}
            </Text>
          </Box>
        </Flex>
        {username === comment.user.username && (
          <Menu placement="bottom-end">
            <MenuButton
              as={Box}
              w="30px"
              h="30px"
              p="4px"
              borderRadius="full"
              color="light-gray"
              alignSelf="flex-start"
              ml="auto"
              _hover={{
                bg: "rgba(0,0,0,.3)",
              }}
            >
              <EllipsisVerticalIcon />
            </MenuButton>
            <MenuList
              minW="150px"
              bg="deep-indigo"
              border="0"
              color="light-gray"
            >
              <MenuItem bg="transparent" onClick={() => setUpdate(true)}>
                <Text as={PencilSquareIcon} w="18px" h="18px" mr="12px"></Text>
                <Text fontSize="14px">Edit</Text>
              </MenuItem>
              <MenuItem bg="transparent" onClick={deleting}>
                <Text as={TrashIcon} w="18px" h="18px" mr="12px"></Text>
                <Text fontSize="14px">Delete</Text>
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </Flex>
      {isUpdate ? (
        <Flex direction="column" gap="15px" as="form" onSubmit={updating}>
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Insert comment..."
          />
          <Button onClick={resetState}>Cancel</Button>
        </Flex>
      ) : (
        <Box
          p="15px 20px"
          bg="deep-black"
          border="1px"
          borderColor="#333333"
          borderRadius="12px"
          w="fit-content"
        >
          <Text
            as="div"
            color="light-gray"
            fontSize="16px"
            dangerouslySetInnerHTML={{ __html: comment.text }}
          />
        </Box>
      )}
    </Flex>
  );
}
