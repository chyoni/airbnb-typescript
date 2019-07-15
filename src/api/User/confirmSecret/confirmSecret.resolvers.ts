import {
  ConfirmSecretMutationArgs,
  ConfirmSecretResponse
} from "src/types/graph";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    confirmSecret: async (
      _,
      args: ConfirmSecretMutationArgs
    ): Promise<ConfirmSecretResponse> => {
      const { email, loginSecret } = args;
      try {
        const user = await prisma.user({ email });
        if (user) {
          if (user.loginSecret === loginSecret) {
            // token create
            await prisma.updateUser({
              where: { email },
              data: { loginSecret: "" }
            });
            return {
              ok: true,
              error: null,
              token: "comming soon"
            };
          } else {
            return {
              ok: false,
              error: "시크릿 키를 잘못 입력하셨습니다 🙄",
              token: null
            };
          }
        } else {
          return {
            ok: false,
            error: "잘못된 이메일",
            token: null
          };
        }
      } catch (e) {
        return {
          ok: false,
          error: "일시적 오류입니다 🙄",
          token: null
        };
      }
    }
  }
};
