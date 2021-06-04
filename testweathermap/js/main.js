API_KEY = "";//Githubには載せないこと
defaultCity = "Tokyo";

//現在の天気を取得
function currentWeather() {
  $.ajax({
          url: 'https://api.openweathermap.org/data/2.5/weather?q=' + defaultCity + ',jp&units=metric&appid=' + API_KEY,
          dataType: 'json',
          type: 'GET'
      })
      .done(function (data) {
          getWeatherData(data);
          createDate(city.date);
          getDiscription(city.description);
          domWeatherWrite();
      })
      .fail(function (data) {
          console.log('現在の天気を取得出来ませんでした。')
      });
}

var city = {
  name: '',
  date: '',
  time: '',
  weather: '',
  description: '',
  temp: '',
  tempMin: '',
  tempMax: '',
  feelsLike: '',
  pressure: '',
  humidity: '',
  windSpeed: '',
  WindSpeedUnit: '',
  windDeg: '',
  cloudsAll: '',
  sunriseDate: '',
  sunriseTime: '',
  sunsetDate: '',
  sunsetTime: '',
};
var current = {
  day: '',
  month: '',
  date: '',
  hours: '',
  minitutes: '',
  time: '',
  timeText: '',
}

//データ格納
function getWeatherData(data) {
  (data.name) ? city.name = data.name.toUpperCase(): city.name;
  city.description = data.weather[0].description;
  city.date = new Date(data.dt * 1000);
  city.temp = Math.round(data.main.temp);
  city.tempMin = Math.round(data.main.temp_min);
  city.tempMax = Math.round(data.main.temp_max);
  city.feelsLike = Math.round(data.main.feels_like);
  city.pressure = Math.round(data.main.pressure);
  city.humidity = Math.round(data.main.humidity);
  city.windSpeed = Math.round(data.wind.speed);
  city.windDeg = Math.round(data.wind.deg);
  city.cloudsAll = Math.round(data.clouds.all);
  (data.sys.sunrise) ? city.sunriseDate = new Date(data.sys.sunrise * 1000): city.sunriseDate = undefined; //unixtime to date
  (data.sys.sunset) ? city.sunsetDate = new Date(data.sys.sunset * 1000): city.sunsetDate = undefined; //unixtime to date
  if (city.sunriseDate && city.sunsetDate) {
      city.sunriseTime = city.sunriseDate.getHours() + ':' + city.sunriseDate.getMinutes();
      city.sunsetTime = city.sunsetDate.getHours() + ':' + city.sunsetDate.getMinutes();
  } else {
      city.sunriseTime = '-';
      city.sunsetTime = '-';
  }
}

//日付&時間取得
function createDate(date) {
  current.day = date;
  current.month = current.day.getMonth() + 1;
  current.date = current.month + '/' + current.day.getDate();
  current.hours = current.day.getHours();
  current.minitutes = ('0' + current.day.getMinutes()).slice(-2);
  current.time = current.hours + ':' + current.minitutes;
  current.timeText = current.date + ' ' + current.time;
}

var UNIT = {
  TEMP: '°',
  PRESSURE: 'hPa',
  HUMIDITY: '%',
  WINDSPEED: 'm/s',
  MIDDLE_DOT: ':'
}
//DOM要素に描写
function domWeatherWrite() {
  $('#city-name').html(city.name);
  $('#weather-temp').html(city.temp + UNIT.TEMP);
  $('#tempMin').html(city.tempMin + UNIT.TEMP);
  $('#tempMax').html(city.tempMax + UNIT.TEMP);
  $('#feelsLike').html(city.feelsLike + UNIT.TEMP);
  $('#humidity').html(city.humidity + UNIT.HUMIDITY);
  $('#sunrise').html(city.sunriseTime);
  $('#sunset').html(city.sunsetTime);
  $('#windSpeedUnit').html(city.windSpeed + UNIT.WINDSPEED);
  $('#pressure').html(city.pressure + UNIT.PRESSURE);
  $('#weather-date').html(current.timeText);
  $('.detail-list').css('display', 'flex');
}

//天気情報分岐
function getDiscription(disc) {
  switch (disc) {
      case 'clear sky':
          return $('#weather-discription').html('快晴');
          break;
      case 'few clouds':
          return $('#weather-discription').html('くもり（雲少なめ）');
          break;
      case 'scattered clouds':
          return $('#weather-discription').html('くもり（雲ふつう）');
          break;
      case 'broken clouds':
          return $('#weather-discription').html('くもり（雲多め）');
          break;
      case 'overcast clouds':
          return $('#weather-discription').html('くもり（雲多め）');
          break;
      case 'light intensity shower rain':
          return $('#weather-discription').html('小雨のにわか雨');
          break;
      case 'shower rain':
          return $('#weather-discription').html('にわか雨');
          break;
      case 'heavy intensity shower rain':
          return $('#weather-discription').html('大雨のにわか雨');
          break;
      case 'light rain':
          return $('#weather-discription').html('小雨');
          break;
      case 'moderate rain':
          return $('#weather-discription').html('雨');
          break;
      case 'heavy intensity rain':
          return $('#weather-discription').html('大雨');
          break;
      case 'very heavy rain':
          return $('#weather-discription').html('激しい大雨');
          break;
      case 'rain':
          return $('#weather-discription').html('雨');
          break;
      case 'thunderstorm':
          return $('#weather-discription').html('雷雨');
          break;
      case 'snow':
          return $('#weather-discription').html('雪');
          break;
      case 'mist':
          return $('#weather-discription').html('靄');
          break;
      case 'tornado':
          return $('#weather-discription').html('強風');
          break;
      default:
          return disc;
  }
}

function weatherInit() {
  currentWeather();
}
weatherInit();