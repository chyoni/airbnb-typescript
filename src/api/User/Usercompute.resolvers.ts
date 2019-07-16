import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    hostings: parent => prisma.user({ id: parent.id }).hostings(),
    reservations: parent => prisma.user({ id: parent.id }).reservations(),
    likes: parent => prisma.user({ id: parent.id }).likes(),
    comments: parent => prisma.user({ id: parent.id }).comments()
  }
};
