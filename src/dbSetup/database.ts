import { createConnection } from "typeorm";
import { Student } from "../entities/student";

export const databaseSetup = async () => {
  return await createConnection({
    type: "mssql",
    host: "localhost",
    port: 1433,
    username: "sa",
    password: "Password123",
    database: "students",
    entities: [Student],
    logging: true,
    synchronize: true,
    extra: {
      trustServerCertificate: true,
    },
  }).then((...args) => {
    console.log("Database connection established");
  });
};
