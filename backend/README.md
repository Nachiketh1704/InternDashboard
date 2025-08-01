# Intern Dashboard Backend

A Node.js Express.js backend for the Intern Dashboard application with MongoDB integration.

## Features

- Express.js REST API
- MongoDB integration with Mongoose ODM
- CORS enabled for frontend communication
- Status check endpoints
- User and leaderboard data endpoints
- Error handling and logging

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the backend directory with the following variables:

```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=intern_dashboard
PORT=8000
```

## Running the Server

### Development mode (with auto-restart):

```bash
npm run dev
```

### Production mode:

```bash
npm start
```

The server will start on port 8000 (or the port specified in your .env file).

## API Endpoints

### Base URL: `http://localhost:8000/api`

- `GET /` - Hello World message
- `GET /user` - Get current user data
- `GET /leaderboard` - Get leaderboard data
- `POST /status` - Create a new status check
- `GET /status` - Get all status checks

## Environment Variables

- `MONGO_URL`: MongoDB connection string (default: mongodb://localhost:27017)
- `DB_NAME`: Database name (default: intern_dashboard)
- `PORT`: Server port (default: 8000)

## Database Schema

### StatusCheck

- `id`: String (UUID)
- `client_name`: String (required)
- `timestamp`: Date (auto-generated)

## Error Handling

The server includes comprehensive error handling for:

- Database connection errors
- Invalid request data
- Server errors
- 404 routes

## Graceful Shutdown

The server handles graceful shutdown on SIGINT and SIGTERM signals, properly closing the MongoDB connection.
