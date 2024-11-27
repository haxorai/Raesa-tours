const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');
const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided.'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
};

// Get all registrations with pagination and filtering
router.get('/', verifyToken, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const destination = req.query.destination;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    let query = {};

    if (destination) {
      query.destination = new RegExp(destination, 'i');
    }

    if (startDate && endDate) {
      query.departureDate = {
        $gte: startDate,
        $lte: endDate
      };
    }

    const registrations = await Registration.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Registration.countDocuments(query);

    res.json({
      success: true,
      data: registrations,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching registrations',
      error: error.message
    });
  }
});

// Create a new registration
router.post('/', async (req, res) => {
  try {
    // Data validation
    const {
      firstName,
      lastName,
      email,
      phone,
      destination,
      departureDate,
      returnDate,
      adults,
      children,
      roomType,
      mealPreference,
      specialRequests,
      emergencyContact,
      streetAddress,
      city,
      stateProvince,
      postalCode,
      country,
      termsAccepted
    } = req.body;

    // Basic validation
    if (!firstName || !lastName || !email || !phone || !destination || 
        !departureDate || !returnDate || !adults || !streetAddress || 
        !city || !stateProvince || !postalCode || !country ||
        !emergencyContact.name || !emergencyContact.phone || !emergencyContact.relation) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields'
      });
    }

    if (!termsAccepted) {
      return res.status(400).json({
        success: false,
        message: 'Please accept the terms and conditions'
      });
    }

    const registration = new Registration(req.body);
    await registration.save();

    res.status(201).json({
      success: true,
      data: registration
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating registration',
      error: error.message
    });
  }
});

// Get a specific registration by ID
router.get('/:id', async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);
    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      });
    }
    res.status(200).json({
      success: true,
      data: registration
    });
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching registration',
      error: error.message
    });
  }
});

// Delete a registration
router.delete('/:id', async (req, res) => {
  try {
    const registration = await Registration.findByIdAndDelete(req.params.id);
    
    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      });
    }

    res.json({
      success: true,
      message: 'Registration deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting registration',
      error: error.message
    });
  }
});

module.exports = router;
