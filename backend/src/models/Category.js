import mongoose, { ObjectId, Schema } from "mongoose";

const Category = mongoose.model("Category", new Schema(
	{
		id: ObjectId,
		categoryName: {
            type: String,
            require: true
        },
		image: {
			type: String, 
			require: false
		}
	},
	{
		timestamps: true
	}
))

export default Category;