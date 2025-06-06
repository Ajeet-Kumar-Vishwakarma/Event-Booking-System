import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  Avatar, 
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EventIcon from '@mui/icons-material/Event';

interface User {
  id: number;
  name: string;
  email: string;
  eventsBooked: number;
}

const initialUsers: User[] = [
  {
    id: 1,
    name: 'Aditi Sharma',
    email: 'aditi@example.com',
    eventsBooked: 5
  },
  {
    id: 2,
    name: 'John Doe',
    email: 'john@example.com',
    eventsBooked: 5
  },
  {
    id: 3,
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    eventsBooked: 5
  },
  {
    id: 4,
    name: 'Aj',
    email: 'ajkumarvish@gmail.com',
    eventsBooked: 5
  }
];

const Users = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [openDialog, setOpenDialog] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });

  const handleAddUser = () => {
    const user: User = {
      id: users.length + 1,
      name: newUser.name,
      email: newUser.email,
      eventsBooked: 0
    };
    setUsers([...users, user]);
    setNewUser({ name: '', email: '', password: '' });
    setOpenDialog(false);
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <Box>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 4 
      }}>
        <Typography 
          variant="h4" 
          component="h1"
          sx={{
            fontWeight: 600,
            fontSize: '1.75rem'
          }}
        >
          Users
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
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
          Add User
        </Button>
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
        {users.map((user) => (
          <Card 
            key={user.id}
            sx={{ 
              p: 3,
              backgroundColor: '#2d2d2d',
              borderRadius: '12px'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar 
                sx={{ 
                  width: 48, 
                  height: 48, 
                  bgcolor: '#7c4dff',
                  fontSize: '1.25rem',
                  fontWeight: 500
                }}
              >
                {user.name.charAt(0)}
              </Avatar>
              <Box sx={{ ml: 2 }}>
                <Typography 
                  variant="h6"
                  sx={{ 
                    color: 'white',
                    fontWeight: 500,
                    fontSize: '1.1rem'
                  }}
                >
                  {user.name}
                </Typography>
                <Typography 
                  variant="body2"
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.7)',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  {user.email}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ 
              display: 'flex',
              alignItems: 'center',
              color: 'rgba(255, 255, 255, 0.7)',
              mb: 2
            }}>
              <EventIcon sx={{ fontSize: 20, mr: 1 }} />
              <Typography variant="body2">
                {user.eventsBooked} Events Booked
              </Typography>
            </Box>

            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'flex-end',
              gap: 1
            }}>
              <IconButton 
                size="small"
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.5)',
                  '&:hover': {
                    color: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton 
                size="small"
                onClick={() => handleDeleteUser(user.id)}
                sx={{ 
                  color: 'rgba(255, 0, 0, 0.5)',
                  '&:hover': {
                    color: '#ff4444',
                    backgroundColor: 'rgba(255, 0, 0, 0.1)'
                  }
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </Card>
        ))}
      </Box>

      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)}
        PaperProps={{
          sx: {
            backgroundColor: '#2d2d2d',
            color: 'white',
            borderRadius: '12px',
            minWidth: '400px'
          }
        }}
      >
        <DialogTitle sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
          Add New User
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
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
          <TextField
            fullWidth
            label="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
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
          <TextField
            fullWidth
            type="password"
            label="Password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
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
        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button 
            onClick={() => setOpenDialog(false)}
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
            onClick={handleAddUser}
            sx={{ 
              backgroundColor: '#7c4dff',
              '&:hover': {
                backgroundColor: '#6c3fff'
              }
            }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Users;