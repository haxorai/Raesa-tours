import { motion } from 'framer-motion';
import { FaHeart, FaCompass, FaUsers } from 'react-icons/fa';
import team from '../assets/images/team.jpeg';
const About = () => {
  const values = [
    {
      icon: <FaHeart className="text-4xl text-accent" />,
      title: 'Passion',
      description: 'We are passionate about showcasing the beauty of Kashmir and creating unforgettable experiences for our guests.',
    },
    {
      icon: <FaCompass className="text-4xl text-accent" />,
      title: 'Excellence',
      description: 'We strive for excellence in every aspect of our service, ensuring the highest quality experience for our travelers.',
    },
    {
      icon: <FaUsers className="text-4xl text-accent" />,
      title: 'Community',
      description: 'We believe in supporting local communities and promoting sustainable tourism practices in Kashmir.',
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-gaming font-bold mb-6">
              Our Story
            </h1>
            <p className="text-xl text-gray-400">
              Raeesa Tour and Travels has been crafting exceptional travel experiences
              in Kashmir since 2010. Our journey began with a simple mission: to share
              the breathtaking beauty and rich culture of Kashmir with the world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 gaming-gradient">
        <div className="container-custom">
          <h2 className="section-title">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="card text-center"
              >
                <div className="flex justify-center items-center mb-4">
                  <div className="w-16 h-16 bg-accent/20 rounded-xl flex items-center justify-center group-hover:bg-accent/30 transition-all duration-300">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-xl font-gaming font-semibold mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container-custom">
          <h2 className="section-title">Meet Our Team</h2>
          <div className="max-w-3xl mx-auto mt-8 text-center">
            <p className="text-gray-400 mb-8">
              Our team consists of experienced travel professionals who are passionate
              about Kashmir and committed to providing exceptional service. With years
              of experience and deep local knowledge, we ensure that every journey with
              us is special and memorable.
            </p>
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              src={team}
              alt="Our Team"
              className="w-full h-96 object-cover rounded-xl"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
