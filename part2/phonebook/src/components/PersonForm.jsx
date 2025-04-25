export const PersonForm = ({
  newName,
  phoneNumber,
  onNameChange,
  onNumberChange,
  onSubmit
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input
          value={newName}
          onChange={onNameChange}
        />
        <div>
          number: <input
            value={phoneNumber}
            onChange={onNumberChange}
          />
        </div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}