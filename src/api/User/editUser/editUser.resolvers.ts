import { EditUserMutationArgs, EditUserResponse } from "src/types/graph";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editUser: async (
      _,
      args: EditUserMutationArgs,
      { request, isAuthed }
    ): Promise<EditUserResponse> => {
      isAuthed(request);
      const { user } = request;
      const { firstName, lastName, avatar, username } = args;
      if (user.username !== username) {
        return {
          ok: false,
          error: "권한이 없습니다 😕"
        };
      }
      const existUser = await prisma.$exists.user({ username });
      if (existUser) {
        try {
          await prisma.updateUser({
            where: { id: user.id },
            data: {
              firstName,
              lastName,
              avatar,
              username
            }
          });
          return {
            ok: true,
            error: null
          };
        } catch {
          return {
            ok: false,
            error: "일시적 오류입니다 😥"
          };
        }
      } else {
        return {
          ok: false,
          error: "존재하지 않는 유저"
        };
      }
    }
  }
};
