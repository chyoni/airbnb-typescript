import { TestResponse } from "src/types/graph";

export default {
  Query: {
    Test: (): TestResponse => {
      return {
        text: "Test",
        error: false
      };
    }
  }
};
