import {
  prisma,
  PostPromise,
  UserPromise
} from "../../../generated/prisma-client";

export default {
  Like: {
    post: (parent): PostPromise => {
      return prisma.like({ id: parent.id }).post();
    },
    user: (parent): UserPromise => {
      return prisma.like({ id: parent.id }).user();
    },
    createdDate: async (parent): Promise<string> => {
      const createdAt = await prisma.like({ id: parent.id }).createdAt();
      const [date] = createdAt.split("T");
      return date;
    },
    createdTime: async (parent): Promise<string> => {
      const createdAt = await prisma.like({ id: parent.id }).createdAt();
      const [, time] = createdAt.split("T");
      const [realTime] = time.split(".");
      const [h, m, s] = realTime.split(":");
      const koreaHour = parseInt(h) + 9;
      return `${koreaHour}:${m}:${s}`;
    }
  }
};
