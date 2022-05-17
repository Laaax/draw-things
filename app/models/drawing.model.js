module.exports = mongoose => {
  const Drawing = mongoose.model(
    "drawing",
    mongoose.Schema(
      {
        title: String,
        description: String,
        author: String,
        ratings:{
          type: mongoose.Mixed, 
          // A mixed type object to handle ratings. Each star level is represented in the ratings object
          1: Number, //  the key is the weight of that star level
          2: Number,
          3: Number,
          4: Number,
          5: Number,
        default: {1:1, 2:1, 3:1, 4:1, 5:1}},
        userRating: [{
          user: String, 
          rating: Number
        }]
      },
      
      { timestamps: true }
    )
  );

  // returns certain fields
  // https://stackoverflow.com/questions/9548186/mongoose-use-of-select-method

  return Drawing;
};