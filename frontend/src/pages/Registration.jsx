import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaCalendar, FaUsers, FaMapMarkerAlt } from 'react-icons/fa';

const Registration = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    destination: location.state?.selectedDestination || '',
    departureDate: '',
    returnDate: '',
    adults: '1',
    children: '0',
    roomType: 'standard',
    mealPreference: 'vegetarian',
    specialRequests: '',
    emergencyContact: {
      name: '',
      phone: '',
      relation: '',
    },
    streetAddress: '',
    city: '',
    stateProvince: '',
    postalCode: '',
    country: '',
    termsAccepted: false,
  });

  const [validationErrors, setValidationErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    'emergencyContact.name': '',
    'emergencyContact.phone': '',
    'emergencyContact.relation': '',
    streetAddress: '',
    city: '',
    stateProvince: '',
    postalCode: '',
    country: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  const destinations = [
    'Dal Lake, Srinagar',
    'Gulmarg',
    'Pahalgam',
    'Sonamarg',
    'Yusmarg',
    'Doodhpathri',
    'Custom Package',
  ];

  const formatDateInput = (value) => {
    // Remove any non-digit characters
    const cleanValue = value.replace(/\D/g, '');
    
    // Format the date with slashes (DD/MM/YYYY)
    if (cleanValue.length <= 2) {
      return cleanValue;
    } else if (cleanValue.length <= 4) {
      return `${cleanValue.slice(0, 2)}/${cleanValue.slice(2)}`;
    } else {
      return `${cleanValue.slice(0, 2)}/${cleanValue.slice(2, 4)}/${cleanValue.slice(4, 8)}`;
    }
  };

  const validateDate = (date, type) => {
    // Check if date is empty
    if (!date) {
      return `${type} date is required`;
    }

    // Check date format (DD/MM/YYYY)
    const dateFormatRegex = /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (!dateFormatRegex.test(date)) {
      return 'Please enter date in DD/MM/YYYY format';
    }

    const [day, month, year] = date.split('/').map(Number);
    const inputDate = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if date is valid
    if (inputDate.getMonth() !== month - 1 || inputDate.getDate() !== day || inputDate.getFullYear() !== year) {
      return 'Please enter a valid date';
    }

    // For departure date, check if it's in the future
    if (type === 'Departure' && inputDate < today) {
      return 'Departure date must be in the future';
    }

    // For return date, check if it's after departure date
    if (type === 'Return' && formData.departureDate) {
      const [dDay, dMonth, dYear] = formData.departureDate.split('/').map(Number);
      const departureDate = new Date(dYear, dMonth - 1, dDay);
      if (inputDate <= departureDate) {
        return 'Return date must be after departure date';
      }
    }

    return '';
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    
    // Format the date value
    const formattedValue = formatDateInput(value);
    
    // Update the form data
    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));

    // Validate the date
    const dateType = name === 'departureDate' ? 'Departure' : 'Return';
    const error = validateDate(formattedValue, dateType);
    
    setValidationErrors(prev => ({
      ...prev,
      [name]: error
    }));

    // If return date exists and departure date changes, validate return date again
    if (name === 'departureDate' && formData.returnDate) {
      const returnError = validateDate(formData.returnDate, 'Return');
      setValidationErrors(prev => ({
        ...prev,
        returnDate: returnError
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Clear validation error for the field being edited
    setValidationErrors(prev => ({
      ...prev,
      [name]: '' // Clear error for the current field
    }));

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
      // Clear validation error for nested fields (emergency contact)
      setValidationErrors(prev => ({
        ...prev,
        [`${parent}.${child}`]: ''
      }));
    } else if (name === 'departureDate' || name === 'returnDate') {
      handleDateChange(e);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    // First Name validation
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
      isValid = false;
    } else if (formData.firstName.length < 2) {
      errors.firstName = 'First name must be at least 2 characters';
      isValid = false;
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
      isValid = false;
    } else if (formData.lastName.length < 2) {
      errors.lastName = 'Last name must be at least 2 characters';
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Phone validation
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
      isValid = false;
    } else if (!phoneRegex.test(formData.phone)) {
      errors.phone = 'Please enter a valid phone number';
      isValid = false;
    }

    // Destination validation
    if (!formData.destination) {
      errors.destination = 'Please select a destination';
      isValid = false;
    }

    // Date validations
    if (!formData.departureDate) {
      errors.departureDate = 'Departure date is required';
      isValid = false;
    }

    if (!formData.returnDate) {
      errors.returnDate = 'Return date is required';
      isValid = false;
    } else if (new Date(formData.returnDate) <= new Date(formData.departureDate)) {
      errors.returnDate = 'Return date must be after departure date';
      isValid = false;
    }

    // Emergency Contact validations
    if (!formData.emergencyContact.name.trim()) {
      errors['emergencyContact.name'] = 'Emergency contact name is required';
      isValid = false;
    }

    if (!formData.emergencyContact.phone.trim()) {
      errors['emergencyContact.phone'] = 'Emergency contact phone is required';
      isValid = false;
    } else if (!phoneRegex.test(formData.emergencyContact.phone)) {
      errors['emergencyContact.phone'] = 'Please enter a valid phone number';
      isValid = false;
    }

    if (!formData.emergencyContact.relation.trim()) {
      errors['emergencyContact.relation'] = 'Relation is required';
      isValid = false;
    }

    // Address validations
    if (!formData.streetAddress.trim()) {
      errors.streetAddress = 'Street address is required';
      isValid = false;
    }

    if (!formData.city.trim()) {
      errors.city = 'City is required';
      isValid = false;
    }

    if (!formData.stateProvince.trim()) {
      errors.stateProvince = 'State/Province is required';
      isValid = false;
    }

    if (!formData.postalCode.trim()) {
      errors.postalCode = 'Postal code is required';
      isValid = false;
    }

    if (!formData.country.trim()) {
      errors.country = 'Country is required';
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset states
    setSubmitError('');
    setSubmitSuccess('');
    
    // Validate form
    if (!validateForm()) {
      setSubmitError('Please correct the errors in the form');
      return;
    }

    if (!formData.termsAccepted) {
      setSubmitError('Please accept the terms and conditions');
      return;
    }

    try {
      setIsSubmitting(true);
      
      const response = await fetch('/api/registrations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Clear form on success
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        destination: '',
        departureDate: '',
        returnDate: '',
        adults: '1',
        children: '0',
        roomType: 'standard',
        mealPreference: 'vegetarian',
        specialRequests: '',
        emergencyContact: {
          name: '',
          phone: '',
          relation: '',
        },
        streetAddress: '',
        city: '',
        stateProvince: '',
        postalCode: '',
        country: '',
        termsAccepted: false,
      });

      setSubmitSuccess(data.message || 'Thank you for your booking! We will contact you shortly.');
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
      setSubmitError(error.message || 'Something went wrong. Please try again.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    // Scroll to destination field if it was pre-selected
    if (location.state?.selectedDestination) {
      const destinationField = document.getElementById('destination');
      if (destinationField) {
        destinationField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [location.state?.selectedDestination]);

  return (
    <div className="min-h-screen pt-20 pb-20 bg-primary">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-gaming font-bold mb-6 text-center">
            Book Your Kashmir Adventure
          </h1>
          
          {/* Success Message */}
          {submitSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-center"
            >
              {submitSuccess}
            </motion.div>
          )}

          <p className="text-gray-400 text-center mb-12">
            Fill out the form below to start your journey through paradise.
            Our team will contact you to confirm your booking details.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="card">
              <h2 className="text-2xl font-gaming mb-6">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name*</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${
                      validationErrors.firstName ? 'border-red-500' : 'border-highlight/20'
                    } focus:border-accent focus:outline-none transition-colors duration-300
                    text-white placeholder-gray-400`}
                    placeholder="Enter your first name"
                  />
                  {validationErrors.firstName && (
                    <p className="mt-1 text-sm text-red-500">{validationErrors.firstName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name*</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${
                      validationErrors.lastName ? 'border-red-500' : 'border-highlight/20'
                    } focus:border-accent focus:outline-none transition-colors duration-300
                    text-white placeholder-gray-400`}
                    placeholder="Enter your last name"
                  />
                  {validationErrors.lastName && (
                    <p className="mt-1 text-sm text-red-500">{validationErrors.lastName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email*</label>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${
                      validationErrors.email ? 'border-red-500' : 'border-highlight/20'
                    } focus:border-accent focus:outline-none transition-colors duration-300
                    text-white placeholder-gray-400`}
                    placeholder="Enter your email"
                  />
                  {validationErrors.email && (
                    <p className="mt-1 text-sm text-red-500">{validationErrors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone*</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${
                      validationErrors.phone ? 'border-red-500' : 'border-highlight/20'
                    } focus:border-accent focus:outline-none transition-colors duration-300
                    text-white placeholder-gray-400`}
                    placeholder="Enter your phone number"
                  />
                  {validationErrors.phone && (
                    <p className="mt-1 text-sm text-red-500">{validationErrors.phone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Trip Details */}
            <div className="card">
              <h2 className="text-2xl font-gaming mb-6">Trip Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="destination" className="block text-sm font-medium mb-2">Destination*</label>
                  <select
                    id="destination"
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-secondary border ${
                      validationErrors.destination ? 'border-red-500' : 'border-highlight/20'
                    } focus:border-accent focus:outline-none transition-colors duration-300
                    text-white [&>option]:bg-secondary [&>option]:text-white`}
                  >
                    <option value="" disabled>Select Destination</option>
                    {destinations.map((dest) => (
                      <option key={dest} value={dest}>{dest}</option>
                    ))}
                  </select>
                  {validationErrors.destination && (
                    <p className="mt-1 text-sm text-red-500">{validationErrors.destination}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    <FaCalendar className="inline-block mr-2" />
                    Departure Date
                  </label>
                  <input
                    type="text"
                    name="departureDate"
                    value={formData.departureDate}
                    onChange={handleDateChange}
                    placeholder="DD/MM/YYYY"
                    className={`w-full px-4 py-2 rounded-lg bg-white/10 border ${
                      validationErrors.departureDate ? 'border-red-500' : 'border-highlight/20'
                    } focus:border-accent focus:outline-none transition-colors duration-300
                    text-white placeholder-gray-400`}
                  />
                  {validationErrors.departureDate && (
                    <p className="mt-1 text-sm text-red-500">{validationErrors.departureDate}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    <FaCalendar className="inline-block mr-2" />
                    Return Date
                  </label>
                  <input
                    type="text"
                    name="returnDate"
                    value={formData.returnDate}
                    onChange={handleDateChange}
                    placeholder="DD/MM/YYYY"
                    className={`w-full px-4 py-2 rounded-lg bg-white/10 border ${
                      validationErrors.returnDate ? 'border-red-500' : 'border-highlight/20'
                    } focus:border-accent focus:outline-none transition-colors duration-300
                    text-white placeholder-gray-400`}
                  />
                  {validationErrors.returnDate && (
                    <p className="mt-1 text-sm text-red-500">{validationErrors.returnDate}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Room Type*</label>
                  <select
                    name="roomType"
                    value={formData.roomType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-highlight/20
                    focus:border-accent focus:outline-none transition-colors duration-300
                    text-white [&>option]:bg-secondary [&>option]:text-white"
                  >
                    <option value="" disabled>Select Room Type</option>
                    <option value="standard">Standard Room</option>
                    <option value="deluxe">Deluxe Room</option>
                    <option value="suite">Suite</option>
                    <option value="houseboat">Houseboat</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Number of Adults*</label>
                  <input
                    type="number"
                    name="adults"
                    min="1"
                    value={formData.adults}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-highlight/20
                    focus:border-accent focus:outline-none transition-colors duration-300
                    text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Number of Children</label>
                  <input
                    type="number"
                    name="children"
                    min="0"
                    value={formData.children}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-highlight/20
                    focus:border-accent focus:outline-none transition-colors duration-300
                    text-white placeholder-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Address Details */}
            <div className="card">
              <h2 className="text-2xl font-gaming mb-6">Address Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Street Address*</label>
                  <input
                    type="text"
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${
                      validationErrors.streetAddress ? 'border-red-500' : 'border-highlight/20'
                    } focus:border-accent focus:outline-none transition-colors duration-300
                    text-white placeholder-gray-400`}
                    placeholder="Enter your street address"
                  />
                  {validationErrors.streetAddress && (
                    <p className="mt-1 text-sm text-red-500">{validationErrors.streetAddress}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">City*</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${
                      validationErrors.city ? 'border-red-500' : 'border-highlight/20'
                    } focus:border-accent focus:outline-none transition-colors duration-300
                    text-white placeholder-gray-400`}
                    placeholder="Enter your city"
                  />
                  {validationErrors.city && (
                    <p className="mt-1 text-sm text-red-500">{validationErrors.city}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">State/Province*</label>
                  <input
                    type="text"
                    name="stateProvince"
                    value={formData.stateProvince}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${
                      validationErrors.stateProvince ? 'border-red-500' : 'border-highlight/20'
                    } focus:border-accent focus:outline-none transition-colors duration-300
                    text-white placeholder-gray-400`}
                    placeholder="Enter your state or province"
                  />
                  {validationErrors.stateProvince && (
                    <p className="mt-1 text-sm text-red-500">{validationErrors.stateProvince}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Postal Code*</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${
                      validationErrors.postalCode ? 'border-red-500' : 'border-highlight/20'
                    } focus:border-accent focus:outline-none transition-colors duration-300
                    text-white placeholder-gray-400`}
                    placeholder="Enter your postal code"
                  />
                  {validationErrors.postalCode && (
                    <p className="mt-1 text-sm text-red-500">{validationErrors.postalCode}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Country*</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${
                      validationErrors.country ? 'border-red-500' : 'border-highlight/20'
                    } focus:border-accent focus:outline-none transition-colors duration-300
                    text-white placeholder-gray-400`}
                    placeholder="Enter your country"
                  />
                  {validationErrors.country && (
                    <p className="mt-1 text-sm text-red-500">{validationErrors.country}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="card">
              <h2 className="text-2xl font-gaming mb-6">Additional Information</h2>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Meal Preference</label>
                  <select
                    name="mealPreference"
                    value={formData.mealPreference}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-highlight/20
                    focus:border-accent focus:outline-none transition-colors duration-300
                    text-white [&>option]:bg-secondary [&>option]:text-white"
                  >
                    <option value="" disabled>Select Meal Preference</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="nonVegetarian">Non-Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="halal">Halal</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Special Requests</label>
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-highlight/20
                    focus:border-accent focus:outline-none transition-colors duration-300
                    text-white placeholder-gray-400"
                    placeholder="Any special requirements or requests..."
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="card">
              <h2 className="text-2xl font-gaming mb-6">Emergency Contact</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Contact Name*</label>
                  <input
                    type="text"
                    name="emergencyContact.name"
                    value={formData.emergencyContact.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${
                      validationErrors['emergencyContact.name'] ? 'border-red-500' : 'border-highlight/20'
                    } focus:border-accent focus:outline-none transition-colors duration-300
                    text-white placeholder-gray-400`}
                    placeholder="Emergency contact name"
                  />
                  {validationErrors['emergencyContact.name'] && (
                    <p className="mt-1 text-sm text-red-500">{validationErrors['emergencyContact.name']}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Contact Phone*</label>
                  <input
                    type="tel"
                    name="emergencyContact.phone"
                    value={formData.emergencyContact.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${
                      validationErrors['emergencyContact.phone'] ? 'border-red-500' : 'border-highlight/20'
                    } focus:border-accent focus:outline-none transition-colors duration-300
                    text-white placeholder-gray-400`}
                    placeholder="Emergency contact phone"
                  />
                  {validationErrors['emergencyContact.phone'] && (
                    <p className="mt-1 text-sm text-red-500">{validationErrors['emergencyContact.phone']}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Relationship*</label>
                  <input
                    type="text"
                    name="emergencyContact.relation"
                    value={formData.emergencyContact.relation}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${
                      validationErrors['emergencyContact.relation'] ? 'border-red-500' : 'border-highlight/20'
                    } focus:border-accent focus:outline-none transition-colors duration-300
                    text-white placeholder-gray-400`}
                    placeholder="Relationship with emergency contact"
                  />
                  {validationErrors['emergencyContact.relation'] && (
                    <p className="mt-1 text-sm text-red-500">{validationErrors['emergencyContact.relation']}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="card">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-highlight/20 bg-white/10
                  focus:ring-accent focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary"
                />
                <label className="text-sm">
                  I agree to the terms and conditions
                </label>
              </div>
            </div>

            {/* Error Message */}
            {submitError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-center"
              >
                {submitError}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 px-6 rounded-lg bg-accent text-white font-medium
              transition-all duration-300 ${
                isSubmitting
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-accent/80'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Details'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Registration;
