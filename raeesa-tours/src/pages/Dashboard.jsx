import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendar, FaHome } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext'; 

const Dashboard = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchDestination, setSearchDestination] = useState('');
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
  const { user } = useAuth();

  const fetchRegistrations = async () => {
    try {
      const token = localStorage.getItem('token');
      let url = `http://localhost:5000/api/registrations?page=${currentPage}`;
      
      if (searchDestination) {
        url += `&destination=${encodeURIComponent(searchDestination)}`;
      }
      if (dateRange.startDate && dateRange.endDate) {
        url += `&startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`;
      }

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch registrations');
      }

      setRegistrations(data.data);
      setTotalPages(data.totalPages);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, [currentPage, searchDestination, dateRange]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchRegistrations();
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 pb-20 bg-primary flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 pb-20 bg-primary flex items-center justify-center">
        <div className="text-red-400 text-xl">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-20 bg-primary">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-gaming font-bold mb-6 text-center">
            Registration Dashboard
          </h1>

          {/* Search Form */}
          <div className="card mb-8">
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Destination</label>
                <input
                  type="text"
                  value={searchDestination}
                  onChange={(e) => setSearchDestination(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-highlight/20
                  focus:border-accent focus:outline-none transition-colors duration-300
                  text-white placeholder-gray-400"
                  placeholder="Search by destination"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Start Date</label>
                <input
                  type="date"
                  value={dateRange.startDate}
                  onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-highlight/20
                  focus:border-accent focus:outline-none transition-colors duration-300
                  text-white placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">End Date</label>
                <input
                  type="date"
                  value={dateRange.endDate}
                  onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-highlight/20
                  focus:border-accent focus:outline-none transition-colors duration-300
                  text-white placeholder-gray-400"
                />
              </div>
              <div className="md:col-span-3 flex justify-center">
                <button
                  type="submit"
                  className="px-8 py-2 bg-accent hover:bg-accent/80 text-white rounded-lg
                  transition-colors duration-300 font-medium"
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          {/* Registrations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {registrations.map((registration) => (
              <motion.div
                key={registration._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                    <FaUser className="text-accent text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-gaming">
                      {registration.firstName} {registration.lastName}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Booking ID: {registration._id}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <FaEnvelope className="text-accent" />
                    <span>{registration.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaPhone className="text-accent" />
                    <span>{registration.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaMapMarkerAlt className="text-accent" />
                    <span>{registration.destination}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCalendar className="text-accent" />
                    <span>
                      {registration.departureDate} - {registration.returnDate}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-highlight/20">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Room Type:</span>
                      <p className="capitalize">{registration.roomType}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Meal Preference:</span>
                      <p className="capitalize">{registration.mealPreference}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Guests:</span>
                      <p>{registration.adults} Adults, {registration.children} Children</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Emergency Contact:</span>
                      <p>{registration.emergencyContact.name}</p>
                    </div>
                  </div>
                </div>

                {/* Address Details Section */}
                <div className="mt-4 pt-4 border-t border-highlight/20">
                  <h4 className="text-lg font-gaming mb-3 flex items-center gap-2">
                    <FaHome className="text-accent" />
                    Address Details
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="col-span-2">
                      <span className="text-gray-400">Street Address:</span>
                      <p>{registration.streetAddress}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">City:</span>
                      <p>{registration.city}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">State/Province:</span>
                      <p>{registration.stateProvince}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Postal Code:</span>
                      <p>{registration.postalCode}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Country:</span>
                      <p>{registration.country}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                    currentPage === page
                      ? 'bg-accent text-white'
                      : 'bg-white/10 text-white hover:bg-accent/20'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
