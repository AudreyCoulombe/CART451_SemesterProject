let imagesData = [];
// let ageOptions = [];
// let colorOptions = [];
// let originOptions = [];
// let genderOptions = [];
// let hobbyOptions = [];
// let incomeOptions = [];

$(document).ready(go);

function go() {

  // $("#filteringButton").click(showFilters);
  $("#filteringButton").click(getSelectedFilters);

   /*** request ***/
   // Note: ajax allows to make a request without reloading the page (asynchronous request)
   $.ajax({
     type: "GET",
     url: "/getImagesData",
     timeout: 600000,
     success: function (response) {
      imagesData=response;
       displayImages(response);
       getFilterOptions(response);
     },
     error: function (e) {
       console.log(e);
       console.log("error occurred");
     },
   });
 
}

function displayImages(response){
  console.log(response);
  console.log(imagesData);
    for (let i=0; i<response.length; i++){
        let div = $("<div>").attr("class", "libraryIndividualContainer").appendTo("#libraryContainer");

        let tooltipDiv = $("<div>").attr("class", "tooltip").appendTo(div);
        let reportButton = $('<input />', {type: 'image', src:'./images/reportIcon.png', class:'reportButton'}).appendTo(tooltipDiv);
        $(reportButton).click(function(){
            console.log("report button clicked");
        });
        let tooltipText = $("<span>Report a visible bias</span>").attr("class", "tooltiptext").appendTo(tooltipDiv);
        let portrait = $("<img>").attr("src", response[i].imgSrc).appendTo(div);
        let name = $(`<p>${response[i].Username}</p>`).attr("style", "font-size:20px; text-align:center;").appendTo(div);
        let desciption = $(`<p>${response[i].title}</p>`).appendTo(div);
        
        // let reportButton = $('<input />', {type: 'image', src:'./images/flagIcon.png'}).appendTo(div);
        // $(reportButton).click(function(){
        //     console.log("button clicked");
        // });

        // <div class = "libraryIndividualContainer">
        //   <div class="tooltip">
        //     <input type="image" src="./images/reportIcon.png" class="reportButton"/>
        //     <span class="tooltiptext">Report a visible bias</span>
        //   </div>
        //   <img src=".\images\rich black male.jpeg" style="position:relative">
        //   <p style="font-size: 20px; text-align:center">Anna</p>
        //   <p>The portrait of a millenial female eating food</p>
        // </div>

    }


    
    // <input type="image" src="https://www.freepngimg.com/thumb/submit_button/25497-9-submit-button-photos.png" name="submit" width="100" height="48" alt="submit"/>

    
        // $(wordButton).click(function(){
        // // $(`#${possibilityKeys[j]}`).click(function(){
        //   console.log("button clicked");
        //   // wordButton.style.color = "red";
        //   $(this).css("color", "red");
        //   $(this).css("font-size", "x-large");
        //   $(this).css("transform", "translateX(-3%)");
        //   wordPrediction(possibilityKeys[j]);
        // });

    // <div class = "libraryIndividualContainer">
    //   <img src=".\images\rich black male.jpeg">
    //     <p style="font-size: 20px;">Anna</p>
    //   <p>The portrait of a millenial female eating food</p>
    //   <p style="display: inline;">Report a visible bias</p>
    //   <img style="width:30px; display: inline;" src="./images/flagIcon.png">
    // </div>


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

          // Create a new select option for this unique age option
          ageSelect =  document.getElementById('ageSelect');
          ageSelect.options[ageSelect.options.length] = new Option(uniqueAgeOption, uniqueAgeOption);
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

      // Create a new select option for this unique color option
      colorSelect =  document.getElementById('colorSelect');
      colorSelect.options[colorSelect.options.length] = new Option(uniqueColorOption, uniqueColorOption);
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

      // Create a new select option for this unique origin option
      originSelect =  document.getElementById('originSelect');
      originSelect.options[originSelect.options.length] = new Option(uniqueOriginOption, uniqueOriginOption);
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

      // Create a new select option for this unique gender option
      genderSelect =  document.getElementById('genderSelect');
      genderSelect.options[genderSelect.options.length] = new Option(uniqueGenderOption, uniqueGenderOption);
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

      // Create a new select option for this unique hobby option
      hobbySelect =  document.getElementById('hobbySelect');
      hobbySelect.options[hobbySelect.options.length] = new Option(uniqueHobbyOption, uniqueHobbyOption);
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

      // Create a new select option for this unique income option
      incomeSelect =  document.getElementById('incomeSelect');
      incomeSelect.options[incomeSelect.options.length] = new Option(uniqueIncomeOption, uniqueIncomeOption);
    }
    
  });
  // console.log(ageOptions);
  // console.log(colorOptions);
  // console.log(originOptions);
  // console.log(genderOptions);
  // console.log(hobbyOptions);
  // console.log(incomeOptions);
}

function getSelectedFilters(){
  
  let selectedAge = $("#ageSelect").find("option:selected").text();
  let selectedColor = $("#colorSelect").find("option:selected").text();
  let selectedOrigin = $("#originSelect").find("option:selected").text();
  let selectedGender = $("#genderSelect").find("option:selected").text();
  let selectedHobby = $("#hobbySelect").find("option:selected").text();
  let selectedIncome = $("#incomeSelect").find("option:selected").text();

  // let filterData = {
  //   age: selectedAge, 
  //   color: selectedColor, 
  //   origin: selectedOrigin, 
  //   gender: selectedGender, 
  //   hobby: selectedHobby, 
  //   income: selectedIncome
  //  };



  //  let keys = Object.keys(request.body);
  //  let values = Object.values(request.body);
  $("#libraryContainer").empty();
  // console.log(response);
  
  let ageFilteredImages = []; // ageImgs
  let colorFilteredImages = []; // ageColImgs
  let originFilteredImages = []; // ageColOriImgs
  let genderFilteredImages = []; // ageColOriGenImgs
  let hobbyFilteredImages = []; // ageColOriGenHobImgs
  let incomeFilteredImages = []; //filteredImages

  // Create an array of images data with AGE filter applied
  for (let i=0; i < imagesData.length; i++) {
    if (selectedAge != 'Any' && imagesData[i].Age == selectedAge) {
      ageFilteredImages.push(imagesData[i]);
    } 
    else if (selectedAge == 'Any'){
      ageFilteredImages.push(imagesData[i]);
    }
  }
  // Create an array of images data with AGE and COLOR filters applied
  for (let i=0; i < ageFilteredImages.length; i++) {
    if (selectedColor != 'Any' && ageFilteredImages[i].Skin_color == selectedColor) {
      colorFilteredImages.push(ageFilteredImages[i]);
    }
    else if (selectedColor == 'Any'){
      colorFilteredImages.push(ageFilteredImages[i]);
    }
  }
  // Create an array of images data with AGE, COLOR and ORIGIN filters applied
  for (let i=0; i < colorFilteredImages.length; i++) {
    if (selectedOrigin != 'Any' && colorFilteredImages[i].Origin == selectedOrigin) {
      originFilteredImages.push(colorFilteredImages[i]);
    }
    else if (selectedOrigin == 'Any'){
      originFilteredImages.push(colorFilteredImages[i]);
    }
  }
  // Create an array of images data with AGE, COLOR, ORIGIN and GENDER filters applied
  for (let i=0; i < originFilteredImages.length; i++) {
    if (selectedGender != 'Any' && originFilteredImages[i].Gender == selectedGender) {
      genderFilteredImages.push(originFilteredImages[i]);
    }
    else if (selectedGender == 'Any'){
      genderFilteredImages.push(originFilteredImages[i]);
    }
  }
  // Create an array of images data with AGE, COLOR, ORIGIN, GENDER and HOBBY filters applied
  for (let i=0; i < genderFilteredImages.length; i++) {
    if (selectedHobby != 'Any' && genderFilteredImages[i].Hobby == selectedHobby) {
      hobbyFilteredImages.push(genderFilteredImages[i]);
    }
    else if (selectedHobby == 'Any'){
      hobbyFilteredImages.push(genderFilteredImages[i]);
    }
  }
  // Create an array of images data with ALL FILTERS applied (AGE, COLOR, ORIGIN, GENDER, HOBBY and INCOME)
  for (let i=0; i < hobbyFilteredImages.length; i++) {
    if (selectedIncome != 'Any' && hobbyFilteredImages[i].Income == selectedIncome) {
      incomeFilteredImages.push(hobbyFilteredImages[i]);
    }
    else if (selectedIncome == 'Any'){
      incomeFilteredImages.push(hobbyFilteredImages[i]);
    }
  }
  console.log(incomeFilteredImages);
  
  displayImages(incomeFilteredImages);
}