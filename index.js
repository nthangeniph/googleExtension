const secondHand = document.querySelector("[name=second-hand]");
const miniHand = document.querySelector(".min-hand");
const hourHand = document.querySelector(".hour-hand");
const hour = document.querySelector(".hours");
const minute = document.querySelector(".minutes");
const second = document.querySelector(".seconds");
function setDate() {
  const now = new Date();

  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();

  const secondsDegrees = (seconds / 60) * 360 + 90;
  const minutesDegrees = (minutes / 60) * 360 + 90;
  const hoursDregrees = (hours / 12) * 360 + 90;

  document.querySelector(".second-hand").style.transform = `rotate(${secondsDegrees}deg)`;
  //secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
  miniHand.style.transform = `rotate(${minutesDegrees}deg)`;
  hourHand.style.transform = `rotate(${hoursDregrees}deg)`;
  hour.innerHTML = hours > 9 ? hours : `0${hours}`;
  minute.innerHTML = minutes > 9 ? minutes : `0${minutes}`;
  second.innerHTML = seconds > 9 ? seconds : `0${seconds}`;
}
setInterval(setDate, 1000);
setDate();

async function getRandomPicture() {
  // const mainBody = document.getElementsByTagName("body");
  await fetch("https://picsum.photos/v2/list")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      document.querySelector("body").style.background = "url(https://unsplash.com/photos/LNRyGwIJr5c)";
    });
}
getRandomPicture();
