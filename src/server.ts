import { ApolloServer } from "apollo-server-koa";
import Koa from "koa";
import KoaRouter from "koa-router";
import { StudentResolver } from "student.resolver";
import { buildSchema, buildTypeDefsAndResolvers } from "type-graphql";
import { databaseSetup } from "../src/dbSetup/database";
import http from "http";
import KoaBody from "koa-bodyparser";
import { ApolloServerPluginDrainHttpServer, Context } from "apollo-server-core";

async function bootstrap() {
  try {
    const schema = await buildSchema({
      resolvers: [__dirname + "/**/*.resolver.{ts,js}"],
      emitSchemaFile: true,
    });

    const dbConnection = await databaseSetup();

    const context: Context = {
      dbConnection,
    };

    const app = new Koa();
    const router = new KoaRouter();
    app.use(KoaBody());

    const server = new ApolloServer({
      schema,
      context,
      csrfPrevention: true,
    });

    await server.start();
    server.applyMiddleware({ app , path: '/graphql' });
    app.use(router.routes());
    app.use(router.allowedMethods());
    app.listen(3000);
    
    console.log(
      `🚀 Server ready at http://localhost:3000${server.graphqlPath}`
    );
  } catch (error) {
    console.log("Server not ready due to some issue, please check.");
    throw new Error(`${error}`);
  }
}

bootstrap();
