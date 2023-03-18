import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const sessionAuth = (req, res, next) => {
  const token = req.cookies.session_token;
  if (!token) {
    return res.sendStatus(403); // TODO ADD UI later
  }
  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    req.userId = data._id;
    return next();
    // Almost done
  } catch {
    return res.sendStatus(403); // TODO ADD UI later
  }
}

export default sessionAuth;