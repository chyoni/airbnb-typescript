import { HostingPostMutationArgs, HostingPostResponse } from "src/types/graph";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    hostingPost: async (
      _,
      args: HostingPostMutationArgs,
      { request, isAuthed }
    ): Promise<HostingPostResponse> => {
      isAuthed(request);
      const { user } = request;
      const {
        thumbNail,
        caption,
        location,
        maxPeopleCount,
        checkIn,
        checkOut,
        price
      } = args;
      try {
        const hosting = await prisma.createPost({
          thumbNail,
          caption,
          location,
          maxPeopleCount,
          checkIn,
          checkOut,
          price,
          host: {
            connect: {
              id: user.id
            }
          }
        });
        return {
          ok: true,
          error: null,
          post: hosting as any
        };
      } catch (e) {
        return {
          ok: false,
          error: e.message,
          post: null
        };
      }
    }
  }
};
