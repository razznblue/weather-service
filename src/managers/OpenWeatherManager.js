import axios from 'axios';
import dotenv from 'dotenv';

import TextType from '../enums/TextType.js';
import SMSManager from './SMSManager.js';
import Constants from '../constants/constants.js';
import ConditionCode from '../entities/ConditionCode.js';

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
    const weathers = data.weather;

    // Save ConditionCode(s) in DB
    for (const obj of weathers) {
      if (obj.id && obj.main && obj.description && obj.icon) {
        const conditionCode = new ConditionCode(obj.id, obj.main, obj.description, obj.icon);
        await conditionCode.save();
      }
    }

    // Set up and build out Daily Weather Message
    const currentTemperature = this.toFarenheit(data.main.temp);
    const feelsLikeTemperature = this.toFarenheit(data.main.feels_like);
    const forecast = weathers[0].main;
    const forecastDescription = weathers[0].description;
    const iconCode = weathers[0].icon;
    const openWeatherId = weathers[0].id;

    return [this.buildDailyWeatherMessage(currentTemperature, feelsLikeTemperature, forecast, forecastDescription), iconCode, openWeatherId];
  }

  // Example: User sends a text of forecst for the next # of hours. 
  // This method could be used to retrieve the requested data and send it through text
  async fetchFiveDayWeather() {
    const url = `${this.baseUrl}/forecast?lat=${this.lat}&lon=${this.lon}&appid=${this.apiKey}`;
    const response = await axios.get(url);
    const days = response.data.list;

    for (const day of days) {
      const date = new Date(day.dt * 1000);
      console.log(this.getDayName(day.dt * 1000, 'en-US'));
      console.log(date.getDate());
      console.log(date.getMonth() + 1);
      console.log(date + " : " + this.toFarenheit(day.main.temp));
    }
    return days;
  }

  async sendDailyWeatherText() {
    const weatherData = await this.fetchCurrentWeather();

    const msg = `${weatherData[0]} \n${Constants.URL.KMBC_WEATHER_URL}`;
    //const iconCode = weatherData[1];
    const openWeatherId = weatherData[2];
    return await this.smsManager.sendWeatherText(msg, null, TextType.DailyWeather, openWeatherId);
  }

  buildDailyWeatherMessage(currentDegrees, feelsLike, forecast, description) {
    return `Daily Weather Report\n ${currentDegrees}° feels like ${feelsLike}°. \n${forecast} - ${description}`;
  }

  toFarenheit(kelvinTemp) {
    return Math.round((kelvinTemp - 273.15) * 9/5 + 32);
  }

  getDayName(dateStr, locale) {
      var date = new Date(dateStr);
      return date.toLocaleDateString(locale, { weekday: 'long' });        
  }

}

export default OpenWeatherManager;