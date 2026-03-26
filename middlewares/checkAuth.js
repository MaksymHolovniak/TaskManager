import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import serverError from '../utils/serverError.js';

export default async (req, res, next) => {
  try {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Basic')) {
      return res.status(401).json({ message: 'Invalid authorization header' });
    }
    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');

    const [email, password] = credentials.split(':');
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid password or email' });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({ message: 'Invalid password or email' });
    }

    const { password: pass, ...userData } = user._doc;
    req.user = userData;
    next();
  } catch (e) {
    console.error(e.message);
    return serverError(res);
  }
};
