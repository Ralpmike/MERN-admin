const jwt = require("jsonwebtoken");

const adminAuth = (req, res, next) => {
  //? 1. Check if the request has an authorization header: get the token from the header
  // console.log("Headers:", req.headers);
  const authHeader = req.headers.authorization;

  //? 2. If the header is not present and does not start with "Bearer", return a 401 Unauthorized response
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      message: "Unauthorized: No token provided",
    });
  }

  //? 3. Extract the token from the header
  const token = authHeader.split(" ")[1];
  console.log("Token:", token);

  try {
    //? 4. Verify the token using jwt.verify
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Decoded Token:", decoded);

    //? 5. Attach the decoded admin info to the request object
    req.admin = decoded;

    //? 6. If the token is valid, proceed to the next middleware or route handler
    next();
  } catch (error) {
    //? 4. If the token is invalid or expired, return a 401 Unauthorized response
    return res.status(401).json({
      message: "Unauthorized: Invalid or expired token",
      error: error.message,
    });
  }
};

module.exports = adminAuth;
