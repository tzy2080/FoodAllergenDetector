import {Container, Grid, Box, Typography, Button, Avatar, TextField, Link, Paper } from '@mui/material';
import { useState, useContext } from 'react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Register = () => {
    // User registration details state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Error state
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    // Authetication context
    const { getLoggedIn, loggedIn } = useContext(AuthContext);

    // Navigate
    const navigate = useNavigate();
    
    // Submit form submit behaviour
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Reset error state
        setEmailError('');
        setPasswordError('');

        try {
            const registerData = {
                email,
                password
            };

            await axios.post('http://localhost:5000/user/login', registerData, {withCredentials: true});
            getLoggedIn();
            console.log(loggedIn);
            navigate('/');
        } catch(error) {
            const errors = error.response.data.errors;
            errors.forEach((error) => {
                if (error.param === 'email'){
                    setEmailError(error.msg);
                }
                else {
                    setPasswordError(error.msg);
                }
            });
        }
    };

    return ( 
        <Container>
            <Box sx={{display: 'flex', flexDirection:'column', alignItems:'center', my:8}}>
                <Grid container justifyContent='center'>
                    <Grid item xs={12} sm={5}>
                        <Paper elevation={3} sx={{px: 5, py:7, borderRadius:3}}>
                            <Box sx={{display: 'flex', flexDirection:'column', alignItems:'center'}}>
                                <Avatar sx={{ m: 1, bgcolor: 'primary.dark' }}>
                                    <LockOutlinedIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Sign In
                                </Typography>
                            </Box>
                            <Box component='form' noValidate onSubmit={handleSubmit} sx={{mt: 4}}>
                                <Grid container spacing={2} justifyContent='center'>
                                    <Grid item xs={12}>
                                        <TextField 
                                            required 
                                            fullWidth 
                                            id='email' 
                                            name='email' 
                                            label='Email Address' 
                                            value={email} 
                                            onChange={(e) => {setEmail(e.target.value)}}
                                            error={emailError.length === 0 ? false : true}
                                            helperText={emailError}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField 
                                            required 
                                            fullWidth 
                                            id='password' 
                                            type='password' 
                                            name='password' 
                                            label='Password' 
                                            value={password} 
                                            onChange={(e) => {setPassword(e.target.value)}}
                                            error={passwordError.length === 0 ? false : true}
                                            helperText={passwordError}
                                        />
                                    </Grid>
                                </Grid>
                                <Button type='submit' fullWidth variant='contained' sx={{my:3}}>
                                    Sign In
                                </Button>
                                <Typography variant='body2'>Don't have an account yet? <Link component={RouterLink} underline='none' to='/Register'>Register</Link></Typography>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}
 
export default Register;