const express = require("express");
const cors = require("cors");
require("dotenv").config();

const headerRoutes = require('./routes/headerRotue');
const passwordRoutes = require('./routes/passwordRoute');
const breachRoutes = require('./routes/breachRoute');
const sslRoutes = require('./routes/sslRoute');
const codeReviewRoute = require('./routes/codeReviewRoute');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/security', headerRoutes);
app.use('/api/password', passwordRoutes);
app.use('/api/breach', breachRoutes);
app.use('/api/ssl', sslRoutes);
app.use('/api/code', codeReviewRoute);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "SecureVault API Running!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
