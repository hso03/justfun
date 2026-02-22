
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  AppBar,
  Toolbar,
  CssBaseline,
  createTheme,
  ThemeProvider,
  Paper,
} from '@mui/material';
import { styled } from '@mui/system';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h4: {
      fontWeight: 700,
      color: '#ffffff',
    },
  },
});

const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.default,
  minHeight: '100vh',
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.background.paper,
  },
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

function App() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/crawl');
        setTopics(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Naver Finance Discussion Crawler
          </Typography>
        </Toolbar>
      </AppBar>
      <StyledContainer>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Stock Discussions
        </Typography>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <CircularProgress />
          </div>
        ) : (
          <Paper elevation={3}>
            <List>
              {topics.map((topic) => (
                <StyledListItem key={topic.id}>
                  <ListItemText
                    primary={topic.title}
                    secondary={`By ${topic.author} on ${topic.date}`}
                  />
                </StyledListItem>
              ))}
            </List>
          </Paper>
        )}
      </StyledContainer>
    </ThemeProvider>
  );
}

export default App;
