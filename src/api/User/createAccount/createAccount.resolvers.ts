import {
  CreateAccountMutationArgs,
  CreateAccountResponse
} from "src/types/graph";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createAccount: async (
      _,
      args: CreateAccountMutationArgs
    ): Promise<CreateAccountResponse> => {
      const { username, email, firstName, lastName } = args;
      const existUser = await prisma.$exists.user({
        OR: [{ username }, { email }]
      });
      if (existUser) {
        return {
          ok: false,
          error: "이미 존재하는 아이디 혹은 이메일 입니다 😥"
        };
      }
      try {
        await prisma.createUser({ email, username, firstName, lastName });
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
