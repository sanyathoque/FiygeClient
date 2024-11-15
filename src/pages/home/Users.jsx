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
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Function to fetch users from the backend API
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8800/api/auth/users');
      const data = await response.json();
      setUsers(data);
      console.log("All Users: ", data)
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to handle modifying a user
  const handleModify = (user) => {
    // Save the selected user's data in local storage
    localStorage.setItem('selectedUser', JSON.stringify(user));
    // Navigate to the form page ("/" route)
    navigate('/');
  };

  // Function to handle deleting a user
  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await fetch(`http://localhost:8800/api/auth/users/${userId}`, { method: 'DELETE' });
        setUsers(users.filter(user => user.id !== userId));
        setSnackbarMessage('User has been deleted successfully.');
        setSnackbarSeverity('success');
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: theme.palette.background.default,
          padding: theme.spacing(3),
        }}
      >
        <Paper
          elevation={12}
          sx={{
            maxWidth: 1200,
            width: '100%',
            padding: theme.spacing(4),
            borderRadius: theme.shape.borderRadius,
            boxShadow: theme.shadows[10],
          }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{ fontSize: '2.75rem', marginBottom: theme.spacing(4), fontWeight: 600 }}
          >
            User Management
          </Typography>

          <Divider sx={{ marginBottom: theme.spacing(4) }} />

          {/* User List */}
          <Grid container spacing={4}>
            {users.map((user) => (
              <Grid item xs={12} sm={6} key={user.id}>
                <Paper
                  elevation={6}
                  sx={{
                    padding: theme.spacing(3),
                    borderRadius: theme.shape.borderRadius,
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 500, marginBottom: theme.spacing(1) }}>
                    {user.firstName} {user.lastName}
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: theme.spacing(2) }}>
                    Email: {user.email}
                  </Typography>
                  <Box display="flex" justifyContent="space-between">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleModify(user)}
                      sx={{ textTransform: 'none' }}
                    >
                      Modify
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(user.id)}
                      sx={{ textTransform: 'none' }}
                    >
                      Delete
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>

      {/* Snackbar for notifications */}
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
