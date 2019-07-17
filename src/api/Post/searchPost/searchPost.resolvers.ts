import { SearchPostQueryArgs } from "src/types/graph";
import { prisma, Post } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchPost: async (_, args: SearchPostQueryArgs): Promise<Post[]> => {
      const { term, priceGte, priceLte } = args;
      if (priceGte === undefined || priceLte === undefined) {
        const searchPostWithoutPrice = await prisma.posts({
          where: {
            OR: [{ caption_contains: term }, { location_contains: term }]
          }
        });
        return searchPostWithoutPrice;
      } else {
        const searchPostWithPrice = await prisma.posts({
          orderBy: "createdAt_DESC",
          where: {
            AND: [
              { OR: [{ caption_contains: term }, { location_contains: term }] },
              { price_gte: priceGte },
              { price_lte: priceLte }
            ]
          }
        });
        return searchPostWithPrice;
      }
    }
  }
};
