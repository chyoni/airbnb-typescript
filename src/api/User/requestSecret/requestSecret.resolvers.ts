import {
  RequestSecretMutationArgs,
  RequestSecretResponse
} from "src/types/graph";
import { generateSecret, sendSecretMail } from "../../../../src/utils";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    requestSecret: async (
      _,
      args: RequestSecretMutationArgs
    ): Promise<RequestSecretResponse> => {
      const { email } = args;
      const loginSecret = generateSecret();
      const checkEmail = await prisma.$exists.user({ email });
      if (!checkEmail) {
        return {
          ok: false,
          error: "존재하지 않는 유저의 이메일입니다😥"
        };
      }
      try {
        await sendSecretMail(email, loginSecret);
        await prisma.updateUser({ where: { email }, data: { loginSecret } });
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
