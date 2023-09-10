const getWeather = async () => {
  try {
    const response = await axios.get('http://api.weatherapi.com/v1/forecast.json?key=019db928039841ad9aa170606230909&q=Israel&days=1&aqi=no&alerts=no');
    console.log(response);
    const location = response.data.location.name;
    const temp = Math.trunc(response.data.current.temp_c);
    const feelsLike = Math.trunc(response.data.current.feelslike_c);
    const condition = response.data.current.condition.text;
    const icon = response.data.current.condition.icon;
    getLocation(location);
    getWeatherTemp(temp);
    getFeelsLike(feelsLike);
    getcondition(condition);
    getWeatherIcon(icon);
  } catch (error) {
    console.log(error);
  }
};

function getLocation(location) {
  const locationContainer = document.querySelector('.weatherLocation');
  const locationHeader = document.createElement('h2');
  locationHeader.innerHTML = location
  locationContainer.append(locationHeader);
}

function getWeatherTemp(temp) {
  const weatherTempContainer = document.querySelector('.weatherTemp');
  weatherTempContainer.append(`${temp}°c`);
}

function getFeelsLike(feelsLike) {
  const feelsLikeContainer = document.querySelector('.weatherFeelsLike');
  feelsLikeContainer.append(`Feels Like: ${feelsLike}°c`);
}

function getcondition(condition) {
  const conditionContainer = document.querySelector('.condition');
  conditionContainer.append(condition);
}

function getWeatherIcon(icon) {
  const weatherIcon = document.querySelector('.weatherIcon');
  const img = document.querySelector('img');
  img.src = icon;
  weatherIcon.appendChild(img);
}

window.addEventListener('load', () => {
  getWeather();
});