import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Login from "./Login";
import Signup from "./Signup";
import Navbar from "./Navbar";

function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route
					path='/'
					element={<HomePage />}
				/>
				<Route
					path='/login'
					element={<Login />}
				/>
				<Route
					path='/signup'
					element={<Signup />}
				/>
			</Routes>
		</Router>
	);
}

export default App;
