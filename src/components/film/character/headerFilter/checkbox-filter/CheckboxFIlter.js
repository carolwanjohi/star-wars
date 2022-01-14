import * as React from 'react';
import PropTypes from "prop-types";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import styles from "./checkbox-filter.module.css";

function CheckboxFilter({isOpen}) {
  if(!isOpen) {
    return null;
  }

  const [state, setState] = React.useState({
    female: false,
    male: false,
    hermaphrodite: false,
    notApplicable: false,
  });
  const { female, male, notApplicable, hermaphrodite } = state;

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <section className={styles.checkboxFilterSection}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard"
                   >
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={female} onChange={handleChange} name="female" />
            }
            label="Female"
          />
          <FormControlLabel
            control={
              <Checkbox checked={male} onChange={handleChange} name="male" />
            }
            label="Male"
          />
          <FormControlLabel
            control={
              <Checkbox checked={hermaphrodite} onChange={handleChange} name="hermaphrodite" />
            }
            label="Hermaphrodite"
          />
          <FormControlLabel
            control={
              <Checkbox checked={notApplicable} onChange={handleChange} name="notApplicable" />
            }
            label="N/A"
          />
        </FormGroup>
      </FormControl>
    </section>
  )
}

CheckboxFilter.propTypes = {
  isOpen: PropTypes.bool.isRequired
}

export default CheckboxFilter;
