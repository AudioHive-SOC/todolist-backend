import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import USER from "./models/user.js";
dotenv.config();

// ---------------- CONNECT ----------------

async function connectToDB() {
	try {
		const DB = await mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			dbName: process.env.DB_NAME,
		});
		console.log(`MongoDB connected at ${DB.connection.host}`);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
}

connectToDB();

const app = express();
app.use(express.json());
app.use(
	cors({
		origin: "*",
	})
);

app.get("/api/getTodos", async (req, res) => {
	try {
		const id = req.query.id;
		const x = await USER.findById(id);

		return res.status(200).json(x.todos);
	} catch (error) {
		return res.status(400).send(error);
	}
});

app.put("/api/updateTodos", async (req, res) => {
	try {
		const id = req.query.id;
		const data = req.body;

		await USER.findByIdAndUpdate(id, { todos: data });

		return res.status(200).send();
	} catch (error) {
		return res.status(400).send(error);
	}
});

const port = process.env.PORT;
app.listen(port, () => console.log(`SERVER: ${port}`));

export default app;
