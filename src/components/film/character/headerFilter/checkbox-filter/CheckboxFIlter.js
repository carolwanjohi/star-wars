import * as React from 'react';
import PropTypes from "prop-types";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import styles from "./checkbox-filter.module.css";

function updateOptions(options, selectedOption, event) {
  return options.map((option) => {
    if (option.genderOption === selectedOption.genderOption) {
      return {
        ...selectedOption,
        checked: event.target.checked
      }
    }
    return {
      ...option,
      disabled: event.target.checked
    }
  })
}
class CheckboxFilter extends React.Component {
  constructor(props) {
    super(props)
    const {genderOptions} = this.props;
    this.state = {options: genderOptions};
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const {options} = this.state;

    const selectedOption = options.find((option) => {
      const { genderOption } = option;
      return genderOption === event.target.name
    })

    const optionsNewState = updateOptions(options, selectedOption, event)

    this.setState({options: optionsNewState})
  };

  render() {
    const {isOpen} = this.props;

    if(!isOpen) {
      return null;
    }
    const {options} = this.state;

    const checkboxes = options.map((option) => {
      const { genderOption, checked, disabled} = option;
        return (
          <FormControlLabel
            key={genderOption}
            control={
              <Checkbox checked={checked}
              disabled={disabled}
              onChange={this.handleChange}
              name={genderOption}
              />
            }
            label={genderOption}
        />)
  })

    return (
    <section className={styles.checkboxFilterSection}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard"
                   >
        <FormGroup>
          {checkboxes}
        </FormGroup>
      </FormControl>
    </section>
  )
  }
}

CheckboxFilter.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  genderOptions: PropTypes.arrayOf(PropTypes.shape({
    genderOption: PropTypes.string,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
  })).isRequired
}

export default CheckboxFilter;
