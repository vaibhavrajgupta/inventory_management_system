import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<nav className="bg-gray-800 py-4">
			<div className="container mx-auto px-4">
				<div className="flex justify-between items-center">
					<Link className="text-white">Inventory Management System</Link>
					<div className="text-white flex justify-between items-center">
						<Link className="mx-3">Generate QR Code</Link>
						<Link className="mx-3">Scan QR Code</Link>
					</div>
					<div className="text-white">
						<div className="text-white flex justify-between items-center">
							<Link to="/login" className="mx-3">Login In</Link>
							<Link to="/register" className="mx-3">Register</Link>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};
export default Navbar;
