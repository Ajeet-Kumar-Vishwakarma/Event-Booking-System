import { Box, Typography, Card, Avatar, Chip } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface Booking {
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

const bookingsData: Booking[] = [
  {
    id: 1,
    eventTitle: 'Tech Summit 2025',
    eventImage: '/techfest.png',
    date: 'Jul 15, 2025',
    time: '10:00 AM',
    location: 'Dubai',
    user: {
      name: 'Aditi Sharma',
      email: 'aditi@example.com'
    },
    status: 'confirmed'
  },
  {
    id: 2,
    eventTitle: 'Startup Networking',
    eventImage: '/startupTalk.png',
    date: 'Jul 20, 2025',
    time: '2:00 PM',
    location: 'Silicon Valley',
    user: {
      name: 'John Doe',
      email: 'john@example.com'
    },
    status: 'pending'
  },
  {
    id: 3,
    eventTitle: 'AI & ML Workshop',
    eventImage: '/techfest.png',
    date: 'Aug 1, 2025',
    time: '9:00 AM',
    location: 'New York',
    user: {
      name: 'Sarah Wilson',
      email: 'sarah@example.com'
    },
    status: 'confirmed'
  }
];

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
  return (
    <Box>
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
    </Box>
  );
};

export default Bookings;