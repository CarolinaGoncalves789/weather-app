let todayDate = new Date();
let day = todayDate.getDate();
let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let weekday = weekdays[todayDate.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "Septembre",
  "October",
  "November",
  "December",
];
let month = months[todayDate.getMonth()];
let year = todayDate.getFullYear();
let hour = todayDate.getHours();
let minutes = todayDate.getMinutes();

let shownDate = document.querySelector("#today");
shownDate.innerHTML = `${weekday}, ${day} ${month}, ${year}`;

let shownTime = document.querySelector("#time");
shownTime.innerHTML = `${hour}h${minutes}`;

function showCity(event) {
  event.preventDefault();
  let showCityInput = document.querySelector("#search-form-input");
  let currentCity = document.querySelector("#current-city");
  if (showCityInput.value) {
    currentCity.innerHTML = `Weather in ${showCityInput.value}:️`;
  } else {
    alert(`Please type a city.`);
  }
  let apiKey = "06443709fb4fa0784a47c70f5cd80b08";
  let cityName = `${showCityInput.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric`;

  function showTemperature(response) {
    console.log(response);
    temp.innerHTML = Math.round(response.data.main.temp);
    realFeel.innerHTML = Math.round(response.data.main.feels_like);
    function changeCelsius() {
      temp.innerHTML = Math.round(response.data.main.temp);
    }
    function changeFarh() {
      temp.innerHTML = (Math.round(response.data.main.temp) * 9) / 5 + 32;
    }

    let fahr = document.querySelector("#temp-f");
    let cel = document.querySelector("#temp-c");
    cel.addEventListener("click", changeCelsius);
    fahr.addEventListener("click", changeFarh);
  }
  let temp = document.querySelector("#current-temp");
  let realFeel = document.querySelector("#real-feel");
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showCity);

function showPosition(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  console.log(latitude);
  let longitude = position.coords.longitude;

  let apiKey = "06443709fb4fa0784a47c70f5cd80b08";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`;

  function showTemperature(response) {
    console.log(response);
    currentRealFeel.innerHTML = Math.round(response.data.main.feels_like);
    currentTemp.innerHTML = Math.round(response.data.main.temp);
    currentCityNow.innerHTML = `Weather in ${response.data.name}`;
    function changeCelsius() {
      currentTemp.innerHTML = Math.round(response.data.main.temp);
    }
    function changeFarh() {
      currentTemp.innerHTML =
        (Math.round(response.data.main.temp) * 9) / 5 + 32;
    }
    let fahr = document.querySelector("#temp-f");
    let cel = document.querySelector("#temp-c");
    cel.addEventListener("click", changeCelsius);
    fahr.addEventListener("click", changeFarh);
  }
  let currentTemp = document.querySelector("#current-temp");
  let currentRealFeel = document.querySelector("#real-feel");
  let currentCityNow = document.querySelector("#current-city");
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function currentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", currentLocation);
