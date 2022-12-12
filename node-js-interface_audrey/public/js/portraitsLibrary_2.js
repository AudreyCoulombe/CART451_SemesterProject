"use strict";

let imagesData = [];
// let portrait;

$(document).ready(go);

function go() {

   /*** request ***/
   // Note: ajax allows to make a request without reloading the page (asynchronous request)
   $.ajax({
     type: "GET",
     url: "/getImagesData",
     timeout: 600000,
     success: function (response) {
      let divToAppendTo = document.getElementById("libraryContainer");
      let portrait = new Portraits(divToAppendTo, response);
      
      // imagesData=response;
      portrait.displayImages();
      //  displayImages(response);
      //  processBiasData(response);
      portrait.getFilterOptions();
      $("#filteringButton").click(function(){
        $("#libraryContainer").empty();
        let filteredImgs = portrait.getSelectedFilters();
        let filteredPortraits = new Portraits(divToAppendTo, filteredImgs);
        filteredPortraits.displayImages();
      });
     },
     error: function (e) {
       console.log(e);
       console.log("error occurred");
     },
   });
}