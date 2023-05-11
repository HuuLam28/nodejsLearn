// Edit by Lamnguyen
const Tour = require('../models/tourModel');
const APIFeatures = require('./../utils/apiFeature');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../../starter/utils/appError');

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

exports.getAllTour = catchAsync(async (req, res, next) => {
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
      tours,
    },
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  console.log(req.params.id);
    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      return next(new AppError(`Not found id:${req.params.id}`, 404));
    }
    // Tour.findOne( {_id : req.params.id})
    res.status(200).json({
      status: 'success',
      results: tour.length,
      data: tour,
    });
  } 
);

exports.createTour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour,
    },
  });
});

exports.updateTours = catchAsync(async (req, res, next) => {
    const newTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!newTour) {
      return next(new AppError(`Not found id:${req.params.id} can't update`, 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
});

exports.deleteTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndDelete(req.params.id);
  if (!tour) {
    return next(new AppError(`Not found id:${req.params.id} or `, 404));
  }
  res.status(204).json({
    data: null,
  });
});

exports.getTourStats = catchAsync(async (req, res, next) => {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4 } }
      },
      {
        $group: {
          _id: { $toUpper: '$difficulty' },
          numTours: { $sum: 1 },
          numRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' }
        }
      },
      {
        $sort: { avgPrice: 1 }
      }
    ]);
  
    res.status(200).json({
      status: 'success',
      data: {
        stats
      }
    });
})

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
    const year = req.params.year;
    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates'
      },
      {
        $match: {
          startDates:
          { 
            $gte: new Date(`${year}`-1-1),
            $lte: new Date(`${year}`-12-31),
          }
        },
        $group: {
            _id: {$month: '$startDates'},
            numTourStarts: {$sum: 1},
            tours : {$push :'$name'},
        }
      }
    ]);
    res.status(200).json({
      status:'success',
      data: {
        plan
      }
    })
})
  
