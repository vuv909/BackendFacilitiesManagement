import mongoose, { ObjectId, Schema } from "mongoose";

const Log = mongoose.model("Log", new Schema(
	{
		id: ObjectId,
		collectionName: {
            type: String,
            require: true
        },
        objectBefore: {
            type: Object
        },
        objectAfter: {
            type: Object
        },
        action: {
            type: String
        },
        id: {
            type: String
        }
	},
	{
		timestamps: true
	}
))

export default Log;