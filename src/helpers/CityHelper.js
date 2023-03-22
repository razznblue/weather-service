import CitySchema from '../schemas/CitySchema.js';

export const updateCity = async (cityData) => {
  const owmCity = cityData[0];
  const city = await CitySchema.findOne({ name: owmCity.name });
  if (!city.lat && !city.lon) { 
    city.lat = owmCity?.lat;
    city.lon = owmCity?.lon;
    city.countryCode = owmCity?.country;
    city.state = owmCity?.state;
    await city.save();
    console.log(`Updated city ${city.name}`);
  }
}