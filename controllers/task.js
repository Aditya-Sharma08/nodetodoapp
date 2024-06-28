const Task = require("../models/task.js");

exports.newTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(404).json({
        success: false,
        message: "Both fields are mandatory",
      });
    }

    await Task.create({
      title,
      description,
      user: req.user,
    });

    res.status(201).json({
      success: true,
      message: "Title and Description are added successfully",
    });
  } catch (error) {
    console.error(error.message);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getMyTasks = async (req, res) => {
  try {
    const userid = req.user._id;

    const tasks = await Task.find({ user: userid });

    res.status(200).json({
      success: true,
      message: "Read operations done",
      tasks,
    });
  } catch (error) {
    console.error(error.message);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const id = req.params.id;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Invalid ID",
      });
    }

    task.isCompleted = !task.isCompleted;

    await task.save();

    res.status(200).json({
      success: true,
      message: "Task Updated",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const id = req.params.id;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Invalid ID",
      });
    }
    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task Deleted",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
