import { InputType, Field } from "type-graphql";

// *** @... are known as decorators ***
// InputType used as arguments
@InputType()
export class UsernamePasswordInput {
  @Field()
  email: string;
  @Field()
  username: string;
  @Field()
  password: string;
}