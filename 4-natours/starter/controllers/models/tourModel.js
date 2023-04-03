const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, 'A tour name is required'],
        unique: true,
        trim: true,
      },
      ratingsAverage: {
        type: Number,
        default: 4.5,
      },
      ratingQuantity: {
        type: Number,
        default: 0,
      },
      price: { 
        type : Number,
        required: [true, 'A tour must have a price']
      },
      priceDiscount: Number,
      sumary: {
        type: String,
        trim: true,
      },
      duration: {
        type: Number,
        required: [true, 'A tour must have a durations']
       },
       maxGroupSize: { 
        type: Number,
        required: [true, 'A tour must have a max group size'],
        // select : false,  không cho tịm kiếm trường này
       },
       difficulty: {
        type: String,
        required: [true, 'A tour must have a difficulty']
       },
       descriptions: {
        type: String,
        trim: true,
       },
       imageCover: {
        type: String,
        required: [true, 'A  tour must  have a cover image']
       },
       image: [String],
       createdAt:
       {
        type: Date,
        default: Date.now(),
       },
       startDates: [Date],

    }
  );
  const Tour = mongoose.model('Tour', tourSchema);
  
module.exports = Tour;