const secondHand = document.querySelector("[name=second-hand]");
const miniHand = document.querySelector(".min-hand");
const hourHand = document.querySelector(".hour-hand");
const hour = document.querySelector(".hours");
const minute = document.querySelector(".minutes");
const second = document.querySelector(".seconds");
const searchInput = document.querySelector(".input-value");
const dropDwn = document.querySelector(".found-container");
const addButton = document.querySelector(".add-task-button");
const addInput = document.querySelector(".add-task-input");
const signInButton = document.querySelector(".sign-in_button");

var completelist = document.getElementById("myDropdown");

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

window.addEventListener("load", (event) => {
  chrome.identity.getProfileUserInfo(function(userInfo) {
    if (userInfo?.email) {
      signInButton.style.display = "none";
    } else {
      addButton.style.display = "none";
    }
  });
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

async function getRandomPicture(value) {
  if (value) {
    await fetch(`https://api.duckduckgo.com/?q=${value}&format=json&pretty=1&no_html=1&skip_disambig=1`)
      .then((response) => response.json())
      .then((data) => {
        data?.RelatedTopics.splice(0, 5).map((item) => {
          addelement(item?.Text, item.text);
        });
      });
  }
}

var currentValue = null;

function myFunction() {
  if (currentValue != searchInput?.value) {
    if (searchInput?.value.length > 2) {
      addelement(searchInput?.value);
    } else if (searchInput?.value?.length == 0) {
      completelist.innerHTML = null;
    }
  }

  currentValue = searchInput?.value?.length;
}
setInterval(myFunction, 500);
