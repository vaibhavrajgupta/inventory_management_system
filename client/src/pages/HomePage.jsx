import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import QrCode from "../components/qrCode";
import { useState } from "react";
import { useEffect } from "react";
import apiRequest from "../lib/apiRequest";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
	const [rows, setRows] = useState([]);
	const { currentUser } = useContext(AuthContext);
	const navigate = useNavigate();

	const columns = [
		{
			field: "name",
			headerName: "Name",
			width: 150,
			editable: true,
		},
		{
			field: "quantity",
			headerName: "Quantity",
			width: 100,
			editable: true,
		},
		{
			field: "status",
			headerName: "Status",
			type: "Boolean",
			width: 100,
			editable: true,
		},
		{
			field: "pending",
			headerName: "Pending",
			description: "This column has a value getter and is not sortable.",
			sortable: true,
			width: 220,
		},
		{
			field: "qrCode",
			headerName: "QR Code",
			width: 110,
			sortable: false,
			renderCell: (params) => (
				<div
					style={{
						width: "100%",
						height: "100%",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<QrCode value={params.row} />
				</div>
			),
		},
		{
			field: "actions",
			headerName: "Actions",
			width: 200,
			sortable: false,
			renderCell: (params) => (
				<div style={{ display: "flex", justifyContent: "center" }}>
					<button
						onClick={() => handleUpdate(params.row._id)}
						style={{
							marginRight: 10,
							padding: "5px 10px",
							border: "none",
							borderRadius: 5,
							backgroundColor: "#4caf50",
							color: "white",
							cursor: "pointer",
						}}
					>
						Update
					</button>
					<button
						onClick={() => handleDelete(params.row._id)}
						style={{
							padding: "5px 10px",
							border: "none",
							borderRadius: 5,
							backgroundColor: "#f44336",
							color: "white",
							cursor: "pointer",
						}}
					>
						Delete
					</button>
				</div>
			),
		},
	];

	const handleUpdate = async(id) => {
		// handle update logic here
		console.log(id);
		
	};

	const handleDelete = async (id) => {
		if (!currentUser) {
			navigate("/login");
		} else {
			try {
				await apiRequest.delete(`/product/delete/${id}`);
				setRows(rows.filter((row) => row._id !== id));
			} catch (error) {
				console.error("Error deleting data:", error);
			}
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await apiRequest.get("/product/get");
				setRows(res.data.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchData();
	}, []);

	return (
		<div>
			<Box sx={{ height: 800, width: "100%" }}>
				<DataGrid
					rows={rows}
					columns={columns}
					initialState={{
						pagination: {
							paginationModel: {
								pageSize: 5,
							},
						},
					}}
					pageSizeOptions={[5]}
					checkboxSelection
					disableRowSelectionOnClick
					rowHeight={130}
					getRowId={(row) => row._id}
				/>
			</Box>
		</div>
	);
};
export default HomePage;
