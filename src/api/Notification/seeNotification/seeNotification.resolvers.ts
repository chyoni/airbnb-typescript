import { prisma } from "../../../../generated/prisma-client";
import { Notification } from "src/types/graph";

export default {
  Query: {
    seeNotification: async (
      _,
      __,
      { request, isAuthed }
    ): Promise<Notification[]> => {
      isAuthed(request);
      const { user } = request;
      try {
        return (await prisma.notifications({
          orderBy: "createdAt_DESC",
          where: { user: { id: user.id } }
        })) as any;
      } catch (e) {
        throw Error(e);
      }
    }
  }
};
