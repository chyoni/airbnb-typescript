import { SeeUserQueryArgs, User } from "src/types/graph";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeUser: (_, args: SeeUserQueryArgs): User => {
      const { username } = args;
      return prisma.user({ username }) as any;
    }
  }
};
