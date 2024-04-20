import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import apiRequest from "../lib/apiRequest";

const Navbar = () => {
	const { currentUser, updateUser } = useContext(AuthContext);
	const navigate = useNavigate();
	const handleLogout = async () => {
		try {
			await apiRequest.post("/auth/logout");
			updateUser({ data: { user: null } });
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};

	

	return (
		<nav className="bg-gray-800 py-4">
			<div className="container mx-auto px-4">
				<div className="flex justify-between items-center">
					<Link to="/" className="text-white">
						Inventory Management System
					</Link>
					<div className="text-white flex justify-between items-center">
						<Link to="/addProduct" className="mx-3">
							Generate QR Code
						</Link>
						<Link className="mx-3">Scan QR Code</Link>
					</div>
					<div className="text-white">
						<div className="text-white flex justify-between items-center">
							{currentUser ? (
								<Link className="mx-3" onClick={handleLogout}>
									Logout
								</Link>
							) : (
								<>
									<Link to="/login" className="mx-3">
										Login In
									</Link>
									<Link to="/register" className="mx-3">
										Register
									</Link>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};
export default Navbar;
