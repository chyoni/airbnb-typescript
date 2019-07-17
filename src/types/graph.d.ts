export const typeDefs = ["type AddCommentResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Mutation {\n  addComment(postId: String!, text: String!): AddCommentResponse!\n  toggleLike(postId: String!): ToggleLikeResponse!\n  hostingPost(thumbNail: String!, caption: String!, location: String!, maxPeopleCount: Int!, checkIn: String!, checkOut: String!, price: Int!): HostingPostResponse!\n  cancelReservation(id: String!): CancelReservationResponse!\n  makeReservation(postId: String!, guestCount: Int!, arriveAt: String!, leaveAt: String!): MakeReservationResponse!\n  confirmSecret(email: String!, loginSecret: String!): ConfirmSecretResponse!\n  createAccount(username: String!, email: String!, firstName: String!, lastName: String!): CreateAccountResponse!\n  editUser(firstName: String, lastName: String, avatar: String, username: String): EditUserResponse!\n  requestSecret(email: String!): RequestSecretResponse!\n}\n\ntype ToggleLikeResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype User {\n  id: ID!\n  firstName: String!\n  lastName: String!\n  fullName: String\n  avatar: String\n  username: String!\n  email: String!\n  loginSecret: String\n  isSelf: Boolean!\n  hostings: [Post!]!\n  reservations: [Reservation!]!\n  likes: [Like!]!\n  comments: [Comment!]!\n  createdAt: String!\n  updatedAt: String!\n  createdDate: String\n  createdTime: String\n}\n\ntype Post {\n  id: ID!\n  thumbNail: String!\n  caption: String!\n  location: String!\n  host: User!\n  likes: [Like!]!\n  comments: [Comment!]!\n  isLiked: Boolean!\n  likeCount: Int!\n  commentCount: Int!\n  maxPeopleCount: Int!\n  checkIn: String!\n  checkOut: String!\n  price: Int!\n  createdAt: String!\n  updatedAt: String!\n  createdDate: String\n  createdTime: String\n}\n\ntype Reservation {\n  id: ID!\n  post: Post!\n  user: User!\n  guestCount: Int!\n  arriveAt: String!\n  leaveAt: String!\n  createdAt: String!\n  updatedAt: String!\n  createdDate: String\n  createdTime: String\n}\n\ntype Like {\n  id: ID!\n  post: Post!\n  user: User!\n  createdAt: String!\n  updatedAt: String!\n  createdDate: String\n  createdTime: String\n}\n\ntype Comment {\n  id: ID!\n  text: String!\n  post: Post!\n  user: User!\n  createdAt: String!\n  updatedAt: String!\n  createdDate: String\n  createdTime: String\n}\n\ntype HostingPostResponse {\n  ok: Boolean!\n  error: String\n  post: Post\n}\n\ntype Query {\n  searchPost(term: String!, priceGte: Int, priceLte: Int): [Post!]!\n  seeFeed: [Post!]!\n  seeFullPost(postId: String!): SeeFullPostResponse!\n  myProfile: User!\n  seeUser(username: String!): User!\n}\n\ntype SeeFullPostResponse {\n  ok: Boolean!\n  error: String\n  post: Post\n}\n\ntype CancelReservationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype MakeReservationResponse {\n  ok: Boolean!\n  error: String\n  reservation: Reservation\n}\n\ntype ConfirmSecretResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype CreateAccountResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype EditUserResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype RequestSecretResponse {\n  ok: Boolean!\n  error: String\n}\n"];
/* tslint:disable */

export interface Query {
  searchPost: Array<Post>;
  seeFeed: Array<Post>;
  seeFullPost: SeeFullPostResponse;
  myProfile: User;
  seeUser: User;
}

export interface SearchPostQueryArgs {
  term: string;
  priceGte: number | null;
  priceLte: number | null;
}

export interface SeeFullPostQueryArgs {
  postId: string;
}

export interface SeeUserQueryArgs {
  username: string;
}

export interface Post {
  id: string;
  thumbNail: string;
  caption: string;
  location: string;
  host: User;
  likes: Array<Like>;
  comments: Array<Comment>;
  isLiked: boolean;
  likeCount: number;
  commentCount: number;
  maxPeopleCount: number;
  checkIn: string;
  checkOut: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  createdDate: string | null;
  createdTime: string | null;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string | null;
  avatar: string | null;
  username: string;
  email: string;
  loginSecret: string | null;
  isSelf: boolean;
  hostings: Array<Post>;
  reservations: Array<Reservation>;
  likes: Array<Like>;
  comments: Array<Comment>;
  createdAt: string;
  updatedAt: string;
  createdDate: string | null;
  createdTime: string | null;
}

export interface Reservation {
  id: string;
  post: Post;
  user: User;
  guestCount: number;
  arriveAt: string;
  leaveAt: string;
  createdAt: string;
  updatedAt: string;
  createdDate: string | null;
  createdTime: string | null;
}

export interface Like {
  id: string;
  post: Post;
  user: User;
  createdAt: string;
  updatedAt: string;
  createdDate: string | null;
  createdTime: string | null;
}

export interface Comment {
  id: string;
  text: string;
  post: Post;
  user: User;
  createdAt: string;
  updatedAt: string;
  createdDate: string | null;
  createdTime: string | null;
}

export interface SeeFullPostResponse {
  ok: boolean;
  error: string | null;
  post: Post | null;
}

export interface Mutation {
  addComment: AddCommentResponse;
  toggleLike: ToggleLikeResponse;
  hostingPost: HostingPostResponse;
  cancelReservation: CancelReservationResponse;
  makeReservation: MakeReservationResponse;
  confirmSecret: ConfirmSecretResponse;
  createAccount: CreateAccountResponse;
  editUser: EditUserResponse;
  requestSecret: RequestSecretResponse;
}

export interface AddCommentMutationArgs {
  postId: string;
  text: string;
}

export interface ToggleLikeMutationArgs {
  postId: string;
}

export interface HostingPostMutationArgs {
  thumbNail: string;
  caption: string;
  location: string;
  maxPeopleCount: number;
  checkIn: string;
  checkOut: string;
  price: number;
}

export interface CancelReservationMutationArgs {
  id: string;
}

export interface MakeReservationMutationArgs {
  postId: string;
  guestCount: number;
  arriveAt: string;
  leaveAt: string;
}

export interface ConfirmSecretMutationArgs {
  email: string;
  loginSecret: string;
}

export interface CreateAccountMutationArgs {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface EditUserMutationArgs {
  firstName: string | null;
  lastName: string | null;
  avatar: string | null;
  username: string | null;
}

export interface RequestSecretMutationArgs {
  email: string;
}

export interface AddCommentResponse {
  ok: boolean;
  error: string | null;
}

export interface ToggleLikeResponse {
  ok: boolean;
  error: string | null;
}

export interface HostingPostResponse {
  ok: boolean;
  error: string | null;
  post: Post | null;
}

export interface CancelReservationResponse {
  ok: boolean;
  error: string | null;
}

export interface MakeReservationResponse {
  ok: boolean;
  error: string | null;
  reservation: Reservation | null;
}

export interface ConfirmSecretResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface CreateAccountResponse {
  ok: boolean;
  error: string | null;
}

export interface EditUserResponse {
  ok: boolean;
  error: string | null;
}

export interface RequestSecretResponse {
  ok: boolean;
  error: string | null;
}
