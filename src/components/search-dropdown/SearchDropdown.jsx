import React from 'react';
import DropdownList from './DropdownList';
import Input from './Input';

class SearchDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(option) {
    this.setState({ value: option });
  }

  render() {
    const { value, setState } = this.state;
    const { list } = this.props;
    return (
      <div>
        <Input onChange={this.handleChange} />
        <DropdownList value={value} list={list} setState={setState} />
      </div>
    );
  }
}

export default SearchDropdown;
