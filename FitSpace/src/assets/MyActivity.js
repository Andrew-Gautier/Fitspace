function calculateBMI() {
  var form = document.getElementById("form");
  var age = document.getElementById("age");
  var heightft = document.getElementById("heightft");
  var heightin = document.getElementById("heightin");
  var weight = document.getElementById("weight");
  var walking = document.getElementById("walking");
  var cardio = document.getElementById("cardio");
  var male = document.getElementById("m");
  var female = document.getElementById("f");
  var gender = "";

  console.log('Age: ' + age.value);
  console.log('Height (feet): ' + heightft.value);
  console.log('Height (+inches): ' + heightin.value);
  console.log('Weight: ' + weight.value);
  console.log('Walking: ' + walking.value);
  console.log('Cardio: ' + cardio.value);
  console.log('Male: ' + male.checked);
  console.log('Female: ' + female.checked);

  if (age.value != '' && isNaN(age.value)) {
    alert("Age must be numeric");
  }

  if (heightft.value == '' || weight.value == '') {
    alert("Height and Weight values are required");
  }

  if (isNaN(heightft.value)) {
    alert("Height must be numeric");
  }

  if (heightft.value > 9) {
    alert("Height value must be less than 9 feet");
  }
  var height = parseInt(heightft.value) * 12;  // Convert height to inches

  if (heightin.value != '') {
    if (isNaN(heightin.value)) {
      alert("Height (inches) value must be numeric");
    } else {
      if (heightin.value > 11) {
        alert("Height (inches) value must be less than 12");
      }
      height += parseInt(heightin.value);      // Add any addional inches to height
    }
  }

  if (isNaN(weight.value)) {
    alert("Weight must be numeric");
  }

  if (male.checked) {
    gender = "male";
  } else if (female.checked) {
    gender = "female"
  }
  console.log("gender: " + gender);

  if (walking.value != '' && isNaN(walking.value)) {
    alert("Walking value must be numeric");
  }

  if (cardio.value != '' && isNaN(cardio.value)) {
    alert("Cardiovascular activity value must be numeric");
  }

  let textColor = "green";
  let remark = "Normal";

  var theWeight = parseInt(weight.value);
  theWeight /= 2.205;                                  //  Pounds to kilograms

  var theHeight = height;
  theHeight /= 39.37;                                  // Inches to meters
  var theBMI = (theWeight) / Math.pow(theHeight, 2);   // weight / (height * height)
  var theRoundedBMI = theBMI.toFixed(1);

  console.log('Weight: ' + theWeight + " kg");
  console.log('Height: ' + theHeight + " m");
  console.log("Height (inches): " + height);
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
  } else if (theBMI >= 30) {
    remark = "Obese";
    textColor = "red";
  }

  bmiValue.innerHTML = " Your BMI: " + theRoundedBMI + " (" + remark + ")";
  bmiValue.style.color = textColor;

  var bmr = parseInt(10 * theWeight + 6.25 * theHeight - 5 * parseInt(age.value)) + (gender === "male" ? 5 : -161);
  bmr = bmr * 1.2;
  bmr += parseInt(walking.value) * 60 * (.03 * parseInt(weight.value) * 1 / 0.45) / 7;
  bmr += parseInt(cardio.value) * 60 * (.07 * parseInt(weight.value) * 1 / 0.45) / 7;
  bmr = Math.floor(bmr);

  var targetGainWeight = Math.round((bmr + 300) / 100) * 100;
  var targetMaintainWeight = Math.round((bmr) / 100) * 100;
  var targetLoseWeight = Math.round((bmr - 500) / 100) * 100;

  var gainValue = document.getElementById("gainValue");
  var maintainValue = document.getElementById("maintainValue");
  var loseValue = document.getElementById("loseValue");

  if (isNaN(targetGainWeight)) {
    gainValue.innerHTML = "";
  } else {
    gainValue.innerHTML = "Daily calories required to GAIN weight: " + targetGainWeight;
  }

  if (isNaN(targetMaintainWeight)) {
    maintainValue.innerHTML = "";
  } else {
    maintainValue.innerHTML = "Daily calories required to MAINTAIN current weight: " + targetMaintainWeight;
  }

  if (isNaN(targetLoseWeight)) {
    loseValue.innerHTML = "";
  } else {
    loseValue.innerHTML = "Daily calories required to LOSE weight: " + targetLoseWeight;
  }

  console.log("Gain: " + targetGainWeight);
  console.log("Lose: " + targetLoseWeight);
  console.log("Maintain: " + targetMaintainWeight);

  form.reset();
}