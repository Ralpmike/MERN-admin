const path = require("path");
const dotenv = require("dotenv");
const express = require("express");
const basicMiddleware = require("./middlewares/basicMiddleware");
const adminAuthRoutes = require("./routes/adminAuth.routes");
const connectDB = require("./lib/db");
const userRoutes = require("./routes/user.routes");

dotenv.config();
connectDB();

const app = express();

//?middleware
basicMiddleware(app);

app.use("/api/admin", adminAuthRoutes);
app.use("/api/users", userRoutes);

//? Routes
app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
