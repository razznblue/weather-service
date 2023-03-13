import UserSchema from "../schemas/UserSchema.js";
import Constants from "../constants/constants.js";

export const renderProfile = async (req, res) => {
  const userId = req.userId;
  if (!userId) {
    console.error('Could not verify userId on Request Object');
  }

  const user = await UserSchema.findOne({ _id: userId });
  if (!user) { console.error('UserId in session does exist in DB... HOW??') };

  const username = user?.username;
  const email = user?.email ? user?.email : '';
  const phone = user?.phoneNumber ? formatPhoneForProfile(user?.phoneNumber) : '';
  const subscribedToDailyWeather = subscribedTo(user?.subscriptions, 'daily-weather');
  const subscribedToWeatherAlerts = subscribedTo(user?.subscriptions, 'weather-alert');

  const logoutPath = buildLogOutPath();

  res.render('profile', {
    username, email, phone,
    dailyWeather: subscribedToDailyWeather,
    weatherAlerts: subscribedToWeatherAlerts,
    logoutPath
  });
}

const formatPhoneForProfile = (phoneFromDB) => {
  return phoneFromDB.substring(2);
}

const subscribedTo = (subscriptions, service) => {
  return subscriptions.length > 0 && subscriptions.includes(service);
}

const buildLogOutPath = () => {
  const baseUrl = process.env.NODE_ENV === 'production' 
  ? Constants.URL.BASE_URL : Constants.URL.LOCAL_HOST;
  return `${baseUrl}/auth/logout`;
}