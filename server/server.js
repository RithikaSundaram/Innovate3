const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const dbConnect = require("./config/dbConnect");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
dbConnect();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
