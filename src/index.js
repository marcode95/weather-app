import './assets/style.css';
import { append, swichUnit } from './components/dom';

const submit = document.getElementById('submit-input');
const errorWindow = document.getElementById('error');

const weatherData = (name, temp, weather) => ({
  name, temp, weather,
});

const getData = async (city) => {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3d01fe516dd3a560412d2f557ad5d8f5`, { mode: 'cors' });
    const responseData = await response.json();
    // eslint-disable-next-line max-len
    const newItem = weatherData(responseData.name, responseData.main.temp, responseData.weather[0].main);
    append(newItem);
  } catch (error) {
    errorWindow.classList.remove('display-none');
    errorWindow.classList.add('display-block');
    setTimeout(() => {
      errorWindow.classList.remove('display-block');
      errorWindow.classList.add('display-none');
    }, 1500);
  }
}

getData('Berlin');

submit.addEventListener('click', () => {
  const city = document.getElementById('city-input').value;
  getData(city);
});

swichUnit();