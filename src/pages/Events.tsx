import { useState } from 'react';
import { Box, TextField, Typography, InputAdornment } from '@mui/material';
import EventCard from '../components/EventCard';
import SearchIcon from '@mui/icons-material/Search';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  price: number;
  image: string;
  seatsLeft: number;
  organizer: string;
}

const eventData: Event[] = [
  {
    id: 1,
    title: 'Tech Summit 2025',
    description: 'Join us for an exciting tech conference with industry leaders. Experience cutting-edge technologies and network with professionals.',
    date: 'Jul 15, 2025',
    time: '10:00 AM',
    location: 'Dubai',
    price: 541,
    image: '/techfest.png',
    seatsLeft: 98,
    organizer: 'Gullie Global Community Events'
  },
  {
    id: 2,
    title: 'Startup Networking',
    description: 'Network with fellow entrepreneurs and investors. Learn about innovative startup ideas and explore collaboration opportunities.',
    date: 'Jul 20, 2025',
    time: '2:00 PM',
    location: 'Silicon Valley',
    price: 0,
    image: '/startupTalk.png',
    seatsLeft: 48,
    organizer: 'Startup Hub'
  },
  {
    id: 3,
    title: 'AI & ML Workshop',
    description: 'Hands-on workshop on the latest AI and Machine Learning technologies. Perfect for developers and tech enthusiasts.',
    date: 'Aug 1, 2025',
    time: '9:00 AM',
    location: 'New York',
    price: 299,
    image: '/techfest.png',
    seatsLeft: 29,
    organizer: 'Tech Learning Hub'
  }
];

const Events = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = eventData.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 4,
        gap: 2
      }}>
        <Typography 
          variant="h4" 
          component="h1"
          sx={{
            fontWeight: 600,
            fontSize: '1.75rem'
          }}
        >
          Events
        </Typography>
        <Box sx={{ flexGrow: 1, maxWidth: 600 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                </InputAdornment>
              ),
              sx: {
                backgroundColor: '#2d2d2d',
                borderRadius: '8px',
                '& fieldset': {
                  borderColor: 'transparent',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.1) !important',
                },
                '& input': {
                  color: 'white',
                  '&::placeholder': {
                    color: 'rgba(255, 255, 255, 0.5)',
                    opacity: 1
                  }
                }
              }
            }}
          />
        </Box>
      </Box>

      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)'
        },
        gap: 3
      }}>
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </Box>
    </Box>
  );
};

export default Events;