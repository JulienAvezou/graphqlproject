import { InputType, Field } from "type-graphql";
import { UserNamePasswordInput } from "../resolvers/UserNamePasswordInput";

// *** @... are known as decorators ***
// InputType used as arguments
@InputType()
class UserNamePasswordInput {
  @Field()
  email: string;
  @Field()
  username: string;
  @Field()
  password: string;
}