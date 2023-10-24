import { User } from "@/types";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { UUID } from "crypto";

const dbClient = (): DynamoDBClient => {
  const client = new DynamoDBClient({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
    region: process.env.AWS_REGION as string,
  });
  return DynamoDBDocumentClient.from(client);
};

export const createNewUser = async (user: User) => {
  const command = new PutCommand({
    TableName: "nextjs-aws",
    Item: {
      ...user,
    },
  });

  const client = dbClient();

  try {
    const result = await client.send(command);
    console.log(result);
    return result;
  } catch (error) {
    throw error;
  }
};

export const getUser = async (id: UUID) => {
  const command = new GetCommand({
    TableName: "nextjs-aws",
    Key: {
      id,
    },
  });

  const client = dbClient();

  try {
    const result = await client.send(command);
    console.log(result);
    const user: User = result.Item as User;
    return user;
  } catch (error) {
    console.log(error);
  }
};
