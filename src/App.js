import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import MovieSearch from './components/movie-search/MovieSearch';

function App() {
  return (
    <Container maxWidth="sm">
    <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
        }}
      >
        <MovieSearch />
        </Box>
    </Container>
  );
}

export default App;
