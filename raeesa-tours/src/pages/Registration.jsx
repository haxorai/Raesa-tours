import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhone, FaCalendar, FaUsers, FaMapMarkerAlt } from 'react-icons/fa';

const Registration = () => {
  const [formData, setFormData] = useState({
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset states
    setSubmitError('');
    setSubmitSuccess('');
    
    // Validate form
    if (!formData.termsAccepted) {
      setSubmitError('Please accept the terms and conditions');
      return;
    }

    try {
      setIsSubmitting(true);
      
      const response = await fetch('http://localhost:5000/api/registrations', {
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

          {/* Error Message */}
          {submitError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-center"
            >
              {submitError}
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
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-highlight/20
                    focus:border-accent focus:outline-none transition-colors duration-300
                    text-white placeholder-gray-400"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name*</label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-highlight/20
                    focus:border-accent focus:outline-none transition-colors duration-300
                    text-white placeholder-gray-400"
                    placeholder="Enter your last name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email*</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-highlight/20
                    focus:border-accent focus:outline-none transition-colors duration-300
                    text-white placeholder-gray-400"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone*</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-highlight/20
                    focus:border-accent focus:outline-none transition-colors duration-300
                    text-white placeholder-gray-400"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
            </div>

            {/* Trip Details */}
            <div className="card">
              <h2 className="text-2xl font-gaming mb-6">Trip Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Destination*</label>
                  <select
                    name="destination"
                    required
                    value={formData.destination}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-highlight/20
                    focus:border-accent focus:outline-none transition-colors duration-300
                    text-white [&>option]:bg-secondary [&>option]:text-white"
                  >
                    <option value="" disabled>Select Destination</option>
                    {destinations.map((dest) => (
                      <option key={dest} value={dest}>{dest}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Departure Date*</label>
                  <input
                    type="text"
                    name="departureDate"
                    required
                    value={formData.departureDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-highlight/20
                    focus:border-accent focus:outline-none transition-colors duration-300
                    text-white placeholder-gray-400"
                    placeholder="DD/MM/YYYY"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Return Date*</label>
                  <input
                    type="text"
                    name="returnDate"
                    required
                    value={formData.returnDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-highlight/20
                    focus:border-accent focus:outline-none transition-colors duration-300
                    text-white placeholder-gray-400"
                    placeholder="DD/MM/YYYY"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Room Type*</label>
                  <select
                    name="roomType"
                    required
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
                    required
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
                    required
                    value={formData.streetAddress}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-highlight/20
                    focus:border-accent focus:outline-none transition-colors duration-300
                    text-white placeholder-gray-400"
                    placeholder="Enter your street address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">City*</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-highlight/20
                    focus:border-accent focus:outline-none transition-colors duration-300
                    text-white placeholder-gray-400"
                    placeholder="Enter your city"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">State/Province*</label>
                  <input
                    type="text"
                    name="stateProvince"
                    required
                    value={formData.stateProvince}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-highlight/20
                    focus:border-accent focus:outline-none transition-colors duration-300
                    text-white placeholder-gray-400"
                    placeholder="Enter your state or province"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Postal Code*</label>
                  <input
                    type="text"
                    name="postalCode"
                    required
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-highlight/20
                    focus:border-accent focus:outline-none transition-colors duration-300
                    text-white placeholder-gray-400"
                    placeholder="Enter your postal code"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Country*</label>
                  <input
                    type="text"
                    name="country"
                    required
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-highlight/20
                    focus:border-accent focus:outline-none transition-colors duration-300
                    text-white placeholder-gray-400"
                    placeholder="Enter your country"
                  />
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
                    required
                    value={formData.emergencyContact.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-highlight/20
                    focus:border-accent focus:outline-none transition-colors duration-300
                    text-white placeholder-gray-400"
                    placeholder="Emergency contact name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Contact Phone*</label>
                  <input
                    type="tel"
                    name="emergencyContact.phone"
                    required
                    value={formData.emergencyContact.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-highlight/20
                    focus:border-accent focus:outline-none transition-colors duration-300
                    text-white placeholder-gray-400"
                    placeholder="Emergency contact phone"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Relationship*</label>
                  <input
                    type="text"
                    name="emergencyContact.relation"
                    required
                    value={formData.emergencyContact.relation}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-highlight/20
                    focus:border-accent focus:outline-none transition-colors duration-300
                    text-white placeholder-gray-400"
                    placeholder="Relationship with emergency contact"
                  />
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="card">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  id="terms"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className="w-4 h-4 text-accent border-highlight/20 focus:ring-accent"
                />
                <label htmlFor="terms" className="text-sm text-gray-400">
                  I agree to the terms and conditions and understand the booking policy*
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full btn-primary ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Book Now'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Registration;
