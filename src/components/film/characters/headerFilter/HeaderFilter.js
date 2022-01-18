import * as React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@mui/material/TableCell';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import styles from './HeaderFilter.module.css';
import CheckboxFilter from "./checkboxFilter/CheckboxFIlter";

function HeaderFilter({characterTableHeader, genderOptions, characters, onSelectGender}) {
  const [open, setOpen] = React.useState(false);

  const handleIconOnChange = () => {
    setOpen(!open);
  }

  const checkboxFilter = (isOpen) => {
    if (!isOpen) {
      return null;
    }

    const checkboxGenderOptions = genderOptions.map(
      (genderOption) => ({
        genderOption,
      checked: characters.every((character) => character.gender === genderOption),
      disabled: characters.every((character) => character.gender !== genderOption),
      })
      );

    return (
        <CheckboxFilter isOpen={isOpen} genderOptions={checkboxGenderOptions}
          onSelectGender={onSelectGender}
        />
    );
  }

  return (
    <TableCell key={characterTableHeader.id} className={styles.header}>
      <span className={styles.headerLabel}>
              {characterTableHeader.label}
        { open
          ? <KeyboardArrowDownIcon color="action" onClick={handleIconOnChange}/>
          : <KeyboardArrowUpIcon color="action" onClick={handleIconOnChange} />
        }
      </span>
      {checkboxFilter(open)}
    </TableCell>
  );
}

HeaderFilter.propTypes = {
  characterTableHeader: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string,
    label: PropTypes.string,
    numeric: PropTypes.bool
  }).isRequired,
  genderOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelectGender: PropTypes.func.isRequired,
  characters: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    gender: PropTypes.string,
    height: PropTypes.string,
    personId: PropTypes.string,
  })).isRequired,
}

export default HeaderFilter;
