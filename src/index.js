import _ from 'lodash';
import './assets/style.css';
import clear from './images/clear.jpg';
import clouds from './images/clouds.jpg';
import fog from './images/fog.jpg';
import rain from './images/rain.jpg';
import snow from './images/snow.jpg';
import thunderstorm from './images/thunderstorm.jpg';
import clearIcon from './images/clear-icon.png';
import cloudsIcon from './images/clouds-icon.png';
import fogIcon from './images/fog-icon.png';
import rainIcon from './images/rain-icon.png';
import snowIcon from './images/snow-icon.png';
import thunderstormIcon from './images/thunderstorm-icon.png';


getData('Berlin');

const submit = document.getElementById('submit-input');
submit.addEventListener('click', () => {
  const city = document.getElementById('city-input').value;
  getData(city);
});

const weatherData = (name, temp, weather) => ({
  name, temp, weather
});

async function getData(city) {
  try {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3d01fe516dd3a560412d2f557ad5d8f5`, {mode: 'cors'});
    const responseData = await response.json();
    const newItem = weatherData(responseData.name, responseData.main.temp, responseData.weather[0].main);
    append(newItem);
  } 
  catch (error) {
    console.log('scheiße');
  }
}

const cityName = document.getElementById('city-name');
const cityTemp = document.getElementById('city-temp');
const append = (obj) => {
  cityName.innerHTML = obj.name;
  celsiusDegree = Math.round(obj.temp - 273.15);
  cityTemp.innerHTML = celsiusDegree;
  addPicture(obj.weather);
}

let celsiusDegree = null;
let fahrenheitDegree = null;
let celsiusBeingDisplayed = true;

const toggleButton = document.getElementById('toggle');
const tempUnit = document.getElementById('temp-unit');
toggleButton.addEventListener('click', () => {
  if (celsiusBeingDisplayed === true) {
    fahrenheitDegree = Math.round(celsiusDegree * 9/5 + 32);
    cityTemp.innerHTML = fahrenheitDegree;
    toggleButton.innerHTML = '<i class="fas fa-toggle-on"></i>';
    tempUnit.innerHTML = '°F'
    celsiusBeingDisplayed = false;
  }
  else {
    celsiusDegree = Math.round((fahrenheitDegree - 32) * 5/9);
    cityTemp.innerHTML = celsiusDegree;
    toggleButton.innerHTML = '<i class="fas fa-toggle-off"></i>';
    tempUnit.innerHTML = '°C'
    celsiusBeingDisplayed = true;
  }
});

const backgroundContainer = document.getElementById('background-container');
const logoContainer = document.getElementById('logo-container');

const addPicture = (weatherType) => {
  backgroundContainer.innerHTML = '';
  logoContainer.innerHTML = '';
  const picture =  new Image();
  picture.classList.add('background-picture');
  const logo = new Image();
  logo.classList.add('logo-picture');
  switch(weatherType) {
    case 'Clear':
      picture.src = clear;
      logo.src = clearIcon;
      break;
    case 'Clouds':
      picture.src = clouds;
      logo.src = cloudsIcon;
      break;
    case 'Rain':
    case 'Drizzle':
      picture.src = rain;
      logo.src = rainIcon;
      break;
    case 'Snow':
      picture.src = snow;
      logo.src = snowIcon;
      break;
    case 'Thunderstorm':
      picture.src = thunderstorm;
      logo.src = thunderstormIcon;
      break;
    default:
      picture.src = fog;
      logo.src = fogIcon;
  }
  backgroundContainer.appendChild(picture);
  logoContainer.appendChild(logo);
}