import {Container, Grid, Box, Typography, Button, Avatar, TextField, Link, Paper } from '@mui/material';
import { useState, useContext } from 'react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Register = () => {
    // User registration details state
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVerify, setPasswordVerify] = useState('');

    // Error state
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordVerifyError, setPasswordVerifyError] = useState('');

    // Authetication context
    const { getLoggedIn } = useContext(AuthContext);

    // Navigate
    const navigate = useNavigate();
    
    // Submit form submit behaviour
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset error states
        setUsernameError('');
        setEmailError('');
        setPasswordError('');
        setPasswordVerifyError('');
        
        try {
            const registerData = {
                username,
                email,
                password,
                passwordVerify
            }
            await axios.post('http://localhost:5000/user/register', registerData, {withCredentials: true});
            await getLoggedIn();
            navigate('/');
        } catch(error) {
            const errors = error.response.data.errors;
            errors.forEach((error) => {
                if (error.param === 'username'){
                    setUsernameError(error.msg);
                }
                else if (error.param === 'email'){
                    setEmailError(error.msg);
                }
                else if (error.param === 'password'){
                    setPasswordError(error.msg);
                }
                else {
                    setPasswordVerifyError(error.msg);
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
                                    Sign up
                                </Typography>
                            </Box>
                            <Box component='form' noValidate onSubmit={handleSubmit} sx={{mt: 4}}>
                                <Grid container spacing={2} justifyContent='center'>
                                    <Grid item xs={12}>
                                        <TextField 
                                            required 
                                            fullWidth 
                                            id='username' 
                                            name='username' 
                                            label='Username' 
                                            value={username} 
                                            onChange={(e) => {setUsername(e.target.value)}}
                                            error={usernameError.length === 0 ? false : true}
                                            helperText={usernameError}
                                        />
                                    </Grid>
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
                                    <Grid item xs={12}>
                                        <TextField 
                                            required 
                                            fullWidth 
                                            id='passwordVerify'
                                            type='password' 
                                            name='passwordVerify' 
                                            label='Password Verify' 
                                            value={passwordVerify} 
                                            onChange={(e) => {setPasswordVerify(e.target.value)}}
                                            error={passwordVerifyError.length === 0 ? false : true}
                                            helperText={passwordVerifyError}
                                        />
                                    </Grid>
                                </Grid>
                                <Button type='submit' fullWidth variant='contained' sx={{my:3}}>
                                    Sign Up
                                </Button>
                                <Typography variant='body2'>Already have an account? <Link component={RouterLink} underline='none' to='/Login'>Login</Link></Typography>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}
 
export default Register;