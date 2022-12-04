// new! file system for storing image 
let fs = require("fs");

//DALLE
let isValidURL = require("./utils.js");
let backendAPI = require("./backend_api.js");

//import the Express library
let express = require("express");
const portNumber = 4200;
let app = express(); //make an insatnce of express

let httpServer = require("http").createServer(app); // create a server (using the Express framework object)

// For mongoose:
  require("dotenv").config(); // additional module used to create environment variables for the server in the invisible .env file
  const mongoose = require("mongoose");

let bodyParser = require("body-parser");
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// For mongoose: 
    // get url from .env file
    const url = process.env.MONGODB_URI;
    // access data model (DBSchema.js)
    const imageModel = require("./DBSchema.js");

    // connect to database
    mongoose.connect(url);
    let db = mongoose.connection;
    let dbImages;
    db.once("open", async function () {
      console.log("connecting to DB");
      imageModel.find({}).then((result)=>{
        dbImages = result;
      });
      app.post("/getFilteredImages", getFilteredImages);
    });

//default route
app.get("/", function (req, res) {
  res.send("<h1>Hello world</h1>");
});

// make server listen for incoming messages
httpServer.listen(portNumber, function () {
  console.log("listening on port:: " + portNumber);
});

// serving static files (files that aren't server-generated - files from the public directory) (i.e. css,js,html...)
let static = require("node-static"); // require static node module
const { response } = require("express");
app.use(express.static(__dirname + "/public")); // to set the public directory as visible/usable by client (static)

//make a route to /quiz page...
// when a get request is made from the quiz.html page...
app.get("/quiz", function (req, res) {
  // callback function that listens to the incoming request object (req = url requested by client) and respond accordingly using  response object ()
  // req & res = built in with Express framework
  // send the response object to quiz.html page
  res.sendFile(__dirname + "/public/quiz.html");
});

// When a post request is made from the /getDalleRequest url (mentionend in ajax function [post request] in main.js), run the handlePost fct
app.post("/getDalleRequest", handlePost); // handlePost = custom callback function with built in req & res arguments

// callback function when a post reques is made with getDalleRequest url (has express built in req and res arguments)
function handlePost(request, response) {

  // Note: request is the url requested by client (/getDalleRequest)
  // assign a variable to prompt text for Dall-e
  let promptText = request.body.clientSearch;
  let name = request.body.Username;
  let age = request.body.Age;
  let color = request.body.Skin_color;
  let origin = request.body.Origin;
  let gender = request.body.Gender;
  let hobby = request.body.Hobby;
  let income = request.body.Income;
  
  console.log(name);
  console.log(promptText);

  // ****************************************************************************
  // PUT BACKEND URL HERE (go here to renew: https://github.com/saharmor/dalle-playground) 
  let newBackendUrl= "https://any-clicks-keno-exceptional.trycloudflare.com/";
  // ****************************************************************************

  // variable for the number of generated images
  let imagesPerQuery = 1;

  //1: check if the backend url is valid
  if (isValidURL(newBackendUrl)) {
    
    //2: is it avlid backend url for DALL-E (i.e. is backend server running?)
    // Note: "The Promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting value"
    backendAPI.checkIfValidBackend(newBackendUrl).then((isValid) => {
      // if operation is completed as expected / if url is valid...
      if (isValid) {
        console.log("valid url for DALL-E");

        // 3: make a fetch request to Dall-e:)
        backendAPI.callDalleService(newBackendUrl, promptText, imagesPerQuery).then((responseFromDALLe) => {
            // console.log("execution time: " + responseFromDALLe.executionTime);
            
            // array of base64 encoded images (response from dall-e)
            let imagesBackFromDalleArray = responseFromDALLe.serverResponse.generatedImgs;
            // store the image format in a variable (png/jpg/...)
            let generatedImagesFormat = responseFromDALLe.serverResponse.generatedImgsFormat;
            // array for storing image data
            let imageDataArray = [];
            // for every image generated by Dall-e...
            for (let i = 0; i < imagesBackFromDalleArray.length; i++) {
              // push the following image data at the end of the array to send to client...
              // Note: images back from Dall-e are encoded in base64
              // Note: base64 is "a group of binary-to-text encoding schemes that represent binary data in an ASCII string format"
              // ******************* EXAMPLE OF HOW TO USE THIS DATA IN <img> TAG: <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P48/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==" alt="Red dot" />
             
              // use file system (fs) to store image in image folder
              fs.writeFileSync(`public/images/${promptText}.${generatedImagesFormat}`,imagesBackFromDalleArray[i], 'base64', function(err){});
              
              imageDataArray.push(new imageModel ({
                imgSrc:`data:image/${generatedImagesFormat};base64,${imagesBackFromDalleArray[i]}`,
                title: `${promptText}`,
                Username: `${name}`,
                Age: `${age}`,
                Skin_color: `${color}`,
                Origin: `${origin}`,
                Gender: `${gender}`,
                Hobby: `${hobby}`,
                Income: `${income}`
              }));

              console.log(imageDataArray[0]);
              
              // save image data in Mongo database
              imageDataArray[0].save(); // add.then
              // add new image to array with images data from Mongo db (since data was taken once db was open, before the image was generated)
              dbImages.push(imageDataArray[0]);
            }
            // Send the array of images data 
            response.send(imageDataArray);

            console.log("imageDataArray:"); console.log(imageDataArray);
          });
      } else {
        console.log("not a backendURL");
      }
    });
  }
  //just not a valid url in general...
  //response.send("nothing");
}

app.get("/getImagesData", getImgData);

function getImgData(request, response) {
  response.send(dbImages);
}

function getFilteredImages(request, response){
  
  let Ages = request.body.ages;
  let Colors = request.body.colors;
  let Origins = request.body.origins;
  let Genders = request.body.genders;
  let Hobbies = request.body.hobbies;
  let Incomes = request.body.incomes;
  
  let filteredImages = [];

  for (let i=0; i<Ages.length; i++) {
    imageModel.find({Age: Ages[i]}).then((result)=>{
      // result.find()
      for (let j=0; j<result.length; j++) {
        filteredImages.push(result[j]);
        console.log(result[j]);
      }
    }); 
  }
  setTimeout(function(){ //Question: how to know the optimized timeout? (I guess it depends on the number of requested images?)
    let filteredImages = imagesData.filter(function (el) {
      // return el.Age == "26";
  
      return el.Age == "26"  || el.Age == "41";
      // return el.Age == "26"  && el.Origin == "Canadian";
      // && el.Hobby == "skiing"
    });
  },4000);
  // setTimeout(function(){ //Question: how to know the optimized timeout? (I guess it depends on the number of requested images?)
    console.log(filteredImages);
    response.send(filteredImages);
  // },4000);
}




// app.get("/getFilterOptions", getFltrOptions);

// function getFltrOptions(){
//   db
// }
