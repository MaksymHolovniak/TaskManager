import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import serverError from '../utils/serverError.js';

export const register = async (req, res) => {
  try {
    const { userName, email, password: pass, role } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(pass, salt);

    const user = await User.create({
      userName,
      email,
      password: hash,
      role,
    });

    const { password, ...userData } = user._doc;

    return res.status(200).json(userData);
  } catch (e) {
    console.error(e.message);
    return serverError(res);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password: pass } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid password or email' });
    }

    const isValid = await bcrypt.compare(pass, user.password);

    if (!isValid) {
      return res.status(401).json({ message: 'Invalid password or email' });
    }

    const { password, ...userData } = user._doc;
    return res.status(200).json(userData);
  } catch (e) {
    console.error(e.message);
    return serverError(res);
  }
};
