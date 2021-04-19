import _ from 'lodash';
import './style.css'

async function showAvatar() {
  try {
    let response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=London&appid=3d01fe516dd3a560412d2f557ad5d8f5', {mode: 'cors'});
    const responseData = await response.json();
    console.log(responseData);
  } 
  catch (error) {
    console.log('scheiße')
  }
}

showAvatar();