import { MikroORM } from "@mikro-orm/core";
import { Post } from "./entities/Post";
import microConfig from "./mikro-orm.config";


const main = async () => {
  const orm = await MikroORM.init(microConfig);

  // em ==> entity manager
  // create new instance of Post (not saved yet!)
  const post = orm.em.create(Post, {title: 'my first post'});
  // now save it in db
  await orm.em.persistAndFlush(post);
};

main().catch(err => {
  console.error(err);
});

