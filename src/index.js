import 'dotenv/config';
import express from 'express';
import sequelize from './config/database.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';

const app = express();

app.use(express.json());

sequelize.sync()
  .then(() => console.log('Connected to MySQL'))
  .catch((err) => console.error('MySQL connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;