import { prisma, FragmentableArray } from "../../../generated/prisma-client";
import {
  Post,
  Reservation,
  Like,
  Comment,
  Notification
} from "src/types/graph";

export default {
  User: {
    hostings: (parent): FragmentableArray<Post> => {
      return prisma
        .user({ id: parent.id })
        .hostings({ orderBy: "createdAt_DESC" });
    },
    reservations: (parent): FragmentableArray<Reservation> => {
      return prisma
        .user({ id: parent.id })
        .reservations({ orderBy: "createdAt_DESC" });
    },
    likes: (parent): FragmentableArray<Like> => {
      return prisma.user({ id: parent.id }).likes();
    },
    comments: (parent): FragmentableArray<Comment> => {
      return prisma.user({ id: parent.id }).comments();
    },
    notifications: (parent): FragmentableArray<Notification> => {
      return prisma
        .user({ id: parent.id })
        .notifications({ orderBy: "createdAt_DESC" });
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
