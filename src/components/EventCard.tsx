import { Card, CardContent, CardMedia, Typography, Button, Box, Chip, IconButton, Avatar } from '@mui/material';
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

const EventCard = ({ event }: EventCardProps) => {
  return (
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
          p: 2.5,
          '&:last-child': { pb: 2.5 }
        }}
      >
        <Typography 
          variant="h6" 
          component="h2"
          sx={{ 
            fontWeight: 600,
            color: 'white',
            mb: 1,
            fontSize: '1.125rem',
            lineHeight: 1.3
          }}
        >
          {event.title}
        </Typography>

        <Typography 
          variant="body2" 
          sx={{ 
            mb: 2.5,
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
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
            <AccessTimeIcon sx={{ mr: 1, fontSize: 18, color: 'rgba(255, 255, 255, 0.5)' }} />
            <Typography 
              variant="body2" 
              sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
            >
              {event.date} • {event.time}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}>
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
            mb: 2.5
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
            pt: 2.5
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#4caf50',
                  mr: 2,
                  fontWeight: 500
                }}
              >
                {event.seatsLeft} seats left
              </Typography>
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
              sx={{ 
                borderRadius: '20px',
                textTransform: 'none',
                px: 3,
                backgroundColor: '#7c4dff',
                '&:hover': {
                  backgroundColor: '#6c3fff'
                }
              }}
            >
              Book
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EventCard;