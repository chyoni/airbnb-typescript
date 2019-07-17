import {
  CancelReservationMutationArgs,
  CancelReservationResponse
} from "src/types/graph";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    cancelReservation: async (
      _,
      args: CancelReservationMutationArgs,
      { request, isAuthed }
    ): Promise<CancelReservationResponse> => {
      isAuthed(request);
      const { user } = request;
      const { id } = args;
      const existReservation = await prisma.$exists.reservation({ id });
      if (existReservation) {
        const reservationUser = await prisma.reservation({ id }).user();
        if (user.id === reservationUser.id) {
          await prisma.deleteReservation({ id });
          return {
            ok: true,
            error: null
          };
        } else {
          return {
            ok: false,
            error: "권한이 없습니다 😠"
          };
        }
      } else {
        return {
          ok: false,
          error: "존재하지 않는 예약정보 입니다 😥"
        };
      }
    }
  }
};
