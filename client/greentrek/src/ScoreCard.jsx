// ScoreCard.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import { PieChart, Pie, Cell } from "recharts";

const ScoreCard = () => {
	const location = useLocation();
	const carbonFootprint = location.state?.carbonFootprint || 0;

	const scoreData = {
		transportImpact: Math.round(carbonFootprint * 0.3),
		lifestyleImpact: Math.round(carbonFootprint * 0.25),
		wasteGeneration: Math.round(carbonFootprint * 0.2),
		energyConsumption: Math.round(carbonFootprint * 0.25),
	};

	const totalScore = Math.round(carbonFootprint);

	const progressData = [
		{ value: Math.min(carbonFootprint, 100), color: "#4caf50" },
		{
			value: Math.min(Math.max(0, 100 - carbonFootprint), 25),
			color: "#ffeb3b",
		},
		{
			value: Math.max(0, 100 - Math.min(carbonFootprint, 100)),
			color: "#e0e0e0",
		},
	];

	const getProgressStyle = () => {
		return {
			width: "10px",
			height: "100%",
			backgroundColor: "#e0e0e0",
			borderRadius: "5px",
			position: "relative",
			marginRight: "15px",
		};
	};

	const getProgressFillStyle = (ratio, color) => {
		return {
			position: "absolute",
			bottom: 0,
			width: "100%",
			height: `${ratio * 100}%`,
			backgroundColor: color,
			borderRadius: "5px",
		};
	};

	return (
		<div
			style={{
				width: "400px",
				padding: "30px",
				backgroundColor: "white",
				borderRadius: "16px",
				boxShadow: "0 6px 16px rgba(0, 0, 0, 0.12)",
				fontFamily: "Arial, sans-serif",
				margin: "125px auto 0 auto",
			}}>
			<div style={{ textAlign: "center", marginBottom: "15px" }}>
				<h2
					style={{
						fontSize: "24px",
						fontWeight: "500",
						color: "#333",
						margin: "0 0 6px 0",
					}}>
					Your Carbon Footprint
				</h2>
				<p style={{ fontSize: "16px", color: "#777", margin: 0 }}>
					Your environmental impact
				</p>
			</div>

			<div
				style={{
					position: "relative",
					display: "flex",
					justifyContent: "center",
					marginBottom: "24px",
				}}>
				<PieChart
					width={300}
					height={150}>
					<Pie
						data={progressData}
						cx='50%'
						cy='100%'
						startAngle={180}
						endAngle={0}
						innerRadius={85}
						outerRadius={120}
						dataKey='value'
						strokeWidth={0}>
						{progressData.map((entry, index) => (
							<Cell
								key={`cell-${index}`}
								fill={entry.color}
							/>
						))}
					</Pie>
				</PieChart>

				<div
					style={{
						position: "absolute",
						top: "45%",
						left: "50%",
						transform: "translateX(-50%)",
						textAlign: "center",
					}}>
					<h1
						style={{
							fontSize: "48px",
							fontWeight: "bold",
							margin: "0",
							lineHeight: "1.1",
							color: "#000000",
						}}>
						{totalScore}
					</h1>
					<p style={{ fontSize: "18px", color: "#777", margin: 0 }}>Points</p>
				</div>
			</div>

			<div>
				<p
					style={{
						fontSize: "18px",
						marginBottom: "16px",
						color: "#555",
						fontWeight: "500",
					}}>
					Impact Areas
				</p>

				<div
					style={{
						display: "grid",
						gridTemplateColumns: "1fr 1fr",
						gap: "20px",
					}}>
					<div
						style={{
							backgroundColor: "#f5f5f5",
							borderRadius: "12px",
							padding: "18px",
							display: "flex",
							alignItems: "center",
							height: "90px",
						}}>
						<div style={getProgressStyle()}>
							<div
								style={getProgressFillStyle(
									Math.min(scoreData.transportImpact / 100, 1),
									"#9e9e9e"
								)}></div>
						</div>
						<div>
							<p
								style={{
									fontSize: "22px",
									fontWeight: "bold",
									margin: "0",
									color: "#000000",
								}}>
								{scoreData.transportImpact}
							</p>
							<p style={{ fontSize: "15px", color: "#777", margin: 0 }}>
								Transportation
							</p>
						</div>
					</div>

					<div
						style={{
							backgroundColor: "#f5f5f5",
							borderRadius: "12px",
							padding: "18px",
							display: "flex",
							alignItems: "center",
							height: "90px",
						}}>
						<div style={getProgressStyle()}>
							<div
								style={getProgressFillStyle(
									Math.min(scoreData.lifestyleImpact / 100, 1),
									"#ffc107"
								)}></div>
						</div>
						<div>
							<p
								style={{
									fontSize: "22px",
									fontWeight: "bold",
									margin: "0",
									color: "#000000",
								}}>
								{scoreData.lifestyleImpact}
							</p>
							<p style={{ fontSize: "15px", color: "#777", margin: 0 }}>
								Lifestyle
							</p>
						</div>
					</div>

					<div
						style={{
							backgroundColor: "#f5f5f5",
							borderRadius: "12px",
							padding: "18px",
							display: "flex",
							alignItems: "center",
							height: "90px",
						}}>
						<div style={getProgressStyle()}>
							<div
								style={getProgressFillStyle(
									Math.min(scoreData.wasteGeneration / 100, 1),
									"#4caf50"
								)}></div>
						</div>
						<div>
							<p
								style={{
									fontSize: "22px",
									fontWeight: "bold",
									margin: "0",
									color: "#000000",
								}}>
								{scoreData.wasteGeneration}
							</p>
							<p style={{ fontSize: "15px", color: "#777", margin: 0 }}>
								Waste
							</p>
						</div>
					</div>

					<div
						style={{
							backgroundColor: "#f5f5f5",
							borderRadius: "12px",
							padding: "18px",
							display: "flex",
							alignItems: "center",
							height: "90px",
						}}>
						<div style={getProgressStyle()}>
							<div
								style={getProgressFillStyle(
									Math.min(scoreData.energyConsumption / 100, 1),
									"#fff176"
								)}></div>
						</div>
						<div>
							<p
								style={{
									fontSize: "22px",
									fontWeight: "bold",
									margin: "0",
									color: "#000000",
								}}>
								{scoreData.energyConsumption}
							</p>
							<p style={{ fontSize: "15px", color: "#777", margin: 0 }}>
								Energy
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ScoreCard;
