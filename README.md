# Crime DBMS
Crime DBMS is a comprehensive database management system designed for efficient crime record management and reporting. It features a robust Node.js backend with a MySQL/PostgreSQL database for secure data storage, paired with a React Native mobile application (built with Expo) that provides officers and administrators with real-time access to crime records, case management, and reporting tools across iOS and Android platforms.

## Features

- **Database Management**: Secure storage and management of crime records
- **User-Friendly Interface**: React Native app for easy access and navigation
- **Backend API**: RESTful API built with Node.js and Express
- **Real-time Updates**: Live data synchronization
- **Cross-Platform**: Works on both iOS and Android via Expo

## Project Structure

```
crime-DBMS/
├── backend/              # Node.js server and database
│   ├── database.js       # Database configuration
│   ├── schema.sql        # Database schema
│   ├── seed_db.js        # Database seeding script
│   ├── server.js         # Express server
│   ├── update_db.js      # Database update utilities
│   └── package.json      # Backend dependencies
└── frontend/             # React Native (Expo) application
    ├── app/              # App screens and navigation
    ├── components/       # Reusable components
    ├── assets/           # Images and media
    ├── constants/        # App constants
    ├── hooks/            # Custom React hooks
    ├── package.json      # Frontend dependencies
    └── tsconfig.json     # TypeScript configuration
```

## Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Expo CLI** (for mobile development)
- **MySQL/PostgreSQL** (or your preferred database)

## Installation

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   - Create a new database
   - Run the schema file:
   ```bash
   npm run setup-db
   ```

4. Seed the database (optional):
   ```bash
   node seed_db.js
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Expo CLI globally (if not already installed):
   ```bash
   npm install -g expo-cli
   ```

## Running the Project

### Start the Backend Server

```bash
cd backend
npm start
```

The server will run on `http://localhost:3000` (or your configured port).

### Start the Frontend App

```bash
cd frontend
npm start
```

Follow the Expo CLI instructions to open the app on your device or simulator.

## Technologies Used

### Backend
- Node.js
- Express.js
- MySQL/PostgreSQL
- JavaScript

### Frontend
- React Native
- Expo
- TypeScript
- React Navigation

## Database Schema

The database includes tables for:
- Crime Records
- Users/Officers
- Locations
- Categories
- And more...

Refer to schema.sql for detailed schema information.

## API Endpoints

See the backend documentation or API files for complete endpoint details.
