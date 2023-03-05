import mongoose from 'mongoose';

const userSchema = new mongoose.Schema (
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
    },
    phone_number: {
      type: String,
      required: true
    },
    registerDate: {
      type: Date,
    },
    password: {
      type: String,
      required: true
    },
    subscriptions: {
      // Allowed Strings: 'daily-weather', 'weather-alerts'
      type: [{ type: String }]
    }
  }, { timestamps: true, versionKey: false }
);

const UserSchema = mongoose.model('User', userSchema);
 
export default UserSchema;
