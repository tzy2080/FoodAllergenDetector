import axios from 'axios';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Logout = async () => {
    const { getLoggedIn } = useContext(AuthContext);
    await axios.get('http://localhost:5000/user/logout');
    await getLoggedIn();
}
 
export default Logout;