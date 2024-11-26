import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaStar, FaCalendar } from 'react-icons/fa';
import dal from '../assets/images/dal.jpeg';
import doodhpathri from '../assets/images/doodhpathri.jpeg';
import gulmarg from '../assets/images/gulmarg.jpeg';
import pahalgam from '../assets/images/pahalgam.jpeg';
import sonamarg from '../assets/images/sonamarg.jpeg';
import yusmarg from '../assets/images/yusmarg.jpeg';  
import kashmir from '../assets/images/kashmir.jpeg';

const Home = () => {
  const destinations = [
    {
      title: 'Dal Lake',
      image: dal,
      description: 'Experience the serenity of Kashmir\'s crown jewel. Take a Shikara ride through the floating gardens and markets.',
      location: 'Srinagar',
      rating: 4.9,
      duration: '2-3 hours',
      activities: ['Shikara Ride', 'Floating Markets', 'House Boat Stay']
    },
    {
      title: 'Gulmarg',
      image: gulmarg,
      description: 'Asia\'s premier ski resort with the world\'s highest gondola. Perfect for winter sports and summer adventures.',
      location: 'Baramulla',
      rating: 4.8,
      duration: '2-3 days',
      activities: ['Skiing', 'Gondola Ride', 'Golf']
    },
    {
      title: 'Pahalgam',
      image: pahalgam,
      description: 'The Valley of Shepherds offers pristine rivers, meadows, and trekking trails.',
      location: 'Anantnag',
      rating: 4.7,
      duration: '2-3 days',
      activities: ['River Rafting', 'Trekking', 'Horse Riding']
    },
    {
      title: 'Sonamarg',
      image: sonamarg,
      description: 'The Meadow of Gold featuring stunning glaciers, lakes, and flower-filled meadows.',
      location: 'Ganderbal',
      rating: 4.8,
      duration: '1-2 days',
      activities: ['Thajiwas Glacier', 'Camping', 'Photography']
    },
    {
      title: 'Yusmarg',
      image: yusmarg,
      description: 'A hidden gem with rolling meadows and pine forests, perfect for peaceful retreats.',
      location: 'Budgam',
      rating: 4.6,
      duration: '1 day',
      activities: ['Hiking', 'Picnicking', 'Nature Walks']
    },
    {
      title: 'Doodhpathri',
      image: doodhpathri,
      description: 'Valley of Milk with emerald meadows and crystal-clear streams.',
      location: 'Budgam',
      rating: 4.7,
      duration: '1 day',
      activities: ['Meadow Walks', 'Stream Fishing', 'Photography']
    }
  ];

  return (
    <div className="container-custom min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center">
        <div className="absolute w-full h-full">
          <img
            src={kashmir}
            alt="Kashmir landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-screen-xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl font-gaming font-bold mb-6"
          >
            <span className="text-accent">Discover</span>{' '}
            <span className="text-white">Paradise on Earth</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Experience the breathtaking beauty of Kashmir through our curated tours
            and unforgettable adventures.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link to="/registration" className="btn-primary">
              Start Your Journey
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20 bg-primary">
        <div className="container-custom">
          <h2 className="section-title">Popular Destinations</h2>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
            Discover the most enchanting locations in Kashmir, from serene lakes to snow-capped mountains.
            Each destination offers unique experiences and unforgettable memories.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {destinations.map((destination, index) => (
              <motion.div
                key={destination.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card group cursor-pointer"
              >
                <div className="relative h-64 mb-6 overflow-hidden rounded-lg">
                  <img
                    src={destination.image}
                    alt={destination.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                  <div className="absolute top-4 right-4 bg-accent/90 text-white px-3 py-1 rounded-full text-sm font-gaming">
                    <span className="flex items-center gap-1">
                      <FaStar className="text-yellow-300" />
                      {destination.rating}
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-gaming font-semibold">
                      {destination.title}
                    </h3>
                    <span className="text-accent flex items-center gap-1 text-sm">
                      <FaCalendar />
                      {destination.duration}
                    </span>
                  </div>
                  <p className="flex items-center gap-2 text-gray-400">
                    <FaMapMarkerAlt className="text-accent" />
                    {destination.location}
                  </p>
                  <p className="text-gray-400">{destination.description}</p>
                  <div className="pt-4">
                    <h4 className="text-sm font-gaming text-accent mb-2">Popular Activities:</h4>
                    <div className="flex flex-wrap gap-2">
                      {destination.activities.map((activity) => (
                        <span
                          key={activity}
                          className="text-xs bg-highlight/30 border border-highlight/20 
                          px-3 py-1 rounded-full text-gray-300"
                        >
                          {activity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gaming-gradient">
        <div className="container-custom text-center">
          <h2 className="section-title mb-8">Ready for an Adventure?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let us help you plan the perfect Kashmir getaway. Book your tour today
            and create memories that will last a lifetime.
          </p>
          <Link to="/registration" className="btn-primary">
            Book Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
