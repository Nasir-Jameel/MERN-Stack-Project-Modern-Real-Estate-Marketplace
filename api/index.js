import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
dotenv.config();

// Safe-check agar MONGO variable Vercel pa missing ho
if (!process.env.MONGO) {
  console.error("ERROR: MONGO environment variable is missing on Vercel!");
} else {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log('Connected to MongoDB!');
    })
    .catch((err) => {
      console.log(err);
    });
}

const __dirname = path.resolve();
const app = express();

app.use(express.json());
app.use(cookieParser());

// API Routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

// Frontend Static Files Serve
app.use(express.static(path.join(__dirname, '/client/dist')));

// 📍 FIX: Express 5 ke liye regex-based fallback route (taake PathError na aaye)
app.get(/^(?!\/api).+/, (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// Error Handler Middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

export default app;
