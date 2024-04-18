# IIT Bhubaneswar Guest House Booking System

Welcome to the GitHub repository for the IIT Bhubaneswar Guest House Booking System. This web-based platform is designed to streamline the reservation process for accommodations within the Institute guest house, catering to the needs of both students and faculty members

**Application URL:** [https://iitbbs-guest-house-booking.vercel.app/](https://iitbbs-guest-house-booking.vercel.app/)

## Features

- **User Authentication**: Secure login with Gmail credentials.
- **Room Booking**: Browse and book available rooms with preferences.
- **Booking Management**: Dashboard for current and past bookings.
- **Faculty Approval**: Faculty members can approve student bookings.

## Benefits

- **Streamlined Process**: Simplifies the reservation process.
- **Transparency**: Promotes accountability in the booking process.
- **Enhanced Experience**: User-friendly interface and functionalities.

## Getting Started

### Installation

1. Clone the repo

`git clone https://github.com/bhanvara/iitbbs-guest-house-booking` 

2. Install NPM packages

`npm install`

This runs the app in development mode at http://localhost:3000.

To start the backend server (located in the server folder):

`cd server`
`npm start`

The server runs by default at port 3001.

### Scripts
- `npm start`: Runs the app in development mode.
- `npm test`: Launches the test runner.
- `npm run build`: Builds the app for production.
- `npm run eject`: Removes the build dependency from your project.

## Environment Variables

The application uses environment variables for configuration. These are stored in the `.env` file in the root directory and the `server/` directory.

### Root Directory .env

This file contains the configuration for the React application and Auth0. Here's a template for the root directory `.env` file:

REACT_APP_API_URL=<your_api_url>
REACT_APP_AUTH0_DOMAIN=<your_auth0_domain>
REACT_APP_AUTH0_CLIENT_ID=<your_auth0_client_id>
REACT_APP_AUTH0_AUDIENCE=<your_auth0_audience>

Replace <your_api_url>, <your_auth0_domain>, <your_auth0_client_id>, and <your_auth0_audience> with your actual values.

### Server Directory .env

This file contains the configuration for the database and Auth0. Here's a template for the server/.env file:

DB_HOST=<your_database_host>
DB_USER=<your_database_user>
DB_PASSWORD=<your_database_password>
DB_NAME=<your_database_name>
DB_PORT=<your_database_port>
AUTH0_AUDIENCE=<your_auth0_audience>
AUTH0_DOMAIN=<your_auth0_domain>

Replace <your_database_host>, <your_database_user>, <your_database_password>, <your_database_name>, <your_database_port>, <your_auth0_audience>, and <your_auth0_domain> with your actual values.

Note: Never commit your .env files. They are included in the .gitignore file to prevent them from being checked into version control.