let imagesData = [];
// let ageOptions = [];
// let colorOptions = [];
// let originOptions = [];
// let genderOptions = [];
// let hobbyOptions = [];
// let incomeOptions = [];

$(document).ready(go);

function go() {

  $("#filteringButton").click(showFilters);
  $("#submitFilters").click(getSelectedFilters);
  

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
      //  console.log(response);
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
  imagesData=response;
  console.log(response);
  console.log(imagesData);

    for (let i=0; i<response.length; i++){
        let div = $("<div>").attr("class", "libraryIndividualContainer").appendTo("#libraryContainer");
        let portrait = $("<img>").attr("src", response[i].imgSrc).appendTo(div);
    }
}

function getFilterOptions(response){
  let ageOptions = [];
  let colorOptions = [];
  let originOptions = [];
  let genderOptions = [];
  let hobbyOptions = [];
  let incomeOptions = [];

  response.forEach(function getDiffOptions(item,index) {
  /***************************** Get Age Options ******************************/
    let ageOptionsIndex = 0;
    let sameAgeOption = "false";
    // Check if the age is already in the ageOptions array
    while(sameAgeOption == "false" && ageOptionsIndex <= ageOptions.length) {
      // if it's already in the ageOptions array, set variable as "true"
      if (item.Age == ageOptions[ageOptionsIndex]) {
        sameAgeOption = "true";
      }
        // increase option index
        ageOptionsIndex++;
    }
    // if we have not found a corresponding age...
    if (sameAgeOption == "false") {
          // create a variable for the unique age option and push it in the ageOptions array
          let uniqueAgeOption = item.Age;
          ageOptions.push(uniqueAgeOption);

          // Create and append a checkbox and a label for this unique age option
          let ageColumn = document.getElementById("ageFilter");
          $('<input />', { type: 'checkbox', class: 'ages', value: uniqueAgeOption }).appendTo(ageColumn);
          $('<label />', { text: uniqueAgeOption }).appendTo(ageColumn);
          $("<br>").appendTo(ageColumn);
    }
    
  /***************************** Get Color Options ******************************/
    let colorOptionsIndex = 0;
    let sameColorOption = "false";
    // Check if the color is already in the colorOptions array
    while(sameColorOption == "false" && colorOptionsIndex <= colorOptions.length) {
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

      // Create and append a checkbox and a label for this unique color option
      let colorColumn = document.getElementById("colorFilter");
      $('<input />', { type: 'checkbox', class: 'colors', value: uniqueColorOption }).appendTo(colorColumn);
      $('<label />', { text: uniqueColorOption }).appendTo(colorColumn);
      $("<br>").appendTo(colorColumn);
    }

  /***************************** Get Origin Options ******************************/
    let originOptionsIndex = 0;
    let sameOriginOption = "false";
    // Check if the origin is already in the originOptions array
    while(sameOriginOption == "false" && originOptionsIndex <= originOptions.length) {
      // if it's already in the originOptions array, set variable as "true"
      if (item.Origin == originOptions[originOptionsIndex]) {
        sameOriginOption = "true";
      }
        // increase option index
        originOptionsIndex++;
    }
    // if we have not found a corresponding origin...
    if (sameOriginOption == "false") {
      // create a variable for the unique origin option and push it in the originOptions array
      let uniqueOriginOption = item.Origin;
      originOptions.push(uniqueOriginOption);

      // Create and append a checkbox and a label for this unique origin option
      let originColumn = document.getElementById("originFilter");
      $('<input />', { type: 'checkbox', class: 'origins', value: uniqueOriginOption }).appendTo(originColumn);
      $('<label />', { text: uniqueOriginOption }).appendTo(originColumn);
      $("<br>").appendTo(originColumn);
    }

  /***************************** Get Gender Options ******************************/
    let genderOptionsIndex = 0;
    let sameGenderOption = "false";
    // Check if the gender is already in the genderOptions array
    while(sameGenderOption == "false" && genderOptionsIndex <= genderOptions.length) {
      // if it's already in the genderOptions array, set variable as "true"
      if (item.Gender == genderOptions[genderOptionsIndex]) {
        sameGenderOption = "true";
      }
        // increase option index
        genderOptionsIndex++;
    }
    // if we have not found a corresponding gender...
    if (sameGenderOption == "false") {
      // create a variable for the unique gender option and push it in the genderOptions array
      let uniqueGenderOption = item.Gender;
      genderOptions.push(uniqueGenderOption);

      // Create and append a checkbox and a label for this unique gender option
      let genderColumn = document.getElementById("genderFilter");
      $('<input />', { type: 'checkbox', class: 'genders', value: uniqueGenderOption }).appendTo(genderColumn);
      $('<label />', { text: uniqueGenderOption }).appendTo(genderColumn);
      $("<br>").appendTo(genderColumn);
    }

  /***************************** Get Hobby Options ******************************/
    let hobbyOptionsIndex = 0;
    let sameHobbyOption = "false";
    // Check if the hobby is already in the hobbyOptions array
    while(sameHobbyOption == "false" && hobbyOptionsIndex <= hobbyOptions.length) {
      // if it's already in the hobbyOptions array, set variable as "true"
      if (item.Hobby == hobbyOptions[hobbyOptionsIndex]) {
        sameHobbyOption = "true";
      }
        // increase option index
        hobbyOptionsIndex++;
    }
    // if we have not found a corresponding hobby...
    if (sameHobbyOption == "false") {
      // create a variable for the unique hobby option and push it in the hobbyOptions array
      let uniqueHobbyOption = item.Hobby;
      hobbyOptions.push(uniqueHobbyOption);

      // Create and append a checkbox and a label for this unique hobby option
      let hobbyColumn = document.getElementById("hobbyFilter");
      $('<input />', { type: 'checkbox', class: 'hobbies', value: uniqueHobbyOption }).appendTo(hobbyColumn);
      $('<label />', { text: uniqueHobbyOption }).appendTo(hobbyColumn);
      $("<br>").appendTo(hobbyColumn);
    }

  /***************************** Get Income Options ******************************/
    let incomeOptionsIndex = 0;
    let sameIncomeOption = "false";
    // Check if the income is already in the incomeOptions array
    while(sameIncomeOption == "false" && incomeOptionsIndex <= incomeOptions.length) {
      // if it's already in the incomeOptions array, set variable as "true"
      if (item.Income == incomeOptions[incomeOptionsIndex]) {
        sameIncomeOption = "true";
      }
        // increase option index
        incomeOptionsIndex++;
    }
    // if we have not found a corresponding income...
    if (sameIncomeOption == "false") {
      // create a variable for the unique income option and push it in the incomeOptions array
      let uniqueIncomeOption = item.Income;
      incomeOptions.push(uniqueIncomeOption);

      // Create and append a checkbox and a label for this unique income option
      let incomeColumn = document.getElementById("incomeFilter");
      $('<input />', { type: 'checkbox', class: 'incomes', value: uniqueIncomeOption }).appendTo(incomeColumn);
      $('<label />', { text: uniqueIncomeOption }).appendTo(incomeColumn);
      $("<br>").appendTo(incomeColumn);
    }
    
  });
  console.log(ageOptions);
  console.log(colorOptions);
  console.log(originOptions);
  console.log(genderOptions);
  console.log(hobbyOptions);
  console.log(incomeOptions);
}




function getSelectedFilters(){
/***************************** Get Selected Age Filters ******************************/
  // Array with the ages selected by the user
  let selectedAges = []; 
  // Array with all age checkbox elements
  let agesCheckboxes = document.getElementsByClassName('ages');
  // for every age checkbox, look if it is checked and if so, add its value to the selectedAges array
  for(var i=0; i < agesCheckboxes.length; ++i){
    if(agesCheckboxes[i].checked){
      selectedAges.push(agesCheckboxes[i].value);
    }
  }
  console.log(selectedAges);

/***************************** Get Selected Skin Color Filters ******************************/
  // Array with the colors selected by the user
  let selectedColors = []; 
  // Array with all color checkbox elements
  let colorsCheckboxes = document.getElementsByClassName('colors');
  // for every color checkbox, look if it is checked and if so, add its value to the selectedColors array
  for(var i=0; i < colorsCheckboxes.length; ++i){
    if(colorsCheckboxes[i].checked){
      selectedColors.push(colorsCheckboxes[i].value);
    }
  }
  console.log(selectedColors);

/***************************** Get Selected Origin Filters ******************************/
  // Array with the origins selected by the user
  let selectedOrigins = []; 
  // Array with all origin checkbox elements
  let originsCheckboxes = document.getElementsByClassName('origins');
  // for every origin checkbox, look if it is checked and if so, add its value to the selectedOrigins array
  for(var i=0; i < originsCheckboxes.length; ++i){
    if(originsCheckboxes[i].checked){
      selectedOrigins.push(originsCheckboxes[i].value);
    }
  }
  console.log(selectedOrigins);

/***************************** Get Selected Gender Filters ******************************/
  // Array with the genders selected by the user
  let selectedGenders = []; 
  // Array with all gender checkbox elements
  let gendersCheckboxes = document.getElementsByClassName('genders');
  // for every gender checkbox, look if it is checked and if so, add its value to the selectedGenders array
  for(var i=0; i < gendersCheckboxes.length; ++i){
    if(gendersCheckboxes[i].checked){
      selectedGenders.push(gendersCheckboxes[i].value);
    }
  }
  console.log(selectedGenders);

/***************************** Get Selected Hobby Filters ******************************/
  // Array with the hobbies selected by the user
  let selectedHobbies = []; 
  // Array with all hobby checkbox elements
  let hobbiesCheckboxes = document.getElementsByClassName('hobbies');
  // for every hobby checkbox, look if it is checked and if so, add its value to the selectedHobbies array
  for(var i=0; i < hobbiesCheckboxes.length; ++i){
    if(hobbiesCheckboxes[i].checked){
      selectedHobbies.push(hobbiesCheckboxes[i].value);
    }
  }
  console.log(selectedHobbies);

/***************************** Get Selected Income Filters ******************************/
  // Array with the incomes selected by the user
  let selectedIncomes = []; 
  // Array with all income checkbox elements
  let incomesCheckboxes = document.getElementsByClassName('incomes');
  // for every income checkbox, look if it is checked and if so, add its value to the selectedIncomes array
  for(var i=0; i < incomesCheckboxes.length; ++i){
    if(incomesCheckboxes[i].checked){
      selectedIncomes.push(incomesCheckboxes[i].value);
    }
  }
  console.log(selectedIncomes);
  getFilteredImages(selectedAges, selectedColors, selectedOrigins, selectedGenders, selectedHobbies, selectedIncomes);
// /***************************** Display images with selected filter options ******************************/
//   $("#libraryContainer").empty();
//   let filteredImages = [];
//   // console.log(imagesData[0].Age);
//   for(let imgIndex=0; imgIndex<imagesData.length; imgIndex++) {
//     for(let selectionIndex=0; selectionIndex<selectedAges.length; selectionIndex++){
//       if (selectedAges.length > 0 && imagesData[imgIndex].Age == selectedAges[selectionIndex]){

//       }
//     }
//   }
}


function getFilteredImages (selectedAges, selectedColors, selectedOrigins, selectedGenders, selectedHobbies, selectedIncomes) {
  /***************************** Display images with selected filter options ******************************/
  $("#libraryContainer").empty();
  // console.log(imagesData);

  // let filteredImages = imagesData.filter(function (el) {
  //   // return el.Age == "26";

  //   return el.Age == "26"  || el.Age == "41";
  //   // return el.Age == "26"  && el.Origin == "Canadian";
  //   // && el.Hobby == "skiing"
  // });

  // console.log(filteredImages);

  // assign searchText string to ClientSearch key (JSON format) and store this JSON data in mData variable
  let filterData = {
    ages: selectedAges, 
    colors: selectedColors, 
    origins: selectedOrigins, 
    genders: selectedGenders, 
    hobbies: selectedHobbies, 
    incomes: selectedIncomes
   };

  // /*** request ***/
  // // Note: ajax allows to make a request without reloading the page (asynchronous request)
  $.ajax({
    type: "POST",
    data: JSON.stringify(filterData),
    url: "/getFilteredImages",
    processData: false,
    contentType: "application/json",
    cache: false,
    timeout: 600000,
    success: function (response) {
      console.log(response);
    },
    error: function (e) {
      console.log(e);
      console.log("error occurred");
    },
  });
}