const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  destination: {
    type: String,
    required: true,
    trim: true
  },
  departureDate: {
    type: String,
    required: true,
    trim: true
  },
  returnDate: {
    type: String,
    required: true,
    trim: true
  },
  adults: {
    type: String,
    required: true,
    default: '1'
  },
  children: {
    type: String,
    required: true,
    default: '0'
  },
  roomType: {
    type: String,
    required: true,
    enum: ['standard', 'deluxe', 'suite', 'houseboat']
  },
  mealPreference: {
    type: String,
    required: true,
    enum: ['vegetarian', 'non-vegetarian', 'vegan']
  },
  specialRequests: {
    type: String,
    trim: true
  },
  emergencyContact: {
    name: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    relation: {
      type: String,
      required: true,
      trim: true
    }
  },
  streetAddress: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  stateProvince: {
    type: String,
    required: true,
    trim: true
  },
  postalCode: {
    type: String,
    required: true,
    trim: true
  },
  country: {
    type: String,
    required: true,
    trim: true
  },
  termsAccepted: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
  timestamps: true
});

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;
