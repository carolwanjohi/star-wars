import React from 'react';
import Select from 'react-select';

const aquaticCreatures = [
  { label: 'Shark', value: 'Shark' },
  { label: 'Dolphin', value: 'Dolphin' },
  { label: 'Whale', value: 'Whale' },
  { label: 'Octopus', value: 'Octopus' },
  { label: 'Crab', value: 'Crab' },
  { label: 'Lobster', value: 'Lobster' },
];

class SearchSelectForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(option) {
    this.setState({ value: option.value });
  }

  handleSubmit(option) {
    const { value } = this.state;
    alert(`A name was submitted: ${value}`);
    option.preventDefault();
  }

  render() {
    return <Select options={aquaticCreatures} onChange={this.handleChange} />;
  }
}

export default SearchSelectForm;
