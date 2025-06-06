# Event Booking System

A full-stack event booking application that allows users to create, manage, and book events.

## Features

- Event management with search functionality
- User management system
- Booking tracking with status indicators
- Dark-themed modern UI

## Project Structure

```
.
├── frontend/         # React frontend application
│   ├── src/         # Source code
│   ├── public/      # Static assets
│   └── README.md    # Frontend documentation
└── README.md        # Main project documentation
```

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd event-booking-system
```

2. Start the frontend:
```bash
cd frontend
npm install
npm start
```

The application will be available at http://localhost:3001

## Tech Stack

- Frontend:
  - React with TypeScript
  - Material-UI (MUI) for components
  - React Router for navigation

## Features

### Events
- View all events with search functionality
- Create new events with detailed information
- Display event pricing, dates, and availability

### Users
- User management interface
- Track events booked by each user
- Add, edit, and remove users

### Bookings
- View all event bookings
- Track booking status (Confirmed/Pending)
- Display booking details with user information
