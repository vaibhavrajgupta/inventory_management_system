import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import QrCode from "../components/qrCode";
import { useState } from "react";
import { useEffect } from "react";
import apiRequest from "../lib/apiRequest";

const HomePage = () => {
	const [rows, setRows] = useState([]);

	const columns = [
		// { field: "_id", headerName: "ID", width: 50 },
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
			field: "qrCode", // Custom field for QR code
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

	];

	// const rows = [
	// 	{ id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
	// 	{ id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
	// 	{ id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
	// 	{ id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
	// 	{ id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
	// 	{ id: 6, lastName: "Melisandre", firstName: null, age: 150 },
	// 	{ id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
	// 	{ id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
	// 	{ id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
	// ];

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await apiRequest.get("/product/get");
				setRows(res.data.data);
				// console.log(i++);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchData();
	}, []);

	console.log(rows);
	

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
