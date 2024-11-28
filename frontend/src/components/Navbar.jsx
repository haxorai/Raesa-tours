import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Define navigation links based on authentication status
  const getNavLinks = () => {
    if (user?.role === 'admin') {
      return [
        { name: 'Dashboard', path: '/dashboard' }
      ];
    }
    return [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
      { name: 'Contact', path: '/contact' }
    ];
  };

  const navLinks = getNavLinks();

  return (
    <nav className="fixed w-full z-50 bg-primary/90 backdrop-blur-sm border-b border-highlight/20">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          <Link to={user?.role === 'admin' ? '/dashboard' : '/'} className="flex items-center space-x-2">
            <span className="text-2xl font-gaming font-bold text-accent">
              Raeesa
              <span className="text-white"> Tour And Travels</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="nav-link"
              >
                {link.name}
              </Link>
            ))}
            {!user?.role === 'admin' && (
              <Link to="/registration" className="btn-primary">
                Book Now
              </Link>
            )}
            {user ? (
              <button
                onClick={handleLogout}
                className="nav-link text-accent hover:text-accent/80"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="nav-link text-accent hover:text-accent/80">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full bg-secondary border-t border-highlight/20"
          >
            <div className="container-custom py-4">
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="nav-link"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                {!user?.role === 'admin' && (
                  <Link
                    to="/registration"
                    className="btn-primary text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Book Now
                  </Link>
                )}
                {user ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="nav-link text-accent hover:text-accent/80"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="nav-link text-accent hover:text-accent/80"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
