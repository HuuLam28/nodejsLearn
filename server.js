// thêm file dotend biến môi trường để dễ dàng chỉnh sửa
const dotenv = require("dotenv"); //import thư viện dotenv
dotenv.config({path: './config.env'})

const mongoose = require("mongoose");//import thư viện mongoose nên impport vào file server
const app = require('./App'); //import file App.js

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology:true,
}).then(() => console.log('DB connection successful!')
)

// // create server
const port = process.env.PORT || 3000;

app.listen(port, (res, req) => {
  console.log(`App running on port ${port}`);
});