const Person = ({ person }) => (
    <li>{person?.name} {person?.number}</li>
)

export const Persons = ({ persons }) => {
    return (
        <ul>
            {persons.map(person => (
                <Person key={person.id} person={person} />
            ))}
        </ul>
    )
}