const express = require("express");
const morgan = require("morgan");

const tourRouter = require("./4-natours/starter/routes/tourRoute");
const usersRouter = require("./4-natours/starter/routes/userRoute");

// const tours = JSON.parse(
//   fs.readFileSync(
//     `${__dirname}/4-natours/starter/dev-data/data/tours-simple.json`
//   )
// );
const app = express();
app.use(express.json());
app.use(express.static(`${__dirname}/4-natours/starter/public`));

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV==='development') {
  app.use(morgan('dev'));
}


// const getAllTour = (req, res)   => {
//     console.log(req.requestTime);
//   res.status(200).json({
//     status: "success",
//     results: tours.length,
//     data: {
//       tours,
//     },
//   });
// };
// const getTour = (req, res) => {
//   const id = req.params.id * 1;

//   const tour = tours.find((el) => el.id === id);

//   !tour &&
//     res.status(404).json({
//       status: "error",
//       message: "Invalid",
//     });

//   res.status(200).json({
//     status: "success",
//     results: tour.length,
//     data: tour,
//   });
// };
// const createTour = (req, res) => {
//   const newId = tours[tours.length - 1].id + 1;
//   const newTours = Object.assign({ id: newId }, req.body);

//   tours.push(newTours);

//   fs.writeFile(
//     `${__dirname}/4-natours/starter/dev-data/data/tours-simple.json`,
//     JSON.stringify(tours),
//     (err) => {
//       res.status(201).json({
//         status: "success",
//         data: {
//           tours: newTours,
//         },
//       });
//     }
//   );
// };
// const updateTours = (req, res) => {
//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: "invalid",
//       message: "Invalid",
//     });
//   }
//   res.status(200).json({
//     status: "success",
//     data: {
//       tour: "updated",
//     },
//   });
// };
// const deleteTour = (req, res) => {
//   req.params.id * 1 > tours.length &&
//     res.status(404).json({
//       status: "invalid",
//       message: "Invalid",
//     });
//   res.status(204).json({
//     data: null,
//   });
// };

// const getAllUsers = (req, res) => {
//     res.status(200).json({
//         status: "ok",
//         message: 'ok',
//     });
// }
// const createUsers = (req, res) => {
//     res.status(200).json({
//         status: "ok",
//         message: 'ok',
//     });
//  }
// const getUser = (req, res) => {
//     res.status(200).json({
//         status: "ok",
//         message: 'ok',
//     });
// };
// const updateUser = (req, res) => {
//     res.status(200).json({
//         status: "ok",
//         message: 'ok',
//     });
// };
// const deleteUser  = (req, res) => {
//     res.status(200).json({
//         status: "ok",
//         message: 'ok',
//     });
// };

// Router handlers
// const tourRouter = express.Router();
app.use('/api/v1/tours', tourRouter);
// tourRouter.route("/").get(getAllTour).post(createTour);
// tourRouter
//   .route("/:id")
//   .get(getTour)
//   .patch(updateTours)
//   .delete(deleteTour);

// const usersRouter = express.Router();
app.use('/api/v1/users', usersRouter);
// usersRouter.route('/').get(getAllUsers).post(createUsers);
// usersRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

// // create server
// const port = 3000;

// app.listen(port, (res, req) => {
//   console.log(`App running on port ${port}`);
// });
module.exports = app;
