import BaseModel from '../models/BaseModel.js';
import Constants from '../constants/constants.js';


const { MODELS:{CITY} } = Constants;

export const updateCity = async (cityData) => {
  const owmCity = cityData[0];
  const city = await BaseModel.getByKeyAndValue(CITY, 'name', owmCity.name);
  if (!city.lat && !city.lon) { 
    city.lat = owmCity?.lat;
    city.lon = owmCity?.lon;
    city.countryCode = owmCity?.country;
    city.state = owmCity?.state;
    await city.save();
    console.log(`Updated city ${city.name}`);
  }
}