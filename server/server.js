import app from "./src/app.js";
import http from "http";
import dotenv from "dotenv";
import connectToDB from "./src/db/index.js";

dotenv.config({ path: ".env" });

const port = process.env.PORT;
const server = http.createServer(app);

connectToDB()
	.then(() => {
		server.listen(port || 7000, () => {
			console.log("Server started running at port : " + port);
		});
	})
	.catch((error) => {
		console.log("DB connection failed !!!! ", error);
	});
