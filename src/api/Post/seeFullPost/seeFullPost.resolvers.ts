import { SeeFullPostQueryArgs, SeeFullPostResponse } from "src/types/graph";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeFullPost: async (
      _,
      args: SeeFullPostQueryArgs
    ): Promise<SeeFullPostResponse> => {
      const { postId } = args;
      try {
        const post = await prisma.post({ id: postId });
        if (post) {
          return {
            ok: true,
            error: null,
            post: post as any
          };
        } else {
          return {
            ok: false,
            error: "해당 ID의 포스트가 없습니다",
            post: null
          };
        }
      } catch {
        return {
          ok: false,
          error: "일시적 오류",
          post: null
        };
      }
    }
  }
};
