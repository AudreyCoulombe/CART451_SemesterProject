// Schema and model to tell how data is organised in my database

const mongoose = require('mongoose');

const imageDataSchema = new mongoose.Schema({
    imgSrc:String,
    title:String,
    Username:String,
    Age:String,
    Skin_color:String,
    Origin:String,
    Gender:String,
    Hobby:String,
    Income:String,
    Biases:String,
    BiasesKeywords:Array
});

//const imageDataModel = mongoose.model("Fitbit_collection", imageDataSchema, fitbit_collection);
const imageDataModel = mongoose.model("AlgorithmicPortraits_collectionV2", imageDataSchema, "algorithmicPortraits_collection");
module.exports = imageDataModel;
