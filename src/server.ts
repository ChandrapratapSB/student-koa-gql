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
  const schema = await buildSchema({
    resolvers: [__dirname + "/**/*.resolver.{ts,js}"],
  });

  const dbConnection = await databaseSetup();

  const context: Context = {
    dbConnection,
  };

  const httpServer = http.createServer();
  const server = new ApolloServer({
    schema,
    context,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  const app = new Koa();
  // const router = new KoaRouter();
  // app.use(KoaBody());
  server.applyMiddleware({ app });
  httpServer.on("request", app.callback());
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  // app.use(router.routes());
  // app.use(router.allowedMethods());
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  // app.listen(3000);
}

bootstrap();
