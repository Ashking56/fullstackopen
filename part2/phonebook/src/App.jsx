import { useState, useEffect } from 'react'
import { Filter } from './components/Filter'
import { PersonForm } from './components/PersonForm'
import { Persons } from './components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const addName = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: phoneNumber,
      id: Math.max(...persons.map(p => p.id)) + 1
    };




    if (persons.some(person => person.name === newName)) {
      alert(`${newName} already exists in phonebook`);
      return;
    }
    // axios
    // .post('http://localhost:3001/persons', personObject)
    // .then(response => {
    //   console.log(response)
    // setPersons(persons.concat(response.data))
    // setNewName('')
    // setPhoneNumber('')
    // })
    setPersons([...persons, personObject]);
    setNewName('');
    setPhoneNumber('');
  };

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled');
        setPersons(response.data)

      })
  }

  useEffect(hook, [])


  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        phoneNumber={phoneNumber}
        onNameChange={(e) => setNewName(e.target.value)}
        onNumberChange={(e) => setPhoneNumber(e.target.value)}
        onSubmit={addName}
      />

      <h3>Numbers</h3>
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App