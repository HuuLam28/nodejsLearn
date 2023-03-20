const fs = require('fs');
const dotenv = require("dotenv");
dotenv.config({path: './config.env'});
const Tour = require('./4-natours/starter/controllers/models/tourModel');

const mongoose = require("mongoose");

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology:true,
}).then(() => console.log('DB connection successful!'))

// read json file
const tour = JSON.parse(fs.readFileSync(`${__dirname}/4-natours/starter/dev-data/data/tours-simple.json`, 'utf-8'));

// import data into db
const importData = async () => {
    try {
        await Tour.create(tour);
        console.log('Data successfully loaded!');
    } catch (err) {
        console.log(err);
     }
    process.exit();
}

// delete data into db
const deleteData = async () => { 
    try {
        await Tour.deleteMany();
        console.log('Data successfully deleted!');
    }
    catch (err) {
        console.log(err);
    }
    process.exit();
}

if(process.argv[2] === '--import') {
    importData();
}
else if(process.argv[2] === '--delete') {
    deleteData();
}
console.log(process.argv);
