# Weather-Service
  A service that sends weather reports and alerts to subscribers.
 - (NOTE) This project is currently not deployed to grant resources to other projects.
 - The functionality still remains and can be redeployed at any time.
 - When redeployed, a new Twilio number will need to be purchased since the free trial has expired

## Integrations
 - **OpenWeatherMap API**; this application consumes live weather data
 - **Twilio**; this application sends texts via Twilio
 - **MongoDB**; for storing User Information and Text Message History
 - **NodeCron**; customize when/how often you want to receive an alert/update
 - **EJS**; Embedded Javascript is used for the front-end of the project. See [views](https://github.com/razznblue/weather-service/tree/main/src/views).

## Capabilities
 - Built-in Authorization/Authentication system.
 - Built-in CronJob system
 - Users can subscribe to any number of reports/alerts.
 - Users can customize when/how often they want to receive that report.
 - Users Text Message History stored in the database.

## Managers
 Managers contain the main business-logic of the application
 - [SMSManager](https://github.com/razznblue/weather-service/blob/main/src/managers/SMSManager.js) - Contains reusable methods to send alerts/reports
 - [AlertsManager](https://github.com/razznblue/weather-service/blob/main/src/managers/AlertsManager.js) - Contains sending messages related to SEVERE weather alerts
 - [OpenWeatherManager](https://github.com/razznblue/weather-service/blob/main/src/managers/OpenWeatherManager.js) - Contains sending messages related to COMMON weather forcasts
 - [HealthManager](https://github.com/razznblue/weather-service/blob/main/src/managers/HealthCheckManager.js) - Contains a [health](https://github.com/razznblue/weather-service/blob/main/src/routes/router.js#L32) endpoint to verify the health of the application

## Future Works
 - Add EMAIL functionality. User can choose to be alerted via text, email, or both
 - Add page where Users can view their message history of an alert
 - Have an alert page that displays Alerts with a nice UI. User's can click on any of them and be able to subscribe to them from that page.
