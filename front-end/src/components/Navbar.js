import * as React from 'react';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import MenuIcon from '@mui/icons-material/Menu';
import { useScrollTrigger, MenuItem, Button, Container, Menu, Typography, IconButton, Toolbar, Box, AppBar } from '@mui/material';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ScrollTopComponent from './ScrollTop';

const pages = ['Product Scanner', 'My Allergens', 'Login/Logout'];

// Change appearance of navbar when scrolled
const ScrollHandler = props => {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  });

  return React.cloneElement(children, {
    elevation: trigger ? 0 : 0,
    style: {
      backgroundColor: trigger ? '#1976d2' : 'transparent',
      color: trigger ? '#fff' : '#1976d2',
      paddingTop: '5px',
      paddingBottom: '5px',
    }
  });
}

ScrollHandler.propTypes = {
  children: PropTypes.element.isRequired
};

const NavBar = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <Toolbar id="back-to-top-anchor"/>
      <ScrollHandler {...props}>
        <AppBar position="fixed">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <FoodBankIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, fontSize: '2.5rem' }} />
              <Typography 
                variant="h6"
                noWrap
                sx={{
                  flexGrow: 1,
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  color: 'inherit'
                }}
              >
                <Link to='/' style={{textDecoration: 'none', color: 'inherit'}}>AllergenDetector</Link>
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="medium"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <FoodBankIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, fontSize: '2rem' }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href=""
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  fontSize: '1rem',
                  letterSpacing: '.1rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                AllergenDetector
              </Typography>
              <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, mr: 2, color: 'inherit', display: 'block', fontWeight:700, fontSize: '0.95rem' }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </ScrollHandler>
      <ScrollTopComponent {...props}/>
    </>
  );
}
export default NavBar;