import { CssBaseline, ThemeProvider } from '@mui/material';
import TourPlanner from './pages/TourPlanner';
import theme from './styles/theme'; // Import the custom theme

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TourPlanner />
    </ThemeProvider>
  );
}

export default App;
