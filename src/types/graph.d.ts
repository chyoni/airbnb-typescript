export const typeDefs = ["type TestResponse {\n  text: String!\n  error: Boolean!\n}\n\ntype Query {\n  Test: TestResponse!\n}\n"];
/* tslint:disable */

export interface Query {
  Test: TestResponse;
}

export interface TestResponse {
  text: string;
  error: boolean;
}
