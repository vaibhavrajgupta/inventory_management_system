import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {Layout} from "./pages/layout/layout";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Layout />,
			children: [
				{
					path: "/",
					element: <HomePage />,
				},
				{
					path : "/login",
					element : <Login/>,
				},
				{
					path : "/register",
					element : <Register/>
				}
			],
		},
	]);

	return <RouterProvider router={router} />;
};
export default App;
