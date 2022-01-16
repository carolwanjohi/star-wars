import * as React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@mui/material/TableCell';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import styles from './header-filter.module.css';
import CheckboxFilter from "./checkbox-filter/CheckboxFIlter";

function HeaderFilter({characterTableHeader, genderOptions}) {
  const [open, setOpen] = React.useState(false);

  const handleIconOnChange = () => {
    setOpen(!open)
  }

  const checkboxFilter = (isOpen) => {
    if (!isOpen) {
      return null
    }
    const checkboxGenderOptions = genderOptions.map(
      (genderOption) => ({
        genderOption,
      checked: false,
      disabled: false,
      })
      )
    return (
        <CheckboxFilter isOpen={isOpen} genderOptions={checkboxGenderOptions}/>
    )
  }

  return (
    <TableCell key={characterTableHeader.id} align="left" >
      <span className={styles.header}>
              {characterTableHeader.label}
        { open
          ? <KeyboardArrowDownIcon color="action" onClick={handleIconOnChange}/>
          : <KeyboardArrowUpIcon color="action" onClick={handleIconOnChange} />
        }
      </span>
      {checkboxFilter(open)}
    </TableCell>
  )
}

HeaderFilter.propTypes = {
  characterTableHeader: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string,
    label: PropTypes.string,
    numeric: PropTypes.bool
  }).isRequired,
  genderOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default HeaderFilter;
