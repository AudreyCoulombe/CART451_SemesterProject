var dalleImage;

$(document).ready(go);

function go() {
  console.log("we are ready to go");

  // Find the ID of the button
  let num = 1;
  let divID = "#question1";
  let numberOfQuestions = 4;
  let answer = new Array();

  // When client clicks on button with "button1" id, run the "nexQuestion" function (which will add event listeners to all "next" buttons)
  $("#button1").click(nextQuestion);
  // When client clicks on button with "getRes" id, run the "getDalle" function
  $("#getRes").click(getDalle);

  //
  function nextQuestion() {
    // Store actual answer in an array
    answer[num - 1] =
      document.getElementsByClassName("textInput")[num - 1].value;
    console.log(answer);

    // Stop displaying actual question
    $(divID).css("display", "none");
    // Increase the question id #
    let divPrefix = "#question";
    num++;
    let idNumber = num.toString(); // convert int to string
    divID = divPrefix.concat(idNumber); // join the prefix and number strings
    // Display the div with the new id #
    $(divID).css("display", "block");

    if (num <= numberOfQuestions) {
      // Increase button ID #
      let buttonPrefix = "#button";
      let buttonID = buttonPrefix.concat(idNumber); // join the prefix and number strings
      console.log(buttonID);
      // Add an event listener to the updated button
      $(buttonID).click(nextQuestion);
    } else {
      $("#getResDiv").css("display", "block");
    }
  }

  function getDalle() {
    // Store the text input in "searchText" variable
    // let searchText = document.getElementById("textSearch").value;
    // console.log(searchText);

    let name = answer[0];
    let gender = answer[1];
    let generation = answer[2];
    let hobby = answer[3];

    let searchText = "The portrait of a " + gender + " " + generation + " doing " + hobby;
    console.log(searchText);

    $("#getResDiv").css("display", "none");
    $(".resDalle").css("display", "block");

    // assign searchText string to ClientSearch key (JSON format) and store this JSON data in mData variable
    let mData = { clientSearch: searchText };

    /*** request ***/
    // Note: ajax allows to make a request without reloading the page (asynchronous request)
    $.ajax({
      type: "POST",
      data: JSON.stringify(mData),
      url: "/getDalleRequest",
      processData: false,
      contentType: "application/json",
      cache: false,
      timeout: 600000,
      success: function (response) {
        //reponse is a STRING
        // console.log(response);
        parseResponse(response);
        // loadButtons(response);
      },
      error: function (e) {
        console.log(e);
        console.log("error occurred");
      },
    });
  }
}

// display image
function parseResponse(response) {
  $("#resultsContainer").empty();
  let portrait = $("<img>")
    .attr("src", response[0].imgSrc)
    .appendTo("#resultsContainer");

  // Add button to take quiz again
  let lineBreak = $("<br>").appendTo("#resultsContainer");
  let $retry = $('<input type="button" value="Take quiz again" />');
  $retry.appendTo("#resultsContainer");
  $retry.click(function () {
    window.location.href = "quiz.html";
  });
  // Add button to view portraits library
  let $libraryButton = $(
    '<input type="button" value="Go to portraits library" />'
  );
  $libraryButton.appendTo("#resultsContainer");
  $libraryButton.click(function () {
    window.location.href = "portraitsLibrary.html";
  });
  
}

// function loadButtons(response){
//     // Add button to take quiz again
//     let $retry = $('<input type="button" value="Take quiz again" />');
//     $retry.appendTo("#resultsContainer");
//     $retry.click(function(){
//       window.location.href = 'quiz.html';
//     });
//     // Add button to view portraits library
//     let $libraryButton = $('<input type="button" value="Go to portraits library" />');
//     $libraryButton.appendTo("#resultsContainer");
//     $libraryButton.click(function(){
//       window.location.href = 'portraitsLibrary.html';
//     });
// }
