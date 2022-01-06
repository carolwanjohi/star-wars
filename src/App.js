import React from 'react';
import SearchDropdown from './components/search-dropdown/SearchDropdown';

const list = [
  { id: 1, data: 'Shark' },
  { id: 2, data: 'Dolphin' },
  { id: 3, data: 'Whale' },
  { id: 4, data: 'Octopus' },
  { id: 5, data: 'Crab' },
  { id: 6, data: 'Lobster' },
  { id: 5, data: 'Cow' },
];

function App() {
  return (
    <div>
      <SearchDropdown list={list} />
    </div>
  );
}

export default App;
