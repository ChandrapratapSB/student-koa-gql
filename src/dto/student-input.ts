import { MaxLength } from "class-validator";
import { Student } from "entities/student";
import { Field, InputType } from "type-graphql";


@InputType()
export class CreateStudentInput implements Partial<Student> {
  @Field()
  @MaxLength(30)
  firstName: string;

  @Field()
  @MaxLength(30)
  lastName: string;

  @Field()
  @MaxLength(3)
  class: string;

  @Field({ nullable: true })
  section: string;
}