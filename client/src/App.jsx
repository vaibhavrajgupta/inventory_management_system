import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {Layout, RequiredAuth} from "./pages/layout/layout";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddProduct from "./pages/AddProduct";

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
		{
			path : "/",
			element : <RequiredAuth/>,
			children : [
				{
					path : "/addProduct",
					element : <AddProduct/>
				}
			]
		}
	]);

	return <RouterProvider router={router} />;
};
export default App;
