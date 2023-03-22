import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

import CitySchema from '../schemas/CitySchema.js';


const jobs = express.Router();
const accessToken = process.env.ACCESS_TOKEN;

/*
  1) Fetches a list of city names
  2) Saves the City document in Mongo
  3) Setting up for another class to fill other information on the mongo doc.
*/
jobs.get('/cities', async (req, res) => {
  return res.send('Job Temporarily Suspended');
  if (authenticate) {
    const url = "https://raw.githubusercontent.com/manifestinteractive/openweathermap-cities/master/data/owm_city_list.json";

    const response = await axios.get(url);
    const records = response.data.RECORDS;
    const cities = [];
    for (const record of records) {
      if (record.owm_city_name) {
        cities.push({name: record.owm_city_name});
      }
    }
    console.log(cities.length);
    res.send(`Saving ${cities.length} cities to DB`);

    const erroredCities = [];
    for (const city of cities) {
      try {
        const cityDoc = new CitySchema({name: city.name});
        await cityDoc.save();
      } catch(err) {
        erroredCities.push(city.name);
        console.log(`Error Saving City ${city.name}`);
        console.log(err);
      }
    }

    console.log('Finished creating all cities');
    console.log(`erroredCities: \n${erroredCities}`);

  }
});


const authenticate = (req) => {
  return req.query.token === accessToken ? true : false;
}

export default jobs;