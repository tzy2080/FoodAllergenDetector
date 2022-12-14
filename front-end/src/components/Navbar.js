import * as React from 'react';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import MenuIcon from '@mui/icons-material/Menu';
import { useScrollTrigger, MenuItem, Button, Container, Menu, Typography, IconButton, Toolbar, Box, AppBar, Link } from '@mui/material';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import ScrollTopComponent from './ScrollTop';
import LogoutBtn from './LogoutBtn';

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
      backgroundColor: trigger ? '#1565c0' : 'transparent',
      color: trigger ? '#fff' : '#1565c0',
      paddingTop: '5px',
      paddingBottom: '5px',
    }
  });
}

ScrollHandler.propTypes = {
  children: PropTypes.element.isRequired
};

const NavBar = (props) => {
  const { loggedIn } = useContext(AuthContext);
  
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
                <Link component={RouterLink} to='/' style={{textDecoration: 'none', color: 'inherit'}}>AllergenDetector</Link>
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
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center"><Link component={RouterLink} to='/' style={{textDecoration: 'none', color: 'inherit'}}>Home</Link></Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center"><Link component={RouterLink} to='/Productscanner' style={{textDecoration: 'none', color: 'inherit'}}>Product Scanner</Link></Typography>
                  </MenuItem>
                  {loggedIn && 
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center"><Link component={RouterLink} to='/Profile' style={{textDecoration: 'none', color: 'inherit'}}>Allergen Profile</Link></Typography>
                    </MenuItem>
                  }
                  {!loggedIn &&
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center"><Link component={RouterLink} to='/Login' style={{textDecoration: 'none', color: 'inherit'}}>Login</Link></Typography>
                    </MenuItem>
                  }
                  {!loggedIn &&
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center"><Link component={RouterLink} to='/Register' style={{textDecoration: 'none', color: 'inherit'}}>Register</Link></Typography>
                    </MenuItem>
                  }
                  {loggedIn && 
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center"><LogoutBtn link={true}/></Typography>
                    </MenuItem>
                  }
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
                <Button onClick={handleCloseNavMenu} component={RouterLink} to='/' sx={{ my: 2, mr: 2, color: 'inherit', display: 'block', fontWeight:700, fontSize: '0.95rem' }}>
                  Home
                </Button>
                <Button onClick={handleCloseNavMenu} component={RouterLink} to='/Productscanner' sx={{ my: 2, mr: 2, color: 'inherit', display: 'block', fontWeight:700, fontSize: '0.95rem' }}>
                  Product Scanner
                </Button>
                {loggedIn &&
                  <Button onClick={handleCloseNavMenu} component={RouterLink} to='/Profile' sx={{ my: 2, mr: 2, color: 'inherit', display: 'block', fontWeight:700, fontSize: '0.95rem' }}>
                    Allergen Profile
                  </Button>
                }
                {!loggedIn &&
                  <>
                    <Button onClick={handleCloseNavMenu} component={RouterLink} to='/Login' sx={{ my: 2, mr: 2, color: 'inherit', display: 'block', fontWeight:700, fontSize: '0.95rem' }}>
                      Login
                    </Button>
                    <Button onClick={handleCloseNavMenu} component={RouterLink} to='/Register' sx={{ my: 2, mr: 2, color: 'inherit', display: 'block', fontWeight:700, fontSize: '0.95rem' }}>
                      Register
                    </Button>
                  </>
                }
                {loggedIn &&
                  <LogoutBtn link={false}/>
                }
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