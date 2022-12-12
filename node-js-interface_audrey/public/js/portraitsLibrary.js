let imagesData = [];

$(document).ready(go);

function go() {

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
      //  processBiasData(response);
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
      
        // Create library main container
        let div = $("<div>").attr("class", "libraryIndividualContainer").appendTo("#libraryContainer");

        // report button and tooltip
        let tooltipDiv = $("<div>").attr("class", "tooltip").appendTo(div);
        let reportButton = $('<input />', {type: 'image', src:'./images/reportIcon.png', class:'reportButton'}).appendTo(tooltipDiv);
        let tooltipText = $("<span>Report a visible bias</span>").attr("class", "tooltiptext").appendTo(tooltipDiv);

        let inputFlagDiv = $("<div>", {class: 'flagTooltip', style:"padding-left:5px"}).appendTo(div);
        // reported bias
        for (let j=0; j < processBiasData(response[i]).length; j++) {
          let flagsDiv =$("<div>", {class: 'flagTooltip', style:"padding-left:5px"}).appendTo(div);
          let flagImg = $("<img />", {class: 'flagTooltip', src:"./images/flagIcon.png", style:"width:15px; display: inline;"}).appendTo(flagsDiv);
          let biasText = $(`<span>${processBiasData(response[i])[j]}</span>`).attr("class", "flagTooltiptext").appendTo(flagsDiv);
        }
        
        // report inputs
        let reportDiv = $("<div>").attr("id", "reportDiv").appendTo(div);
        let descriptionLabel = $("<label>Description</label>").appendTo(reportDiv);
        let descriptionTextArea = $('<textarea required/>', {id: 'biasDescription', placeholder:'Describe reported bias'}).appendTo(reportDiv);
        let keywordsLabel = $("<label>Keywords</label>").appendTo(reportDiv);
        let keywordsTextArea = $('<textarea required/>', {id: 'biasKeywords', placeholder:'Enter keywords'}).appendTo(reportDiv);
        let sendReportBtn = $("<button>Send</button>", {type: 'button', id:'submitBias'}).appendTo(reportDiv);
        sendReportBtn.click(function(){
          reportBias(response[i],descriptionTextArea.val(), keywordsTextArea.val(), inputFlagDiv);
          $(reportDiv).css({"display":"none"});
          $(descriptionTextArea).val("");
          $(keywordsTextArea).val("");
        });
        let cancelBtn = $("<button>Cancel</button>", {type: 'button', id:'cancelButton'}).appendTo(reportDiv);
        cancelBtn.click(function(){
          $(reportDiv).css({"display":"none"});
          $(descriptionTextArea).val("");
          $(keywordsTextArea).val("");
        });

        // show/hide reportDiv when reportButton is clicked
        $(reportButton).click(function(){ 
          if ($(reportDiv).css("display")=="block"){
            $(reportDiv).css({"display":"none"});
          }
          else if ($(reportDiv).css("display")=="none"){
            $(reportDiv).css({"display":"block"});
          }
        });

        // image and information
        let portrait = $("<img>").attr("src", response[i].imgSrc).appendTo(div);
        let name = $(`<p>${response[i].Username}</p>`).attr("style", "font-size:20px; text-align:center;").appendTo(div);
        let desciption = $(`<p>${response[i].title}</p>`).appendTo(div);
    }
}

function reportBias(biasedImg, biasDescription, biasKeywords, div){
  let newImgData;
  console.log("in report bias function" + biasedImg.Username);
  // get an array of keywords by splitting it with hashtags and/or comas and/or spaces
  let splittedKeywords = biasKeywords.split(/[#, ]+/);
  console.log(splittedKeywords);
  let biasData = {
    img: biasedImg,
    description: biasDescription,
    keywords: splittedKeywords
  };

  // /*** request ***/
  // // Note: ajax allows to make a request without reloading the page (asynchronous request)
  $.ajax({
    type: "POST",
    data: JSON.stringify(biasData),
    url: "/reportBias",
    processData: false,
    contentType: "application/json",
    cache: false,
    timeout: 600000,
    success: function (response) {
      newImgData = response;
      console.log(response);

    },
    error: function (e) {
      console.log(e);
      console.log("error occurred");
    },
  });

  let flagImg = $("<img />", {class: 'flagTooltip', src:"./images/flagIcon.png", style:"width:15px; display: inline;"}).appendTo(div);
  let biasText = $(`<span>${biasDescription}</span>`).attr("class", "flagTooltiptext").appendTo(div);
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
}

function getSelectedFilters(){
  
  let selectedAge = $("#ageSelect").find("option:selected").text();
  let selectedColor = $("#colorSelect").find("option:selected").text();
  let selectedOrigin = $("#originSelect").find("option:selected").text();
  let selectedGender = $("#genderSelect").find("option:selected").text();
  let selectedHobby = $("#hobbySelect").find("option:selected").text();
  let selectedIncome = $("#incomeSelect").find("option:selected").text();

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


function processBiasData(imgData){
  let imgBias = [];
  if (typeof imgData.Biases != 'undefined') {
    imgBias = imgData.Biases.split((/[;]+/));
    // console.log(imgBias);
  }
  return imgBias;
}