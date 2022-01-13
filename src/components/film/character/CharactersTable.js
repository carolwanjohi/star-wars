import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { TablePagination } from "@mui/material";
import PropTypes from 'prop-types';
import HeaderSort from './headerSort/HeaderSort';
import getComparator from '../../../helpers/getComparator';

function CharactersTable({people}) {
  if(!people || !people.length) {
    return null;
  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const tableRows = people
  .slice()
                .sort(getComparator(order, orderBy))
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((character) => (
    <TableRow
      key={character.name}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {character.name}
      </TableCell>
      <TableCell>{character.gender}</TableCell>
      <TableCell align="right">{character.height}</TableCell>
    </TableRow>
  ))

  return (
    <>
    <TableContainer sx={{ maxHeight: 500 }}>
      <Table stickyHeader aria-label="sticky table">
        <HeaderSort
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
               />
        <TableBody>
          {tableRows}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
      rowsPerPageOptions={[25, 50, 100]}
      component="div"
      count={people.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
    </>
  );
}

CharactersTable.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CharactersTable;
