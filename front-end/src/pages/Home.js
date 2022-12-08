import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import foodAllergy from '../Images/foodAllergy.svg';
import StarsIcon from '@mui/icons-material/Stars';
import Stack from '@mui/material/Stack';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import nutritionValueIcon from '../Images/nutritionValueIcon.svg';
import nutritionValue from '../Images/nutritionValue.svg';
import allergen from '../Images/allergen.svg';
import barcodeScan from '../Images/barcodeScan.svg'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Home = () => {
    return ( 
        <Container>
            <Box>
                {/* Welcome section */}
                <Grid container mt={20} alignItems='center'>
                    <Grid item xs={12} md={6} textAlign={{xs: 'center', md: 'left'}}>
                        <img src={foodAllergy} alt='food allergy' style={{maxWidth: '100%', height: 'auto'}} width={380} height={380}/>
                    </Grid>
                    <Grid item xs={12} md={6} mt={{xs: 5, md: 0}} textAlign={{xs: 'center', md: 'left'}}>
                        <Typography variant='h4' sx={{fontWeight: 500, mb:2}}>Welcome to AllergenDetector</Typography>
                        <Typography variant='h5' sx={{fontWeight: 400, mb:5}}>Easily identify allergens present in food products</Typography>
                        <Button variant="contained" disableElevation size="large" sx={{fontSize: '1rem', fontWeight: 700, backgroundColor: 'secondary.main'}} href="#contained-buttons">View Product Scanner</Button>
                    </Grid>
                </Grid>
                {/* Feature section */}
                <Grid container mt={15} alignItems='center'>
                    {/* Title */}
                    <Grid item xs={12} mb={5} textAlign='center'>
                        <Stack direction='row' justifyContent='center'>
                            <StarsIcon sx={{color:'primary.dark', fontSize:'2.8rem', mr: 2}}/>
                            <Typography variant='h4' sx={{fontWeight: 600}}> Features</Typography>
                        </Stack>
                        <Typography variant='h5' mt={1} sx={{fontWeight: 400}}>Various handy features that our website provides</Typography>
                    </Grid>
                    {/* Scan and identify allergens */}
                    <Grid container mb={10} justifyContent='center' alignItems='center'>
                        <Grid item xs={12} md={6} mb={{xs:1, md:0}} textAlign={{xs: 'center', md: 'left'}}>
                            <img src={barcodeScan} alt='Scan barcode' style={{maxWidth: '100%', height: 'auto'}} width={500} height={500}/>
                        </Grid>
                        <Grid item xs={12} md={6} textAlign={{xs: 'center', md: 'left'}}>
                            <Stack direction={{xs:'column', sm:'row'}} justifyContent={{xs: 'center', md: 'left'}} alignItems={{xs:'center', sm: 'flex-start'}}>
                                <QrCodeScannerIcon sx={{fontSize: '3rem', mr: 2, color: 'secondary.dark'}} />
                                <Typography variant='h5' sx={{fontWeight: 500, mb:2, lineHeight: 2}}>Scan and identify allergens</Typography>
                            </Stack>
                            <Typography variant='h6' sx={{fontWeight: 400, mb: 4}}>Easily identify allergens by simply scanning the barcode of the food product</Typography>
                            <Button variant="contained" disableElevation size="medium" sx={{fontSize: '1rem', fontWeight: 700, backgroundColor: 'secondary.main'}} href="#contained-buttons" endIcon={<ArrowForwardIcon />}>Try it now</Button>
                        </Grid>
                    </Grid>
                    {/* Allergen profile */}
                    <Grid container mb={10} justifyContent='center' alignItems='center' direction={{xs:'column-reverse', md:'row'}}>
                        <Grid item xs={12} md={6} textAlign={{xs: 'center', md: 'left'}}>
                            <Stack direction={{xs:'column', sm:'row'}} justifyContent={{xs: 'center', md: 'left'}} alignItems={{xs:'center', sm: 'flex-start'}}>
                                <AccountCircleIcon sx={{fontSize: '3rem', mr: 2, color: 'secondary.dark'}} />
                                <Typography variant='h5' sx={{fontWeight: 500, mb:2, lineHeight: 2}}>Allergen profile</Typography>
                            </Stack>
                            <Typography variant='h6' sx={{fontWeight: 400}}>Determine if the product is suitable for you based on the allergens specified in your profile</Typography>
                        </Grid>
                        <Grid item xs={12} md={6} mb={{xs:1, md:0}} textAlign={{xs: 'center', md: 'right'}}>
                            <img src={allergen} alt='Personalised allergen' style={{maxWidth: '100%', height: 'auto'}} width={450} height={450}/>
                        </Grid>
                    </Grid>
                    {/* Identify nutritional values */}
                    <Grid container mb={20} justifyContent='center' alignItems='center'>
                        <Grid item xs={12} md={6} mb={{xs:1, md:0}} textAlign={{xs: 'center', md: 'left'}}>
                            <img src={nutritionValue} alt='Nutritional values' style={{maxWidth: '100%', height: 'auto'}} width={450} height={450}/>
                        </Grid>
                        <Grid item xs={12} md={6} textAlign={{xs: 'center', md: 'left'}}>
                            <Stack direction={{xs:'column', sm:'row'}} justifyContent={{xs: 'center', md: 'left'}} alignItems={{xs:'center', sm: 'flex-start'}}>
                                <img src={nutritionValueIcon} alt="nutritional value icon" style={{filter: 'invert(8%) sepia(93%) saturate(6830%) hue-rotate(335deg) brightness(81%) contrast(97%)'}} width={55} height={55}/>
                                <Typography variant='h5' sx={{fontWeight: 500, mb:2, ml:2, lineHeight: 2.5}}>Identify nutritional values</Typography>
                            </Stack>
                            <Typography variant='h6' sx={{fontWeight: 400}}>Encourage healthier choice by knowing the nutritional value of food products</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}
 
export default Home;