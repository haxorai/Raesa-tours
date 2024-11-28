import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  return (
    <div className="pt-20 min-h-screen bg-primary text-white">
      <div className="container-custom py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-8 text-accent">Privacy Policy</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
              <p className="text-gray-300">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 mt-2 text-gray-300">
                <li>Name and contact information</li>
                <li>Booking and travel preferences</li>
                <li>Payment information</li>
                <li>Communication history</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-300">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 mt-2 text-gray-300">
                <li>Process your bookings and payments</li>
                <li>Communicate with you about your travel arrangements</li>
                <li>Send you promotional offers and updates (with your consent)</li>
                <li>Improve our services and customer experience</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
              <p className="text-gray-300">
                We do not sell or rent your personal information to third parties. We may share your information with:
              </p>
              <ul className="list-disc pl-6 mt-2 text-gray-300">
                <li>Travel service providers necessary to fulfill your booking</li>
                <li>Payment processors to handle transactions</li>
                <li>Legal authorities when required by law</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
              <p className="text-gray-300">
                We implement appropriate security measures to protect your personal information from unauthorized access,
                alteration, disclosure, or destruction. This includes regular security assessments, encrypted data
                transmission, and secure data storage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
              <p className="text-gray-300">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 mt-2 text-gray-300">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
              <p className="text-gray-300">
                If you have any questions about this Privacy Policy or our practices, please contact us at:
                <br />
                Email: privacy@raesatours.com
                <br />
                Phone: +91 123-456-7890
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Updates to This Policy</h2>
              <p className="text-gray-300">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
                new Privacy Policy on this page and updating the "Last Updated" date below.
              </p>
              <p className="mt-4 text-sm text-gray-400">
                Last Updated: January 2024
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
