import * as React from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TablePagination from "@mui/material/TablePagination";
import TableHead from '@mui/material/TableHead';
import HeaderSort from './headerSort/HeaderSort';
import HeaderFilter from "./headerFilter/HeaderFilter";
import getComparator from '../../../helpers/getComparator';

function CharactersTable({characters}) {
  if(!characters || !characters.length) {
    return null;
  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const characterTableHeaders = [
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

  const tableRows = characters
  .slice()
                .sort(getComparator(order, orderBy))
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((character) => (
    <TableRow
      key={character.personId}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {character.name}
      </TableCell>
      <TableCell>{character.gender}</TableCell>
      <TableCell align="right">{character.height}</TableCell>
    </TableRow>
  ))

  const tableHeaders = characterTableHeaders.map((characterTableHeader) => {
    if (characterTableHeader.id === 'gender') {
      return (<HeaderFilter characterTableHeader={characterTableHeader}/>)
    }
    return (<HeaderSort
      characterTableHeader={characterTableHeader}
      order={order}
      orderBy={orderBy}
      onRequestSort={handleRequestSort}
    />)
  })

  return (
    <>
    <TableContainer sx={{ maxHeight: 500 }}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {tableHeaders}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableRows}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
      rowsPerPageOptions={[25, 50, 100]}
      component="div"
      count={characters.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
    </>
  );
}

CharactersTable.propTypes = {
  characters: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CharactersTable;
