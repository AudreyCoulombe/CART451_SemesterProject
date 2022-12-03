// let imagesData;
let ageOptions = [];
let colorOptions = [];
let originOptions = [];
let genderOptions = [];
let hobbyOptions = [];
let incomeOptions = [];

$(document).ready(go);

function go() {

  $("#filteringButton").click(showFilters);

   // assign searchText string to ClientSearch key (JSON format) and store this JSON data in mData variable
  // let imgData = { clientSearch: searchText };

   /*** request ***/
   // Note: ajax allows to make a request without reloading the page (asynchronous request)
   $.ajax({
     type: "GET",
     //data: JSON.stringify(imgData),
     url: "/getImagesData",
     //processData: false,
     //contentType: "application/json",
     //cache: false,
     timeout: 600000,
     success: function (response) {
       //parseResponse(response);
       //console.log(response);
       displayImages(response);
       getFilterOptions(response);
     },
     error: function (e) {
       console.log(e);
       console.log("error occurred");
     },
   });
 
}




function showFilters() {
  // Show/hide the filter box
  if (document.getElementById("filterBox").style.display !== "none") {
    document.getElementById("filterBox").style.display = "none";
  } else {
    document.getElementById("filterBox").style.display = "block";
  }
}


function displayImages(response){
  // imagesData=response;
  console.log(response);

    for (let i=0; i<response.length; i++){
        let div = $("<div>").attr("id", "libraryIndividualContainer").appendTo("#libraryContainer");
        let portrait = $("<img>").attr("src", response[i].imgSrc).appendTo(div);
        // let portrait = $("<img>").attr("src", response[i].imgSrc).appendTo("#libraryContainer");
    }

    // <div id = "libraryIndividualContainer"></div>
}

function getFilterOptions(response){
  ageOptions = [response[0].Age];
  colorOptions = [response[0].Skin_color];
  originOptions = [response[0].Origin];
  genderOptions = [response[0].Gender];
  hobbyOptions = [response[0].Hobby];
  incomeOptions = [response[0].Income];

  response.forEach(function getDiffOptions(item,index) {
    /***************************** Get Age Options ******************************/
    let ageOptionsIndex = 0;
    let sameAgeOption = "false";
    // Check if the age is already in the ageOptions array
    while(sameAgeOption == "false" && ageOptionsIndex < ageOptions.length) {
      // if it's already in the ageOptions array, set variable as "true"
      if (item.Age == ageOptions[ageOptionsIndex]) {
        sameAgeOption = "true";
      }
        // increase option index
        ageOptionsIndex++;
    }
    // if we have not found a corresponding age...
    if (sameAgeOption == "false") {
          // create a new object with the new stem and push it in the frequentStems array
          let uniqueAgeOption = item.Age;
          ageOptions.push(uniqueAgeOption);
        }
    
    /***************************** Get Color Options ******************************/
    let colorOptionsIndex = 0;
    let sameColorOption = "false";
    // Check if the color is already in the colorOptions array
    while(sameColorOption == "false" && colorOptionsIndex < colorOptions.length) {
      // if it's already in the colorOptions array, set variable as "true"
      if (item.Skin_color == colorOptions[colorOptionsIndex]) {
        sameColorOption = "true";
      }
        // increase option index
        colorOptionsIndex++;
    }
    // if we have not found a corresponding color...
    if (sameColorOption == "false") {
      let uniqueColorOption = item.Skin_color;
      colorOptions.push(uniqueColorOption);
    }

    /***************************** Get Origin Options ******************************/
    let originOptionsIndex = 0;
    let sameOriginOption = "false";
    // Check if the origin is already in the originOptions array
    while(sameOriginOption == "false" && originOptionsIndex < originOptions.length) {
      // if it's already in the originOptions array, set variable as "true"
      if (item.Origin == originOptions[originOptionsIndex]) {
        sameOriginOption = "true";
      }
        // increase option index
        originOptionsIndex++;
    }
    // if we have not found a corresponding origin...
    if (sameOriginOption == "false") {
      let uniqueOriginOption = item.Origin;
      originOptions.push(uniqueOriginOption);
    }

    /***************************** Get Gender Options ******************************/
    let genderOptionsIndex = 0;
    let sameGenderOption = "false";
    // Check if the gender is already in the genderOptions array
    while(sameGenderOption == "false" && genderOptionsIndex < genderOptions.length) {
      // if it's already in the genderOptions array, set variable as "true"
      if (item.Gender == genderOptions[genderOptionsIndex]) {
        sameGenderOption = "true";
      }
        // increase option index
        genderOptionsIndex++;
    }
    // if we have not found a corresponding gender...
    if (sameGenderOption == "false") {
      let uniqueGenderOption = item.Gender;
      genderOptions.push(uniqueGenderOption);
    }

    /***************************** Get Hobby Options ******************************/
    let hobbyOptionsIndex = 0;
    let sameHobbyOption = "false";
    // Check if the hobby is already in the hobbyOptions array
    while(sameHobbyOption == "false" && hobbyOptionsIndex < hobbyOptions.length) {
      // if it's already in the hobbyOptions array, set variable as "true"
      if (item.Hobby == hobbyOptions[hobbyOptionsIndex]) {
        sameHobbyOption = "true";
      }
        // increase option index
        hobbyOptionsIndex++;
    }
    // if we have not found a corresponding hobby...
    if (sameHobbyOption == "false") {
      let uniqueHobbyOption = item.Hobby;
      hobbyOptions.push(uniqueHobbyOption);
    }

    /***************************** Get Income Options ******************************/
    let incomeOptionsIndex = 0;
    let sameIncomeOption = "false";
    // Check if the income is already in the incomeOptions array
    while(sameIncomeOption == "false" && incomeOptionsIndex < incomeOptions.length) {
      // if it's already in the incomeOptions array, set variable as "true"
      if (item.Income == incomeOptions[incomeOptionsIndex]) {
        sameIncomeOption = "true";
      }
        // increase option index
        incomeOptionsIndex++;
    }
    // if we have not found a corresponding income...
    if (sameIncomeOption == "false") {
      let uniqueIncomeOption = item.Income;
      incomeOptions.push(uniqueIncomeOption);
    }
    
  });
  console.log(ageOptions);
  console.log(colorOptions);
  console.log(originOptions);
  console.log(genderOptions);
  console.log(hobbyOptions);
  console.log(incomeOptions);
}