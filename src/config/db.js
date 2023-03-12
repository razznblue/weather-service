import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


const connectToDB = () => {
  mongoose.connect(getMongoUri(), {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
  }).then(() => {
    console.log("Connected to DB"); 
  }).catch(err => console.log(`Could not connect to DB \n${err}`));
}

const getMongoUri = () => {
  const user = process.env.MONGO_USER;
  const password = process.env.MONGO_PASS;
  const database = process.env.MONGO_DATABASE;
  const clusterName = process.env.MONGO_CLUSTER;
  if (!user) {
    return console.error(`Invalid admin user found while building mongo uri`);
  }
  if (!password) {
    return console.error(`Invalid admin password found while building mongo uri`);
  }
  if (!database) {
    return console.error(`Invalid database name found while building mongo uri`);
  }
  if (!clusterName) {
    return console.error(`Invalid cluster name found while building mongo uri`);
  }
  return `mongodb+srv://${user}:${password}@${clusterName}.mpdicm4.mongodb.net/${database}?retryWrites=true&w=majority`;
}

export default connectToDB;