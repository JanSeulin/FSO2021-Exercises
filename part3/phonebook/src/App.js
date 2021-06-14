import './App.css';
import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import Display from './components/Display';
import Filter from './components/Filter';
import personService from './services/persons'
// import axios from 'axios'

const Error = ({ errorMessage }) => {
  const errorStyle = {
    color: 'red',
    background: 'lightgray',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (errorMessage === null) {
    return null
  }

  return (
    <div style={errorStyle}>
      {errorMessage}
    </div>
  )
}

const Confirmation = ({ message }) => {

  const confirmationStyle = {
    color: 'green',
    background: 'lightgray',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (message === null) {
    return null
  }

  return (
    <div style={confirmationStyle}>
      {message}
    </div>
  )
}

function App() {
  const [persons, setPersons] = useState([]);
  const [newName,  setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, []);


  const handleNameChange = (event) => {
    console.log(`Name: ${event.target.value}`);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(`Number: ${event.target.value}`);
    setNewNumber(event.target.value);
  };

  const handleSearchValue = (event) => {
    console.log(`Filter: ${event.target.value}`);
    setSearchValue(event.target.value);
  }

  const purge = (id) => {
    personService
      .purge(id).then(
        setPersons(persons.filter(p => p.id !== id))
      )
  }

  const addName = (event) => {
    event.preventDefault();
    const foundName = persons.some(person => person.name === newName)
    const foundNumber = persons.some(person => person.number === newNumber);

    if (foundName) {
      const option = window.confirm(
        `${newName} is already in the phonebook, replace the old number with a new one?`)
      
      if (option) {
        const person = persons.find(p => p.name === newName);
        console.log(person)
        const changedPerson = {...person, number: newNumber}
        console.log(changedPerson)

        personService
          .update(changedPerson.id, changedPerson).then(returnedPerson => {
            setPersons(
              persons.map(person => person.id !== changedPerson.id
                              ? person : returnedPerson))
            setNewName('')
            setNewNumber('')

            setMessage(
              `${changedPerson.name}'s number updated to ${changedPerson.number}.`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(error => {
            if (error.response.status === 400 && error.response.statusText === "Bad Request") {
              setErrorMessage(`Number must be at least 8 characters long.`)
            } else {
              setErrorMessage(
                `Person ${changedPerson.name} has already been removed from the server.`
              )
            }
            //console.log(error.response.data)
            //console.log(error.response.status)
            //console.log(error.response.data.error)
            
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
    } 
    else if (foundNumber) {
      alert(`The number ${newNumber} is already in the phonebook.`)
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber,
      }  
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')

          setMessage(
            `'${returnedPerson.name}' was added to the phonebook`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          console.log(error.response.data)
          setErrorMessage(`${error.response.data.error}`)
          
          setTimeout(() => {
            setErrorMessage(null)
          }, 7000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Confirmation message={message} />
      <Error errorMessage={errorMessage} />
      <Filter searchValue={searchValue} handle={handleSearchValue} />
      <h2>Add New</h2>
      <Form addName={addName} newName={newName} newNumber={newNumber} 
          handleName={handleNameChange} handleNumber={handleNumberChange} />
      <h2>Numbers</h2>
      <Display persons={persons} searchValue={searchValue} purge={purge}/>
    </div>
  );
}

export default App;
