// select DOM elements
const hourHand = document.querySelector(".hour");
const minuteHand = document.querySelector(".minute");
const secondHand = document.querySelector(".second");
const digitalClockElement = document.querySelector(".digital-clock");

function setRotation(hand, rotation) {
  hand.style.transform = `rotate(${rotation * 360}deg)`;
}

function updateClock() {
  const currentDate = new Date();
  const second = currentDate.getSeconds();
  const minute = currentDate.getMinutes();
  const hour = currentDate.getHours();
  const secondsRotation = second / 60;
  const minutesRotation = (minute * 60) / 3600;
  const hoursRotation = (minute + (hour % 12) * 60) / 720;
  setRotation(secondHand, secondsRotation);
  setRotation(minuteHand, minutesRotation);
  setRotation(hourHand, hoursRotation);
  digitalClockElement.innerHTML = digitalClock(hour, minute, second);
}

//digital clock
function digitalClock(hour, minute, second) {
  //set AM and PM based on hour
  const dayNight = hour >= 0 && hour <= 11 ? "AM" : "PM";
  //convert hour to 12 hr format
  hour = hour % 12 === 0 ? 12 : hour % 12;
  //add 0 before hour, minute & second if needed
  hour = hour < 10 ? "0" + hour : hour;
  minute = minute < 10 ? "0" + minute : minute;
  second = second < 10 ? "0" + second : second;

  const time = hour + ":" + minute + ":" + second + " " + dayNight;
  return time;
}

//call updateClock function on page load
updateClock();
setInterval(updateClock, 1000);