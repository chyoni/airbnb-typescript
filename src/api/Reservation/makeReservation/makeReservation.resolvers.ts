import {
  MakeReservationMutationArgs,
  MakeReservationResponse
} from "src/types/graph";
import { prisma } from "../../../../generated/prisma-client";
import { createNotification } from "../../../../src/api/Notification/createNotification";

export default {
  Mutation: {
    makeReservation: async (
      _,
      args: MakeReservationMutationArgs,
      { request, isAuthed }
    ): Promise<MakeReservationResponse> => {
      isAuthed(request);
      const { user } = request;
      const { postId, guestCount, arriveAt, leaveAt } = args;
      const existPost = await prisma.$exists.post({ id: postId });
      if (existPost) {
        const thatPost = await prisma.post({ id: postId });
        if (thatPost!.maxPeopleCount < guestCount) {
          return {
            ok: false,
            error:
              "호스트가 설정한 총인원보다 더 많은 인원을 수용할 수 없습니다 😥",
            reservation: null
          };
        } else if (
          Date.parse(thatPost!.checkIn) > Date.parse(arriveAt) ||
          Date.parse(thatPost!.checkOut) < Date.parse(leaveAt)
        ) {
          return {
            ok: false,
            error: "호스트가 설정한 날짜에 체크 인/아웃 해야합니다 😥",
            reservation: null
          };
        }
        try {
          const reserve = await prisma.createReservation({
            post: { connect: { id: postId } },
            user: { connect: { id: user.id } },
            guestCount,
            arriveAt,
            leaveAt
          });
          await createNotification(user.id, reserve.id);
          return {
            ok: true,
            error: null,
            reservation: reserve as any
          };
        } catch (e) {
          return {
            ok: false,
            error: e.message,
            reservation: null
          };
        }
      } else {
        return {
          ok: false,
          error: "게시물이 존재하지 않거나 삭제되었습니다 🙄",
          reservation: null
        };
      }
    }
  }
};
