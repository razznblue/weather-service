import mongoose from 'mongoose';

const collectionName = "City";
const citySchema = new mongoose.Schema (
  {
    name: { type: String, required: true },
    openWeatherCityId: { type: String },
    lat: { type: String },
    lon: { type: String },
    countryName: { type: String },
    countryCode: { type: String },
    state: { type: String }
  }, { versionKey: false, timestamps: false, collection: collectionName }
);

const CityModel = mongoose.model(collectionName, citySchema);
 
export default CityModel;
