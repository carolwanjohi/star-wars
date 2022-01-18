import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Film from './components/film/Film';
import styles from './App.css';

function App() {
  return (
    <Container>
      <Box
        className={styles.box}
      >
        <Film />
      </Box>
    </Container>
  );
}

export default App;
