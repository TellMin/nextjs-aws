import { createNewUser } from "@/lib/dynamoDBClient";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  if (!userId) {
    return Response.json({ success: false });
  }
  await createNewUser(userId as string);
  return Response.json({ success: true });
}
