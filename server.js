// thêm file dotend biến môi trường để dễ dàng chỉnh sửa
const dotenv = require("dotenv"); //import thư viện dotenv
dotenv.config({path: './config.env'})

const mongoose = require("mongoose");//import thư viện mongoose nên impport vào file server
const app = require('./App'); //import file App.js
const errorController = require("./4-natours/starter/controllers/errorController");

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

// xử lý lỗi
process.on('uncaughtException', err => {
  console.log(err.name, err.message);
  console.log('Uncaught exception, shutting down...');
  server.close(() =>{
    process.exit(1);
  })
});


mongoose.connect(DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology:true,
}).then(() => console.log('DB connection successful!')
)

// // create server
const port = process.env.PORT || 3000;

const server = app.listen(port, (res, req) => {
  console.log(`App running on port ${port}`);
});


// xử lý lỗi nằm ngoài express
process.on('unhandledRejection', err => {
  console.log('Unhandled rejection, shutting down...');
  console.log(err.name, err.message);
  server.close(() =>{
    process.exit(1);
  })
});

