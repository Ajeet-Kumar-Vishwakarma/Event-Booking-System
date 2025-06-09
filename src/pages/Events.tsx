import { useState } from 'react';
import { Box, TextField, Typography, InputAdornment, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import EventCard from '../components/EventCard';
import SearchIcon from '@mui/icons-material/Search';
import { events } from '../mockData';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  price: number;
  image: string;
  totalSeats: number;
  bookedSeats: number;
  organizer: string;
}

type AvailabilityFilter = 'all' | 'available' | 'few' | 'full';

const Events = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState<AvailabilityFilter>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');

  const filteredEvents = events.filter((event: Event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesAvailability =
      availabilityFilter === 'all' ||
      (availabilityFilter === 'available' && (event.totalSeats - event.bookedSeats) > 0) ||
      (availabilityFilter === 'few' && (event.totalSeats - event.bookedSeats) > 0 && (event.totalSeats - event.bookedSeats) <= 10) ||
      (availabilityFilter === 'full' && event.totalSeats === event.bookedSeats);

    const matchesDate =
      dateFilter === 'all' ||
      (dateFilter === 'upcoming' && new Date(event.date) > new Date()) ||
      (dateFilter === 'today' && new Date(event.date).toDateString() === new Date().toDateString());

    return matchesSearch && matchesAvailability && matchesDate;
  });

  return (
    <Box>
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'stretch', sm: 'center' },
        mb: { xs: 3, sm: 4 },
        gap: 2
      }}>
        <Typography 
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 600,
            fontSize: { xs: '1.5rem', sm: '1.75rem' },
            mb: { xs: 1, sm: 0 }
          }}
        >
          Events
        </Typography>
        <Box sx={{
          display: 'flex',
          gap: 2,
          flexGrow: 1,
          flexDirection: { xs: 'column', sm: 'row' },
          maxWidth: { xs: '100%', sm: '800px' }
        }}>
          <FormControl
            size="small"
            sx={{
              minWidth: { xs: '100%', sm: 200 },
              backgroundColor: '#2d2d2d',
              borderRadius: '8px',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'transparent'
              },
              '& .MuiSelect-select': {
                color: 'white'
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(255, 255, 255, 0.7)'
              },
              '& .MuiSvgIcon-root': {
                color: 'rgba(255, 255, 255, 0.7)'
              }
            }}
          >
            <InputLabel>Availability</InputLabel>
            <Select
              value={availabilityFilter}
              label="Availability"
              onChange={(e) => setAvailabilityFilter(e.target.value as AvailabilityFilter)}
            >
              <MenuItem value="all">All Events</MenuItem>
              <MenuItem value="available">Available</MenuItem>
              <MenuItem value="few">Few Seats Left</MenuItem>
              <MenuItem value="full">Sold Out</MenuItem>
            </Select>
          </FormControl>

          <FormControl
            size="small"
            sx={{
              minWidth: { xs: '100%', sm: 200 },
              backgroundColor: '#2d2d2d',
              borderRadius: '8px',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'transparent'
              },
              '& .MuiSelect-select': {
                color: 'white'
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(255, 255, 255, 0.7)'
              },
              '& .MuiSvgIcon-root': {
                color: 'rgba(255, 255, 255, 0.7)'
              }
            }}
          >
            <InputLabel>Date</InputLabel>
            <Select
              value={dateFilter}
              label="Date"
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <MenuItem value="all">All Dates</MenuItem>
              <MenuItem value="upcoming">Upcoming</MenuItem>
              <MenuItem value="today">Today</MenuItem>
            </Select>
          </FormControl>
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
        gap: { xs: 2, sm: 3 },
        width: '100%'
      }}>
        {filteredEvents.map((event: Event) => (
          <EventCard
            key={event.id}
            event={{
              ...event,
              seatsLeft: event.totalSeats - event.bookedSeats
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Events;