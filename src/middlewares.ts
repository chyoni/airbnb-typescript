export const isAuthed = (request: any) => {
  if (!request.user) {
    throw Error("로그인이 필요합니다 🙄🙄");
  }
  return;
};
