import { Box, Typography, Card, Avatar, Chip } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {
  bookings as mockBookings,
  events as mockEvents,
  users as mockUsers,
  Event,
  User
} from '../mockData';
import Layout from '../components/Layout';

const STORED_BOOKINGS_KEY = 'eventBookingSystem_bookings';
const STORED_EVENTS_KEY = 'eventBookingSystem_events';
const STORED_USERS_KEY = 'eventBookingSystem_users';

interface DisplayBooking {
  id: number;
  eventTitle: string;
  eventImage: string;
  date: string;
  time: string;
  location: string;
  user: {
    name: string;
    email: string;
  };
  status: 'confirmed' | 'pending' | 'cancelled';
}

const processBookings = (): DisplayBooking[] => {
  // Get stored data
  const storedBookings = localStorage.getItem(STORED_BOOKINGS_KEY);
  const storedEvents = localStorage.getItem(STORED_EVENTS_KEY);
  const storedUsers = localStorage.getItem(STORED_USERS_KEY);

  // Combine mock and stored data
  const allBookings = [...mockBookings];
  if (storedBookings) {
    allBookings.push(...JSON.parse(storedBookings));
  }

  // Get events and users data
  const allEvents = storedEvents ? JSON.parse(storedEvents) : mockEvents;
  const allUsers = storedUsers ? JSON.parse(storedUsers) : mockUsers;

  // Filter out bookings for deleted events and users
  const validBookings = allBookings.filter(booking => {
    const eventExists = allEvents.some((e: Event) => e.id === booking.eventId);
    const userExists = allUsers.some((u: User) => u.id === booking.userId);
    return eventExists && userExists;
  });

  // Convert valid bookings to display format
  return validBookings.map(booking => {
    const event = allEvents.find((e: Event) => e.id === booking.eventId)!;
    const user = allUsers.find((u: User) => u.id === booking.userId)!;

    return {
      id: booking.id,
      eventTitle: event.title,
      eventImage: event.image,
      date: event.date,
      time: event.time,
      location: event.location,
      user: {
        name: user.name,
        email: user.email
      },
      status: new Date(booking.bookingDate) > new Date() ? 'pending' : 'confirmed'
    };
  });
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed':
      return '#4caf50';
    case 'pending':
      return '#ff9800';
    case 'cancelled':
      return '#f44336';
    default:
      return '#4caf50';
  }
};

const Bookings = () => {
  const bookingsData = processBookings();

  return (
    <Layout>
      <Typography 
        variant="h4" 
        component="h1"
        sx={{
          fontWeight: 600,
          fontSize: '1.75rem',
          mb: 4
        }}
      >
        Bookings
      </Typography>

      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          md: 'repeat(2, 1fr)'
        },
        gap: 3
      }}>
        {bookingsData.map((booking) => (
          <Card
            key={booking.id}
            sx={{
              display: 'flex',
              backgroundColor: '#2d2d2d',
              borderRadius: '12px',
              overflow: 'hidden'
            }}
          >
            <Box
              component="img"
              src={booking.eventImage}
              alt={booking.eventTitle}
              sx={{
                width: 140,
                height: '100%',
                objectFit: 'cover'
              }}
            />
            <Box sx={{ flex: 1, p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography 
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    color: 'white'
                  }}
                >
                  {booking.eventTitle}
                </Typography>
                <Chip
                  label={booking.status}
                  size="small"
                  sx={{
                    backgroundColor: `${getStatusColor(booking.status)}20`,
                    color: getStatusColor(booking.status),
                    fontWeight: 500,
                    textTransform: 'capitalize'
                  }}
                />
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <AccessTimeIcon sx={{ fontSize: 16, mr: 1, color: 'rgba(255, 255, 255, 0.5)' }} />
                <Typography 
                  variant="body2"
                  sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                >
                  {booking.date} • {booking.time}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationOnIcon sx={{ fontSize: 16, mr: 1, color: 'rgba(255, 255, 255, 0.5)' }} />
                <Typography 
                  variant="body2"
                  sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                >
                  {booking.location}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                  sx={{
                    width: 24,
                    height: 24,
                    bgcolor: '#7c4dff',
                    fontSize: '0.875rem',
                    fontWeight: 500
                  }}
                >
                  {booking.user.name.charAt(0)}
                </Avatar>
                <Box sx={{ ml: 1 }}>
                  <Typography 
                    variant="body2"
                    sx={{ 
                      color: 'white',
                      fontWeight: 500,
                      fontSize: '0.875rem'
                    }}
                  >
                    {booking.user.name}
                  </Typography>
                  <Typography 
                    variant="body2"
                    sx={{ 
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontSize: '0.75rem'
                    }}
                  >
                    {booking.user.email}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Card>
        ))}
      </Box>
    </Layout>
  );
};

export default Bookings;