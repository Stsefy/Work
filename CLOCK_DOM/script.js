"use strict";
var bigCircleOffset = { x: 0, y: 0 };
var bigCircleCenter = { x: 0, y: 0 };

function buttonClick() {
  var inputValue = document.getElementById("input").value;

  if (
    isNaN(inputValue) ||
    inputValue === "" ||
    inputValue < 200 ||
    inputValue > 800
  ) {
    alert("Пожалуйста, введите число от 200 до 800.");
    return;
  }

  inputValue = parseFloat(inputValue);

  // Удаляем все элементы со страницы
  removeAllElements();

  // Создаем новый круг с диаметром, равным введенному числу
  createCircleElement(inputValue);
  createSmallCircles(inputValue);
  createHourHandElement(inputValue);
  createMinuteHandElement(inputValue);
  createSecondHandElement(inputValue);
  startClock();
}

function removeAllElements() {
  var body = document.querySelector("body");
  while (body.firstChild) {
    body.removeChild(body.firstChild);
  }
}

function createCircleElement(diameter) {
  var circle = document.createElement("div");
  circle.classList.add("circle");
  circle.style.width = diameter + "px";
  circle.style.height = diameter + "px";
  circle.style.left = "50%";
  circle.style.top = "50%";
  circle.style.transform = "translate(-50%, -50%)";
  document.body.appendChild(circle);

  bigCircleOffset.x = circle.offsetLeft;
  bigCircleOffset.y = circle.offsetTop;

  bigCircleCenter.x = circle.offsetLeft + diameter / 2;
  bigCircleCenter.y = circle.offsetTop + diameter / 2;
}

function createSmallCircles(diameter) {
  var bigCircleDiameter = diameter;
  var smallCircleDiameter = bigCircleDiameter * 0.15; // 10% of the big circle diameter
  var radius = bigCircleDiameter / 2 - smallCircleDiameter / 1.5;

  for (var i = 0; i < 12; i++) {
    const angle = ((2 * Math.PI) / 12) * i;
    var x = bigCircleCenter.x + radius * Math.sin(angle);
    var y = bigCircleCenter.y - radius * Math.cos(angle);

    var smallCircle = document.createElement("div");
    smallCircle.classList.add("small-circle");
    smallCircle.style.width = smallCircleDiameter + "px";
    smallCircle.style.height = smallCircleDiameter + "px";
    smallCircle.style.left = x + "px";
    smallCircle.style.top = y + "px";
    smallCircle.style.transform = "translate(-50%, -50%)";

    // Создаем элемент с цифрой часа
    var hourText = document.createElement("div");
    hourText.classList.add("hour-text");
    hourText.textContent = i === 0 ? 12 : i;
    hourText.style.fontSize = smallCircleDiameter * 0.5 + "px";
    hourText.style.position = "absolute";
    hourText.style.left = "50%";
    hourText.style.top = "50%";
    hourText.style.transform = "translate(-50%, -50%)";
    smallCircle.appendChild(hourText);

    document.body.appendChild(smallCircle);
  }
}
function createHourHandElement(diameter) {
  var hourHand = document.createElement("div");
  hourHand.classList.add("hour-hand");
  hourHand.style.width = diameter * 0.04 + "px"; // 10% of the big circle diameter
  hourHand.style.height = diameter * 0.3 + "px"; // 40% of the big circle diameter
  hourHand.style.left = bigCircleOffset.x + "px";
  hourHand.style.top = bigCircleCenter.y + "px";
  hourHand.style.transformOrigin = "5px bottom";
  hourHand.style.transform = "translate(-50%, 0) rotate(0deg)";
  document.body.appendChild(hourHand);
}

function createMinuteHandElement(diameter) {
  var minuteHand = document.createElement("div");
  minuteHand.classList.add("minute-hand");
  minuteHand.style.width = diameter * 0.02 + "px"; // 8% of the big circle diameter
  minuteHand.style.height = diameter * 0.4 + "px"; // 50% of the big circle diameter
  minuteHand.style.left = bigCircleOffset.x + "px";
  minuteHand.style.top = bigCircleCenter.y + "px";
  minuteHand.style.transformOrigin = " 5px bottom";
  minuteHand.style.transform = "translate(-50%, 0) rotate(0deg)";
  document.body.appendChild(minuteHand);
}

function createSecondHandElement(diameter) {
  var secondHand = document.createElement("div");
  secondHand.classList.add("second-hand");
  secondHand.style.width = diameter * 0.007 + "px"; // 5% of the big circle diameter
  secondHand.style.height = diameter * 0.4 + "px"; // 60% of the big circle diameter
  secondHand.style.left = bigCircleOffset.x + "px";
  secondHand.style.top = bigCircleCenter.y + "px";
  secondHand.style.transformOrigin = "5px bottom";
  secondHand.style.transform = "translate(-50%, 0) rotate(0deg)";
  document.body.appendChild(secondHand);
}

function updateClockHands() {
  var currentTime = new Date();
  var currentHours = currentTime.getHours();
  var currentMinutes = currentTime.getMinutes();
  var currentSeconds = currentTime.getSeconds();

  var hourHandAngle = (currentHours % 12) * 30 + (currentMinutes / 60) * 30;
  var minuteHandAngle = currentMinutes * 6;
  var secondHandAngle = currentSeconds * 6;

  var hourHand = document.querySelector(".hour-hand");
  var minuteHand = document.querySelector(".minute-hand");
  var secondHand = document.querySelector(".second-hand");

  hourHand.style.transform = `translate(-50%, 0) rotate(${hourHandAngle}deg)`;
  minuteHand.style.transform = `translate(-50%, 0) rotate(${minuteHandAngle}deg)`;
  secondHand.style.transform = `translate(-50%, 0) rotate(${secondHandAngle}deg)`;
}
updateClockHands();
function startClock() {
  setInterval(updateClockHands, 1000);
}
