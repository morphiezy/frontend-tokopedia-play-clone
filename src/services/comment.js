import axios from "@/config/axios";
import { createStandaloneToast } from "@chakra-ui/react";

const { toast } = createStandaloneToast();

async function createComment(data) {
  try {
    await axios.post("/comments", data);

    toast({
      title: "Comment created",
      status: "success",
    });

    return true;
  } catch (err) {
    toast({
      title: "Failed!",
      description:
        err.response.status === 401
          ? "Please login before"
          : "Create comment failed",
      status: "error",
    });

    return false;
  }
}

async function updateComment(id, data) {
  try {
    await axios.post(`/comments/${id}`, data);

    toast({
      title: "Comment updated",
      status: "success",
    });

    return true;
  } catch (error) {
    toast({
      title: "Failed!",
      description: "Failed to update comment",
      status: "error",
    });

    return false;
  }
}

async function deleteComment(id) {
  try {
    await axios.delete(`/comments/${id}`);

    toast({
      title: "Comment deleted",
      status: "success",
    });

    return true;
  } catch (error) {
    toast({
      title: "Failed!",
      description: "Failed to delete comment",
      status: "error",
    });

    return false;
  }
}

export { createComment, updateComment, deleteComment };
