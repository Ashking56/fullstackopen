import { useState } from 'react'
import { Filter } from './components/Filter'
import { PersonForm } from './components/PersonForm'
import { Persons } from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
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

    setPersons([...persons, personObject]);
    setNewName('');
    setPhoneNumber('');
  };

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