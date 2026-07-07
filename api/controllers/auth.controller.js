import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  // Prevent crash from empty or missing fields
  if (!username || !email || !password) {
    return next(errorHandler(400, 'All fields are required!'));
  }

  try {
    // Non-blocking asynchronous hashing algorithm
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    
    await newUser.save();
    res.status(201).json('User created successfully!');
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(errorHandler(400, 'Email and password are required!'));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, 'User not found!'));

    // Non-blocking asynchronous verification process
    const validPassword = await bcryptjs.compare(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));

    // Set secure token lifespan window (e.g., 24 Hours)
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    const { password: pass, ...rest } = validUser._doc;

    res
      .cookie('access_token', token, { 
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use secure cookies over HTTPS only
        sameSite: 'strict', // Mitigate Cross-Site Request Forgery (CSRF)
        maxAge: 24 * 60 * 60 * 1000 // Match JWT token window bounds
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
      const { password: pass, ...rest } = user._doc;
      
      res
        .cookie('access_token', token, { 
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 24 * 60 * 60 * 1000
        })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      
      // Async hash processing for federated identity setups
      const hashedPassword = await bcryptjs.hash(generatedPassword, 10);
      
      const newUser = new User({
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
      const { password: pass, ...rest } = newUser._doc;
      
      res
        .cookie('access_token', token, { 
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 24 * 60 * 60 * 1000
        })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    // Explicitly align security properties when purging authorization tokens
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
    res.status(200).json('User has been logged out!');
  } catch (error) {
    next(error);
  }
};
