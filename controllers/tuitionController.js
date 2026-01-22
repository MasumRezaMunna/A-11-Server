const Tuition = require('../models/Tuition');

exports.getAllTuitions = async (req, res) => {
  try {
    
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields', 'search'];
    excludedFields.forEach(el => delete queryObj[el]);

    
    if (req.query.search) {
      queryObj.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { subject: { $regex: req.query.search, $options: 'i' } }
      ];
    }

   
    let query = Tuition.find(queryObj).populate('student', 'name email');

    
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    
    const tuitions = await query;

    
    res.status(200).json({
      status: 'success',
      results: tuitions.length,
      data: { tuitions }
    });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err.message });
  }
};

exports.createTuition = async (req, res) => {
  try {
    
    const newTuition = await Tuition.create({
      ...req.body,
      student: req.user.id
    });

    res.status(201).json({ status: 'success', data: { tuition: newTuition } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};