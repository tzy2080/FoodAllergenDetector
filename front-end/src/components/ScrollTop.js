import * as React from 'react';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import PropTypes from 'prop-types';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fade from '@mui/material/Fade';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';

// Button to scroll to the top of the page
const ScrollTop = props => {
    const { children } = props;
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 100,
    });
  
    const handleClick = (event) => {
      const anchor = (event.target.ownerDocument || document).querySelector(
        '#back-to-top-anchor',
      );
  
      if (anchor) {
        anchor.scrollIntoView({
          block: 'center',
        });
      }
    };
  
    return (
      <Fade in={trigger}>
        <Box
          onClick={handleClick}
          role="presentation"
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
        >
          {children}
        </Box>
      </Fade>
    );
  }
  
ScrollTop.propTypes = {
    children: PropTypes.element.isRequired
};

const ScrollTopComponent = props => {
    return (
        <ScrollTop {...props}>
            <Fab size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
            </Fab>
        </ScrollTop>
    )
}

export default ScrollTopComponent;