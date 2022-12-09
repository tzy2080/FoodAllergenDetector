import { Container, Box, Grid, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import error404 from '../Images/error404.svg';

const PageNotFound = () => {
    return ( 
        <Container sx={{pt:10, pb:15}}>
            <Grid container justifyContent='center'>
                <Grid item xs={12} md={8}>
                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'}}>
                        <Typography variant='h3' sx={{fontWeight: 600, mb:1}} color='secondary.dark'>Error 404</Typography>
                        <img src={error404} sx={{width:'100%', height: 'auto'}} width={250} height={250}/>
                        <Typography variant='h4' sx={{fontWeight: 500, mb:1, mt:2}} color='secondary.dark'>Page Not Found</Typography>
                        <Typography variant='body1' sx={{fontWeight: 400, fontSize: '1.2rem'}}>We're sorry the page that you are looking for could not be found. Please return to the homepage using the button below</Typography>
                        <Button variant='contained' size='large' component={RouterLink} to='/' color="secondary" sx={{mt:3}} endIcon={<HomeIcon />}>Back to home</Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
     );
}
 
export default PageNotFound;