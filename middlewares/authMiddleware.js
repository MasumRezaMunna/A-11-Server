const jwt = require('jsonwebtoken');
const User = require('../models/User');
const admin = require('../config/firebaseAdmin');

exports.verifyFirebaseToken = async (req, res, next) => {
  console.log("Headers received:", req.headers.authorization); // Debug log 1

  const token = req.headers.authorization?.split('Bearer ')[1];
  
  if (!token) {
    console.log("No token found in request"); // Debug log 2
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log("Token decoded successfully for:", decodedToken.email); // Debug log 3
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Firebase Auth Error:", error.message); // Debug log 4
    res.status(403).json({ message: "Auth failed: " + error.message });
  }
};

exports.protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) return res.status(401).json({ message: "You are not logged in" });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  next();
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Permission denied" });
    }
    next();
  };
};