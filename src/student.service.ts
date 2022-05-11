import { Injectable } from "graphql-modules";
import { Repository } from "typeorm";
import { Student } from "./entities/student";
import { CreateStudentInput } from "./dto/student-input";

@Injectable()
export class StudentService {
  constructor(private studentRepository: Repository<Student>) {}

  async findAll(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  async findOneOrFail(studentId: string): Promise<Student> {
    return this.studentRepository.findOneOrFail({id: studentId });
  }

  async create(studentDTO: CreateStudentInput): Promise<Student> {
    const student = this.studentRepository.create(studentDTO);
    console.log(student);
    return this.studentRepository.save(student);
  }
}
