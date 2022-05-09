import { Field, InputType } from "type-graphql";


@InputType()
export class CreateStudentInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  class: string;

  @Field({ nullable: true })
  section: string;
}