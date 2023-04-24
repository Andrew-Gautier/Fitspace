var max = 7;                         // maximum number of activities
var activities = new Array(max);     // initialize the arrays
var durations = new Array(max);
var index = 0;                       // current index
var next = 0;                        // next item
var current = 0;                     // current item

function setNext(activity, duration) {
  if (index >= max) index = 0;
  activities[index] = activity;
  durations[index] = duration;

  console.log(activities[index]);
  console.log(durations[index]);

  index++;
}

function getNextActivity() {
  if (next >= max) next = 0;
  console.log("getNextActivity " + activities[next] + " " + next);
  current = next;
  next++;

  return activities[current]
}

function getNextDuration() {
  console.log("getNextDuration " + durations[current] + " " + current);
  return durations[current];
}

window.onload = function () {
  var chart = new CanvasJS.Chart("chartContainer", "chartOptios");
}

function setChartOptions() {
  var CanvasJS = require('canvasjs');
  var chart = new CanvasJS.Chart("chartContainer", {
    title: {
      text: "Past 7 Workouts"
    },
    animationEnabled: true,
    axisY: {
      includeZero: true,
      suffix: "mins"
    },
    data: [{
      type: "bar",
      indexLabel: "{y}",
      yValueFormatString: "#,###mins",
      dataPoints: [
        { label: getNextActivity(), y: getNextDuration() },
        { label: getNextActivity(), y: getNextDuration() },
        { label: getNextActivity(), y: getNextDuration() },
        { label: getNextActivity(), y: getNextDuration() },
        { label: getNextActivity(), y: getNextDuration() },
        { label: getNextActivity(), y: getNextDuration() },
        { label: getNextActivity(), y: getNextDuration() }
      ]
    }]
  });
  chart.render();

  console.log(chartOptions);
}

function logActivity() {

  var theActivity = activity.value;
  var theDuration = (document.slider.duration.value);
  var theMessage = (document.getElementById("logMessage"));

  theMessage.innerHTML = "";   // Clear message

  console.log(theActivity);
  console.log(theDuration);

  setNext(theActivity, theDuration);

  theMessage.innerHTML = "Activity '" + theActivity + "' for " + theDuration + " minutes has been logged.";
}

function calculateBMI() {
  //const heightUnit = document.getElementById("height-unit").value;
  //const weightUnit = document.getElementById("weight-unit").value;

  let textColor = "green";
  let remark = "Normal";

  var theWeight = (document.weightbar.weight.value);
  theWeight /= 2.205;                                  //  Pounds to kilograms
  var theHeight = (document.heightbar.height.value);
  theHeight /= 39.37;                                  // Inches to meters
  var theBMI = (theWeight) / Math.pow(theHeight, 2);   // weight / (height * height)
  var theRoundedBMI = theBMI.toFixed(1);

  console.log('Weight: ' + theWeight + " kg");
  console.log('Height: ' + theHeight + " m");
  console.log('BMI: ' + theBMI);

  var bmiValue = document.getElementById("bmiValue");

  if (theBMI < 18.5) {
    remark = "Underweight";
    textColor = "red";
  } else if (theBMI >= 18.5 && theBMI <= 24.9) {
    remark = "Normal";
    textColor = "green";
  } else if (theBMI >= 25 && theBMI <= 29.9) {
    remark = "Overweight";
    textColor = "orange";
  } else if (theBMI >= 30 && theBMI <= 34.9) {
    remark = "Obese";
    textColor = "red";
  }

  bmiValue.innerHTML = " Your BMI: " + theRoundedBMI + " (" + remark + ")"
  bmiValue.style.color = textColor;
}