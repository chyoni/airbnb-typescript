import { Post } from "src/types/graph";
import { prisma, FragmentableArray } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeFeed: (): FragmentableArray<Post> => {
      return prisma.posts({ orderBy: "createdAt_DESC", first: 10 }) as any;
    }
  }
};
