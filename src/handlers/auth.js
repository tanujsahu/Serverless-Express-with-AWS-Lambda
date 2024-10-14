import jwt from 'jsonwebtoken';
import { createUser, getUserByEmail, comparePassword } from '../models/User.js';

export const register = async (event) => {
  try {
    const { username, email, password } = JSON.parse(event.body);
    const user = await createUser({ username, email, password });
    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'User registered successfully', userId: user.id }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

export const login = async (event) => {
  try {
    const { email, password } = JSON.parse(event.body);
    const user = await getUserByEmail(email);
    if (!user || !(await comparePassword(password, user.password))) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Invalid credentials' }),
      };
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return {
      statusCode: 200,
      body: JSON.stringify({ token }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
};