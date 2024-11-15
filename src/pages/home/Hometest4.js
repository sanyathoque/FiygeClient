// import React, { useState, useEffect } from 'react';
// import {
//   TextField,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Button,
//   Box,
//   Typography,
//   Checkbox,
//   FormControlLabel,
//   Grid,
//   Paper,
//   Divider,
// } from '@mui/material';
// import { useDropzone } from 'react-dropzone';
// import { useNavigate } from 'react-router-dom';
// import './Home.css';

// const Home = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     leadType: '',
//     leadSubType: '',
//     leadSource: '',
//     referredBy: '',
//     advisor: '',
//     dateOfBirth: '',
//     anniversaryDate: '',
//     dateOfConsultation: '',
//     officePhone: '',
//     homePhone: '',
//     mobile: '',
//     fax: '',
//     primaryEmail: '',
//     secondaryEmail: '',
//     doNotCall: false,
//     emailOptOut: false,
//     addressLine1: '',
//     addressLine2: '',
//     city: '',
//     state: '',
//     postalCode: '',
//     uploadedFiles: [],
//     username: '',
//     email: '',
//     password: '',
//     name: '',
//     coverPic: '',
//     profilePic: '',
//     website: '',
//   });

//   useEffect(() => {
//     // Load user data from local storage if available
//     const selectedUser = localStorage.getItem('selectedUser');
//     if (selectedUser) {
//       setFormData(JSON.parse(selectedUser));
//       localStorage.removeItem('selectedUser');
//     }
//   }, []);

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleCheckboxChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.checked });
//   };

//   const onDrop = (acceptedFiles) => {
//     setFormData({
//       ...formData,
//       uploadedFiles: [...formData.uploadedFiles, ...acceptedFiles.map((file) => file.name)],
//     });
//   };

//   const { getRootProps, getInputProps } = useDropzone({ onDrop });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log('FormData', formData);
//     try {
//       const response = await fetch('http://localhost:8800/api/auth/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to submit form data');
//       }

//       const data = await response.json();
//       console.log('Form submitted successfully:', data);
//       navigate('/users');
//     } catch (error) {
//       console.error('Error submitting form data:', error);
//     }
//   };

//   return (
//     <Box className="main-container">
//       <Paper elevation={12} className="form-container">
//         <Typography variant="h4" component="h2" gutterBottom align="center" className="form-title">
//           Client Information Form
//         </Typography>
//         <Divider className="form-divider" />
//         <form onSubmit={handleSubmit}>
//           {/* Basic Information */}
//           <Box className="form-section glass-surface">
//             <Typography variant="h6" className="section-title">
//               Basic Information (regex applied, will appear in placeholder once input field is clicked)
//             </Typography>
//             <Grid container spacing={3}>
//               <Grid item xs={12} sm={4}>
//                 <TextField
//                   fullWidth
//                   label="First Name"
//                   name="firstName"
//                   value={formData.firstName}
//                   onChange={handleInputChange}
//                   margin="normal"
//                   variant="outlined"
//                   className="glass-input"
//                   placeholder="Only alphabets (e.g., John)"
//                   inputProps={{ pattern: '^[A-Za-z]+$', title: 'First name must contain only letters.' }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <TextField
//                   fullWidth
//                   label="Last Name"
//                   name="lastName"
//                   value={formData.lastName}
//                   onChange={handleInputChange}
//                   margin="normal"
//                   variant="outlined"
//                   className="glass-input"
//                   placeholder="Only alphabets (e.g., Doe)"
//                   inputProps={{ pattern: '^[A-Za-z]+$', title: 'Last name must contain only letters.' }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <FormControl variant="outlined" fullWidth margin="normal" className="glass-input">
//                   <InputLabel id="lead-type-label">Lead Type</InputLabel>
//                   <Select
//                     labelId="lead-type-label"
//                     name="leadType"
//                     value={formData.leadType}
//                     onChange={handleInputChange}
//                     label="Lead Type"
//                   >
//                     <MenuItem value="Client">Client</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <FormControl variant="outlined" fullWidth margin="normal" className="glass-input">
//                   <InputLabel id="lead-subtype-label">Lead Sub Type</InputLabel>
//                   <Select
//                     labelId="lead-subtype-label"
//                     name="leadSubType"
//                     value={formData.leadSubType}
//                     onChange={handleInputChange}
//                     label="Lead Sub Type"
//                   >
//                     <MenuItem value="SKY">SKY</MenuItem>
//                     <MenuItem value="DIRECT CLIENT">DIRECT CLIENT</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <TextField
//                   fullWidth
//                   label="Lead Source"
//                   name="leadSource"
//                   value={formData.leadSource}
//                   onChange={handleInputChange}
//                   margin="normal"
//                   variant="outlined"
//                   className="glass-input"
//                 />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <TextField
//                   fullWidth
//                   label="Referred By"
//                   name="referredBy"
//                   value={formData.referredBy}
//                   onChange={handleInputChange}
//                   margin="normal"
//                   variant="outlined"
//                   className="glass-input"
//                 />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <TextField
//                   fullWidth
//                   label="Advisor"
//                   name="advisor"
//                   value={formData.advisor}
//                   onChange={handleInputChange}
//                   margin="normal"
//                   variant="outlined"
//                   className="glass-input"
//                 />
//               </Grid>
//             </Grid>
//           </Box>

//           <Divider className="form-divider" />

//           {/* Essential Dates */}
//           <Box className="form-section glass-surface">
//             <Typography variant="h6" className="section-title">
//               Essential Dates (regex applied, will appear in placeholder once input field is clicked)
//             </Typography>
//             <Grid container spacing={3}>
//               <Grid item xs={12} sm={4}>
//                 <TextField
//                   fullWidth
//                   label="Date of Birth"
//                   name="dateOfBirth"
//                   type="date"
//                   InputLabelProps={{ shrink: true }}
//                   value={formData.dateOfBirth}
//                   onChange={handleInputChange}
//                   margin="normal"
//                   variant="outlined"
//                   className="glass-input"
//                 />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <TextField
//                   fullWidth
//                   label="Anniversary Date"
//                   name="anniversaryDate"
//                   type="date"
//                   InputLabelProps={{ shrink: true }}
//                   value={formData.anniversaryDate}
//                   onChange={handleInputChange}
//                   margin="normal"
//                   variant="outlined"
//                   className="glass-input"
//                 />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <TextField
//                   fullWidth
//                   label="Date of Consultation"
//                   name="dateOfConsultation"
//                   type="date"
//                   InputLabelProps={{ shrink: true }}
//                   value={formData.dateOfConsultation}
//                   onChange={handleInputChange}
//                   margin="normal"
//                   variant="outlined"
//                   className="glass-input"
//                 />
//               </Grid>
//             </Grid>
//           </Box>

//           <Divider className="form-divider" />

//           {/* Contact Information */}
//           <Box className="form-section glass-surface">
//             <Typography variant="h6" className="section-title">
//               Contact Information (regex applied, will appear in placeholder once input field is clicked)
//             </Typography>
//             <Grid container spacing={3}>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Office Phone"
//                   name="officePhone"
//                   value={formData.officePhone}
//                   onChange={handleInputChange}
//                   margin="normal"
//                   variant="outlined"
//                   className="glass-input"
//                   placeholder="10-digit number (e.g., 123-456-7890)"
//                   inputProps={{ pattern: '^[0-9]{3}-[0-9]{3}-[0-9]{4}$', title: 'Phone number must be in the format 123-456-7890.' }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Home Phone"
//                   name="homePhone"
//                   value={formData.homePhone}
//                   onChange={handleInputChange}
//                   margin="normal"
//                   variant="outlined"
//                   className="glass-input"
//                   placeholder="10-digit number (e.g., 123-456-7890)"
//                   inputProps={{ pattern: '^[0-9]{3}-[0-9]{3}-[0-9]{4}$', title: 'Phone number must be in the format 123-456-7890.' }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Mobile"
//                   name="mobile"
//                   value={formData.mobile}
//                   onChange={handleInputChange}
//                   margin="normal"
//                   variant="outlined"
//                   className="glass-input"
//                   placeholder="10-digit number (e.g., 123-456-7890)"
//                   inputProps={{ pattern: '^[0-9]{3}-[0-9]{3}-[0-9]{4}$', title: 'Phone number must be in the format 123-456-7890.' }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Fax"
//                   name="fax"
//                   value={formData.fax}
//                   onChange={handleInputChange}
//                   margin="normal"
//                   variant="outlined"
//                   className="glass-input"
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Primary Email"
//                   name="primaryEmail"
//                   value={formData.primaryEmail}
//                   onChange={handleInputChange}
//                   margin="normal"
//                   variant="outlined"
//                   className="glass-input"
//                   placeholder="Valid email (e.g., john.doe@example.com)"
//                   inputProps={{ pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', title: 'Please enter a valid email address.' }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Secondary Email"
//                   name="secondaryEmail"
//                   value={formData.secondaryEmail}
//                   onChange={handleInputChange}
//                   margin="normal"
//                   variant="outlined"
//                   className="glass-input"
//                   placeholder="Valid email (e.g., john.doe@example.com)"
//                   inputProps={{ pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', title: 'Please enter a valid email address.' }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       checked={formData.emailOptOut}
//                       onChange={handleCheckboxChange}
//                       name="emailOptOut"
//                       className="glass-checkbox"
//                     />
//                   }
//                   label="Email Opt Out"
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       checked={formData.doNotCall}
//                       onChange={handleCheckboxChange}
//                       name="doNotCall"
//                       className="glass-checkbox"
//                     />
//                   }
//                   label="Do Not Call"
//                 />
//               </Grid>
//             </Grid>
//           </Box>

//           <Divider className="form-divider" />

//           {/* Address Information */}
//           <Box className="form-section glass-surface">
//             <Typography variant="h6" className="section-title">
//               Address Information (regex applied, will appear in placeholder once input field is clicked)
//             </Typography>
//             <Grid container spacing={3}>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Address Line 1"
//                   name="addressLine1"
//                   value={formData.addressLine1}
//                   onChange={handleInputChange}
//                   margin="normal"
//                   variant="outlined"
//                   className="glass-input"
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Address Line 2"
//                   name="addressLine2"
//                   value={formData.addressLine2}
//                   onChange={handleInputChange}
//                   margin="normal"
//                   variant="outlined"
//                   className="glass-input"
//                 />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <TextField
//                   fullWidth
//                   label="City"
//                   name="city"
//                   value={formData.city}
//                   onChange={handleInputChange}
//                   margin="normal"
//                   variant="outlined"
//                   className="glass-input"
//                   placeholder="Only alphabets (e.g., Toronto)"
//                   inputProps={{ pattern: '^[A-Za-z]+(?:[\s-][A-Za-z]+)*$', title: 'City must contain only letters.' }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <TextField
//                   fullWidth
//                   label="State"
//                   name="state"
//                   value={formData.state}
//                   onChange={handleInputChange}
//                   margin="normal"
//                   variant="outlined"
//                   className="glass-input"
//                   placeholder="Only alphabets (e.g., Ontario)"
//                   inputProps={{ pattern: '^[A-Za-z]+(?:[\s-][A-Za-z]+)*$', title: 'State must contain only letters.' }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <TextField
//                   fullWidth
//                   label="Postal Code"
//                   name="postalCode"
//                   value={formData.postalCode}
//                   onChange={handleInputChange}
//                   margin="normal"
//                   variant="outlined"
//                   className="glass-input"
//                   placeholder="Format: A1A 1A1"
//                   inputProps={{ pattern: '^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$', title: 'Postal code must be in the format A1A 1A1.' }}
//                 />
//               </Grid>
//             </Grid>
//           </Box>

//           <Divider className="form-divider" />

//           {/* Account Information */}
//           <Box className="form-section glass-surface">
//             <Typography variant="h6" className="section-title">
//               Account Information (regex applied, will appear in placeholder once input field is clicked)
//             </Typography>
//             <Grid container spacing={3}>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Username"
//                   name="username"
//                   value={formData.username}
//                   onChange={handleInputChange}
//                   margin="normal"
//                   variant="outlined"
//                   className="glass-input"
//                   placeholder="Alphanumeric, 5-15 characters"
//                   inputProps={{ pattern: '^[a-zA-Z0-9]{5,15}$', title: 'Username must be alphanumeric and between 5 to 15 characters.' }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   margin="normal"
//                   variant="outlined"
//                   className="glass-input"
//                   placeholder="Valid email (e.g., john.doe@example.com)"
//                   inputProps={{ pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', title: 'Please enter a valid email address.' }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Password"
//                   name="password"
//                   type="password"
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   margin="normal"
//                   variant="outlined"
//                   className="glass-input"
//                   placeholder="At least 8 characters, with one letter and one number"
//                   inputProps={{  title: 'Password must be at least 8 characters long and contain at least one letter and one number.' }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   margin="normal"
//                   variant="outlined"
//                   className="glass-input"
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Cover Picture URL"
//                   name="coverPic"
//                   value={formData.coverPic}
//                   onChange={handleInputChange}
//                   margin="normal"
//                   variant="outlined"
//                   className="glass-input"
//                   placeholder="Valid URL (e.g., https://example.com/image.jpg)"
//                   inputProps={{ pattern: '^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$', title: 'Please enter a valid URL.' }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Profile Picture URL"
//                   name="profilePic"
//                   value={formData.profilePic}
//                   onChange={handleInputChange}
//                   margin="normal"
//                   variant="outlined"
//                   className="glass-input"
//                   placeholder="Valid URL (e.g., https://example.com/image.jpg)"
//                   inputProps={{ pattern: '^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$', title: 'Please enter a valid URL.' }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Website"
//                   name="website"
//                   value={formData.website}
//                   onChange={handleInputChange}
//                   margin="normal"
//                   variant="outlined"
//                   className="glass-input"
//                   placeholder="Valid URL (e.g., https://example.com)"
//                   inputProps={{ pattern: '^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$', title: 'Please enter a valid URL.' }}
//                 />
//               </Grid>
//             </Grid>
//           </Box>

//           <Box display="flex" justifyContent="center" marginTop={4}>
//             <Box {...getRootProps()} className="dropzone">
//               <input {...getInputProps()} />
//               <Button variant="contained" className="upload-button">
//                 Drag & Drop or Click to Upload Document
//               </Button>
//             </Box>
//             <Button variant="contained" type="submit" className="submit-button glass-button">
//               Save & Continue
//             </Button>
//             <Button variant="contained" className="glass-button">
//               Cancel
//             </Button>
//           </Box>
//         </form>
//       </Paper>
//     </Box>
//   );
// };

// export default Home;