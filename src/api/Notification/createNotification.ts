import { prisma } from "../../../generated/prisma-client";

export const createNotification = async (
  userId: string,
  reservationId: string,
  type: string
): Promise<void> => {
  try {
    await prisma.createNotification({
      user: { connect: { id: userId } },
      reservation: { connect: { id: reservationId } },
      type
    });
  } catch (e) {
    throw Error(e);
  }
};
