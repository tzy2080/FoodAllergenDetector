import './App.css';
import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const theme = createTheme({
  palette: {
    secondary: {
      main: '#f50057',
    }
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path='/' element={<Home />} />
            </Routes>
            <Footer />
          </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
