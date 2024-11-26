import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaInstagram, FaFacebook, FaClock, FaHeadset } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setIsSubmitting(false);
      alert('Thank you for your message! Our adventure guides will contact you soon.');
    }, 1500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const contactInfo = [
    {
      icon: <FaHeadset className="text-4xl text-accent" />,
      title: '24/7 Support',
      details: 'Always here to help',
      subDetails: '+91 123 456 7890',
    },
    {
      icon: <FaEnvelope className="text-4xl text-accent" />,
      title: 'Email Us',
      details: 'Quick Response Time',
      subDetails: 'adventures@raesatours.com',
    },
    {
      icon: <FaMapMarkerAlt className="text-4xl text-accent" />,
      title: 'Visit Us',
      details: 'Main Office',
      subDetails: 'Boulevard Road, Srinagar, Kashmir',
    },
    {
      icon: <FaClock className="text-4xl text-accent" />,
      title: 'Working Hours',
      details: 'Mon - Sat: 9AM - 7PM',
      subDetails: 'Sunday: 10AM - 5PM',
    },
  ];

  const socialLinks = [
    { icon: <FaWhatsapp />, label: 'WhatsApp', link: '#' },
    { icon: <FaInstagram />, label: 'Instagram', link: '#' },
    { icon: <FaFacebook />, label: 'Facebook', link: '#' },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-highlight/20 z-0" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-gaming font-bold mb-6">
              Begin Your <span className="text-accent">Adventure</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Ready to explore the paradise on Earth? Our adventure guides are here to craft
              your perfect Kashmir experience. Let's make your dream journey a reality.
            </p>
            <div className="flex justify-center space-x-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.link}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center
                  text-accent hover:bg-accent hover:text-white transition-all duration-300"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-secondary/50 backdrop-blur-sm p-8 rounded-2xl border border-highlight/20
                hover:border-accent/50 transition-all duration-300 group"
              >
                <div className="flex justify-center items-center mb-6">
                  <div className="w-16 h-16 bg-accent/20 rounded-xl flex items-center justify-center
                  group-hover:bg-accent/30 transition-all duration-300">
                    {info.icon}
                  </div>
                </div>
                <h3 className="text-xl font-gaming font-semibold mb-2 text-center">
                  {info.title}
                </h3>
                <p className="text-gray-400 text-center mb-1">{info.details}</p>
                <p className="text-accent text-center">{info.subDetails}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-highlight/10 z-0" />
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-secondary/50 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-highlight/20"
            >
              <h2 className="text-3xl font-gaming font-bold text-center mb-8">
                Drop Your <span className="text-accent">Suggestions</span>
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-gaming mb-2">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-highlight/20
                      focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none
                      transition-colors duration-300 text-white placeholder-gray-400"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-gaming mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-highlight/20
                      focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none
                      transition-colors duration-300 text-white placeholder-gray-400"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-gaming mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-highlight/20
                      focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none
                      transition-colors duration-300 text-white placeholder-gray-400"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-gaming mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-highlight/20
                      focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none
                      transition-colors duration-300 text-white placeholder-gray-400"
                      placeholder="Enter message subject"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-gaming mb-2">Your Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-highlight/20
                    focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none
                    transition-colors duration-300 text-white placeholder-gray-400 resize-none"
                    placeholder="Tell us about your dream Kashmir adventure..."
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 px-6 bg-accent text-white font-gaming rounded-lg
                  hover:bg-accent/90 transform transition-all duration-300
                  focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50
                  shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending Message...' : 'Submit Suggestions'}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
