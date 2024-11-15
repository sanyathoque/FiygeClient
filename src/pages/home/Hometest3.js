// import React, { useState } from 'react';
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
//   Radio,
//   RadioGroup,
//   FormControl as MUIFormControl,
//   FormLabel,
// } from '@mui/material';
// import { useDropzone } from 'react-dropzone';


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

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleCheckboxChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.checked });
//   };

//   const onDrop = (acceptedFiles) => {
//     setFormData({
//       ...formData,
//       uploadedFiles: [...formData.uploadedFiles, ...acceptedFiles.map(file => file.name)],
//     });
//   };

//   const { getRootProps, getInputProps } = useDropzone({ onDrop });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("FormData", formData)
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
//     } catch (error) {
//       console.error('Error submitting form data:', error);
//     }
//   };

//   return (
//     <Box
//       className="main-container"
//       sx={{
//         padding: '40px',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'rgba(255, 255, 255, 0.2)',
//         backdropFilter: 'blur(15px)',
//         borderRadius: '20px',
//         boxShadow: '0 8px 32px rgba(0, 0, 0, 0.37)',
//         minHeight: '100vh',
//       }}
//     >
//       <Paper
//         elevation={12}
//         className="form-container glassmorphism"
//         sx={{
//           padding: '40px',
//           borderRadius: '20px',
//           backdropFilter: 'blur(20px)',
//           backgroundColor: 'rgba(255, 255, 255, 0.4)',
//           boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
//           maxWidth: '1200px',
//           width: '100%',
//         }}
//       >
//         <Typography
//           variant="h4"
//           component="h2"
//           gutterBottom
//           align="center"
//           className="form-title"
//           sx={{ fontSize: '44px', marginBottom: '20px', color: '#333' }}
//         >
//           Client Information Form
//         </Typography>
//         <Divider className="form-divider" sx={{ marginBottom: '20px', backgroundColor: '#999' }} />
//         <form onSubmit={handleSubmit}>
//           {/* Basic Information */}
//           <Box
//             className="form-section glass-surface"
//             sx={{
//               marginBottom: '30px',
//               padding: '30px',
//               borderRadius: '15px',
//               backdropFilter: 'blur(10px)',
//               backgroundColor: 'rgba(255, 255, 255, 0.3)',
//               boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
//             }}
//           >
//             <Typography variant="h6" className="section-title" sx={{ marginBottom: '20px', color: '#333' }}>
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
//                   sx={{
//                     backgroundColor: 'rgba(255, 255, 255, 0.5)',
//                     borderRadius: '10px',
//                     backdropFilter: 'blur(8px)',
//                     '& .MuiOutlinedInput-root': {
//                       '& fieldset': {
//                         borderColor: '#ccc',
//                       },
//                       '&:hover fieldset': {
//                         borderColor: '#aaa',
//                       },
//                       '&.Mui-focused fieldset': {
//                         borderColor: '#333',
//                       },
//                     },
//                   }}
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
//                   sx={{
//                     backgroundColor: 'rgba(255, 255, 255, 0.5)',
//                     borderRadius: '10px',
//                     backdropFilter: 'blur(8px)',
//                     '& .MuiOutlinedInput-root': {
//                       '& fieldset': {
//                         borderColor: '#ccc',
//                       },
//                       '&:hover fieldset': {
//                         borderColor: '#aaa',
//                       },
//                       '&.Mui-focused fieldset': {
//                         borderColor: '#333',
//                       },
//                     },
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <FormControl
//                   variant="outlined"
//                   fullWidth
//                   margin="normal"
//                   sx={{
//                     backgroundColor: 'rgba(255, 255, 255, 0.5)',
//                     borderRadius: '10px',
//                     backdropFilter: 'blur(8px)',
//                     '& .MuiOutlinedInput-root': {
//                       '& fieldset': {
//                         borderColor: '#ccc',
//                       },
//                       '&:hover fieldset': {
//                         borderColor: '#aaa',
//                       },
//                       '&.Mui-focused fieldset': {
//                         borderColor: '#333',
//                       },
//                     },
//                   }}
//                 >
//                   <InputLabel id="lead-type-label" style={{ color: '#333' }}>
//                     Lead Type
//                   </InputLabel>
//                   <Select
//                     labelId="lead-type-label"
//                     name="leadType"
//                     value={formData.leadType}
//                     onChange={handleInputChange}
//                     label="Lead Type"
//                     style={{ color: '#333' }}
//                   >
//                     <MenuItem value="Client">Client</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <FormControl
//                   variant="outlined"
//                   fullWidth
//                   margin="normal"
//                   sx={{
//                     backgroundColor: 'rgba(255, 255, 255, 0.5)',
//                     borderRadius: '10px',
//                     backdropFilter: 'blur(8px)',
//                     '& .MuiOutlinedInput-root': {
//                       '& fieldset': {
//                         borderColor: '#ccc',
//                       },
//                       '&:hover fieldset': {
//                         borderColor: '#aaa',
//                       },
//                       '&.Mui-focused fieldset': {
//                         borderColor: '#333',
//                       },
//                     },
//                   }}
//                 >
//                   <InputLabel id="lead-subtype-label" style={{ color: '#333' }}>
//                     Lead Sub Type
//                   </InputLabel>
//                   <Select
//                     labelId="lead-subtype-label"
//                     name="leadSubType"
//                     value={formData.leadSubType}
//                     onChange={handleInputChange}
//                     label="Lead Sub Type"
//                     style={{ color: '#333' }}
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
//                   sx={{
//                     backgroundColor: 'rgba(255, 255, 255, 0.5)',
//                     borderRadius: '10px',
//                     backdropFilter: 'blur(8px)',
//                     '& .MuiOutlinedInput-root': {
//                       '& fieldset': {
//                         borderColor: '#ccc',
//                       },
//                       '&:hover fieldset': {
//                         borderColor: '#aaa',
//                       },
//                       '&.Mui-focused fieldset': {
//                         borderColor: '#333',
//                       },
//                     },
//                   }}
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
//                   sx={{
//                     backgroundColor: 'rgba(255, 255, 255, 0.5)',
//                     borderRadius: '10px',
//                     backdropFilter: 'blur(8px)',
//                     '& .MuiOutlinedInput-root': {
//                       '& fieldset': {
//                         borderColor: '#ccc',
//                       },
//                       '&:hover fieldset': {
//                         borderColor: '#aaa',
//                       },
//                       '&.Mui-focused fieldset': {
//                         borderColor: '#333',
//                       },
//                     },
//                   }}
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
//                   sx={{
//                     backgroundColor: 'rgba(255, 255, 255, 0.5)',
//                     borderRadius: '10px',
//                     backdropFilter: 'blur(8px)',
//                     '& .MuiOutlinedInput-root': {
//                       '& fieldset': {
//                         borderColor: '#ccc',
//                       },
//                       '&:hover fieldset': {
//                         borderColor: '#aaa',
//                       },
//                       '&.Mui-focused fieldset': {
//                         borderColor: '#333',
//                       },
//                     },
//                   }}
//                 />
//               </Grid>
//             </Grid>
//           </Box>

//           <Divider className="form-divider" sx={{ marginBottom: '30px', backgroundColor: '#999' }} />

//           {/* Essential Dates */}
//           <Box
//             className="form-section glass-surface"
//             sx={{
//               marginBottom: '30px',
//               padding: '30px',
//               borderRadius: '15px',
//               backdropFilter: 'blur(10px)',
//               backgroundColor: 'rgba(255, 255, 255, 0.3)',
//               boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
//             }}
//           >
//             <Typography variant="h6" className="section-title" sx={{ marginBottom: '20px', color: '#333' }}>
//               Essential Dates
//             </Typography>
//             <Grid container spacing={3}>
//               <Grid item xs={12} sm={4}>
//                 <TextField
//                   fullWidth
//                   label="Date of Birth"
//                   name="dateOfBirth"
//                   type="date"
//                   InputLabelProps={{ shrink: true, style: { color: '#333' } }}
//                   InputProps={{ style: { color: '#333' } }}
//                   value={formData.dateOfBirth}
//                   onChange={handleInputChange}
//                   margin="normal"
//                   variant="outlined"
//                   className="glass-input"
//                   sx={{
//                     backgroundColor: 'rgba(255, 255, 255, 0.5)',
//                     borderRadius: '10px',
//                     backdropFilter: 'blur(8px)',
//                     '& .MuiOutlinedInput-root': {
//                       '& fieldset': {
//                         borderColor: '#ccc',
//                       },
//                       '&:hover fieldset': {
//                         borderColor: '#aaa',
//                       },
//                       '&.Mui-focused fieldset': {
//                         borderColor: '#333',
//                       },
//                     },
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <TextField
//                   fullWidth
//                   label="Anniversary Date"
//                   name="anniversaryDate"
//                   type="date"
//                   InputLabelProps={{ shrink: true, style: { color: '#333' } }}
//                   InputProps={{ style: { color: '#333' } }}
//                   value={formData.anniversaryDate}
//                   onChange={handleInputChange}
//                   margin="normal"
//                   variant="outlined"
//                   className="glass-input"
//                   sx={{
//                     backgroundColor: 'rgba(255, 255, 255, 0.5)',
//                     borderRadius: '10px',
//                     backdropFilter: 'blur(8px)',
//                     '& .MuiOutlinedInput-root': {
//                       '& fieldset': {
//                         borderColor: '#ccc',
//                       },
//                       '&:hover fieldset': {
//                         borderColor: '#aaa',
//                       },
//                       '&.Mui-focused fieldset': {
//                         borderColor: '#333',
//                       },
//                     },
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <TextField
//                   fullWidth
//                   label="Date of Consultation"
//                   name="dateOfConsultation"
//                   type="date"
//                   InputLabelProps={{ shrink: true, style: { color: '#333' } }}
//                   InputProps={{ style: { color: '#333' } }}
//                   value={formData.dateOfConsultation}
//                   onChange={handleInputChange}
//                   margin="normal"
//                   variant="outlined"
//                   className="glass-input"
//                   sx={{
//                     backgroundColor: 'rgba(255, 255, 255, 0.5)',
//                     borderRadius: '10px',
//                     backdropFilter: 'blur(8px)',
//                     '& .MuiOutlinedInput-root': {
//                       '& fieldset': {
//                         borderColor: '#ccc',
//                       },
//                       '&:hover fieldset': {
//                         borderColor: '#aaa',
//                       },
//                       '&.Mui-focused fieldset': {
//                         borderColor: '#333',
//                       },
//                     },
//                   }}
//                 />
//               </Grid>
//             </Grid>
//           </Box>

//           <Divider className="form-divider" sx={{ marginBottom: '30px', backgroundColor: '#999' }} />

//           {/* Contact Information */}
//           <Box
//             className="form-section glass-surface"
//             sx={{
//               marginBottom: '30px',
//               padding: '30px',
//               borderRadius: '15px',
//               backdropFilter: 'blur(10px)',
//               backgroundColor: 'rgba(255, 255, 255, 0.3)',
//               boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
//             }}
//           >
//             <Typography variant="h6" className="section-title" sx={{ marginBottom: '20px', color: '#333' }}>
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
//                   sx={{
//                     backgroundColor: 'rgba(255, 255, 255, 0.5)',
//                     borderRadius: '10px',
//                     backdropFilter: 'blur(8px)',
//                     '& .MuiOutlinedInput-root': {
//                       '& fieldset': {
//                         borderColor: '#ccc',
//                       },
//                       '&:hover fieldset': {
//                         borderColor: '#aaa',
//                       },
//                       '&.Mui-focused fieldset': {
//                         borderColor: '#333',
//                       },
//                     },
//                   }}
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
//                   sx={{
//                     backgroundColor: 'rgba(255, 255, 255, 0.5)',
//                     borderRadius: '10px',
//                     backdropFilter: 'blur(8px)',
//                     '& .MuiOutlinedInput-root': {
//                       '& fieldset': {
//                         borderColor: '#ccc',
//                       },
//                       '&:hover fieldset': {
//                         borderColor: '#aaa',
//                       },
//                       '&.Mui-focused fieldset': {
//                         borderColor: '#333',
//                       },
//                     },
//                   }}
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
//                   sx={{
//                     backgroundColor: 'rgba(255, 255, 255, 0.5)',
//                     borderRadius: '10px',
//                     backdropFilter: 'blur(8px)',
//                     '& .MuiOutlinedInput-root': {
//                       '& fieldset': {
//                         borderColor: '#ccc',
//                       },
//                       '&:hover fieldset': {
//                         borderColor: '#aaa',
//                       },
//                       '&.Mui-focused fieldset': {
//                         borderColor: '#333',
//                       },
//                     },
//                   }}
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
//                   sx={{
//                     backgroundColor: 'rgba(255, 255, 255, 0.5)',
//                     borderRadius: '10px',
//                     backdropFilter: 'blur(8px)',
//                     '& .MuiOutlinedInput-root': {
//                       '& fieldset': {
//                         borderColor: '#ccc',
//                       },
//                       '&:hover fieldset': {
//                         borderColor: '#aaa',
//                       },
//                       '&.Mui-focused fieldset': {
//                         borderColor: '#333',
//                       },
//                     },
//                   }}
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
//                   sx={{
//                     backgroundColor: 'rgba(255, 255, 255, 0.5)',
//                     borderRadius: '10px',
//                     backdropFilter: 'blur(8px)',
//                     '& .MuiOutlinedInput-root': {
//                       '& fieldset': {
//                         borderColor: '#ccc',
//                       },
//                       '&:hover fieldset': {
//                         borderColor: '#aaa',
//                       },
//                       '&.Mui-focused fieldset': {
//                         borderColor: '#333',
//                       },
//                     },
//                   }}
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
//                   sx={{
//                     backgroundColor: 'rgba(255, 255, 255, 0.5)',
//                     borderRadius: '10px',
//                     backdropFilter: 'blur(8px)',
//                     '& .MuiOutlinedInput-root': {
//                       '& fieldset': {
//                         borderColor: '#ccc',
//                       },
//                       '&:hover fieldset': {
//                         borderColor: '#aaa',
//                       },
//                       '&.Mui-focused fieldset': {
//                         borderColor: '#333',
//                       },
//                     },
//                   }}
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

//           <Divider className="form-divider" sx={{ marginBottom: '30px', backgroundColor: '#999' }} />

//           {/* Address Information */}
//           <Box
//             className="form-section glass-surface"
//             sx={{
//               marginBottom: '30px',
//               padding: '30px',
//               borderRadius: '15px',
//               backdropFilter: 'blur(10px)',
//               backgroundColor: 'rgba(255, 255, 255, 0.3)',
//               boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
//             }}
//           >
//             <Typography variant="h6" className="section-title" sx={{ marginBottom: '20px', color: '#333' }}>
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
//                   sx={{
//                     backgroundColor: 'rgba(255, 255, 255, 0.5)',
//                     borderRadius: '10px',
//                     backdropFilter: 'blur(8px)',
//                     '& .MuiOutlinedInput-root': {
//                       '& fieldset': {
//                         borderColor: '#ccc',
//                       },
//                       '&:hover fieldset': {
//                         borderColor: '#aaa',
//                       },
//                       '&.Mui-focused fieldset': {
//                         borderColor: '#333',
//                       },
//                     },
//                   }}
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
//                   sx={{
//                     backgroundColor: 'rgba(255, 255, 255, 0.5)',
//                     borderRadius: '10px',
//                     backdropFilter: 'blur(8px)',
//                     '& .MuiOutlinedInput-root': {
//                       '& fieldset': {
//                         borderColor: '#ccc',
//                       },
//                       '&:hover fieldset': {
//                         borderColor: '#aaa',
//                       },
//                       '&.Mui-focused fieldset': {
//                         borderColor: '#333',
//                       },
//                     },
//                   }}
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
//                   sx={{
//                     backgroundColor: 'rgba(255, 255, 255, 0.5)',
//                     borderRadius: '10px',
//                     backdropFilter: 'blur(8px)',
//                     '& .MuiOutlinedInput-root': {
//                       '& fieldset': {
//                         borderColor: '#ccc',
//                       },
//                       '&:hover fieldset': {
//                         borderColor: '#aaa',
//                       },
//                       '&.Mui-focused fieldset': {
//                         borderColor: '#333',
//                       },
//                     },
//                   }}
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
//                   sx={{
//                     backgroundColor: 'rgba(255, 255, 255, 0.5)',
//                     borderRadius: '10px',
//                     backdropFilter: 'blur(8px)',
//                     '& .MuiOutlinedInput-root': {
//                       '& fieldset': {
//                         borderColor: '#ccc',
//                       },
//                       '&:hover fieldset': {
//                         borderColor: '#aaa',
//                       },
//                       '&.Mui-focused fieldset': {
//                         borderColor: '#333',
//                       },
//                     },
//                   }}
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
//                   sx={{
//                     backgroundColor: 'rgba(255, 255, 255, 0.5)',
//                     borderRadius: '10px',
//                     backdropFilter: 'blur(8px)',
//                     '& .MuiOutlinedInput-root': {
//                       '& fieldset': {
//                         borderColor: '#ccc',
//                       },
//                       '&:hover fieldset': {
//                         borderColor: '#aaa',
//                       },
//                       '&.Mui-focused fieldset': {
//                         borderColor: '#333',
//                       },
//                     },
//                   }}
//                 />
//               </Grid>
//             </Grid>
//           </Box>

//           <Divider className="form-divider" sx={{ marginBottom: '30px', backgroundColor: '#999' }} />

//           {/* Account Information */}
//           <Box
//             className="form-section glass-surface"
//             sx={{
//               marginBottom: '30px',
//               padding: '30px',
//               borderRadius: '15px',
//               backdropFilter: 'blur(10px)',
//               backgroundColor: 'rgba(255, 255, 255, 0.3)',
//               boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
//             }}
//           >
//             <Typography variant="h6" className="section-title" sx={{ marginBottom: '20px', color: '#333' }}>
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
//                   sx={{
//                     backgroundColor: 'rgba(255, 255, 255, 0.5)',
//                     borderRadius: '10px',
//                     backdropFilter: 'blur(8px)',
//                     '& .MuiOutlinedInput-root': {
//                       '& fieldset': {
//                         borderColor: '#ccc',
//                       },
//                       '&:hover fieldset': {
//                         borderColor: '#aaa',
//                       },
//                       '&.Mui-focused fieldset': {
//                         borderColor: '#333',
//                       },
//                     },
//                   }}
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
//                   sx={{
//                     backgroundColor: 'rgba(255, 255, 255, 0.5)',
//                     borderRadius: '10px',
//                     backdropFilter: 'blur(8px)',
//                     '& .MuiOutlinedInput-root': {
//                       '& fieldset': {
//                         borderColor: '#ccc',
//                       },
//                       '&:hover fieldset': {
//                         borderColor: '#aaa',
//                       },
//                       '&.Mui-focused fieldset': {
//                         borderColor: '#333',
//                       },
//                     },
//                   }}
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
//                   sx={{
//                     backgroundColor: 'rgba(255, 255, 255, 0.5)',
//                     borderRadius: '10px',
//                     backdropFilter: 'blur(8px)',
//                     '& .MuiOutlinedInput-root': {
//                       '& fieldset': {
//                         borderColor: '#ccc',
//                       },
//                       '&:hover fieldset': {
//                         borderColor: '#aaa',
//                       },
//                       '&.Mui-focused fieldset': {
//                         borderColor: '#333',
//                       },
//                     },
//                   }}
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
//                   sx={{
//                     backgroundColor: 'rgba(255, 255, 255, 0.5)',
//                     borderRadius: '10px',
//                     backdropFilter: 'blur(8px)',
//                     '& .MuiOutlinedInput-root': {
//                       '& fieldset': {
//                         borderColor: '#ccc',
//                       },
//                       '&:hover fieldset': {
//                         borderColor: '#aaa',
//                       },
//                       '&.Mui-focused fieldset': {
//                         borderColor: '#333',
//                       },
//                     },
//                   }}
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
//                   sx={{
//                     backgroundColor: 'rgba(255, 255, 255, 0.5)',
//                     borderRadius: '10px',
//                     backdropFilter: 'blur(8px)',
//                     '& .MuiOutlinedInput-root': {
//                       '& fieldset': {
//                         borderColor: '#ccc',
//                       },
//                       '&:hover fieldset': {
//                         borderColor: '#aaa',
//                       },
//                       '&.Mui-focused fieldset': {
//                         borderColor: '#333',
//                       },
//                     },
//                   }}
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
//                   sx={{
//                     backgroundColor: 'rgba(255, 255, 255, 0.5)',
//                     borderRadius: '10px',
//                     backdropFilter: 'blur(8px)',
//                     '& .MuiOutlinedInput-root': {
//                       '& fieldset': {
//                         borderColor: '#ccc',
//                       },
//                       '&:hover fieldset': {
//                         borderColor: '#aaa',
//                       },
//                       '&.Mui-focused fieldset': {
//                         borderColor: '#333',
//                       },
//                     },
//                   }}
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
//                   sx={{
//                     backgroundColor: 'rgba(255, 255, 255, 0.5)',
//                     borderRadius: '10px',
//                     backdropFilter: 'blur(8px)',
//                     '& .MuiOutlinedInput-root': {
//                       '& fieldset': {
//                         borderColor: '#ccc',
//                       },
//                       '&:hover fieldset': {
//                         borderColor: '#aaa',
//                       },
//                       '&.Mui-focused fieldset': {
//                         borderColor: '#333',
//                       },
//                     },
//                   }}
//                 />
//               </Grid>
//             </Grid>
//           </Box>

//           <Box display="flex" justifyContent="center" marginTop={4}>
//             <Box {...getRootProps()} className="dropzone" sx={{ marginRight: '20px' }}>
//               <input {...getInputProps()} />
//               <Button
//                 variant="contained"
//                 className="upload-button"
//                 sx={{
//                   backgroundColor: 'rgba(255, 255, 255, 0.5)',
//                   borderRadius: '10px',
//                   color: '#333',
//                   backdropFilter: 'blur(8px)',
//                   '&:hover': {
//                     backgroundColor: 'rgba(255, 255, 255, 0.6)',
//                   },
//                 }}
//               >
//                 Drag & Drop or Click to Upload Document
//               </Button>
//             </Box>
//             <Button
//               variant="contained"
//               type="submit"
//               className="submit-button glass-button"
//               sx={{
//                 marginLeft: '20px',
//                 backgroundColor: 'rgba(255, 255, 255, 0.5)',
//                 borderRadius: '10px',
//                 color: '#333',
//                 backdropFilter: 'blur(8px)',
//                 '&:hover': {
//                   backgroundColor: 'rgba(255, 255, 255, 0.6)',
//                 },
//               }}
//             >
//               Save & Continue
//             </Button>
//             <Button
//               variant="contained"
//               className="glass-button"
//               sx={{
//                 marginLeft: '20px',
//                 backgroundColor: 'rgba(255, 255, 255, 0.5)',
//                 borderRadius: '10px',
//                 color: '#333',
//                 backdropFilter: 'blur(8px)',
//                 '&:hover': {
//                   backgroundColor: 'rgba(255, 255, 255, 0.6)',
//                 },
//               }}
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
