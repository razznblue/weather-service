import axios from 'axios';
import dotenv from 'dotenv';

import SMSManager from './SMSManager.js';

dotenv.config();

class OpenWeatherManager {
  constructor() {
    this.baseUrl = "https://api.openweathermap.org/data/2.5/";
    this.lat = "39.100105";
    this.lon = "-94.5781416";
    this.apiKey = process.env.OPEN_WEATHER_MAP_API_KEY;  
    this.smsManager = new SMSManager();
  }

  async fetchCurrentWeather() {
    // In the future include a city parameter on this function. And use the Geo API to get the lat/lon of the city.

    const url = `${this.baseUrl}/weather?lat=${this.lat}&lon=${this.lon}&appid=${this.apiKey}`;
    const response = await axios.get(url);
    const data = response.data;

    const currentTemperature = this.toFarenheit(data.main.temp);
    const feelsLikeTemperature = this.toFarenheit(data.main.feels_like);
    const forecast = data.weather[0].main;
    const forecastDescription = data.weather[0].description;

    return this.buildWeatherObjectOutput(currentTemperature, feelsLikeTemperature, forecast, forecastDescription);
  }

  async sendDailyWeatherText() {
    const weatherData = await this.fetchCurrentWeather();
    this.smsManager.sendText(weatherData);
  }

  buildWeatherObjectOutput(currentDegrees, feelsLike, forecast, description) {
    return `Daily Weather Report\n ${currentDegrees}° feels like ${feelsLike}°. \n${forecast} - ${description}`;
  }

  toFarenheit(kelvinTemp) {
    return Math.round((kelvinTemp - 273.15) * 9/5 + 32);
  }
}

export default OpenWeatherManager;