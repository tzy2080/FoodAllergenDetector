import { Grid, Container, Box, Typography, Link, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FoodBankIcon from '@mui/icons-material/FoodBank';

const Footer = () => {
    return ( 
        <footer>
            <Box sx={{backgroundColor:'primary.main', minHeight: '20vh'}}>
                <Container maxWidth='lg'>
                    <Grid container pt={6} pb={10}>
                        <Grid item xs={12} md={4}>
                            <Stack direction='row'>
                                <FoodBankIcon sx={{mr: 1, fontSize: '3.5rem', color: '#fff' }} />
                                <Link component={RouterLink} underline='none' sx={{color: '#fff', fontSize:'1.25rem', fontWeight: 700, lineHeight: 3, fontFamily: 'monospace'}} href="/">
                                    AllergenDetector
                                </Link>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={5} md={3} pt={3}>
                            <Stack direction='column' spacing={3}>
                                <Link component={RouterLink} underline='none'  sx={{color: '#fff', fontWeight: 500}} href="/">
                                    Home
                                </Link>
                                <Link component={RouterLink} underline='none'  sx={{color: '#fff', fontWeight: 500}} href="/">
                                    Product Scanner
                                </Link>
                                <Link component={RouterLink} underline='none'  sx={{color: '#fff', fontWeight: 500}} href="/">
                                    My Allergen
                                </Link>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={5} md={3} pt={3}>
                            <Stack direction='column' spacing={3}>
                                <Link component={RouterLink} underline='none'  sx={{color: '#fff', fontWeight: 500}} href="/">
                                    Login
                                </Link>
                                <Link component={RouterLink} underline='none'  sx={{color: '#fff', fontWeight: 500}} href="/">
                                    Logout
                                </Link>
                            </Stack>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </footer>
     );
}
 
export default Footer;