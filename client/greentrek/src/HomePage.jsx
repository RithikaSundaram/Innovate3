function HomePage() {
	return (
		<div className='home-container'>
			<div className='text-section'>
				<h1>Reduce Your Carbon Footprint</h1>
				{/* <p>🌿 "Small steps create big changes." </p> */}
				<p className='inner-line'>
					Track, reduce, and contribute to a greener planet.{" "}
				</p>
				{/* <p>💚 "Be the change, one footprint at a time!" </p> */}
			</div>
			<div className='image-section'>
				<img
					src='https://plus.unsplash.com/premium_photo-1711987216512-4ca283ab7c26?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
					alt='Eco-friendly'
				/>
			</div>
		</div>
	);
}

export default HomePage;
