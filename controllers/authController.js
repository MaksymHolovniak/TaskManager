import serverError from '../utils/serverError.js';
import { loginUserService, registerUserService } from '../services/authService.js';

export const register = async (req, res) => {
  try {
    const userData = await registerUserService(req.body);
    if(!userData) return res.status(400).json({message: "User already exists"})
    return res.status(201).json(userData);
  } catch (e) {
    console.error(e.message);
    return serverError(res);
  }
};

export const login = async (req, res) => {
  try {
    const userData = await loginUserService(req.body);

    if (!userData) {
      return res.status(401).json({ message: 'Invalid password or email' });
    }
    return res.status(200).json(userData);
  } catch (e) {
    console.error(e.message);
    return serverError(res);
  }
};
