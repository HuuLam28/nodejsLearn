// Edit by Lamnguyen
const Tour = require('./models/tourModel');
const APIFeatures = require('./../utils/apiFeature');

// const tours = JSON.parse(
//     fs.readFileSync(
//       `${__dirname}/../dev-data/data/tours-simple.json`
//     )
//   );

// exports.checkId = (req, res, next, val) => {
//   console.log(`value ${val}`);
//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: "invalid",
//       message: "Invalid",
//     });
//   }
//   next();
// }

// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//    return res.status(400).json({
//     status: "failed",
//     message: "Missing name or price"
//    });
//   }
//   next();
// }
exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getAllTour = async (req, res) => {
  try {
    // EXECUTE QUERY
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tours = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    // Tour.findOne( {_id : req.params.id})
    res.status(200).json({
      status: 'success',
      results: tour.length,
      data: tour,
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err,
    });
  }
  // const id = req.params.id * 1;
  // const tour = tours.find((el) => el.id === id);
  // !tour &&
  //   res.status(404).json({
  //     status: "error",
  //     message: "Invalid",
  //   });
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Failed to create tour',
      message: err.message,
    });
  }
};

exports.updateTours = async (req, res) => {
  try {
    const newTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    console.log(newTour);
    res.status(200).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {}
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};