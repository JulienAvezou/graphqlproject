import { MikroORM } from "@mikro-orm/core";
import { Post } from "./entities/Post";
import microConfig from "./mikro-orm.config";


const main = async () => {
  // connect to db
  const orm = await MikroORM.init(microConfig);
  // run migration
  await orm.getMigrator().up();

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

