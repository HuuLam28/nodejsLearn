const dotenv = require("dotenv");
dotenv.config({path: './config.env'})

const mongoose = require("mongoose");
const app = require('./BE');

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