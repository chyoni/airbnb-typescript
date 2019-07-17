import { ToggleLikeMutationArgs, ToggleLikeResponse } from "src/types/graph";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    toggleLike: async (
      _,
      args: ToggleLikeMutationArgs,
      { request, isAuthed }
    ): Promise<ToggleLikeResponse> => {
      isAuthed(request);
      const { postId } = args;
      const { user } = request;
      const existPost = await prisma.$exists.post({ id: postId });
      if (existPost) {
        const isLiked = await prisma.$exists.like({
          AND: [{ post: { id: postId } }, { user: { id: user.id } }]
        });
        if (isLiked) {
          try {
            await prisma.deleteManyLikes({
              AND: [{ post: { id: postId } }, { user: { id: user.id } }]
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
        } else {
          try {
            await prisma.createLike({
              post: { connect: { id: postId } },
              user: { connect: { id: user.id } }
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
      } else {
        return {
          ok: false,
          error: "존재하지 않거나 삭제된 게시물입니다 🙄"
        };
      }
    }
  }
};
