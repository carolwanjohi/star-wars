import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Film from './components/film/Film';

function App() {
  return (
    <Container >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
        }}
      >
        <Film />
      </Box>
    </Container>
  );
}

export default App;
