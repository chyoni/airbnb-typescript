import {
  prisma,
  UserPromise,
  PostPromise
} from "../../../generated/prisma-client";

export default {
  Reservation: {
    post: (parent): PostPromise => {
      return prisma.reservation({ id: parent.id }).post();
    },
    user: (parent): UserPromise => {
      return prisma.reservation({ id: parent.id }).user();
    },
    createdDate: async (parent): Promise<string> => {
      const createdAt = await prisma.reservation({ id: parent.id }).createdAt();
      const [date] = createdAt.split("T");
      return date;
    },
    createdTime: async (parent): Promise<string> => {
      const createdAt = await prisma.reservation({ id: parent.id }).createdAt();
      const [, time] = createdAt.split("T");
      const [realTime] = time.split(".");
      const [h, m, s] = realTime.split(":");
      const koreaHour = parseInt(h) + 9;
      return `${koreaHour}:${m}:${s}`;
    }
  }
};
