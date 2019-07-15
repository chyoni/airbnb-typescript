import { GraphQLServer } from "graphql-yoga";
import cors from "cors";
import helmet from "helmet";
import logger from "morgan";
import schema from "./schema";

class App {
  public app: GraphQLServer; //app 이라는 변수를 생성 이 app 변수의 타입은 GraphQlServer
  constructor() {
    this.app = new GraphQLServer({ schema }); //생성자 안에서 해당 변수를 가지고 GraphQLServer 객체 생성
    this.middlewares(); //private으로 만든 middelwars 함수를 실행
  }
  private middlewares = (): void => {
    this.app.express.use(cors());
    this.app.express.use(logger("dev"));
    this.app.express.use(helmet());
  };
}

export default new App().app; //App 클래스의 객체를 생성해서 그 객체의 app이라는 놈을 리턴
