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
      setPersons(initialPerson || []);
    });
  };
  useEffect(hook, []);

  const addName = (event) => {
    event.preventDefault();

    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} ya existe en la agenda. ¿Deseas reemplazar el número antiguo (${existingPerson.number}) con el nuevo (${phoneNumber})?`
      );

      if (confirmUpdate) {
        // Crear objeto actualizado
        const updatedPerson = {
          ...existingPerson,
          number: phoneNumber,
        };

        // Llamar al servicio de actualización
        personService
          .update(existingPerson.id, updatedPerson)
          .then((returnedPerson) => {
            // Actualizar el estado con la persona modificada
            setPersons(
              persons.map((person) =>
                person.id === existingPerson.id ? returnedPerson : person
              )
            );
            setNewName("");
            setPhoneNumber("");
          })
          .catch((error) => {
            alert("Error al actualizar el número");
            console.error("Error de actualización:", error);
          });
      }
      return;
    }

    const newPerson = {
      name: newName,
      number: phoneNumber,
    };

    personService
      .create(newPerson)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setPhoneNumber("");
      })
      .catch((error) => {
        alert("Error al crear el contacto");
        console.error("Error de creación:", error);
      });
  };

  const filteredPersons = persons.filter((person) =>
    person?.name?.toLowerCase().includes(searchTerm.toLowerCase())
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
          alert("No se pudo eliminar la persona. Intente nuevamente.");
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
