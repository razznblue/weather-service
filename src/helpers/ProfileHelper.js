import Constants from "../constants/constants.js";


const baseUrl = Constants.BASE_URL;

export const verifyUser = (req, res) => {
  const userId = req.userId;
  if (!userId) {
    console.error('Could not verify userId on Request Object');
    res.status(403).send('Could not verify loggedIn user');
  }
}

export const formatPhoneForProfile = (phoneFromDB) => {
  return phoneFromDB.substring(2);
}

export const subscribedTo = (subscriptions, service) => {
  return subscriptions.length > 0 && subscriptions.includes(service);
}

export const buildLogOutPath = () => {
  return `${baseUrl}/auth/logout`;
}