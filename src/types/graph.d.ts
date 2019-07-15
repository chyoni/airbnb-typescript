export const typeDefs = ["type User {\n  id: ID!\n  firstName: String!\n  lastName: String!\n  username: String!\n  email: String!\n  loginSecret: String\n  hostings: [Post!]!\n  reservations: [Reservation!]!\n  likes: [Like!]!\n  comments: [Comment!]!\n  createdAt: String!\n  updatedAt: String!\n}\n\ntype Post {\n  id: ID!\n  thumbNail: String!\n  caption: String!\n  location: String!\n  host: User!\n  likes: [Like!]!\n  comments: [Comment!]!\n  maxPeopleCount: Int!\n  checkIn: String!\n  checkOut: String!\n  price: String!\n  createdAt: String!\n  updatedAt: String!\n}\n\ntype Reservation {\n  id: ID!\n  post: Post!\n  user: User!\n  createdAt: String!\n  updatedAt: String!\n}\n\ntype Like {\n  id: ID!\n  post: Post!\n  user: User!\n  createdAt: String!\n  updatedAt: String!\n}\n\ntype Comment {\n  id: ID!\n  text: String!\n  post: Post!\n  user: User!\n  createdAt: String!\n  updatedAt: String!\n}\n\ntype ConfirmSecretResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype Mutation {\n  confirmSecret(email: String!, loginSecret: String!): ConfirmSecretResponse!\n  createAccount(username: String!, email: String!, firstName: String!, lastName: String!): CreateAccountResponse!\n  requestSecret(email: String!): RequestSecretResponse!\n}\n\ntype CreateAccountResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Query {\n  something: Boolean!\n}\n\ntype RequestSecretResponse {\n  ok: Boolean!\n  error: String\n}\n"];
/* tslint:disable */

export interface Query {
  something: boolean;
}

export interface Mutation {
  confirmSecret: ConfirmSecretResponse;
  createAccount: CreateAccountResponse;
  requestSecret: RequestSecretResponse;
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

export interface RequestSecretMutationArgs {
  email: string;
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

export interface RequestSecretResponse {
  ok: boolean;
  error: string | null;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  loginSecret: string | null;
  hostings: Array<Post>;
  reservations: Array<Reservation>;
  likes: Array<Like>;
  comments: Array<Comment>;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: string;
  thumbNail: string;
  caption: string;
  location: string;
  host: User;
  likes: Array<Like>;
  comments: Array<Comment>;
  maxPeopleCount: number;
  checkIn: string;
  checkOut: string;
  price: string;
  createdAt: string;
  updatedAt: string;
}

export interface Like {
  id: string;
  post: Post;
  user: User;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  text: string;
  post: Post;
  user: User;
  createdAt: string;
  updatedAt: string;
}

export interface Reservation {
  id: string;
  post: Post;
  user: User;
  createdAt: string;
  updatedAt: string;
}
