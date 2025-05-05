const Person = ({ person, onDelete }) => (
  <li>
    {person?.name} {person?.number}
    <button onClick={() => onDelete(person.id)}>Eliminar</button>
  </li>
);

export const Persons = ({ persons, onDelete }) => {
  return (
    <ul>
      {persons.map((person) => (
        <Person key={person.id} person={person} onDelete={onDelete} />
      ))}
    </ul>
  );
};
