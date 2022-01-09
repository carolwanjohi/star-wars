import React from 'react';

class Input extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { onChange } = this.props;
    onChange(event.target.value);
  }

  render() {
    const { value } = this.props;
    return <input onChange={this.handleChange} value={value} />;
  }
}

export default Input;
