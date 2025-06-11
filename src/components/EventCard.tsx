import { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
  IconButton,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent
} from '@mui/material';
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
  onBookEvent: (userId: number) => void;
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

interface BookingFormData {
  userId: number;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

const initialBookingForm: BookingFormData = {
  userId: 0,
  cardNumber: '',
  expiryDate: '',
  cvv: ''
};

const EventCard = ({ event, onBookEvent }: EventCardProps) => {
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [chatDialogOpen, setChatDialogOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<{ text: string; sender: string }[]>([]);
  const [bookingForm, setBookingForm] = useState<BookingFormData>(initialBookingForm);

  const handleUserChange = (event: SelectChangeEvent<number>) => {
    setBookingForm({
      ...bookingForm,
      userId: event.target.value as number
    });
  };

  const handleBooking = () => {
    if (!bookingForm.userId) return;

    // Call the parent handler with the selected user ID
    onBookEvent(bookingForm.userId);
    
    // Reset form and close dialog
    setBookingForm(initialBookingForm);
    setBookingDialogOpen(false);
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      setChatMessages([
        ...chatMessages,
        { text: chatMessage, sender: 'user' },
        // Simulate organizer response
        {
          text: `Thank you for your message about "${event.title}". The organizer will respond shortly.`,
          sender: 'organizer'
        }
      ]);
      setChatMessage('');
    }
  };
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
        <Box sx={{ position: 'absolute', bottom: 16, right: 16 }}>
          <Chip
            label={event.price === 0 ? 'Free' : `$${event.price}`}
            color={event.price === 0 ? 'success' : 'primary'}
            sx={{
              fontWeight: 'bold',
              backgroundColor: event.price === 0 ? '#4caf50' : '#7c4dff',
              color: 'white',
              fontSize: '0.875rem',
              height: '28px'
            }}
          />
        </Box>
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
                onClick={() => setChatDialogOpen(true)}
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
        Book Event
      </DialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>{event.title}</Typography>
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, color: 'rgba(255, 255, 255, 0.7)' }}>
            Event Details
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <AccessTimeIcon sx={{ fontSize: 16, mr: 1, color: 'rgba(255, 255, 255, 0.5)' }} />
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              {event.date} • {event.time}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocationOnIcon sx={{ fontSize: 16, mr: 1, color: 'rgba(255, 255, 255, 0.5)' }} />
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              {event.location}
            </Typography>
          </Box>
        </Box>

        <FormControl
          fullWidth
          sx={{
            mb: 3,
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
            '& .MuiSelect-icon': {
              color: 'rgba(255, 255, 255, 0.5)',
            }
          }}
        >
          <InputLabel>Select User</InputLabel>
          <Select
            value={bookingForm.userId || ''}
            onChange={handleUserChange}
            label="Select User"
          >
            {(() => {
              const storedUsers = localStorage.getItem('eventBookingSystem_users');
              const users: { id: number; name: string; email: string }[] = storedUsers ? JSON.parse(storedUsers) : [];
              return users.map(user => (
              <MenuItem key={user.id} value={user.id}>
                {user.name} ({user.email})
              </MenuItem>
              ));
            })()}
          </Select>
        </FormControl>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, color: 'rgba(255, 255, 255, 0.7)' }}>
            Payment Details
          </Typography>
          <Typography variant="h6" sx={{ color: '#4caf50', mb: 2 }}>
            ${event.price}
          </Typography>
          <TextField
            fullWidth
            label="Card Number"
            placeholder="1234 5678 9012 3456"
            value={bookingForm.cardNumber}
            onChange={(e) => setBookingForm({ ...bookingForm, cardNumber: e.target.value })}
            sx={{
              mb: 2,
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
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Expiry Date"
              placeholder="MM/YY"
              value={bookingForm.expiryDate}
              onChange={(e) => setBookingForm({ ...bookingForm, expiryDate: e.target.value })}
              sx={{
                flex: 1,
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
            <TextField
              label="CVV"
              placeholder="123"
              value={bookingForm.cvv}
              onChange={(e) => setBookingForm({ ...bookingForm, cvv: e.target.value })}
              sx={{
                flex: 1,
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
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', p: 2 }}>
        <Button
          onClick={() => {
            setBookingForm(initialBookingForm);
            setBookingDialogOpen(false);
          }}
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
          onClick={handleBooking}
          disabled={!bookingForm.userId || !bookingForm.cardNumber || !bookingForm.expiryDate || !bookingForm.cvv}
          sx={{
            backgroundColor: '#7c4dff',
            '&:hover': {
              backgroundColor: '#6c3fff'
            }
          }}
        >
          Pay & Book
        </Button>
      </DialogActions>
    </Dialog>

    {/* Chat Dialog */}
    <Dialog
      open={chatDialogOpen}
      onClose={() => setChatDialogOpen(false)}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: '#2d2d2d',
          color: 'white',
          borderRadius: '12px'
        }
      }}
    >
      <DialogTitle sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
        Chat with Organizer
      </DialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Event: {event.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Organizer: {event.organizer}
          </Typography>
        </Box>

        <Box sx={{
          maxHeight: '300px',
          overflowY: 'auto',
          mb: 2,
          p: 1
        }}>
          {chatMessages.map((message, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                mb: 1
              }}
            >
              <Box
                sx={{
                  backgroundColor: message.sender === 'user' ? '#7c4dff' : '#404040',
                  borderRadius: '12px',
                  padding: '8px 12px',
                  maxWidth: '80%'
                }}
              >
                <Typography variant="body2">
                  {message.text}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            placeholder="Type your message..."
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
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
              '& .MuiInputBase-input::placeholder': {
                color: 'rgba(255, 255, 255, 0.5)',
              },
            }}
          />
          <Button
            variant="contained"
            onClick={handleSendMessage}
            sx={{
              backgroundColor: '#7c4dff',
              '&:hover': {
                backgroundColor: '#6c3fff'
              }
            }}
          >
            Send
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
    </>
  );
};

export default EventCard;