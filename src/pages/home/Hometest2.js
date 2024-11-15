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
// import './CertificateRequestForm.css';

// const Home = () => {
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

//   const navigate = useNavigate();

//   useEffect(() => {
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
//         credentials: 'include', // Include cookies in the request
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
//       <Paper elevation={12} className="form-container glassmorphism">
//         <Typography
//           variant="h4"
//           component="h2"
//           gutterBottom
//           align="center"
//           className="form-title"
//           style={{ fontSize: '44px' }}
//         >
//           Client Information Form
//         </Typography>
//         <Divider className="form-divider" />
//         <form onSubmit={handleSubmit}>
//           {/* Basic Information */}
//           <Box className="form-section glass-surface">
//             <Typography variant="h6" className="section-title">
//               Basic Information
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
//                 />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <FormControl variant="outlined" fullWidth margin="normal">
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
//                 <FormControl variant="outlined" fullWidth margin="normal">
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
//               Essential Dates
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
//               Contact Information
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
//               Address Information
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
//                 />
//               </Grid>
//             </Grid>
//           </Box>

//           <Divider className="form-divider" />

//           {/* Account Information */}
//           <Box className="form-section glass-surface">
//             <Typography variant="h6" className="section-title">
//               Account Information
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
//             <Button
//               variant="contained"
//               type="submit"
//               className="submit-button glass-button"
//               style={{ marginLeft: '20px' }}
//             >
//               Save & Continue
//             </Button>
//             <Button
//               variant="contained"
//               className="glass-button"
//               style={{ marginLeft: '20px' }}
//               onClick={() => navigate('/users')}
//             >
//               Cancel
//             </Button>
//           </Box>
//         </form>
//       </Paper>
//     </Box>
//   );
// };

// export default Home;
