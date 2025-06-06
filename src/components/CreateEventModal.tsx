import { 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  InputAdornment
} from '@mui/material';
import { useState } from 'react';

interface CreateEventModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (eventData: EventData) => void;
}

interface EventData {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  price: string;
  totalSeats: string;
  image: File | null;
}

const initialEventData: EventData = {
  title: '',
  description: '',
  date: '',
  time: '',
  location: '',
  price: '',
  totalSeats: '',
  image: null
};

const CreateEventModal = ({ open, onClose, onSubmit }: CreateEventModalProps) => {
  const [eventData, setEventData] = useState<EventData>(initialEventData);

  const handleSubmit = () => {
    onSubmit(eventData);
    setEventData(initialEventData);
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
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
        Create New Event
      </DialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, my: 2 }}>
          <TextField
            label="Event Title"
            fullWidth
            value={eventData.title}
            onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
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

          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={eventData.description}
            onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
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

          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              type="date"
              label="Date"
              value={eventData.date}
              onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
              InputLabelProps={{ shrink: true }}
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
              type="time"
              label="Time"
              value={eventData.time}
              onChange={(e) => setEventData({ ...eventData, time: e.target.value })}
              InputLabelProps={{ shrink: true }}
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

          <TextField
            label="Location"
            fullWidth
            value={eventData.location}
            onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
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

          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Price"
              type="number"
              value={eventData.price}
              onChange={(e) => setEventData({ ...eventData, price: e.target.value })}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
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
                '& .MuiInputAdornment-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                },
              }}
            />

            <TextField
              label="Total Seats"
              type="number"
              value={eventData.totalSeats}
              onChange={(e) => setEventData({ ...eventData, totalSeats: e.target.value })}
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

          <TextField
            type="file"
            label="Event Image"
            InputLabelProps={{ shrink: true }}
            onChange={(e) => {
              const file = (e.target as HTMLInputElement).files?.[0] || null;
              setEventData({ ...eventData, image: file });
            }}
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
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 2 }}>
        <Button 
          onClick={onClose}
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
          onClick={handleSubmit}
          sx={{ 
            backgroundColor: '#7c4dff',
            '&:hover': {
              backgroundColor: '#6c3fff'
            }
          }}
        >
          Create Event
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateEventModal;