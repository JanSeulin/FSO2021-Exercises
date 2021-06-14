import React from 'react';

const Display = ({ persons, searchValue, purge }) => {
    return (
    <ul>
    {persons.filter((val) => {
      if (searchValue === "") {
        return val;
      } else if (val.name.toLowerCase().includes(searchValue.toLowerCase())){
        return val;
      } else if (val.number.toLowerCase().includes(searchValue.toLowerCase())){
        return val;
      }
    }).map((val) => {
      return (
        <>
          <li key={val.id}>
            {val.name} - {val.number} &ensp;
            <button onClick={() => purge(val.id)}>
              Delete
            </button>
          </li>
        </>
      )
    })
  }
    </ul>
  )}


export default Display;