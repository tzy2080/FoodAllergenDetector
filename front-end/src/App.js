import './App.css';
import { createTheme, ThemeProvider } from '@mui/material';
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
        <div className="App">
            <Routing />
        </div>
      </ThemeProvider>
    </AuthContextProvider>
  );
}

export default App;
