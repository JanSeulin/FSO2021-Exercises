import React from 'react';

const Filter = ({ searchValue, handle }) => {
    return (
      <div>
      Filter: <input value={searchValue} onChange={handle} placeholder="Search..." />
      </div>
    )
}

export default Filter;