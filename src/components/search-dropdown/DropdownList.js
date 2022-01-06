import React from 'react';
import DropdownListItem from './DropdownListItem';

const DropdownList = function ({ value, list, setState }) {
  if (!value) return null;

  const filterdList = list.filter((item) =>
    item.data.toString().toLowerCase().startsWith(value.toLowerCase()),
  );

  if (filterdList.length === 0) {
    return (
      <div>
        <div>Not found</div>
      </div>
    );
  }

  return (
    <ul>
      {filterdList.map((item) => (
        <DropdownListItem value={item.data} setState={setState} />
      ))}
    </ul>
  );
};

export default DropdownList;
