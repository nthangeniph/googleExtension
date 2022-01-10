import { initializeApp } from "firebase/app";
import firestore from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// const http = require("http");
// const port = 3000;
// const server = http.createServer(function(req, res) {});

// server.listen(port, function(error) {
//   if (error) {
//     console.log("Something went wrong", error);
//   } else {
//     console.log("Server is listening to " + port);
//   }
// });
const firebaseConfig = {
  apiKey: "AIzaSyAMzCakkHEDR1hQ3HxNJRXNmsd5KFHOXwc",
  authDomain: "phextension-1639555609925.firebaseapp.com",
  projectId: "phextension-1639555609925",
  storageBucket: "phextension-1639555609925.appspot.com",
  messagingSenderId: "26185314273",
  appId: "1:26185314273:web:f27fdf2e70aa4f16ec2ca0",
  measurementId: "G-KHZKC042KN",
};

try {
  firebase.initializeApp({
    apiKey: "AIzaSyAMzCakkHEDR1hQ3HxNJRXNmsd5KFHOXwc",
    authDomain: "phextension-1639555609925.firebaseapp.com",
    projectId: "phextension-1639555609925",
    storageBucket: "phextension-1639555609925.appspot.com",
    messagingSenderId: "26185314273",
    appId: "1:26185314273:web:f27fdf2e70aa4f16ec2ca0",
    measurementId: "G-KHZKC042KN",
  });
} catch (error) {
  if (!/already exists/u.test(error.message)) {
    console.error("Firebase admin initialization error", error.stack);
  }
}

const event = new Date();
const todayDate = event.toISOString().substring(0, 10);

const addButton = document.querySelector(".add-task-button");
const addInput = document.querySelector(".add-task-input");

function addNewTask(userId, { task, active, completed }) {
  debugger;
  firestore
    .collection("todoList")
    .doc(`${userId}${todayDate}`)
    .set({
      tasksList: firebase.firestore.FieldValue.arrayUnion(
        JSON.stringify({
          task,
          active,
          completed,
          duration: 0,
        })
      ),
    });
}

function updateTasks(userId, { task, active, completed, duration }) {
  firestore
    .collection("todoList")
    .doc(`${userId}${todayDate}`)
    .update({
      tasksList: firebase.firestore.FieldValue.arrayUnion(
        JSON.stringify({
          task,
          active,
          completed,
          duration,
        })
      ),
    });
}

async function updateSpecificTask(userId, listOfItems) {
  await firestore
    .collection("todoList")
    .doc(`${userId}${todayDate}`)
    .delete();
  listOfItems.forEach((doc, index) => {
    if (index == 0) {
      addNewTask(userId, doc);
    } else {
      updateTasks(userId, doc);
    }
  });
}

async function getListOfTodos(userId) {
  await firestore
    .collection("todoList")
    .doc(`${userId}${todayDate}`)
    .get()
    .then((doc) => {
      console.log(doc);
    });
}
// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);

addButton.addEventListener("click", () => {
  console.log("clicked");
});
console.log("addButton");
export { addNewTask, updateTasks, updateSpecificTask, getListOfTodos };

{
  /* <div class="settings">
<div class="primary-color-set" > 
  <label>set primary color:</label>
  <input type="color" class="primary-color" name="base-color"> 
</div>
<div class="weather-todo">
<button class="weather-button">
  Weather
</button>
</div> */
}
