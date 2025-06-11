import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  InputAdornment,
  Typography
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
  price: number;
  totalSeats: number;
  image: File | null;
}

interface ValidationErrors {
  title?: string;
  description?: string;
  date?: string;
  time?: string;
  location?: string;
  price?: string;
  totalSeats?: string;
  image?: string;
}

const initialEventData: EventData = {
  title: '',
  description: '',
  date: '',
  time: '',
  location: '',
  price: 0,
  totalSeats: 0,
  image: null
};

const CreateEventModal = ({ open, onClose, onSubmit }: CreateEventModalProps) => {
  const [eventData, setEventData] = useState<EventData>(initialEventData);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors({ ...errors, image: 'Please upload an image file' });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, image: 'Image size should be less than 5MB' });
        return;
      }

      setEventData({ ...eventData, image: file });
      setErrors({ ...errors, image: undefined });

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    const currentDate = new Date();
    const selectedDate = new Date(`${eventData.date} ${eventData.time}`);

    if (!eventData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!eventData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!eventData.date) {
      newErrors.date = 'Date is required';
    } else if (selectedDate <= currentDate) {
      newErrors.date = 'Date must be in the future';
    }

    if (!eventData.time) {
      newErrors.time = 'Time is required';
    }

    if (!eventData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (eventData.price < 0) {
      newErrors.price = 'Price cannot be negative';
    }

    if (eventData.totalSeats < 1) {
      newErrors.totalSeats = 'Total seats must be at least 1';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(eventData);
      setEventData(initialEventData);
      setErrors({});
      onClose();
    }
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
            label="Event Title *"
            fullWidth
            value={eventData.title}
            onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
            error={!!errors.title}
            helperText={errors.title}
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
            label="Description *"
            fullWidth
            multiline
            rows={4}
            value={eventData.description}
            onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
            error={!!errors.description}
            helperText={errors.description}
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
              label="Date *"
              value={eventData.date}
              onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
              InputLabelProps={{ shrink: true }}
              error={!!errors.date}
              helperText={errors.date}
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
              label="Time *"
              value={eventData.time}
              onChange={(e) => setEventData({ ...eventData, time: e.target.value })}
              InputLabelProps={{ shrink: true }}
              error={!!errors.time}
              helperText={errors.time}
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
            label="Location *"
            fullWidth
            value={eventData.location}
            onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
            error={!!errors.location}
            helperText={errors.location}
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
              label="Price *"
              type="number"
              value={eventData.price || ''}
              onChange={(e) => setEventData({ ...eventData, price: Number(e.target.value) })}
              error={!!errors.price}
              helperText={errors.price}
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
              label="Total Seats *"
              type="number"
              value={eventData.totalSeats || ''}
              onChange={(e) => setEventData({ ...eventData, totalSeats: Number(e.target.value) })}
              error={!!errors.totalSeats}
              helperText={errors.totalSeats}
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

          <Box sx={{ mb: 2 }}>
            <Typography
              variant="subtitle2"
              sx={{
                mb: 1,
                color: 'rgba(255, 255, 255, 0.7)'
              }}
            >
              Event Image *
            </Typography>
            <Box
              sx={{
                border: '1px dashed rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                p: 2,
                textAlign: 'center',
                cursor: 'pointer',
                '&:hover': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)'
                }
              }}
              onClick={() => document.getElementById('event-image-input')?.click()}
            >
              {imagePreview ? (
                <Box
                  component="img"
                  src={imagePreview}
                  alt="Event preview"
                  sx={{
                    maxWidth: '100%',
                    maxHeight: '200px',
                    borderRadius: '4px'
                  }}
                />
              ) : (
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                  Click to upload image (max 5MB)
                </Typography>
              )}
              <input
                id="event-image-input"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
            </Box>
            {errors.image && (
              <Typography
                variant="caption"
                sx={{
                  color: '#f44336',
                  mt: 0.5,
                  display: 'block'
                }}
              >
                {errors.image}
              </Typography>
            )}
          </Box>
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