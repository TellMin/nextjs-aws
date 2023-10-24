import { createNewUser } from "@/lib/dynamoDBClient";
import { User } from "@/types";
import { randomUUID } from "crypto";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");
  const age = searchParams.get("age");
  const email = searchParams.get("email");
  if (!name) {
    return Response.error();
  }

  const user: User = {
    id: randomUUID(),
    name,
    age: age ? parseInt(age) : undefined,
    email: email ? email : undefined,
    createDate: new Date().toISOString(),
  };

  const result = await createNewUser(user);
  return Response.json(result);
}
