import { Link } from "react-router-dom";

function Navbar() {
	return (
		<nav className='navbar'>
			<h2 className='logo'>Green Trek</h2>
			<div>
				<Link
					to='/login'
					className='btn'>
					Login
				</Link>
				<Link
					to='/signup'
					className='btn'>
					Signup
				</Link>
			</div>
		</nav>
	);
}

export default Navbar;
