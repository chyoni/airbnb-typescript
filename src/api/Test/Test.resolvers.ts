import { TestResponse, TestQueryArgs } from "src/types/graph";

export default {
  Query: {
    Test: (_, args: TestQueryArgs): TestResponse => {
      return {
        text: `Test ${args.name}`,
        error: false
      };
    }
  }
};
