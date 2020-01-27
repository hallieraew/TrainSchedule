var firebaseConfig = {
    apiKey: "AIzaSyDr5dJE3A1O4DceBEW4rZ5XAW23mDfFlvQ",
    authDomain: "trainschedule-74e08.firebaseapp.com",
    databaseURL: "https://trainschedule-74e08.firebaseio.com",
    projectId: "trainschedule-74e08",
    storageBucket: "trainschedule-74e08.appspot.com",
    messagingSenderId: "818898742429",
    appId: "1:818898742429:web:0e79befdd0acd9d8b77874",
    measurementId: "G-FENY01BTCK"
  };

  firebase.initializeApp(firebaseConfig);
  
  var database = firebase.database();
  

  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  

    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainStart = moment($("#first-time-input").val().trim(), "hh:mm")
    var trainFreq = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding employee data
    var newTrain = {
      name: trainName,
      destination: trainDest,
      start: trainStart,
      frequency: trainFreq
    };
  
    // Uploads employee data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.start);
    console.log(newTrain.frequency);
  
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-time-input").val("");
    $("#frequency-input").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().start;
    var trainFreq = childSnapshot.val().frequency;
  
    // Train Info
    console.log(trainName);
    console.log(trainDest);
    console.log(trainStart);
    console.log(trainFreq);
  
    // // Prettify the start
    var trainStartClean = moment(trainStart, moment.HTML5_FMT.TIME).format("HH:MM");
  
    // // Calculate the months worked using hardcore math
    // // To calculate the months worked
    // var empMonths = moment().diff(moment(empStart, "X"), "months");
    // console.log(empMonths);
  
    // // Calculate the total billed rate
    // var empBilled = empMonths * empRate;
    // console.log(empBilled);
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDest),
      $("<td>").text(trainStartClean),
      $("<td>").text(""),
      $("<td>").text(""),
      $("<td>").text("")
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
  
  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume Employee start date of January 1, 2015
  // Assume current date is March 1, 2016
  
  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use meets this test case
  