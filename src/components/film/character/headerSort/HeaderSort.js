import * as React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';

function HeaderSort({ characterTableHeader, order, orderBy, onRequestSort }) {
  const createSortHandler = (sortHeaderId) => (event) => {
    onRequestSort(event, sortHeaderId);
  };

  return (
        <TableCell
          key={characterTableHeader.id}
          align={characterTableHeader.numeric ? 'right' : 'left'}
          sortDirection={orderBy === characterTableHeader.id ? order : false}
        >
          <TableSortLabel
            active={orderBy === characterTableHeader.id}
            direction={orderBy === characterTableHeader.id ? order : 'asc'}
            onClick={createSortHandler(characterTableHeader.id)}
          >
            {characterTableHeader.label}
            {orderBy === characterTableHeader.id ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>
  );
}

HeaderSort.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  characterTableHeader: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
    numeric: PropTypes.bool
  }).isRequired
};

export default HeaderSort;
