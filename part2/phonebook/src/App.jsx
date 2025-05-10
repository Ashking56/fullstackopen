import { useState, useEffect } from 'react'
import { Filter } from './components/Filter'
import { PersonForm } from './components/PersonForm'
import { Persons } from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [successfulMessage, setSuccessfulMessage] = useState('')
  const [exceptionMessage, setExceptionMessage] = useState('')

  const hook = () => {
    personService.getAll().then(initialPerson => {
      setPersons(initialPerson || [])
    })
  }
  useEffect(hook, [])

  const addName = event => {
    event.preventDefault()

    const existingPerson = persons.find(person => person.name === newName)

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} already exists in phonebook. ¿Wish to replace the old number (${existingPerson.number}) with the new one (${phoneNumber})?`
      )

      if (confirmUpdate) {
        const updatedPerson = {
          ...existingPerson,
          number: phoneNumber
        }

        personService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(
              persons.map(person =>
                person.id === existingPerson.id ? returnedPerson : person
              )
            )
            setNewName('')
            setPhoneNumber('')
            setSuccessfulMessage(`Updated ${existingPerson.name}`)
            setExceptionMessage(null)
            setTimeout(() => setSuccessfulMessage(null), 5000)
          })
          .catch(error => {
            setExceptionMessage(
              `Information of ${existingPerson.name} has already been removed from server`
            )
            setSuccessfulMessage(null)
            setTimeout(() => setExceptionMessage(null), 5000)
            console.log(error)
          })
      }
      return
    }

    const newPerson = {
      name: newName,
      number: phoneNumber
    }

    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setPhoneNumber('')
        setSuccessfulMessage(`Added ${newPerson.name} `)
        setTimeout(() => {
          setSuccessfulMessage(null)
        }, 5000)
      })
      .catch(error => {
        setExceptionMessage(`Failed to add ${newPerson.name}`)
        setSuccessfulMessage(null)
        setTimeout(() => setExceptionMessage(null), 5000)
        console.log(error)
      })
  }

  const filteredPersons = persons.filter(person =>
    person?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = id => {
    const personToDelete = persons.find(person => person.id === id)

    if (
      personToDelete &&
      window.confirm(`¿Eliminar a ${personToDelete.name}?`)
    ) {
      personService
        .erase(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          console.error('Error al eliminar:', error)
          alert('No se pudo eliminar la persona. Intente nuevamente.')
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successfulMessage} exception={exceptionMessage} />
      <Filter
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        phoneNumber={phoneNumber}
        onNameChange={e => setNewName(e.target.value)}
        onNumberChange={e => setPhoneNumber(e.target.value)}
        onSubmit={addName}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} onDelete={handleDelete} />
    </div>
  )
}

export default App
