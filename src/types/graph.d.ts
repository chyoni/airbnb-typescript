export const typeDefs = ["type TestResponse {\n  text: String!\n  error: Boolean!\n}\n\ntype Query {\n  Test(name: String!): TestResponse!\n}\n"];
/* tslint:disable */

export interface Query {
  Test: TestResponse;
}

export interface TestQueryArgs {
  name: string;
}

export interface TestResponse {
  text: string;
  error: boolean;
}
