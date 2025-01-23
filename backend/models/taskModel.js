const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  start_time: { type: Date, required: true },
  end_time: { type: Date, required: true },
  priority: { type: Number, required: true, min: 1, max: 5 },
  status: {
    type: String,
    required: true,
    enum: ["pending", "finished", "doing"],
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
