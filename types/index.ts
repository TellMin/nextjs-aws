import { UUID } from "crypto";

export interface User {
  id: UUID;
  name: string;
  age: number | undefined;
  email: string | undefined;
  createDate: string;
}
