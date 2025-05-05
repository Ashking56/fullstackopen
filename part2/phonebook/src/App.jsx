import { useState, useEffect } from "react";
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import { Persons } from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const hook = () => {
    personService.getAll().then((initialPerson) => {
      setPersons(initialPerson);
    });
  };
  useEffect(hook, []);

  const addName = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: phoneNumber,
      id: Math.max(...persons.map((p) => p.id)) + 1,
    };

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} already exists in phonebook`);
      return;
    }
    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setPhoneNumber("");
    });
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    const personToDelete = persons.find((person) => person.id === id);

    if (
      personToDelete &&
      window.confirm(`¿Eliminar a ${personToDelete.name}?`)
    ) {
      personService
        .erase(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          console.error("Error al eliminar:", error);
        });
    }
  };

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
      <Persons persons={filteredPersons} onDelete={handleDelete} />
    </div>
  );
};

export default App;
