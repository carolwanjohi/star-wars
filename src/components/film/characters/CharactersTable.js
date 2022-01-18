import * as React from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TablePagination from "@mui/material/TablePagination";
import TableHead from '@mui/material/TableHead';
import TableFooter from '@mui/material/TableFooter';
import Typography from '@mui/material/Typography';
import HeaderSort from './headerSort/HeaderSort';
import HeaderFilter from "./headerFilter/HeaderFilter";
import getComparator from '../../../helpers/GetComparator';
import styles from './CharactersTable.module.css'

function CharactersTable({characters, onSelectGender, allCharacters}) {
  if(!characters || !characters.length) {
    return null;
  }

  const genderOptions = [ ...new Set(allCharacters.map((character) => character.gender))];

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const characterTableHeaders = [
    {
      id: 1,
      type: 'name',
      label: 'Name',
      numeric: false,
    },
    {
      id: 2,
      type: 'gender',
      label: 'Gender',
      numeric: false,
    },
    {
      id: 3,
      type: 'height',
      label: 'Height',
      numeric: true,
    }
  ];

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

  const genderAbbreviation = (gender) => {
    switch(gender) {
      case('female'):
        return 'F';

      case('male'):
        return 'M';

      case('hermaphrodite'):
        return 'H';

      case('n/a'):
        return 'N/A';

      default:
        return 'None'
    }
  }

  const charactersPerRow = characters
  .slice()
                .sort(getComparator(order, orderBy))
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const tableRows = charactersPerRow
    .map((character) => (
    <TableRow
      key={character.personId}
      className={styles.characters}
    >
      <TableCell component="th" scope="row">
        {character.name}
      </TableCell>
      <TableCell align="center">{genderAbbreviation(character.gender)}</TableCell>
      <TableCell align="right">{character.height}</TableCell>
    </TableRow>
  ));

  const totalHeightInCentimeters = charactersPerRow
    .filter((character) => +character.height)
    .map((character) => parseInt(character.height, 10))
    .reduce((sum, i) => sum + i, 0);

  let totalHeightInInches = (totalHeightInCentimeters * 0.39370).toFixed(0);
  const totalHeightInFeet = Math.floor(totalHeightInInches / 12);
  totalHeightInInches = (totalHeightInInches %= 12).toFixed(2);

  const tableHeaders = characterTableHeaders.map((characterTableHeader) => {
    if (characterTableHeader.type === 'gender') {
      return (<HeaderFilter characterTableHeader={characterTableHeader}
        genderOptions={genderOptions}
        characters={characters}
        onSelectGender={onSelectGender}
      />);
    }

    return (<HeaderSort
      characterTableHeader={characterTableHeader}
      order={order}
      orderBy={orderBy}
      onRequestSort={handleRequestSort}
    />);
  })

  return (
    <TableContainer className={styles.tableContainer}>
      <Table stickyHeader aria-label="sticky table" className={styles.table}>
        <TableHead>
          <TableRow>
            {tableHeaders}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableRows}
        </TableBody>
        <TableFooter>
          <TableRow
            key='total-height'
            className={styles.totalHeight}
          >
            <TableCell />
            <TableCell />
            <TableCell align="right" className={styles.totalHeightCaption}>
              <Typography variant="caption">
                Total Height
                <br />
                {totalHeightInCentimeters} cm
                ({totalHeightInFeet}ft/{totalHeightInInches}in)
                </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[20, 40, 100]}
              count={characters.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              className={styles.pagination}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

CharactersTable.propTypes = {
  characters: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    gender: PropTypes.string,
    height: PropTypes.string,
    personId: PropTypes.string,
  })).isRequired,
  onSelectGender: PropTypes.func.isRequired,
  allCharacters: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    gender: PropTypes.string,
    height: PropTypes.string,
    personId: PropTypes.string,
  })).isRequired,
};

export default CharactersTable;
