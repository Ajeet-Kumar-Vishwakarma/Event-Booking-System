import { ReactNode, useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import BookingsIcon from '@mui/icons-material/BookOnline';
import AddIcon from '@mui/icons-material/Add';
import CreateEventModal from './CreateEventModal';

interface LayoutProps {
  children: ReactNode;
}

const drawerWidth = 240;

const Layout = ({ children }: LayoutProps) => {
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);

  const menuItems = [
    { text: 'Events', icon: <EventIcon />, path: '/' },
    { text: 'Users', icon: <PeopleIcon />, path: '/users' },
    { text: 'Bookings', icon: <BookingsIcon />, path: '/bookings' }
  ];

  const handleCreateEvent = (eventData: any) => {
    // Here you would typically make an API call to create the event
    console.log('Creating event:', eventData);
    
    // Format the event data
    const formattedEvent = {
      ...eventData,
      date: eventData.date ? new Date(eventData.date).toISOString() : null,
      time: eventData.time ? new Date(eventData.time).toISOString() : null,
    };

    // For now, just log the formatted event data
    console.log('Formatted event:', formattedEvent);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: '#1a1a1a',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ 
              textDecoration: 'none', 
              color: 'inherit',
              flexGrow: 1,
              fontWeight: 500
            }}
          >
            Event Booking System
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setIsCreateEventOpen(true)}
            sx={{ 
              borderRadius: '8px',
              backgroundColor: '#7c4dff',
              '&:hover': {
                backgroundColor: '#6c3fff'
              },
              textTransform: 'none',
              fontWeight: 600
            }}
          >
            CREATE EVENT
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#2d2d2d',
            color: 'white',
            borderRight: 'none'
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', mt: 2 }}>
          <List>
            {menuItems.map((item) => (
              <ListItem 
                button 
                key={item.text} 
                component={Link} 
                to={item.path}
                sx={{
                  py: 1.5,
                  px: 2,
                  '&:hover': {
                    backgroundColor: 'rgba(124, 77, 255, 0.1)',
                  },
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(124, 77, 255, 0.2)',
                  }
                }}
              >
                <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{
                    fontSize: '0.9rem',
                    fontWeight: 500
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: '#1a1a1a',
          minHeight: '100vh',
          color: 'white'
        }}
      >
        <Toolbar />
        {children}
      </Box>

      <CreateEventModal
        open={isCreateEventOpen}
        onClose={() => setIsCreateEventOpen(false)}
        onSubmit={handleCreateEvent}
      />
    </Box>
  );
};

export default Layout;