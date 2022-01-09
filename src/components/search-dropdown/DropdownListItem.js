import React from 'react';

class DropdownListItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const { setState } = this.props;
    setState({value: event.target.value});
  }

  render() {
    const { value } = this.props;

    return (
      <li>
        {value}
        <div
          role="button"
          aria-label="List item"
          tabIndex={0}
          onClick={this.handleClick}
          onKeyDown={this.handleClick}
        />
      </li>
    );
  }
}

export default DropdownListItem;
