import React from 'react';
import DropdownListItem from './DropdownListItem';

const DropdownList = function ({ value, setState }) {
  if (!value) return null;

  if (value.length === 0) {
    return (
      <div>
        <div>Not found</div>
      </div>
    );
  }

  const listItems = value.map((item) => (
    <DropdownListItem
      key={item.episodeId}
      id={item.episodeId}
      value={item.title}
      setState={setState}
    />
  ));

  return <ul>{listItems}</ul>;
};

export default DropdownList;
