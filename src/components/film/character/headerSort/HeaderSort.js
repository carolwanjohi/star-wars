import * as React from 'react';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import TableSortLabel from '@mui/material/TableSortLabel';
import PropTypes from 'prop-types';
import { visuallyHidden } from '@mui/utils';

function HeaderSort({ order, orderBy, onRequestSort }) {
  const headers = [
    {
      id: 'name',
      label: 'Name',
      numeric: false,
    },
    {
      id: 'gender',
      label: 'Gender',
      numeric: false,
    },
    {
      id: 'height',
      label: 'Height',
      numeric: true,
    }
  ]

  const createSortHandler = (header) => (event) => {
    onRequestSort(event, header);
  };

  const filterHeader = (header) => (
      <TableCell key={header.id}>{header.label}</TableCell>
    )

  const sortHeader = (header) => (
      <TableCell
        key={header.id}
        align={header.numeric ? 'right' : 'left'}
        sortDirection={orderBy === header.id ? order : false}
      >
        <TableSortLabel
          active={orderBy === header.id}
          direction={orderBy === header.id ? order : 'asc'}
          onClick={createSortHandler(header.id)}
        >
          {header.label}
          {orderBy === header.id ? (
            <Box component="span" sx={visuallyHidden}>
              {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
            </Box>
          ) : null}
        </TableSortLabel>
      </TableCell>
    )

  const tableHeaders = headers.map(
    (header) => (
      header.id === 'gender' ? filterHeader(header) : sortHeader(header)
    ))

  return (
    <TableHead>
      <TableRow>
        {tableHeaders}
      </TableRow>
    </TableHead>
  );
}

HeaderSort.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default HeaderSort;
