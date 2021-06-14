import React from 'react';



const Form = ({addName, newName, newNumber, handleName, handleNumber}) => { 
    return (
      <form onSubmit={addName}>
          <div>
            Name
            <br/><input value={newName} onChange={handleName} required/><br/><br/>
            Number 
            <br/><input value={newNumber} onChange={handleNumber} required/><br/><br/>
          </div>
          <div>
            <button type="submit">Add</button>
          </div>
        </form>
    )
  }

export default Form;