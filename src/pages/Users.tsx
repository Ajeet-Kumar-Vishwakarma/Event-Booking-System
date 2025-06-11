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
import Layout from '../components/Layout';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EventIcon from '@mui/icons-material/Event';
import { User, users as initialUsers } from '../mockData';

interface UserFormData {
  name: string;
  email: string;
  password: string;
}

const STORED_USERS_KEY = 'eventBookingSystem_users';
const STORED_BOOKINGS_KEY = 'eventBookingSystem_bookings';

const Users = () => {
  const [users, setUsers] = useState<User[]>(() => {
    const storedUsers = localStorage.getItem(STORED_USERS_KEY);
    return storedUsers ? JSON.parse(storedUsers) : initialUsers;
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userForm, setUserForm] = useState<UserFormData>({
    name: '',
    email: '',
    password: ''
  });

  const handleOpenDialog = (user?: User) => {
    if (user) {
      setEditingUser(user);
      setUserForm({
        name: user.name,
        email: user.email,
        password: user.password
      });
    } else {
      setEditingUser(null);
      setUserForm({ name: '', email: '', password: '' });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingUser(null);
    setUserForm({ name: '', email: '', password: '' });
  };

  // Update localStorage whenever users change
  const updateUsers = (newUsers: User[]) => {
    setUsers(newUsers);
    localStorage.setItem(STORED_USERS_KEY, JSON.stringify(newUsers));
  };

  const handleSubmit = () => {
    if (editingUser) {
      // Update existing user
      const updatedUsers = users.map(user =>
        user.id === editingUser.id
          ? {
              ...user,
              name: userForm.name,
              email: userForm.email,
              password: userForm.password
            }
          : user
      );
      updateUsers(updatedUsers);
    } else {
      // Add new user
      const newUser: User = {
        id: users.length + 1,
        name: userForm.name,
        email: userForm.email,
        password: userForm.password,
        eventsBooked: 0
      };
      updateUsers([...users, newUser]);
    }
    handleCloseDialog();
  };

  const handleDeleteUser = (id: number) => {
    const updatedUsers = users.filter(user => user.id !== id);
    updateUsers(updatedUsers);
  };

  return (
    <Layout>
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
          onClick={() => handleOpenDialog()}
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
        {users.map((user) => {
          // Count user's bookings
          const storedBookings = localStorage.getItem(STORED_BOOKINGS_KEY);
          const bookings = storedBookings ? JSON.parse(storedBookings) : [];
          const userBookings = bookings.filter((booking: any) => booking.userId === user.id);
          
          return (
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
                {userBookings.length} Events Booked
              </Typography>
            </Box>

            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'flex-end',
              gap: 1
            }}>
              <IconButton
                size="small"
                onClick={() => handleOpenDialog(user)}
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
        )})}
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
          {editingUser ? 'Edit User' : 'Add New User'}
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Name"
            value={userForm.name}
            onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
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
            value={userForm.email}
            onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
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
            value={userForm.password}
            onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
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
            onClick={handleCloseDialog}
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
            {editingUser ? 'Save Changes' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default Users;