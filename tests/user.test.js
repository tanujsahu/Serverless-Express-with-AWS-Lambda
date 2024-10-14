import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../src/index.js';
import User from '../src/models/User.js';
import sequelize from '../src/config/database.js';

describe('User API', () => {
  let token;
  let userId;

  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  beforeEach(async () => {
    await User.destroy({ where: {} });
    const user = await User.create({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });
    userId = user.id;
    token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  });

  describe('GET /api/users', () => {
    it('should get all users', async () => {
      const res = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toEqual(1);
    });
  });

  describe('GET /api/users/:id', () => {
    it('should get a user by id', async () => {
      const res = await request(app)
        .get(`/api/users/${userId}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('username', 'testuser');
    });
  });

  describe('PUT /api/users/:id', () => {
    it('should update a user', async () => {
      const res = await request(app)
        .put(`/api/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          username: 'updateduser',
          email: 'updated@example.com'
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('username', 'updateduser');
      expect(res.body).toHaveProperty('email', 'updated@example.com');
    });
  });

  describe('DELETE /api/users/:id', () => {
    it('should delete a user', async () => {
      const res = await request(app)
        .delete(`/api/users/${userId}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'User deleted successfully');
    });
  });
});