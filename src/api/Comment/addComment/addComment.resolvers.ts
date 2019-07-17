import { AddCommentMutationArgs, AddCommentResponse } from "src/types/graph";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    addComment: async (
      _,
      args: AddCommentMutationArgs,
      { request, isAuthed }
    ): Promise<AddCommentResponse> => {
      isAuthed(request);
      const { user } = request;
      const { postId, text } = args;
      try {
        await prisma.createComment({
          post: { connect: { id: postId } },
          user: { connect: { id: user.id } },
          text
        });
        return {
          ok: true,
          error: null
        };
      } catch (e) {
        return {
          ok: false,
          error: e.message
        };
      }
    }
  }
};
