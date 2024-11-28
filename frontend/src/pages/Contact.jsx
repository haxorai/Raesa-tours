import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaInstagram, FaFacebook, FaClock, FaHeadset } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [validationErrors, setValidationErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    // Name validation
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
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

    // Subject validation
    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required';
      isValid = false;
    }

    // Message validation
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters long';
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear validation error when user starts typing
    setValidationErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset submission states
    setSubmitError('');
    setSubmitSuccess('');

    // Validate form before submission
    if (!validateForm()) {
      setSubmitError('Please correct the errors in the form');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message');
      }

      // Clear form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      setSubmitSuccess(data.message || 'Message sent successfully!');
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
      setSubmitError(error.message || 'Failed to send message. Please try again.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <FaHeadset className="text-4xl text-accent" />,
      title: '24/7 Support',
      details: 'Always here to help',
      subDetails: '+91 7006276358',
    },
    {
      icon: <FaEnvelope className="text-4xl text-accent" />,
      title: 'Email Us',
      details: 'Quick Response Time',
      subDetails: 'raeesatt.help@gmail.com',
    },
    {
      icon: <FaMapMarkerAlt className="text-4xl text-accent" />,
      title: 'Visit Us',
      details: 'Main Office',
      subDetails: 'Syed Mohalla, Ziyarat Batmaloo, Srinagar, Kashmir',
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
    <div className="min-h-screen pt-20 pb-20 bg-primary">
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

              {/* Contact Form */}
              <div className="mt-12">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-2">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${
                          validationErrors.name ? 'border-red-500' : 'border-highlight/20'
                        } focus:border-accent focus:outline-none transition-colors duration-300
                        text-white placeholder-gray-400`}
                        placeholder="Enter your name"
                      />
                      {validationErrors.name && (
                        <p className="mt-1 text-sm text-red-500">{validationErrors.name}</p>
                      )}
                    </div>

                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
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
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${
                        validationErrors.subject ? 'border-red-500' : 'border-highlight/20'
                      } focus:border-accent focus:outline-none transition-colors duration-300
                      text-white placeholder-gray-400`}
                      placeholder="Enter subject"
                    />
                    {validationErrors.subject && (
                      <p className="mt-1 text-sm text-red-500">{validationErrors.subject}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${
                        validationErrors.message ? 'border-red-500' : 'border-highlight/20'
                      } focus:border-accent focus:outline-none transition-colors duration-300
                      text-white placeholder-gray-400`}
                      placeholder="Enter your message"
                    />
                    {validationErrors.message && (
                      <p className="mt-1 text-sm text-red-500">{validationErrors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 rounded-lg font-medium transition-colors duration-300
                    ${isSubmitting
                      ? 'bg-accent/50 cursor-not-allowed'
                      : 'bg-accent hover:bg-accent/80'}`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
