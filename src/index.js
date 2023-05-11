const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let apiKey = "7059cb165caa3316bff682d263a01b1e";
const date = document.querySelector(".date");
let inputField = document.getElementById("input-search");
let temp = document.querySelector(".temp");
let farenHeit = document.querySelector(".faren");
let celSuis = document.querySelector(".cel");

const currentDate = new Date();
const day = days[currentDate.getDay()];
const time = currentDate.getHours();
const mins = currentDate.getMinutes();
date.textContent = `${day} ${time}:${mins}`;

document.getElementById("sumbit").addEventListener("click", () => {
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${inputField.value}&units=metric&appid=${apiKey}`;

  axios.get(apiURL).then((response) => {
    console.log(response.data);
    if (inputField.value !== "") {
      document.querySelector("h2").textContent = response.data.name;
      document.querySelector(".temp").textContent = response.data.main.temp;

      inputField.value = "";
    }
  });
});

function toFarenheit(celsius) {
  let div = 9 / 5;
  let farenheit = celsius * div + 32;
  let result = farenheit.toFixed(1);
  return (temp.textContent = result);
}
function toCelsius(farenheit) {
  let div = 5 / 9;
  let celsius = (farenheit - 32) * div;
  let result = celsius.toFixed(1);
  return (temp.textContent = result);
}

farenHeit.addEventListener("click", () => {
  toFarenheit(temp.textContent);
});
celSuis.addEventListener("click", () => {
  toCelsius(temp.textContent);
});

function getCurrentPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;

  let apiURL = `https://api.openweathermap.org/data/2.5/weather?&units=metric&lat=${lat}&lon=${long}&appid=${apiKey}`;

  axios.get(apiURL).then((res) => {
    const location = res.data;
    document.querySelector("h2").textContent = location.name;
    document.querySelector(".temp").textContent = location.main.temp;
  });
}

document.getElementById("current").addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(getCurrentPosition);
});
