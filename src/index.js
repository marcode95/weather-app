import _ from 'lodash';
import './style.css'

const weatherData = (name, temp, weather) => ({
  name, temp, weather
});

let celsiusDegree = null;
let fahrenheitDegree = null;

async function getData(city) {
  try {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3d01fe516dd3a560412d2f557ad5d8f5`, {mode: 'cors'});
    const responseData = await response.json();
    const newItem = weatherData(responseData.name, responseData.main.temp, responseData.weather[0].main);
    append(newItem);
  } 
  catch (error) {
    console.log('scheiße')
  }
}

const submit = document.getElementById('submit-input');
submit.addEventListener('click', () => {
  const city = document.getElementById('city-input').value;
  getData(city);
});

const cityName = document.getElementById('city-name');
const cityTemp = document.getElementById('city-temp');
const append = (obj) => {
  cityName.innerHTML = obj.name;
  celsiusDegree = Math.round(obj.temp - 273.15);
  cityTemp.innerHTML = celsiusDegree;

}

let celsiusBeingDisplayed = true;
const toggleButton = document.getElementById('toggle');
toggleButton.addEventListener('click', () => {
  if (celsiusBeingDisplayed === true) {
    fahrenheitDegree = Math.round(celsiusDegree * 9/5 + 32);
    cityTemp.innerHTML = fahrenheitDegree;
    celsiusBeingDisplayed = false;
  }
  else {
    celsiusDegree = Math.round((fahrenheitDegree - 32) * 5/9);
    cityTemp.innerHTML = celsiusDegree;
    celsiusBeingDisplayed = true;
  }
});