import bcrypt from 'bcrypt';
import User from '../models/userModel.js';

export const registerUserService = async ({ userName, email, password, role }) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const existingUser = await User.findOne({
    $or: [{ email }, { userName }],
  });

  if (existingUser) {
    return null;
  }

  const user = await User.create({
    userName,
    email,
    password: hash,
    role,
  });

  const { password: pass, ...userData } = user._doc;
  return userData;
};

export const loginUserService = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) return null;

  const { password: pass, ...userData } = user._doc;
  return userData;
};
