import mongoose, { ObjectId, Schema } from "mongoose";

const Category = mongoose.model("Category", new Schema(
	{
		id: ObjectId,
		categoryName: {
            type: String,
            require: true
        }
	},
	{
		timestamps: true
	}
))

export default Category;