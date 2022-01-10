const miniHand = document.querySelector(".min-hand");
const hourHand = document.querySelector(".hour-hand");
const hour = document.querySelector(".hours");
const minute = document.querySelector(".minutes");
const second = document.querySelector(".seconds");
const searchInput = document.querySelector(".input-value");
const searchBarInput = document.querySelector(".search-bar");
const addButton = document.querySelector(".add-task-button");
const signInButton = document.querySelector(".sign-in_button");
const primaryColorSet = document.querySelector(".settings input");
const toggleButton = document.querySelector(".weather-todo");
const toggleButtonLarge = document.querySelector(".weather-details");
var completelist = document.getElementById("myDropdown");

toggleButtonLarge.classList.toggle("large");

let weather = {
  apiKey: "4e5e5bc91ba050830ec3e6a084cd31fb",
  fetchWeather: function(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&&units=metric&&appid=${this.apiKey}`)
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  fetchWeatherWithCoordinates: function(lon, lat) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`)
      .then((response) => response.json())
      .then((data) => this.displayWeather(data))
      .catch(() => {
        this?.fetchWeather("johannesburg");
      });
  },
  displayWeather: function(data) {
    const { name } = data;
    const { icon, description } = data?.weather[0];
    const { temp, humidity } = data?.main;
    const { speed } = data?.wind;

    const isRaining = description.split(" ").includes("rain") || description.split(" ").includes("thunderstorm");

    {
      isRaining
        ? document.querySelector(".image-background")?.remove()
        : document.querySelector(".video-background")?.remove();
    }
    {
      !isRaining
        ? (document.querySelector(".img-background").src = `static/images/${getWeatherImg(description)}`)
        : null;
    }
    document.querySelector(".city").innerHTML = `Weather in ${name}`;
    document.querySelector(".weather-icon").src = `https://openweathermap.org/img/wn/${icon}.png`;
    document.querySelector(".temp").innerHTML = `${temp}°C`;
    document.querySelector(".description").innerHTML = description;
    document.querySelector(".humidity").innerHTML = `Humidity: ${humidity}%`;
    document.querySelector(".wind").innerHTML = `Wind-speed: ${speed} km/h`;
    toggleButtonLarge.classList.toggle("large");
  },
  search: function() {
    this.fetchWeather();
    this.fetchWeather();
  },
};

function setDate() {
  const now = new Date();

  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();

  const secondsDegrees = (seconds / 60) * 360 + 90;
  const minutesDegrees = (minutes / 60) * 360 + 90;
  const hoursDregrees = (hours / 12) * 360 + 90;

  document.querySelector(".second-hand").style.transform = `rotate(${secondsDegrees}deg)`;
  miniHand.style.transform = `rotate(${minutesDegrees}deg)`;
  hourHand.style.transform = `rotate(${hoursDregrees}deg)`;
  hour.innerHTML = hours > 9 ? hours : `0${hours}`;
  minute.innerHTML = minutes > 9 ? minutes : `0${minutes}`;
  second.innerHTML = seconds > 9 ? seconds : `0${seconds}`;
}
setInterval(setDate, 1000);
setDate();

let primaryColor = localStorage.getItem("primary-key");

document.documentElement.style.setProperty(`--base-color`, primaryColor);

window.addEventListener("load", (event) => {
  chrome.identity.getProfileUserInfo(function(userInfo) {
    if (userInfo?.email) {
      signInButton.style.display = "none";
    } else {
      addButton.style.display = "none";
    }
  });
  // document.querySelector(".primary-color").value = primaryColor;
});

function addelement(nextLink) {
  const url = nextLink.replaceAll(" ", "+");
  completelist.innerHTML =
    "<div class='found-container'>" +
    `<a class='a-linker' href='https://www.google.com/search?q=${url}'>` +
    `<img class='search-item-image' src='static/images/searchIcon.jpeg' />` +
    `<span class='link-text'>${nextLink.length < 30 ? nextLink : nextLink.substring(0, 30) + "..."}</span>` +
    `</a>`;
  ("</div>");
}

var currentValue = null;

function myFunction() {
  if (currentValue != searchInput?.value) {
    if (searchInput?.value.length > 2) {
      debugger;
      addelement(searchInput?.value);
    } else if (searchInput?.value?.length == 0) {
      completelist.innerHTML = null;
    }
  }

  currentValue = searchInput?.value?.length;
}
const weatherImages = [
  { condition: "clear", img: "palle-knudsen-Bl61MZLv7x0-unsplash.jpg" },
  { condition: "scattered clouds", img: "kelly-sikkema-3pQHR4eOb7A-unsplash.jpg" },
  { condition: "cloudy sky", img: "erik-gazi-ANAa-P_e2lE-unsplash.jpg" },
  { condition: "sunny", img: "jan-gottweiss-hzSkd8BOLfo-unsplash.jpg" },
  { condition: "default", img: "max-zed-z09bo9DxJkw-unsplash.jpg" },
];
function getWeatherImg(weatherCondition) {
  let condition = weatherCondition.split(" ");
  let img = weatherImages.find((cndtn) => {
    return condition.some((item) => cndtn.condition.split(" ").includes(item));
  });
  if (img?.condition) {
    return img.img;
  } else {
    return weatherImages[4]?.img;
  }
}
//demostaration of css variable use
// primaryColorSet.addEventListener("change", () => {
//   localStorage.setItem("primary-key", primaryColorSet.value);
//   document.documentElement.style.setProperty(`--${primaryColorSet.name}`, primaryColorSet.value);
// });

searchInput.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.querySelector(".link-text").click();
  }
});

// toggleButton.addEventListener("click", () => {});
setInterval(myFunction, 500);

document.querySelector(".search-weather-button").addEventListener("click", () => {
  toggleButtonLarge.classList.toggle("large");
  weather?.fetchWeather(searchBarInput?.value);
  searchBarInput.value = null;
});
function getLocation() {
  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position?.coords;
    weather?.fetchWeatherWithCoordinates(longitude, latitude);
  });
}
getLocation();
