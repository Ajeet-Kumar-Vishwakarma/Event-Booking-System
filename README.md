# Event Booking Frontend

The frontend application for the Event Booking System, built with React, TypeScript, and Material-UI.

## Current Implementation Status

This is currently a frontend-only implementation using mock data. The application demonstrates the UI and interactions without a backend server.

### Mock Data Implementation
- Events, users, and bookings are stored in `mockData.ts`
- Data is not persisted between sessions
- Actions like creating events or making bookings will only work with the mock data

## Features

### Event Management
- View all events in a responsive grid layout
- Filter events by availability and date
- Create new events with:
  - Title and description
  - Date and time selection
  - Location
  - Price configuration
  - Total seats availability

### User Management
- Display user information
- View user's event bookings
- Basic user data stored in mock data:
  - Name
  - Email

### Booking Management
- View all bookings
- Basic booking information includes:
  - Event details
  - User information
  - Booking date

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Layout.tsx      # Main layout with navigation
│   ├── EventCard.tsx   # Event display card
│   └── CreateEventModal.tsx  # Event creation form
├── pages/              # Page components
│   ├── Events.tsx      # Events listing page
│   ├── Users.tsx       # User management page
│   └── Bookings.tsx    # Bookings listing page
└── mockData.ts         # Mock data for events, users, and bookings
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The application will be available at http://localhost:3001

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Runs the test suite
- `npm eject` - Ejects from Create React App

## Dependencies

- React
- TypeScript
- Material-UI (MUI)
- React Router DOM
- Date-fns

## Theme

The application uses a custom dark theme with:
- Primary color: #7c4dff (Purple)
- Secondary color: #4caf50 (Green)
- Background: #1a1a1a (Dark)
- Paper background: #2d2d2d
- Custom styled components for consistent UI

## Future Improvements

To make the application fully functional, the following improvements are needed:
- Implementation of a backend server
- Real database integration
- User authentication and authorization
- Persistent data storage
- Image upload functionality
- Advanced filtering and search capabilities