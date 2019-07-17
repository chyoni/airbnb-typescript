import { prisma, FragmentableArray } from "../../../generated/prisma-client";
import { Post, Reservation, Like, Comment } from "src/types/graph";

export default {
  User: {
    hostings: (parent): FragmentableArray<Post> => {
      return prisma.user({ id: parent.id }).hostings();
    },
    reservations: (parent): FragmentableArray<Reservation> => {
      return prisma.user({ id: parent.id }).reservations();
    },
    likes: (parent): FragmentableArray<Like> => {
      return prisma.user({ id: parent.id }).likes();
    },
    comments: (parent): FragmentableArray<Comment> => {
      return prisma.user({ id: parent.id }).comments();
    },
    fullName: (parent): string => `${parent.firstName} ${parent.lastName}`,
    isSelf: (parent, __, { request }): boolean => {
      const { user } = request;
      if (parent.id === user.id) {
        return true;
      } else {
        return false;
      }
    },
    createdDate: async (parent): Promise<string> => {
      const createdAt = await prisma.user({ id: parent.id }).createdAt();
      const [date] = createdAt.split("T");
      return date;
    },
    createdTime: async (parent): Promise<string> => {
      const createdAt = await prisma.user({ id: parent.id }).createdAt();
      const [, time] = createdAt.split("T");
      const [realTime] = time.split(".");
      const [h, m, s] = realTime.split(":");
      const koreaHour = parseInt(h) + 9;
      return `${koreaHour}:${m}:${s}`;
    }
  }
};
