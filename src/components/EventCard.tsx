import { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box, Chip, IconButton, Avatar, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';


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

interface EventCardProps {
  event: Event;
}

const getAvailabilityColor = (seatsLeft: number) => {
  if (seatsLeft === 0) return '#ef5350'; // Red
  if (seatsLeft <= 10) return '#ffa726'; // Orange
  return '#66bb6a'; // Green
};

const getAvailabilityText = (seatsLeft: number) => {
  if (seatsLeft === 0) return 'Full';
  if (seatsLeft <= 10) return 'Few Left';
  return 'Available';
};

const EventCard = ({ event }: EventCardProps) => {
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  return (
    <>
      <Card
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        backgroundColor: '#2d2d2d',
        borderRadius: '12px',
        '&:hover': {
          transform: 'translateY(-4px)',
          transition: 'transform 0.2s ease-in-out'
        }
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="200"
          image={event.image}
          alt={event.title}
          sx={{ 
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px'
          }}
        />
        <Chip
          label={event.price === 0 ? 'Free' : `$${event.price}`}
          color={event.price === 0 ? 'success' : 'primary'}
          sx={{ 
            position: 'absolute', 
            top: 16, 
            right: 16,
            fontWeight: 'bold',
            backgroundColor: event.price === 0 ? '#4caf50' : '#7c4dff',
            color: 'white',
            fontSize: '0.875rem',
            height: '28px'
          }}
        />
      </Box>

      <CardContent 
        sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column',
          p: { xs: 2, sm: 2.5 },
          '&:last-child': { pb: { xs: 2, sm: 2.5 } }
        }}
      >
        <Typography 
          variant="h6" 
          component="h2"
          sx={{ 
            fontWeight: 600,
            color: 'white',
            mb: { xs: 0.5, sm: 1 },
            fontSize: { xs: '1rem', sm: '1.125rem' },
            lineHeight: 1.3
          }}
        >
          {event.title}
        </Typography>

        <Typography 
          variant="body2" 
          sx={{ 
            mb: { xs: 2, sm: 2.5 },
            color: 'rgba(255, 255, 255, 0.7)',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.5
          }}
        >
          {event.description}
        </Typography>

        <Box sx={{ mt: 'auto' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 1, sm: 1.5 } }}>
            <AccessTimeIcon sx={{ mr: 1, fontSize: 18, color: 'rgba(255, 255, 255, 0.5)' }} />
            <Typography 
              variant="body2" 
              sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
            >
              {event.date} • {event.time}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 2, sm: 2.5 } }}>
            <LocationOnIcon sx={{ mr: 1, fontSize: 18, color: 'rgba(255, 255, 255, 0.5)' }} />
            <Typography 
              variant="body2" 
              sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
            >
              {event.location}
            </Typography>
          </Box>

          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            mb: { xs: 2, sm: 2.5 }
          }}>
            <Avatar 
              sx={{ 
                width: 24, 
                height: 24, 
                mr: 1,
                backgroundColor: '#7c4dff',
                fontSize: '0.875rem'
              }}
            >
              {event.organizer.charAt(0)}
            </Avatar>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.875rem'
              }}
            >
              {event.organizer}
            </Typography>
          </Box>

          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            pt: { xs: 2, sm: 2.5 }
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: getAvailabilityColor(event.seatsLeft),
                    mr: 1
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    color: getAvailabilityColor(event.seatsLeft),
                    fontWeight: 500
                  }}
                >
                  {getAvailabilityText(event.seatsLeft)} • {event.seatsLeft} seats
                </Typography>
              </Box>
              <IconButton 
                size="small" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.5)',
                  '&:hover': {
                    color: 'rgba(255, 255, 255, 0.8)',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                <ChatBubbleOutlineIcon fontSize="small" />
              </IconButton>
            </Box>
            <Button
              variant="contained"
              disabled={event.seatsLeft === 0}
              onClick={() => setBookingDialogOpen(true)}
              sx={{
                borderRadius: { xs: '16px', sm: '20px' },
                textTransform: 'none',
                px: { xs: 2, sm: 3 },
                py: { xs: 0.5, sm: 1 },
                fontSize: { xs: '0.875rem', sm: '1rem' },
                backgroundColor: event.seatsLeft === 0 ? 'rgba(239, 83, 80, 0.5)' : '#7c4dff',
                '&:hover': {
                  backgroundColor: event.seatsLeft === 0 ? 'rgba(239, 83, 80, 0.5)' : '#6c3fff'
                }
              }}
            >
              {event.seatsLeft === 0 ? 'Sold Out' : 'Book'}
            </Button>
          </Box>
        </Box>
      </CardContent>
      </Card>
    <Dialog
      open={bookingDialogOpen}
      onClose={() => setBookingDialogOpen(false)}
      PaperProps={{
        sx: {
          backgroundColor: '#2d2d2d',
          color: 'white',
          borderRadius: '12px',
          maxWidth: '400px'
        }
      }}
    >
      <DialogTitle sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
        Confirm Booking
      </DialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>{event.title}</Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 2 }}>
          {event.date} • {event.time}
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          Are you sure you want to book this event? This will reserve one seat.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', p: 2 }}>
        <Button
          onClick={() => setBookingDialogOpen(false)}
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
          onClick={() => {
            // Handle booking logic here
            setBookingDialogOpen(false);
          }}
          sx={{
            backgroundColor: '#7c4dff',
            '&:hover': {
              backgroundColor: '#6c3fff'
            }
          }}
        >
          Confirm Booking
        </Button>
      </DialogActions>
    </Dialog>
    </>
  );
};

export default EventCard;