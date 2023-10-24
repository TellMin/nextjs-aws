import UserInfo from "@/compoents/top/userInfo";
import { User } from "@/types";
import { getUser } from "@/lib/dynamoDBClient";

export default async function Home() {
  const user: User | undefined = await getUser(
    // test user id
    "785a5470-39ef-4d0d-9c03-2a71c240cdd2"
  );

  return (
    <div>
      <h1>UserInfo</h1>
      {!user ? <div>Not Found</div> : <UserInfo user={user} />}
    </div>
  );
}
