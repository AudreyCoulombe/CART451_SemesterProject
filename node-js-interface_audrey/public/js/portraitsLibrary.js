$(document).ready(go);

function go() {

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
     },
     error: function (e) {
       console.log(e);
       console.log("error occurred");
     },
   });
 
}

function displayImages(response){
  console.log(response);
    for (let i=0; i<response.length; i++){
        let div = $("<div>").attr("id", "libraryIndividualContainer").appendTo("#libraryContainer");
        let portrait = $("<img>").attr("src", response[i].imgSrc).appendTo(div);
        // let portrait = $("<img>").attr("src", response[i].imgSrc).appendTo("#libraryContainer");
    }

    // <div id = "libraryIndividualContainer"></div>
}
