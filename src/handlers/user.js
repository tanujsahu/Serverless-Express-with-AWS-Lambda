import { getAllUsers as getAllUsersModel, getUserById as getUserByIdModel, updateUser as updateUserModel, deleteUser as deleteUserModel } from '../models/User.js';

export const getAllUsers = async () => {
  try {
    const users = await getAllUsersModel();
    return {
      statusCode: 200,
      body: JSON.stringify(users),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

export const getUserById = async (event) => {
  try {
    const { id } = event.pathParameters;
    const user = await getUserByIdModel(id);
    if (!user) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'User not found' }),
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(user),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

export const updateUser = async (event) => {
  try {
    const { id } = event.pathParameters;
    const updates = JSON.parse(event.body);
    const updatedUser = await updateUserModel(id, updates);
    return {
      statusCode: 200,
      body: JSON.stringify(updatedUser),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

export const deleteUser = async (event) => {
  try {
    const { id } = event.pathParameters;
    await deleteUserModel(id);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'User deleted successfully' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};