import mongoose from "mongoose";

const USER = mongoose.model(
	"user",
	mongoose.Schema({
		todos: [
			{
				text: String,
				timeStamp: String,
			},
		],
	}),
	"user"
);

export default USER;
