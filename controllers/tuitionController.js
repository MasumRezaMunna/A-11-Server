const Tuition = require("../models/Tuition");

exports.getAllTuitions = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields", "search"];
    excludedFields.forEach((el) => delete queryObj[el]);

    if (req.query.search) {
      queryObj.$or = [
        { title: { $regex: req.query.search, $options: "i" } },
        { subject: { $regex: req.query.search, $options: "i" } },
      ];
    }

    let query = Tuition.find(queryObj).populate("student", "name email");

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    const tuitions = await query;

    res.status(200).json({
      status: "success",
      results: tuitions.length,
      data: tuitions ,
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err.message });
  }
};

exports.getTuition = async (req, res) => {
  try {
    const tuition = await Tuition.findById(req.params.id).populate('student', 'name email');
    
    if (!tuition) {
      return res.status(404).json({ status: 'fail', message: 'No tuition found with that ID' });
    }

    res.status(200).json({
      status: 'success',
      data: { tuition }
    });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
};

exports.createTuition = async (req, res) => {
  try {
    console.log("User from middleware:", req.user);

    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const newTuition = await Tuition.create({
      ...req.body,
      student: req.user._id,
    });

    res.status(201).json({
      status: "success",
      data: { tuition: newTuition },
    });
  } catch (err) {
    console.error("BACKEND ERROR:", err.message);
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
