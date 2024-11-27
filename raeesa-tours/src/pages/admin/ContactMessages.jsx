import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaCheck, FaReply, FaTrash } from 'react-icons/fa';

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [adminNote, setAdminNote] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }

      const data = await response.json();
      setMessages(data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateMessageStatus = async (id, status) => {
    try {
      const response = await fetch(`http://localhost:5000/api/contact/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status, adminNotes: adminNote })
      });

      if (!response.ok) {
        throw new Error('Failed to update message status');
      }

      // Refresh messages
      fetchMessages();
      setSelectedMessage(null);
      setAdminNote('');
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/contact/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete message');
      }

      // Refresh messages
      fetchMessages();
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-primary pt-20 flex items-center justify-center">
      <div className="text-white">Loading...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-primary pt-20 pb-20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <h1 className="text-4xl font-gaming font-bold mb-8 text-center text-white">
            Contact Messages
          </h1>

          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-center">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Messages List */}
            <div className="space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message._id}
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 rounded-lg bg-secondary/50 backdrop-blur-sm border 
                    ${message.status === 'new' ? 'border-accent' : 'border-highlight/20'}
                    cursor-pointer transition-all duration-300
                    ${selectedMessage?._id === message._id ? 'ring-2 ring-accent' : ''}`}
                  onClick={() => setSelectedMessage(message)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-white">{message.name}</h3>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      message.status === 'new' ? 'bg-accent/20 text-accent' :
                      message.status === 'read' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {message.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300">{message.email}</p>
                  <p className="text-sm text-gray-400 mt-2">{message.subject}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(message.createdAt).toLocaleString()}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Message Details */}
            {selectedMessage ? (
              <div className="p-6 rounded-lg bg-secondary/50 backdrop-blur-sm border border-highlight/20">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-gaming text-white">{selectedMessage.subject}</h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => updateMessageStatus(selectedMessage._id, 'read')}
                      className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                      title="Mark as Read"
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={() => updateMessageStatus(selectedMessage._id, 'replied')}
                      className="p-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30"
                      title="Mark as Replied"
                    >
                      <FaReply />
                    </button>
                    <button
                      onClick={() => deleteMessage(selectedMessage._id)}
                      className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30"
                      title="Delete Message"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400">From:</p>
                    <p className="text-white">{selectedMessage.name} ({selectedMessage.email})</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400">Message:</p>
                    <p className="text-white whitespace-pre-wrap">{selectedMessage.message}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400">Admin Notes:</p>
                    <textarea
                      value={adminNote}
                      onChange={(e) => setAdminNote(e.target.value)}
                      className="w-full px-4 py-3 mt-2 rounded-lg bg-white/10 border border-highlight/20
                        focus:border-accent focus:outline-none transition-colors duration-300
                        text-white placeholder-gray-400"
                      placeholder="Add admin notes here..."
                      rows="3"
                    />
                  </div>

                  <button
                    onClick={() => updateMessageStatus(selectedMessage._id, selectedMessage.status)}
                    className="w-full py-2 px-4 bg-accent text-white rounded-lg hover:bg-accent/80
                      transition-colors duration-300"
                  >
                    Save Notes
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-lg bg-secondary/50 backdrop-blur-sm border border-highlight/20
                flex items-center justify-center text-gray-400">
                <p>Select a message to view details</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactMessages;
