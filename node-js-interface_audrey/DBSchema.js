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
    Biases:Array,
    BiasesKeywords:Array
});

//const imageDataModel = mongoose.model("Fitbit_collection", imageDataSchema, fitbit_collection);
const imageDataModel = mongoose.model("AlgorithmicPortraits_collectionV3", imageDataSchema, "algorithmicPortraits_collectionV3");
module.exports = imageDataModel;
