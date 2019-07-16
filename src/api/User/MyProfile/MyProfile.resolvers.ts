import { prisma } from "../../../../generated/prisma-client";
import { User } from "src/types/graph";

export default {
  Query: {
    myProfile: (_, __, { request, isAuthed }): User => {
      isAuthed(request);
      const { user } = request;
      return prisma.user({ id: user.id }) as any;
    }
  }
};
