const Constants = {
  URL: {
    BASE_URL: "https://weather-service-nnlr.onrender.com",
    LOCAL_HOST: "localhost:3000",
    KMBC_ALERTS_URL: "https://www.kmbc.com/alerts",
    KMBC_WEATHER_URL: "https://www.kmbc.com/weather"
  },
  DOM: {

  },
  MESSAGES: {
    NO_ALERTS_FOUND: 'No Severe Weather Alerts Found',
    ALERT_DETECTED: 'SEVER WEATHER ALERT DETECTED'
  },
  CRON: {
    DAILY_AT_SEVEN_THIRTY: '30 7 * * *',
    EVERY_MINUTE: '* * * * *'
  }
}

export default Constants;