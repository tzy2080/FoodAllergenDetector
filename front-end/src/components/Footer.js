import { Grid, Container, Box, Stack, Typography } from '@mui/material';
import { Link  } from 'react-router-dom';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import LogoutBtn from './LogoutBtn';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Footer = () => {
    const { loggedIn } = useContext(AuthContext);

    return ( 
        <Box component='footer' sx={{mt: 'auto'}} >
            <Box sx={{backgroundColor:'primary.dark', minHeight: '20vh'}}>
                <Container maxWidth='lg'>
                    <Grid container pt={6} pb={10}>
                        <Grid item xs={12} md={4}>
                            <Stack direction='row'>
                                <FoodBankIcon sx={{mr: 1, fontSize: '3.5rem', color: '#fff' }} />
                                <Typography variant='body1' sx={{color: '#fff', fontSize:'1.25rem', fontWeight: 700, lineHeight: 3, fontFamily: 'monospace'}}>
                                    <Link to='/' style={{textDecoration: 'none', color: 'inherit'}}>AllergenDetector</Link>
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={5} md={3} pt={3}>
                            <Stack direction='column' spacing={3}>
                                <Typography variant='body1' sx={{color: '#fff', fontWeight: 500}}>
                                    <Link to='/' style={{textDecoration: 'none', color: 'inherit'}}>Home</Link>
                                </Typography>
                                <Typography variant='body1' sx={{color: '#fff', fontWeight: 500}}>
                                    <Link to='/Productscanner' style={{textDecoration: 'none', color: 'inherit'}}>Product Scanner</Link>
                                </Typography>
                                {
                                    loggedIn && 
                                    <Typography variant='body1' sx={{color: '#fff', fontWeight: 500}}>
                                        <Link to='/Profile' style={{textDecoration: 'none', color: 'inherit'}}>Allergen Profile</Link>
                                    </Typography>
                                }
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={5} md={3} pt={3}>
                            <Stack direction='column' spacing={3}>
                                {
                                    !loggedIn &&
                                    <Typography variant='body1' sx={{color: '#fff', fontWeight: 500}}>
                                        <Link to='/Register' style={{textDecoration: 'none', color: 'inherit'}}>Register</Link>
                                    </Typography>
                                }
                                {
                                    !loggedIn &&
                                    <Typography variant='body1' sx={{color: '#fff', fontWeight: 500}}>
                                        <Link to='/Login' style={{textDecoration: 'none', color: 'inherit'}}>Login</Link>
                                    </Typography>
                                }
                                {
                                    loggedIn &&
                                    <Typography variant='body1' sx={{color: '#fff', fontWeight: 500}}>
                                        <LogoutBtn link={true}/>
                                    </Typography>
                                }
                            </Stack>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
     );
}
 
export default Footer;