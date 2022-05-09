// import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Student } from "./entities/student";
import { StudentService } from "./student.service";
import { CreateStudentInput } from "./entities/student-input";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver(of => Student)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  @Query(() => Student )
  async getStudentById(@Arg("id") id: string) : Promise<Student> {
    return this.studentService.findOneBy(id);
  }

  @Query(() => [Student])
  async getAllStudents() {
    return this.studentService.findAll();
  }

  @Mutation(() => Student)
  async createStudent(@Arg("student") student: CreateStudentInput) {
    return this.studentService.create(student);
  }
}
