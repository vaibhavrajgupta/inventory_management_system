import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";
import { useContext } from "react";

const Layout = () => {
	return (
		<div>
			<div className="navbar">
				<Navbar />
			</div>
			<div className="content">
				<Outlet />
			</div>
		</div>
	);
};

const RequiredAuth = () => {
	const { currentUser } = useContext(AuthContext);

	if (!currentUser) return <Navigate to="/login" />;
	else
		return (
			<div className="layout">
				<div className="navbar">
					<Navbar />
				</div>
				<div className="content">
					<Outlet />
				</div>
			</div>
		);
};

export { Layout, RequiredAuth };
