import React, { useState } from "react";
import "./page1.css";

import transportImg from "./images/transport.svg";
import personalInfoImg from "./images/personal_info.svg";
import wasteImg from "./images/waste.svg";
import energyImg from "./images/energy.svg";
import { useNavigate } from "react-router-dom";

const Page1 = () => {
	const navigate = useNavigate();
	const [showForm, setShowForm] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState("");
	const [formData, setFormData] = useState({
		transport: {
			distance: "",
			mode: "Car",
			carType: "Petrol",
			carpool: "Never",
			workFromHome: "No, I commute daily",
		},
		personalInfo: {
			diet: "Non-Vegetarian",
			clothing: "Few times a year",
			flights: "Rarely",
			homeSize: "Medium-sized house",
		},
		waste: {
			wasteAmount: "",
			recycle: "Sometimes",
			compost: "No",
			foodWaste: "A little",
		},
		energy: {
			electricity: "",
			water: "",
			renewable: "No",
			devices: "",
			appliances: "Sometimes",
		},
	});

	const handleChange = (category, field, value) => {
		setFormData(prevState => ({
			...prevState,
			[category]: { ...prevState[category], [field]: value },
		}));
	};

	const categories = [
		{ name: "Transport", img: transportImg },
		{ name: "Personal Info", img: personalInfoImg },
		{ name: "Waste", img: wasteImg },
		{ name: "Energy Consumption", img: energyImg },
	];

	const quotes = [
		"The Earth is what we all have in common. – Wendell Berry",
		"We do not inherit the earth from our ancestors, we borrow it from our children.",
		"Be the change you wish to see in the world.",
		"Small acts, when multiplied by millions of people, can transform the world.",
	];

	const openForm = category => {
		setSelectedCategory(category);
		setShowForm(true);
	};

	const closeForm = () => {
		setShowForm(false);
	};

	const convertToNumericalValue = value => {
		if (value === "Yes" || value === "Yes, full-time" || value === "Always")
			return 1;
		if (value === "No" || value === "No, I commute daily" || value === "Never")
			return 0;
		return 0.5;
	};

	const calculateCarbonFootprint = () => {
		let totalScore = 0;

		// Transport
		const transportData = formData.transport;
		totalScore += parseFloat(transportData.distance || 0) * 1; // Distance (example weight)
		totalScore += convertToNumericalValue(transportData.carpool) * 50; // Carpool impact
		totalScore += convertToNumericalValue(transportData.workFromHome) * 30; // Work from home impact

		// Personal Info
		const personalInfoData = formData.personalInfo;
		totalScore += convertToNumericalValue(personalInfoData.diet) * 40; // Diet (Vegan=low, Non-Veg=high)
		totalScore += convertToNumericalValue(personalInfoData.clothing) * 20; // Clothing
		totalScore += convertToNumericalValue(personalInfoData.flights) * 60; // Flights
		totalScore += convertToNumericalValue(personalInfoData.homeSize) * 30; // Home Size

		// Waste
		const wasteData = formData.waste;
		totalScore += parseFloat(wasteData.wasteAmount || 0) * 10; // Waste amount
		totalScore += convertToNumericalValue(wasteData.recycle) * 50; // Recycle
		totalScore += convertToNumericalValue(wasteData.compost) * 40; // Compost
		totalScore += convertToNumericalValue(wasteData.foodWaste) * 20; // Food Waste

		// Energy
		const energyData = formData.energy;
		totalScore += parseFloat(energyData.electricity || 0) * 0.5; // Electricity
		totalScore += parseFloat(energyData.water || 0) * 0.3; // Water
		totalScore += convertToNumericalValue(energyData.renewable) * 70; // Renewable
		totalScore += parseFloat(energyData.devices || 0) * 5; // Devices
		totalScore += convertToNumericalValue(energyData.appliances) * 15; // Appliances

		return totalScore;
	};

	const handleSubmit = async e => {
		e.preventDefault();

		if (!selectedCategory) {
			alert("Please select a category.");
			return;
		}

		let categoryKey;
		switch (selectedCategory) {
			case "Transport":
				categoryKey = "transport";
				break;
			case "Personal Info":
				categoryKey = "personalInfo";
				break;
			case "Waste":
				categoryKey = "waste";
				break;
			case "Energy Consumption":
				categoryKey = "energy";
				break;
			default:
				categoryKey = "";
		}

		if (!categoryKey) {
			alert("Invalid category selected.");
			return;
		}

		const categoryData = formData[categoryKey];
		let hasEmptyField = false;
		let emptyFields = [];

		for (const field in categoryData) {
			if (categoryData[field] === "") {
				hasEmptyField = true;
				emptyFields.push(field);
			}
		}

		if (hasEmptyField) {
			alert(
				`Please fill all fields before submitting. Empty fields: ${emptyFields.join(
					", "
				)}`
			);
			return;
		}

		const payload = {
			category: selectedCategory,
			data: formData[categoryKey],
		};

		console.log("Submitting data:", payload);

		try {
			const response = await fetch("http://localhost:3000/api/submit", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});

			if (response.ok) {
				const result = await response.json();
				console.log("Form submission successful:", result);

				// Calculate the carbon footprint
				const carbonFootprintScore = calculateCarbonFootprint();
				console.log("Calculated Carbon Footprint Score:", carbonFootprintScore);

				closeForm();
				navigate("/ScoreCard", {
					state: { carbonFootprint: carbonFootprintScore },
				}); // Pass the score
			} else {
				const errorResult = await response.json();
				console.error("Error submitting data:", errorResult.message);
				alert(`Error: ${errorResult.message}`);
			}
		} catch (error) {
			console.error("Error submitting form:", error);
			alert("Failed to submit data.");
		}
	};

	return (
		<div className='container'>
			<h2 className='page-title'>🌍 Carbon Footprint Tracker</h2>
			<p className='description'>
				Track your daily activities and understand your carbon footprint.
			</p>

			<div className='divider'></div>

			<div className='quote-box'>
				<p className='quote-text'>
					"{quotes[Math.floor(Math.random() * quotes.length)]}"
				</p>
			</div>

			<div className='accordion-container'>
				{categories.map((category, index) => (
					<div
						key={index}
						className='accordion-item'>
						<button
							className='accordion-title'
							onClick={() => openForm(category.name)}>
							<img
								src={category.img}
								alt={category.name}
								className='accordion-icon'
							/>
							{category.name}
						</button>
					</div>
				))}
			</div>

			{showForm && (
				<div className='modal'>
					<div className='modal-content'>
						<h3>{selectedCategory} Form</h3>
						<form onSubmit={handleSubmit}>
							{selectedCategory === "Transport" && (
								<>
									<label>
										How many kilometers do you travel daily?
										<input
											type='number'
											value={formData.transport.distance}
											onChange={e =>
												handleChange("transport", "distance", e.target.value)
											}
											placeholder='Enter distance in km'
											required
										/>
									</label>
									<label>
										What is your primary mode of transport?
										<select
											value={formData.transport.mode}
											onChange={e =>
												handleChange("transport", "mode", e.target.value)
											}
											required>
											<option value='Car'>Car</option>
											<option value='Bike'>Bike</option>
											<option value='Bus'>Bus</option>
											<option value='Train'>Train</option>
											<option value='Walking'>Walking</option>
										</select>
									</label>
									<label>
										If you use a car, what type is it?
										<select
											value={formData.transport.carType}
											onChange={e =>
												handleChange("transport", "carType", e.target.value)
											}
											required>
											<option value='Petrol'>Petrol</option>
											<option value='Diesel'>Diesel</option>
											<option value='Electric'>Electric</option>
											<option value='Hybrid'>Hybrid</option>
										</select>
									</label>
									<label>
										How often do you carpool?
										<select
											value={formData.transport.carpool}
											onChange={e =>
												handleChange("transport", "carpool", e.target.value)
											}
											required>
											<option value='Always'>Always</option>
											<option value='Sometimes'>Sometimes</option>
											<option value='Rarely'>Rarely</option>
											<option value='Never'>Never</option>
										</select>
									</label>
									<label>
										Do you work from home?
										<select
											value={formData.transport.workFromHome}
											onChange={e =>
												handleChange(
													"transport",
													"workFromHome",
													e.target.value
												)
											}
											required>
											<option value='Yes, full-time'>Yes, full-time</option>
											<option value='Yes, a few days a week'>
												Yes, a few days a week
											</option>
											<option value='No, I commute daily'>
												No, I commute daily
											</option>
										</select>
									</label>
								</>
							)}

							{selectedCategory === "Personal Info" && (
								<>
									<label>
										What is your diet type?
										<select
											value={formData.personalInfo.diet}
											onChange={e =>
												handleChange("personalInfo", "diet", e.target.value)
											}
											required>
											<option value='Vegan'>Vegan</option>
											<option value='Vegetarian'>Vegetarian</option>
											<option value='Non-Vegetarian'>Non-Vegetarian</option>
										</select>
									</label>
									<label>
										How often do you buy new clothes?
										<select
											value={formData.personalInfo.clothing}
											onChange={e =>
												handleChange("personalInfo", "clothing", e.target.value)
											}
											required>
											<option value='Every week'>Every week</option>
											<option value='Once a month'>Once a month</option>
											<option value='Few times a year'>Few times a year</option>
											<option value='Rarely'>Rarely</option>
										</select>
									</label>
									<label>
										How often do you take flights per year?
										<select
											value={formData.personalInfo.flights}
											onChange={e =>
												handleChange("personalInfo", "flights", e.target.value)
											}
											required>
											<option value='More than 10 times'>
												More than 10 times
											</option>
											<option value='5-10 times'>5-10 times</option>
											<option value='1-5 times'>1-5 times</option>
											<option value='Rarely'>Rarely</option>
										</select>
									</label>
									<label>
										How big is your home?
										<select
											value={formData.personalInfo.homeSize}
											onChange={e =>
												handleChange("personalInfo", "homeSize", e.target.value)
											}
											required>
											<option value='Small apartment'>Small apartment</option>
											<option value='Medium-sized house'>
												Medium-sized house
											</option>
											<option value='Large house'>Large house</option>
										</select>
									</label>
								</>
							)}

							{selectedCategory === "Waste" && (
								<>
									<label>
										How much waste do you generate per week? (kg)
										<input
											type='number'
											value={formData.waste.wasteAmount}
											onChange={e =>
												handleChange("waste", "wasteAmount", e.target.value)
											}
											placeholder='Enter weight in kg'
											required
										/>
									</label>
									<label>
										Do you recycle?
										<select
											value={formData.waste.recycle}
											onChange={e =>
												handleChange("waste", "recycle", e.target.value)
											}
											required>
											<option value='Always'>Always</option>
											<option value='Sometimes'>Sometimes</option>
											<option value='Rarely'>Rarely</option>
											<option value='Never'>Never</option>
										</select>
									</label>
									<label>
										Do you compost?
										<select
											value={formData.waste.compost}
											onChange={e =>
												handleChange("waste", "compost", e.target.value)
											}
											required>
											<option value='Yes'>Yes</option>
											<option value='No'>No</option>
										</select>
									</label>
									<label>
										How much food do you waste?
										<select
											value={formData.waste.foodWaste}
											onChange={e =>
												handleChange("waste", "foodWaste", e.target.value)
											}
											required>
											<option value='A lot'>A lot</option>
											<option value='A little'>A little</option>
											<option value='None'>None</option>
										</select>
									</label>
								</>
							)}

							{selectedCategory === "Energy Consumption" && (
								<>
									<label>
										How much electricity do you consume per month? (kWh)
										<input
											type='number'
											value={formData.energy.electricity}
											onChange={e =>
												handleChange("energy", "electricity", e.target.value)
											}
											placeholder='Enter amount in kWh'
											required
										/>
									</label>
									<label>
										How much water do you consume per month? (liters)
										<input
											type='number'
											value={formData.energy.water}
											onChange={e =>
												handleChange("energy", "water", e.target.value)
											}
											placeholder='Enter amount in liters'
											required
										/>
									</label>
									<label>
										Do you use renewable energy sources?
										<select
											value={formData.energy.renewable}
											onChange={e =>
												handleChange("energy", "renewable", e.target.value)
											}
											required>
											<option value='Yes'>Yes</option>
											<option value='No'>No</option>
										</select>
									</label>
									<label>
										How many electronic devices do you use regularly?
										<input
											type='number'
											value={formData.energy.devices}
											onChange={e =>
												handleChange("energy", "devices", e.target.value)
											}
											placeholder='Enter number of devices'
											required
										/>
									</label>
									<label>
										How often do you use energy-intensive appliances?
										<select
											value={formData.energy.appliances}
											onChange={e =>
												handleChange("energy", "appliances", e.target.value)
											}
											required>
											<option value='Frequently'>Frequently</option>
											<option value='Sometimes'>Sometimes</option>
											<option value='Rarely'>Rarely</option>
											<option value='Never'>Never</option>
										</select>
									</label>
								</>
							)}

							<button
								type='submit'
								className='submit-button'>
								Submit
							</button>
							<button
								type='button'
								className='cancel-button'
								onClick={closeForm}>
								Cancel
							</button>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default Page1;
