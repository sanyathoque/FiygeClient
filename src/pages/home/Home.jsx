import React, { useState, useEffect } from 'react';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  Divider,
  Modal,
  Backdrop,
  Fade,
  IconButton,
  Avatar,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import Navbar from "../../components/navbar/Navbar";
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    leadType: '',
    leadSubType: '',
    leadSource: '',
    referredBy: '',
    advisor: '',
    dateOfBirth: '',
    anniversaryDate: '',
    dateOfConsultation: '',
    officePhone: '',
    homePhone: '',
    mobile: '',
    fax: '',
    primaryEmail: '',
    secondaryEmail: '',
    doNotCall: false,
    emailOptOut: false,
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    username: '',
    email: '',
    password: '',
    name: '',
    coverPic: '',
    website: '',
  });

  const [profilePic, setProfilePic] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  useEffect(() => {
    const selectedUser = localStorage.getItem('selectedUser');
    if (selectedUser) {
      setFormData(JSON.parse(selectedUser));
      localStorage.removeItem('selectedUser');
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const onDropProfilePic = (acceptedFiles) => {
    setProfilePic(acceptedFiles[0]);
  };

  const onDropUploadedFile = (acceptedFiles) => {
    setUploadedFile(acceptedFiles[0]);
  };

  const { getRootProps: getProfilePicRootProps, getInputProps: getProfilePicInputProps } = useDropzone({ onDrop: onDropProfilePic });
  const { getRootProps: getUploadedFileRootProps, getInputProps: getUploadedFileInputProps } = useDropzone({ onDrop: onDropUploadedFile });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      if (profilePic) {
        formDataToSend.append('files', profilePic);
      }
      if (uploadedFile) {
        formDataToSend.append('files', uploadedFile);
      }

      const response = await axios.post('http://localhost:8800/api/auth/user_register', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      if (response.status === 401) {
        navigate('/login');
      } else {
        console.log('Response data:', response.data);
        navigate('/users');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/login');
      } else {
        console.log('Error submitting form data:', error);
      }
    }
  };

  const handleReviewClick = () => {
    setIsReviewModalOpen(true);
  };

  const handleCloseReviewModal = () => {
    setIsReviewModalOpen(false);
  };

  return (
    <>
      <Navbar />
      <Box className="main-container">
        <Paper elevation={12} className="form-container">
          <Typography variant="h4" component="h2" gutterBottom align="center" className="form-title">
            Client Information Form
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom align="center" className="form-title">
            Existing users will be updated based on username, new user will be registered based on Username
          </Typography>
          <Divider className="form-divider" />
          <form onSubmit={handleSubmit}>
            {/* Basic Information */}
            <Box className="form-section glass-surface">
              <Typography variant="h6" className="section-title">
                Basic Information
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    margin="normal"
                    variant="outlined"
                    className="glass-input"
                    placeholder="Only alphabets (e.g., John)"
                    inputProps={{ pattern: '^[A-Za-z]+$', title: 'First name must contain only letters.' }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    margin="normal"
                    variant="outlined"
                    className="glass-input"
                    placeholder="Only alphabets (e.g., Doe)"
                    inputProps={{ pattern: '^[A-Za-z]+$', title: 'Last name must contain only letters.' }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl variant="outlined" fullWidth margin="normal" className="glass-input">
                    <InputLabel id="lead-type-label">Lead Type</InputLabel>
                    <Select
                      labelId="lead-type-label"
                      name="leadType"
                      value={formData.leadType}
                      onChange={handleInputChange}
                      label="Lead Type"
                    >
                      <MenuItem value="Client">Client</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl variant="outlined" fullWidth margin="normal" className="glass-input">
                    <InputLabel id="lead-subtype-label">Lead Sub Type</InputLabel>
                    <Select
                      labelId="lead-subtype-label"
                      name="leadSubType"
                      value={formData.leadSubType}
                      onChange={handleInputChange}
                      label="Lead Sub Type"
                    >
                      <MenuItem value="SKY">SKY</MenuItem>
                      <MenuItem value="DIRECT CLIENT">DIRECT CLIENT</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Lead Source"
                    name="leadSource"
                    value={formData.leadSource}
                    onChange={handleInputChange}
                    margin="normal"
                    variant="outlined"
                    className="glass-input"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Referred By"
                    name="referredBy"
                    value={formData.referredBy}
                    onChange={handleInputChange}
                    margin="normal"
                    variant="outlined"
                    className="glass-input"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Advisor"
                    name="advisor"
                    value={formData.advisor}
                    onChange={handleInputChange}
                    margin="normal"
                    variant="outlined"
                    className="glass-input"
                  />
                </Grid>
              </Grid>
            </Box>

            <Divider className="form-divider" />
            {/* Essential Dates */}
            <Box className="form-section glass-surface">
              <Typography variant="h6" className="section-title">
                Essential Dates
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Date of Birth"
                    name="dateOfBirth"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    margin="normal"
                    variant="outlined"
                    className="glass-input"
                    required
                    error={!formData.dateOfBirth}
                    helperText={!formData.dateOfBirth ? "Date of Birth is required" : ""}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Anniversary Date"
                    name="anniversaryDate"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={formData.anniversaryDate}
                    onChange={handleInputChange}
                    margin="normal"
                    variant="outlined"
                    className="glass-input"
                    required
                    error={!formData.anniversaryDate}
                    helperText={!formData.anniversaryDate ? "Anniversary Date is required" : ""}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Date of Consultation"
                    name="dateOfConsultation"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={formData.dateOfConsultation}
                    onChange={handleInputChange}
                    margin="normal"
                    variant="outlined"
                    className="glass-input"
                    required
                    error={!formData.dateOfConsultation}
                    helperText={!formData.dateOfConsultation ? "Date of Consultation is required" : ""}
                  />
                </Grid>
              </Grid>
            </Box>

            <Divider className="form-divider" />

            {/* Contact Information */}
            <Box className="form-section glass-surface">
              <Typography variant="h6" className="section-title">
                Contact Information
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Office Phone"
                    name="officePhone"
                    value={formData.officePhone}
                    onChange={handleInputChange}
                    margin="normal"
                    variant="outlined"
                    className="glass-input"
                    placeholder="10-digit number (e.g., 123-456-7890)"
                    inputProps={{ pattern: '^[0-9]{3}-[0-9]{3}-[0-9]{4}$', title: 'Phone number must be in the format 123-456-7890.' }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Home Phone"
                    name="homePhone"
                    value={formData.homePhone}
                    onChange={handleInputChange}
                    margin="normal"
                    variant="outlined"
                    className="glass-input"
                    placeholder="10-digit number (e.g., 123-456-7890)"
                    inputProps={{ pattern: '^[0-9]{3}-[0-9]{3}-[0-9]{4}$', title: 'Phone number must be in the format 123-456-7890.' }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    margin="normal"
                    variant="outlined"
                    className="glass-input"
                    placeholder="10-digit number (e.g., 123-456-7890)"
                    inputProps={{ pattern: '^[0-9]{3}-[0-9]{3}-[0-9]{4}$', title: 'Phone number must be in the format 123-456-7890.' }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Fax"
                    name="fax"
                    value={formData.fax}
                    onChange={handleInputChange}
                    margin="normal"
                    variant="outlined"
                    className="glass-input"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Primary Email"
                    name="primaryEmail"
                    value={formData.primaryEmail}
                    onChange={handleInputChange}
                    margin="normal"
                    variant="outlined"
                    className="glass-input"
                    placeholder="Valid email (e.g., john.doe@example.com)"
                    inputProps={{ pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', title: 'Please enter a valid email address.' }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Secondary Email"
                    name="secondaryEmail"
                    value={formData.secondaryEmail}
                    onChange={handleInputChange}
                    margin="normal"
                    variant="outlined"
                    className="glass-input"
                    placeholder="Valid email (e.g., john.doe@example.com)"
                    inputProps={{ pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', title: 'Please enter a valid email address.' }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.emailOptOut}
                        onChange={handleCheckboxChange}
                        name="emailOptOut"
                        className="glass-checkbox"
                      />
                    }
                    label="Email Opt Out"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.doNotCall}
                        onChange={handleCheckboxChange}
                        name="doNotCall"
                        className="glass-checkbox"
                      />
                    }
                    label="Do Not Call"
                  />
                </Grid>
              </Grid>
            </Box>

            <Divider className="form-divider" />

            {/* Address Information */}
            <Box className="form-section glass-surface">
              <Typography variant="h6" className="section-title">
                Address Information
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Address Line 1"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                    margin="normal"
                    variant="outlined"
                    className="glass-input"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Address Line 2"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleInputChange}
                    margin="normal"
                    variant="outlined"
                    className="glass-input"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    margin="normal"
                    variant="outlined"
                    className="glass-input"
                    placeholder="Only alphabets (e.g., Toronto)"
                    inputProps={{ pattern: '^[A-Za-z]+(?:[\s-][A-Za-z]+)*$', title: 'City must contain only letters.' }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    margin="normal"
                    variant="outlined"
                    className="glass-input"
                    placeholder="Only alphabets (e.g., Ontario)"
                    inputProps={{ pattern: '^[A-Za-z]+(?:[\s-][A-Za-z]+)*$', title: 'State must contain only letters.' }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Postal Code"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    margin="normal"
                    variant="outlined"
                    className="glass-input"
                    placeholder="Format: A1A 1A1"
                    inputProps={{ title: 'Postal code must be in the format A1A 1A1.' }}
                  />
                </Grid>
              </Grid>
            </Box>

            <Divider className="form-divider" />

            {/* Account Information */}
            <Box className="form-section glass-surface">
              <Typography variant="h6" className="section-title">
                Account Information
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    margin="normal"
                    variant="outlined"
                    className="glass-input"
                    placeholder="Alphanumeric, 5-15 characters"
                    inputProps={{ pattern: '^[a-zA-Z0-9]{5,15}$', title: 'Username must be alphanumeric and between 5 to 15 characters.' }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    margin="normal"
                    variant="outlined"
                    className="glass-input"
                    placeholder="Valid email (e.g., john.doe@example.com)"
                    inputProps={{ pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', title: 'Please enter a valid email address.' }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    margin="normal"
                    variant="outlined"
                    className="glass-input"
                    placeholder="At least 8 characters, with one letter and one number"
                    inputProps={{ title: 'Password must be at least 8 characters long and contain at least one letter and one number.' }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    margin="normal"
                    variant="outlined"
                    className="glass-input"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Cover Picture URL"
                    name="coverPic"
                    value={formData.coverPic}
                    onChange={handleInputChange}
                    margin="normal"
                    variant="outlined"
                    className="glass-input"
                    placeholder="Valid URL (e.g., https://example.com/image.jpg)"
                    inputProps={{ pattern: '^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$', title: 'Please enter a valid URL.' }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" className="section-title">
                    Profile Picture
                  </Typography>
                  <Paper
                    elevation={3}
                    sx={{
                      p: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: 56,
                      border: '2px dashed #ccc',
                      cursor: 'pointer',
                    }}
                    {...getProfilePicRootProps()}
                  >
                    <input {...getProfilePicInputProps()} />
                    {profilePic ? (
                      <Avatar
                        src={URL.createObjectURL(profilePic)}
                        alt="Profile Picture"
                        sx={{ width: 40, height: 40 }}
                      />
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        Drag & drop or click to select
                      </Typography>
                    )}
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" className="section-title">
                    Upload File
                  </Typography>
                  <Paper
                    elevation={3}
                    sx={{
                      p: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: 56,
                      border: '2px dashed #ccc',
                      cursor: 'pointer',
                    }}
                    {...getUploadedFileRootProps()}
                  >
                    <input {...getUploadedFileInputProps()} />
                    {uploadedFile ? (
                      <Typography variant="body2" color="text.secondary">
                        {uploadedFile.name}
                      </Typography>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        Drag & drop or click to select
                      </Typography>
                    )}
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Website"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    margin="normal"
                    variant="outlined"
                    className="glass-input"
                    placeholder="Valid URL (e.g., https://example.com)"
                    inputProps={{ pattern: '^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$', title: 'Please enter a valid URL.' }}
                  />
                </Grid>
              </Grid>
            </Box>

            <Box display="flex" justifyContent="center" marginTop={4}>
              <Button variant="contained" type="submit" className="submit-button glass-button" style={{ marginRight: "15px" }}>
                Save & Continue
              </Button>
              <Button variant="contained" onClick={handleReviewClick} className="glass-button" style={{ marginRight: "15px" }}>
                Review
              </Button>
              <Button variant="contained" className="glass-button" style={{ marginRight: "15px" }}>
                Cancel
              </Button>
            </Box>
          </form>
        </Paper>

        {/* Review Modal */}
        <Modal
          open={isReviewModalOpen}
          onClose={handleCloseReviewModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={isReviewModalOpen}>
            <Box className="review-modal"

              sx={{
                bgcolor: 'background.paper',
                p: 4,
                borderRadius: 2,
                position: 'relative',
                maxHeight: '60vh',
                overflowY: 'auto',
                width: '80vw',
                margin: 'auto',
              }}>
              <IconButton
                aria-label="close"
                onClick={handleCloseReviewModal}
                sx={{ position: 'absolute', right: 8, top: 8 }}
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h4" gutterBottom>
                Review Your Information
              </Typography>
              <Divider />
              <Box mt={2}>
                <Typography variant="h6">Basic Information</Typography>
                <Typography>First Name: {formData.firstName}</Typography>
                <Typography>Last Name: {formData.lastName}</Typography>
                <Typography>Lead Type: {formData.leadType}</Typography>
                <Typography>Lead Sub Type: {formData.leadSubType}</Typography>
                <Typography>Lead Source: {formData.leadSource}</Typography>
                <Typography>Referred By: {formData.referredBy}</Typography>
                <Typography>Advisor: {formData.advisor}</Typography>
              </Box>
              <Divider />
              <Box mt={2}>
                <Typography variant="h6">Essential Dates</Typography>
                <Typography>Date of Birth: {formData.dateOfBirth}</Typography>
                <Typography>Anniversary Date: {formData.anniversaryDate}</Typography>
                <Typography>Date of Consultation: {formData.dateOfConsultation}</Typography>
              </Box>
              <Divider />
              <Box mt={2}>
                <Typography variant="h6">Contact Information</Typography>
                <Typography>Office Phone: {formData.officePhone}</Typography>
                <Typography>Home Phone: {formData.homePhone}</Typography>
                <Typography>Mobile: {formData.mobile}</Typography>
                <Typography>Fax: {formData.fax}</Typography>
                <Typography>Primary Email: {formData.primaryEmail}</Typography>
                <Typography>Secondary Email: {formData.secondaryEmail}</Typography>
                <Typography>Email Opt Out: {formData.emailOptOut ? 'Yes' : 'No'}</Typography>
                <Typography>Do Not Call: {formData.doNotCall ? 'Yes' : 'No'}</Typography>
              </Box>
              <Divider />
              <Box mt={2}>
                <Typography variant="h6">Address Information</Typography>
                <Typography>Address Line 1: {formData.addressLine1}</Typography>
                <Typography>Address Line 2: {formData.addressLine2}</Typography>
                <Typography>City: {formData.city}</Typography>
                <Typography>State: {formData.state}</Typography>
                <Typography>Postal Code: {formData.postalCode}</Typography>
              </Box>
              <Divider />
              <Box mt={2}>
                <Typography variant="h6">Account Information</Typography>
                <Typography>Username: {formData.username}</Typography>
                <Typography>Email: {formData.email}</Typography>
                <Typography>Password: *******</Typography>
                <Typography>Name: {formData.name}</Typography>
                <Typography>Cover Picture URL: {formData.coverPic}</Typography>
                <Typography>Website: {formData.website}</Typography>
              </Box>
              <Box mt={4} display="flex" justifyContent="center">
                <Button variant="contained" onClick={handleCloseReviewModal} className="glass-button">
                  Close
                </Button>
              </Box>
            </Box>
          </Fade>
        </Modal>
      </Box>
    </>
  );
};

export default Home;