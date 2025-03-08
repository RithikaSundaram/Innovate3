import React, { useState } from "react";
import "./page1.css";

import transportImg from "./images/transport.svg";
import personalInfoImg from "./images/personal_info.svg";
import wasteImg from "./images/waste.svg";
import energyImg from "./images/energy.svg";

const Page1 = () => {
	const [showForm, setShowForm] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState("");

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
						<form>
							{selectedCategory === "Transport" && (
								<>
									<label>
										How many kilometers do you travel daily?
										<input
											type='number'
											placeholder='Enter distance in km'
										/>
									</label>
									<label>
										What is your primary mode of transport?
										<select>
											<option>Car</option>
											<option>Bike</option>
											<option>Bus</option>
											<option>Train</option>
											<option>Walking</option>
										</select>
									</label>
									<label>
										If you use a car, what type is it?
										<select>
											<option>Petrol</option>
											<option>Diesel</option>
											<option>Electric</option>
											<option>Hybrid</option>
										</select>
									</label>
									<label>
										How often do you carpool?
										<select>
											<option>Always</option>
											<option>Sometimes</option>
											<option>Rarely</option>
											<option>Never</option>
										</select>
									</label>
									<label>
										Do you work from home?
										<select>
											<option>Yes, full-time</option>
											<option>Yes, a few days a week</option>
											<option>No, I commute daily</option>
										</select>
									</label>
								</>
							)}

							{selectedCategory === "Personal Info" && (
								<>
									<label>
										What is your diet type?
										<select>
											<option>Vegan</option>
											<option>Vegetarian</option>
											<option>Non-Vegetarian</option>
										</select>
									</label>
									<label>
										How often do you buy new clothes?
										<select>
											<option>Every week</option>
											<option>Once a month</option>
											<option>Few times a year</option>
											<option>Rarely</option>
										</select>
									</label>
									<label>
										How often do you take flights per year?
										<select>
											<option>More than 10 times</option>
											<option>5-10 times</option>
											<option>1-5 times</option>
											<option>Rarely</option>
										</select>
									</label>
									<label>
										How big is your home?
										<select>
											<option>Small apartment</option>
											<option>Medium-sized house</option>
											<option>Large house</option>
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
											placeholder='Enter weight in kg'
										/>
									</label>
									<label>
										Do you recycle?
										<select>
											<option>Always</option>
											<option>Sometimes</option>
											<option>Rarely</option>
											<option>Never</option>
										</select>
									</label>
									<label>
										Do you compost food waste?
										<select>
											<option>Yes</option>
											<option>No</option>
										</select>
									</label>
									<label>
										How much food do you waste weekly?
										<select>
											<option>None</option>
											<option>A little</option>
											<option>A moderate amount</option>
											<option>A lot</option>
										</select>
									</label>
								</>
							)}

							{selectedCategory === "Energy Consumption" && (
								<>
									<label>
										How many kWh of electricity do you use per month?
										<input
											type='number'
											placeholder='Enter electricity usage'
										/>
									</label>
									<label>
										How many liters of water do you use daily?
										<input
											type='number'
											placeholder='Enter water usage'
										/>
									</label>
									<label>
										Do you use renewable energy (e.g., solar, wind)?
										<select>
											<option>Yes, fully</option>
											<option>Partially</option>
											<option>No</option>
										</select>
									</label>
									<label>
										How many electronic devices do you use daily?
										<input
											type='number'
											placeholder='Enter number of devices'
										/>
									</label>
									<label>
										Do you turn off appliances when not in use?
										<select>
											<option>Always</option>
											<option>Sometimes</option>
											<option>Rarely</option>
											<option>Never</option>
										</select>
									</label>
								</>
							)}

							<div className='form-buttons'>
								<button type='submit'>Submit</button>
								<button
									type='button'
									onClick={closeForm}>
									Close
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			<div className='footer'>
				<p>Let's work together to reduce our carbon footprint! 🌱</p>
			</div>
		</div>
	);
};

export default Page1;
Page1.jsx;
