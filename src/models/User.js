import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { docClient } from '../config/dynamodb.js';
import { PutCommand, GetCommand, QueryCommand, UpdateCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";

const tableName = process.env.USERS_TABLE;

export const createUser = async (userData) => {
  const { username, email, password } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = {
    id: uuidv4(),
    username,
    email,
    password: hashedPassword,
  };

  await docClient.send(new PutCommand({
    TableName: tableName,
    Item: user,
  }));

  return user;
};

export const getUserByEmail = async (email) => {
  const params = {
    TableName: tableName,
    IndexName: 'EmailIndex',
    KeyConditionExpression: 'email = :email',
    ExpressionAttributeValues: {
      ':email': email,
    },
  };

  const result = await docClient.send(new QueryCommand(params));
  return result.Items[0];
};

export const getUserById = async (id) => {
  const result = await docClient.send(new GetCommand({
    TableName: tableName,
    Key: { id },
  }));
  return result.Item;
};

export const getAllUsers = async () => {
  const result = await docClient.send(new QueryCommand({
    TableName: tableName,
  }));
  return result.Items;
};

export const updateUser = async (id, updates) => {
  const { username, email } = updates;
  const params = {
    TableName: tableName,
    Key: { id },
    UpdateExpression: 'set username = :username, email = :email',
    ExpressionAttributeValues: {
      ':username': username,
      ':email': email,
    },
    ReturnValues: 'ALL_NEW',
  };

  const result = await docClient.send(new UpdateCommand(params));
  return result.Attributes;
};

export const deleteUser = async (id) => {
  await docClient.send(new DeleteCommand({
    TableName: tableName,
    Key: { id },
  }));
};

export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};