# Raeesa Tours Backend

This is the backend server for the Raeesa Tours website, handling tour registrations and user data.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a .env file in the root directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/raeesa-tours
NODE_ENV=development
```

3. Make sure MongoDB is installed and running on your system.

4. Start the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

## API Endpoints

### Registrations

- **POST /api/registrations**
  - Create a new tour registration
  - Body: Registration data (see schema)

- **GET /api/registrations**
  - Get all registrations (admin route)

- **GET /api/registrations/:id**
  - Get a specific registration by ID

## Schema

The registration schema includes:
- Personal Information (name, email, phone)
- Tour Details (destination, dates, number of travelers)
- Accommodation (room type, meal preferences)
- Emergency Contact
- ID Information
- Address Details

For detailed schema information, see `models/Registration.js`.
