import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import microConfig from "./mikro-orm.config";
import express from 'express';
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./entities/resolvers/hello";
import { PostResolver } from "./entities/resolvers/post";


const main = async () => {
  // connect to db
  const orm = await MikroORM.init(microConfig);
  // run migration
  await orm.getMigrator().up();

  // setup server
  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({ 
      resolvers: [HelloResolver, PostResolver],
      validate: false
    }),
    context: () => ({ em: orm.em })
  });

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("server started on localhost:4000");
  })



  // em ==> entity manager
  // create new instance of Post (not saved yet!)
  //* const post = orm.em.create(Post, {title: 'my first post'});
  // now save it in db
  //* await orm.em.persistAndFlush(post);

  // const posts = await orm.em.find(Post, {});
  // console.log(posts);
};

main().catch(err => {
  console.error(err);
});

