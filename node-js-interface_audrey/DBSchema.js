// Schema and model to tell how data is organised in my database

const mongoose = require('mongoose');

const imageDataSchema = new mongoose.Schema({
    imgSrc:String,
    title:String,
    downloadedFilename:String,
    // path:String
});

//const imageDataModel = mongoose.model("Fitbit_collection", imageDataSchema, fitbit_collection);
const imageDataModel = mongoose.model("AlgorithmicPortraits_collection", imageDataSchema, "algorithmicPortraits_collection");
module.exports = imageDataModel;
