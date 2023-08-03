import mongoose from "mongoose";
const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true,"Please provide a title"],
        trim: true,
        maxlength: [20, "Title cannot be more than 20 characters"]
    },
    description: {
        type: String,
        required: [true, "Please provide a description"],
    },
    status: {
        type: String,
        default: "todo",
    }
})

const task = mongoose.model("Task", taskSchema);
export default task;