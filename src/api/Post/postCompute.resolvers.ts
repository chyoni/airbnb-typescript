import { FragmentableArray, prisma } from "../../../generated/prisma-client";
import { User, Like, Comment } from "src/types/graph";

export default {
  Post: {
    host: (parent): FragmentableArray<User> => {
      return prisma.post({ id: parent.id }).host();
    },
    likes: (parent): FragmentableArray<Like> => {
      return prisma.post({ id: parent.id }).likes();
    },
    comments: (parent): FragmentableArray<Comment> => {
      return prisma.post({ id: parent.id }).comments();
    },
    isLiked: async (parent, __, { request }): Promise<boolean> => {
      const { user } = request;
      const existLike = await prisma.$exists.like({
        AND: [{ post: { id: parent.id } }, { user: { id: user.id } }]
      });
      return existLike;
    },
    isCommented: async (parent, __, { request }): Promise<boolean> => {
      const { user } = request;
      const existComment = await prisma.$exists.comment({
        AND: [{ post: { id: parent.id } }, { user: { id: user.id } }]
      });
      return existComment;
    },
    likeCount: async (parent): Promise<number> => {
      const likeCount = await prisma
        .likesConnection({ where: { post: { id: parent.id } } })
        .aggregate()
        .count();
      return likeCount;
    },
    commentCount: async (parent): Promise<number> => {
      const commentCount = await prisma
        .commentsConnection({ where: { post: { id: parent.id } } })
        .aggregate()
        .count();
      return commentCount;
    },
    createdDate: async (parent): Promise<string> => {
      const createdAt = await prisma.post({ id: parent.id }).createdAt();
      const [date] = createdAt.split("T");
      return date;
    },
    createdTime: async (parent): Promise<string> => {
      const createdAt = await prisma.post({ id: parent.id }).createdAt();
      const [, time] = createdAt.split("T");
      const [realTime] = time.split(".");
      const [h, m, s] = realTime.split(":");
      const koreaHour = parseInt(h) + 9;
      return `${koreaHour}:${m}:${s}`;
    }
  }
};
