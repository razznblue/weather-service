import dotenv from 'dotenv';
dotenv.config();


const PRODUCTION_URL = "https://weather-service-nnlr.onrender.com";
const LOCAL_HOST = "http://localhost:3001";

const Constants = {
  BASE_URL: process.env.NODE_ENV === 'production' 
    ? PRODUCTION_URL : LOCAL_HOST,
  URL: {
    KMBC_ALERTS_URL: "https://www.kmbc.com/alerts",
    KMBC_WEATHER_URL: "https://www.kmbc.com/weather"
  },
  DOM: {

  },
  MESSAGES: {
    NO_ALERTS_FOUND: 'No Severe Weather Alerts Found',
    ALERT_DETECTED: 'SEVER WEATHER ALERT DETECTED'
  }
}

export default Constants;
