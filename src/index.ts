import "reflect-metadata";
import express from 'express';
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import Redis from 'ioredis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { COOKIE_NAME, __prod__ } from "./constants";
import cors from 'cors';
import { createConnection } from 'typeorm';
import { Post } from './entities/Post';
import { User } from './entities/User';
import { Updoot } from "./entities/Updoot";

const main = async () => {
  // connect to db
  await createConnection({
    type: 'postgres',
    database: 'graphql2',
    username: 'postgres',
    password: 'postgres',
    logging: true,
    synchronize: true,
    entities: [Post, User, Updoot],
  });

  // setup server
  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis();
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({ 
        client: redis as any,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: 'lax', // csrf
        secure: __prod__ // cookie only works in https
      },
      saveUninitialized: false,
      secret: 'dhzidhziizcbizcho',
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({ 
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res, redis }),
  });

  apolloServer.applyMiddleware({ 
    app,
    cors: false,
  });

  app.listen(4000, () => {
    console.log("server started on localhost:4000");
  })



  // em ==> entity manager
  // create new instance of Post (not saved yet!)
  // const post = orm.em.create(Post, {title: 'my first post'});
  // now save it in db
  // await orm.em.persistAndFlush(post);

  // const posts = await orm.em.find(Post, {});
  // console.log(posts);
};

main().catch(err => {
  console.error(err);
});

