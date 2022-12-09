import axios from 'axios';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { Typography, Button, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const LogoutBtn = ({link}) => {
    const { getLoggedIn } = useContext(AuthContext);

    const Logout = async() => {
        await axios.get('http://localhost:5000/user/logout', {withCredentials: true});
        await getLoggedIn();
    }

    if (link){
        return (
            <Link component={RouterLink} to='/' onClick={ Logout } style={{textDecoration: 'none', color: 'inherit'}}>Logout</Link>
        )
    }
    else {
        return (
            <Button onClick={Logout} component={RouterLink} to='/' sx={{ my: 2, mr: 2, color: 'inherit', display: 'block', fontWeight:700, fontSize: '0.95rem' }}>
                Logout
            </Button>
        )
    }
}
export default LogoutBtn;