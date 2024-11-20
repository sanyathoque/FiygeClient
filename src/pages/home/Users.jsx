import React, { useState, useEffect } from 'react';
import {
  Button,
  Box,
  Typography,
  Grid,
  Paper,
  Divider,
  useTheme,
  Snackbar,
  Alert,
  Container,
  Card,
  CardContent,
  Avatar,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from "../../components/navbar/Navbar";
import {
  Email,
  Phone,
  Home,
  Person,
  LocationCity,
  CalendarToday,
  Work,
  Language,
  AttachFile,
  Business,
  PhoneAndroid,
  LocationOn,
  Cake,
} from '@mui/icons-material';

const Users = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8800/api/auth/users', {
        credentials: 'include',
      });
      if (response.status === 401) {
        navigate('/login');
      } else {
        const data = await response.json();
        setUsers(data);
        console.log("All Users: ", data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleModify = (user) => {
    localStorage.setItem('selectedUser', JSON.stringify(user));
    navigate('/home');
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch(`http://localhost:8800/api/auth/users/${userId}`, {
          method: 'DELETE',
          credentials: 'include',
        });
        if (response.status === 401) {
          navigate('/login');
        } else if (response.ok) {
          setUsers(users.filter(user => user._id !== userId));
          setSnackbarMessage('User has been deleted successfully.');
          setSnackbarSeverity('success');
        } else {
          setSnackbarMessage('Failed to delete user.');
          setSnackbarSeverity('error');
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        setSnackbarMessage('Failed to delete user.');
        setSnackbarSeverity('error');
      } finally {
        setSnackbarOpen(true);
      }
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 4,
            background: theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.05)'
              : 'rgba(0, 0, 0, 0.02)',
            borderRadius: 2
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 600,
              color: theme.palette.mode === 'dark'
                ? 'primary.light'
                : 'primary.dark'
            }}
          >
            Users Directory
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Browse and manage system users
          </Typography>
        </Paper>

        <Grid container spacing={3}>
        {users.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user._id}>
              <Card
                sx={{
                  height: 'fit-content',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 8,
                  },
                  borderRadius: 2,
                  overflow: 'hidden',
                  backdropFilter: 'blur(10px)',
                  background: 'rgba(255, 255, 255, 0.7)',
                  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  m: 2,
                  p: 2,
                }}
              >
                <Box
                  sx={{
                    p: 3,
                    background: 'linear-gradient(145deg, #e0f2f1, #b2dfdb)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <Box display="flex" alignItems="center" mb={2}>
                  <Avatar
                      src={user.profilePic ? `http://localhost:8800/api/auth/uploads/${user.profilePic}` : undefined}
                      alt={user.name}
                      sx={{ width: 56, height: 56, mr: 2 }}
                    >
                      {!user.profilePic && user.name.charAt(0)}
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 500 }}>
                      {user.name}
                    </Typography>
                  </Box>
                </Box>
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Box sx={{ mb: 2 }}>
                    {[
                      { icon: <Email />, text: user.email },
                      { icon: <Person />, text: user.username },
                      { icon: <LocationCity />, text: `${user.city}, ${user.state}` },
                      { icon: <Phone />, text: user.mobile },
                      { icon: <Home />, text: `${user.addressLine1}, ${user.addressLine2}` },
                      { icon: <CalendarToday />, text: `DOB: ${new Date(user.dateOfBirth).toLocaleDateString()}` },
                      { icon: <Work />, text: `Advisor: ${user.advisor}` },
                      { icon: <Language />, text: `Website: ${user.website}` },
                      { icon: <AttachFile />, text: Array.isArray(user.uploadedFiles) ? user.uploadedFiles.join(', ') : user.uploadedFiles },
                      { icon: <Business />, text: user.officePhone },
                      { icon: <PhoneAndroid />, text: user.homePhone },
                    ].map((item, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          mb: 1.5,
                          '&:last-child': { mb: 0 },
                        }}
                      >
                        <Box
                          sx={{
                            mr: 2,
                            color: 'primary.main',
                            display: 'flex',
                          }}
                        >
                          {item.icon}
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {item.text}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        textTransform: 'none',
                        backgroundColor: 'primary.light',
                        color: 'primary.contrastText',
                        '&:hover': {
                          backgroundColor: 'primary.main',
                          color: 'primary.contrastText',
                        },
                      }}
                      onClick={() => handleModify(user)}
                    >
                      Modify
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        textTransform: 'none',
                        backgroundColor: 'error.light',
                        color: 'error.contrastText',
                        '&:hover': {
                          backgroundColor: 'error.main',
                          color: 'error.contrastText',
                        },
                      }}
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Users;
