import './App.css';
import { createTheme, ThemeProvider, Box } from '@mui/material';
import { AuthContextProvider } from './context/AuthContext';
import Routing from './Routing';

const theme = createTheme({
  palette: {
    secondary: {
      main: '#f50057',
    }
  }
})

function App() {
  return (
    <AuthContextProvider>
      <ThemeProvider theme={theme}>
        <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
          <Routing />
        </Box>
      </ThemeProvider>
    </AuthContextProvider>
  );
}

export default App;
