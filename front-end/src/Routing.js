import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthContext from './context/AuthContext';
import { useContext } from 'react';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductScanner from './pages/ProductScanner';
import AllergenProfile from './pages/AllergenProfile';
import PageNotFound from './pages/PageNotFound';

const Routing = () => {
    const { loggedIn } = useContext(AuthContext);

    return ( 
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/Productscanner' element={<ProductScanner />}></Route>
                {loggedIn && <Route path='/Profile' element={<AllergenProfile />}></Route>}
                {!loggedIn && <Route path='/Login' element={<Login />}></Route>}
                {!loggedIn && <Route path='/Register' element={<Register />}></Route>}
                <Route path='*' element={<PageNotFound />}></Route>
            </Routes>
            <Footer />
        </BrowserRouter>
     );
}
 
export default Routing;