import {
  prisma,
  UserPromise,
  ReservationPromise
} from "../../../generated/prisma-client";

export default {
  Notification: {
    user: (parent): UserPromise => {
      return prisma.notification({ id: parent.id }).user();
    },
    reservation: (parent): ReservationPromise => {
      return prisma.notification({ id: parent.id }).reservation();
    },
    createdDate: async (parent): Promise<string> => {
      const createdAt = await prisma
        .notification({ id: parent.id })
        .createdAt();
      const [date] = createdAt.split("T");
      return date;
    },
    createdTime: async (parent): Promise<string> => {
      const createdAt = await prisma
        .notification({ id: parent.id })
        .createdAt();
      const [, time] = createdAt.split("T");
      const [realTime] = time.split(".");
      const [h, m, s] = realTime.split(":");
      const koreaHour = parseInt(h) + 9;
      return `${koreaHour}:${m}:${s}`;
    }
  }
};
