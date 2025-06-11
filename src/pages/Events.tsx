import { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import EventCard from '../components/EventCard';
import CreateEventModal from '../components/CreateEventModal';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import { events as mockEvents } from '../mockData';
import Layout from '../components/Layout';

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

const STORED_EVENTS_KEY = 'eventBookingSystem_events';
const STORED_BOOKINGS_KEY = 'eventBookingSystem_bookings';

const Events = () => {
  const [events, setEvents] = useState<Event[]>(() => {
    const storedEvents = localStorage.getItem(STORED_EVENTS_KEY);
    return storedEvents ? JSON.parse(storedEvents) : mockEvents;
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState<AvailabilityFilter>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [deleteEventId, setDeleteEventId] = useState<number | null>(null);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteError, setDeleteError] = useState('');

  const updateEvents = (newEvents: Event[]) => {
    setEvents(newEvents);
    localStorage.setItem(STORED_EVENTS_KEY, JSON.stringify(newEvents));
  };

  const handleDeleteEvent = () => {
    if (!deleteEventId) return;
    
    // Check password (in a real app, this would be a proper auth check)
    if (deletePassword !== 'admin123') {
      setDeleteError('Incorrect password');
      return;
    }

    // Remove event
    const updatedEvents = events.filter((e: Event) => e.id !== deleteEventId);
    updateEvents(updatedEvents);

    // Remove associated bookings
    const storedBookings = localStorage.getItem(STORED_BOOKINGS_KEY);
    if (storedBookings) {
      const bookings = JSON.parse(storedBookings);
      const updatedBookings = bookings.filter((booking: any) => booking.eventId !== deleteEventId);
      localStorage.setItem(STORED_BOOKINGS_KEY, JSON.stringify(updatedBookings));
    }

    // Reset state
    setDeleteEventId(null);
    setDeletePassword('');
    setDeleteError('');
  };

  const handleCloseDeleteDialog = () => {
    setDeleteEventId(null);
    setDeletePassword('');
    setDeleteError('');
  };

  const handleBookEvent = (eventId: number, userId: number) => {
    // Get existing bookings
    const storedBookings = localStorage.getItem(STORED_BOOKINGS_KEY);
    const existingBookings = storedBookings ? JSON.parse(storedBookings) : [];

    // Create new booking
    const newBooking = {
      id: existingBookings.length + 1000,
      userId,
      eventId,
      bookingDate: new Date().toISOString()
    };

    // Update bookings in localStorage
    const updatedBookings = [...existingBookings, newBooking];
    localStorage.setItem(STORED_BOOKINGS_KEY, JSON.stringify(updatedBookings));

    // Update event seats
    const updatedEvents = events.map((event: Event) =>
      event.id === eventId 
        ? { ...event, bookedSeats: event.bookedSeats + 1 }
        : event
    );
    updateEvents(updatedEvents);
  };

  const handleCreateEvent = (eventData: any) => {
    // Convert File to string URL if an image was uploaded
    const imageUrl = eventData.image instanceof File
      ? URL.createObjectURL(eventData.image)
      : "/techfest.png";

    const newEvent: Event = {
      ...eventData,
      id: events.length + 1000,
      bookedSeats: 0,
      organizer: "Current User",
      image: imageUrl
    };
    
    updateEvents([...events, newEvent]);
    setIsCreateModalOpen(false);
  };

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
    <Layout onCreateEvent={() => setIsCreateModalOpen(true)}>
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
          <Box key={event.id} sx={{ position: 'relative' }}>
            <Box sx={{ position: 'absolute', top: 8, left: 8, zIndex: 1 }}>
              <IconButton
                sx={{
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  padding: '8px',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    border: '2px solid rgba(255, 255, 255, 0.5)'
                  }
                }}
                onClick={() => setDeleteEventId(event.id)}
              >
                <DeleteIcon sx={{ color: 'rgba(255, 255, 255, 0.8)' }} />
              </IconButton>
            </Box>
            <EventCard
              event={{
                ...event,
                seatsLeft: event.totalSeats - event.bookedSeats
              }}
              onBookEvent={(userId) => handleBookEvent(event.id, userId)}
            />
          </Box>
        ))}
      </Box>
      <CreateEventModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateEvent}
      />
      <Dialog
        open={deleteEventId !== null}
        onClose={handleCloseDeleteDialog}
        PaperProps={{
          sx: {
            backgroundColor: '#2d2d2d',
            color: 'white',
            borderRadius: '12px'
          }
        }}
      >
        <DialogTitle sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
          Confirm Event Deletion
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Typography sx={{ mb: 2 }}>
            Are you sure you want to delete this event? This action cannot be undone.
          </Typography>
          <TextField
            fullWidth
            type="password"
            label="Enter Admin Password"
            value={deletePassword}
            onChange={(e) => setDeletePassword(e.target.value)}
            error={!!deleteError}
            helperText={deleteError}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: 'white',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(255, 255, 255, 0.7)',
              },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button
            onClick={handleCloseDeleteDialog}
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleDeleteEvent}
            sx={{
              backgroundColor: '#f44336',
              '&:hover': {
                backgroundColor: '#d32f2f'
              }
            }}
          >
            Delete Event
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default Events;