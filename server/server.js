const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const dbConnect = require("./config/dbConnect");
const userRoutes = require("./routes/userRoutes");
const mongoose = require("mongoose");

dotenv.config();
dbConnect();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/users", userRoutes);

const carbonDataSchema = new mongoose.Schema(
	{
		category: {
			type: String,
			required: true,
			enum: ["Transport", "Personal Info", "Waste", "Energy Consumption"],
		},
		// Transport data
		distance: String,
		mode: String,
		carType: String,
		carpool: String,
		workFromHome: String,

		// Personal info data
		diet: String,
		clothing: String,
		flights: String,
		homeSize: String,

		// Waste data
		wasteAmount: String,
		recycle: String,
		compost: String,
		foodWaste: String,

		// Energy data
		electricity: String,
		water: String,
		renewable: String,
		devices: String,
		appliances: String,

		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{ collection: "carbondatas" }
);

const CarbonData = mongoose.model("CarbonData", carbonDataSchema);

app.post("/api/submit", async (req, res) => {
	try {
		console.log("Incoming Data:", req.body);
		const { category, data } = req.body;

		if (!category || !data) {
			return res
				.status(400)
				.json({ message: "Category and data are required" });
		}

		// Validate category
		if (
			!["Transport", "Personal Info", "Waste", "Energy Consumption"].includes(
				category
			)
		) {
			return res.status(400).json({ message: "Invalid category" });
		}

		const newEntry = new CarbonData({
			category,
			...data,
		});

		console.log("MongoDB Connection State:", mongoose.connection.readyState);

		const savedEntry = await newEntry.save();
		console.log("✅ Data Saved Successfully:", savedEntry);
		res
			.status(201)
			.json({ message: "Data saved successfully", entry: savedEntry });
	} catch (error) {
		console.error("Error Saving Data:", error);
		console.error("Error Message:", error.message);
		console.error("Error Stack:", error.stack);
		res.status(500).json({ message: "Server error", error: error.message });
	}
});

app.get("/api/carbon-data", async (req, res) => {
	try {
		const allData = await CarbonData.find().sort({ createdAt: -1 });
		res.status(200).json(allData);
	} catch (error) {
		console.error("Error fetching data:", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
