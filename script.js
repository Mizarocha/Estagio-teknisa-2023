function appendToDisplay() {
  document.getElementById("display").value += value;
}

function calculateResult() {
  var display = document.getElementById("display").value;
  var result = eval(display);
  document.getElementById("display").value = result;
}

function clearDisplay() {
  document.getElementById("display").value = "";
}
