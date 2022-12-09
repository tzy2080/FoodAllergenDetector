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
                        <Grid item xs={12} sm={5} md={2} pt={3}>
                            <Stack direction='column' spacing={1}>
                                <Typography variant='body1' sx={{color: '#fff', fontWeight: 500}}>
                                    Image attribution
                                </Typography>
                                <a style={{color: '#fff', fontWeight: 300, textDecoration: 'none'}} href="https://www.freepik.com/free-vector/food-allergy-abstract-concept-vector-illustration-food-ingredient-intolerance-allergy-treatment-allergen-identification-risk-factor-skin-rash-problem-gluten-free-diet-abstract-metaphor_11666927.htm#query=food%20allergy&position=2&from_view=keyword">Image by vectorjuice</a>
                                <a style={{color: '#fff', fontWeight: 300, textDecoration: 'none'}} href="https://www.freepik.com/free-vector/tiny-people-choosing-food-ketogenic-diet_9650826.htm#query=nutrition&position=28&from_view=search&track=sph">Image by pch.vector</a>
	                            <a style={{color: '#fff', fontWeight: 300, textDecoration: 'none'}} href="https://www.freepik.com/free-vector/cashier-concept-worker-cashier-counter-supermarket-shop-store-client-service-payment-operation-cash-accounting-calculations-vector-illustration_26195346.htm#page=3&query=barcode%20scan&position=12&from_view=search&track=sph">Image by vector4stock</a>
	                            <a style={{color: '#fff', fontWeight: 300, textDecoration: 'none'}} href="https://www.freepik.com/free-vector/man-having-food-allergy-symptoms-products-like-fish-milk-eggs-food-allergy-food-alergen-ingredient-allergy-risk-factor-concept-bright-vibrant-violet-isolated-illustration_10780620.htm#page=3&query=food%20allergy&position=16&from_view=search&track=sph">Image by vectorjuice</a>
                            </Stack>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
     );
}
 
export default Footer;