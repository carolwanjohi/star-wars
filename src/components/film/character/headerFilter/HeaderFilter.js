import * as React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@mui/material/TableCell';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import styles from './header-filter.module.css';
import CheckboxFilter from "./checkbox-filter/CheckboxFIlter";

function HeaderFilter({characterTableHeader}) {
  const [open, setOpen] = React.useState(false);

  const handleIconOnChange = () => {
    setOpen(!open)
  }

  const checkboxFilter = (isOpen) => {
    if (!isOpen) {
      return null
    }

    return (
        <CheckboxFilter isOpen={isOpen} />
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
    label: PropTypes.string,
    numeric: PropTypes.bool
  }).isRequired
}

export default HeaderFilter;
