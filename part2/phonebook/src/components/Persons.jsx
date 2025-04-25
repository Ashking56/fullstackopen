// Persons.jsx
const Person = ({ person }) => (
    <li>{person?.name} {person?.number}</li> // Usar optional chaining para prevenir errores
)

export const Persons = ({ persons }) => {
    return (
        <ul>
            {persons.map(person => (
                <Person key={person.id} person={person} /> // Usar id como key (mejor práctica)
            ))}
        </ul>
    )
}